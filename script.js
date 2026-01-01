// =====================================================
// Encodify v2.2 - سیستم رمزنگاری فارسی
// =====================================================

// =====================================================
// Legacy v1 - پشتیبانی از نسخه قدیمی (کلمات + ایموجی)
// =====================================================

const LEGACY_WORDS_64 = [
  "آب", "آسمان", "آتش", "ابر", "امید", "انسان", "ایران", "باد",
  "باران", "باغ", "برف", "بهار", "پرواز", "پنجره", "پیام", "تلاش",
  "توسعه", "جاده", "جهان", "حقیقت", "خورشید", "دریا", "درخت", "دل",
  "دوست", "راه", "رود", "رویا", "روز", "زمان", "زمین", "زیبا",
  "سفر", "سلام", "سنگ", "سکوت", "شادی", "شب", "صبح", "صدا",
  "طبیعت", "طلوع", "عشق", "علم", "فردا", "فرصت", "فصل", "فکر",
  "قلم", "قلب", "کار", "کتاب", "کوه", "کودک", "گل", "لبخند",
  "لحظه", "مردم", "مهر", "مهتاب", "موج", "نور", "نگاه", "هدف", "هوا", "یاد"
];

const LEGACY_WORDS_POOL = [
  "زندگی", "آرامش", "محبت", "مهربانی", "دوستی", "امروز", "اکنون", "آینده",
  "باور", "شوق", "انگیزه", "توان", "حرکت", "رشد", "پیشرفت", "اندیشه",
  "خرد", "دانش", "آگاهی", "پیروزی", "تجربه", "تمرین", "توجه", "امتحان",
  "پایداری", "یاری", "همراه", "همسفر", "رهایی", "آغاز", "پایان", "خاطره",
  "داستان", "تصویر", "نقش", "راز", "حس", "احساس", "دیدار", "گفتگو",
  "پرسش", "پاسخ", "آواز", "ترانه", "نغمه", "رنگ", "عطر", "خانه",
  "خانواده", "دوام", "مسیر", "قدم", "گام", "ساحل", "افق", "سپیده",
  "پرتو", "روشنایی", "گرما", "نسیم", "سایه", "پناه", "سپاس", "لب",
  "چشم", "دست", "خنده", "لبخند", "یادگار", "بیداری", "بخشش", "امانت",
  "شکوفه", "آبی", "زرین", "سپید", "سبز", "سرخ", "نقره", "بلور",
  "چشمه", "جوی", "آبشار", "دشت", "کشتزار", "پرنده", "آهو", "ماه",
  "ستاره", "خورشید", "صبحگاه", "شامگاه", "بارقه", "آذرخش", "رعد", "برق"
];

const LEGACY_EMOJI_POOL = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🙂", "😉", "😊", "😇",
  "😍", "😘", "😗", "😙", "😚", "😋", "😛", "😜", "😝", "😎", "🤓", "🧐",
  "🤗", "🤔", "😐", "😑", "🙄", "😬", "😌", "😔", "😪", "😴", "🥳",
  "💛", "💚", "💙", "💜", "🧡", "🤍", "🖤", "💘", "💝", "💖", "💗", "💓",
  "💞", "💕", "💟", "❣", "💯", "✨", "🌟", "⭐", "⚡", "🔥", "💧", "🌈",
  "🌙", "🌍", "🌎", "🌏", "🌸", "🌼", "🌻", "🌺", "🌷", "🌹", "🥀", "🌿",
  "🍀", "🌱", "🌳", "🌲", "🌴", "🌵", "🍁", "🍂", "🍃", "🌊", "⛰", "🏔",
  "🏕", "🎈", "🎉", "🎊", "🎁", "🏆", "🎯", "🎵", "🎶", "📌", "📍", "🧭",
  "⏰", "📅", "📝", "📚", "📖", "✏", "🧠", "🔑", "🔒", "🔓", "🛡", "⚙",
  "🔧", "🔨", "🧰", "🔬", "💡", "🔦", "📷", "🎥", "📱", "💻", "🖥", "🛰",
  "🚀", "✈", "🚗", "🚲", "🚶", "🏃", "🧘", "🤝", "👏", "🙌", "🙏",
  "🌞", "☀", "☁", "🌧", "❄", "🌨", "⛅", "⛈", "🌦", "🌤"
];

// ساخت توکن‌های Legacy
function isSafeWord(w) {
  return /^[\u0600-\u06FF\u200C]+$/.test(w);
}
function isSafeEmoji(e) {
  if (e.includes('\u200D')) return false;
  if (e.includes('\uFE0F')) return false;
  if (/\s/.test(e)) return false;
  return true;
}

function pickUnique(list, n, predicate) {
  const out = [];
  const seen = new Set();
  for (const x of list) {
    if (predicate && !predicate(x)) continue;
    if (seen.has(x)) continue;
    seen.add(x);
    out.push(x);
    if (out.length === n) break;
  }
  return out;
}

const LEGACY_WORDS = (() => {
  const merged = [...LEGACY_WORDS_64, ...LEGACY_WORDS_POOL];
  return pickUnique(merged, 128, isSafeWord);
})();

const LEGACY_EMOJIS = (() => {
  return pickUnique(LEGACY_EMOJI_POOL, 128, isSafeEmoji);
})();

const LEGACY_TOKENS = [...LEGACY_WORDS, ...LEGACY_EMOJIS];
const LEGACY_TOKEN_TO_INDEX = new Map(LEGACY_TOKENS.map((t, i) => [t, i]));

function legacyTokensToBytes(text) {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) throw new Error("ورودی خالی است");

  const out = new Uint8Array(tokens.length);
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const idx = LEGACY_TOKEN_TO_INDEX.get(t);
    if (idx === undefined) throw new Error("توکن نامعتبر: " + t);
    out[i] = idx;
  }

  if (out.length < 4) throw new Error("داده کافی نیست");
  const len = ((out[0] << 24) | (out[1] << 16) | (out[2] << 8) | out[3]) >>> 0;
  const payload = out.slice(4);
  if (payload.length < len) throw new Error("داده ناقص/دستکاری شده");
  return payload.slice(0, len);
}

async function unpackDataLegacy(bytes, pass) {
  if (bytes.length < 2) throw new Error("داده خراب است");
  const version = bytes[0];
  const flags = bytes[1];
  if (version !== 1) throw new Error("نسخه پشتیبانی نمی‌شود");

  const encrypted = (flags & 1) === 1;
  const compressed = (flags & 2) === 2;

  let payload;
  if (!encrypted) {
    payload = bytes.slice(2);
  } else {
    if (!pass) throw new Error("کلید لازم است");
    if (bytes.length < 31) throw new Error("داده ناقص است");

    const salt = bytes.slice(2, 18);
    const iv = bytes.slice(18, 30);
    const cipher = bytes.slice(30);

    if (!hasCrypto) throw new Error("این مرورگر از AES پشتیبانی نمی‌کند");

    const baseKey = await crypto.subtle.importKey(
      "raw", te.encode(pass), "PBKDF2", false, ["deriveKey"]
    );
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );

    let plainAB;
    try {
      plainAB = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        cipher
      );
    } catch {
      throw new Error("کلید نادرست است یا داده دستکاری شده");
    }
    payload = new Uint8Array(plainAB);
  }

  const raw = compressed ? await gzipDecompress(payload) : payload;
  return td.decode(raw);
}

function detectLegacy(text) {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  if (tokens.length < 4) return false;
  
  let matched = 0;
  for (const t of tokens) {
    if (LEGACY_TOKEN_TO_INDEX.has(t)) matched++;
  }
  
  return matched / tokens.length > 0.8;
}

// =====================================================
// کدگذاری فارسی‌ساز - تبدیل کاراکتر به کاراکتر
// بهینه برای SMS - هر کاراکتر انگلیسی به یک حرف فارسی
// =====================================================

const PERSIAN_MAP = {
  'a': 'ش', 'b': 'ب', 'c': 'ث', 'd': 'د', 'e': 'ع', 'f': 'ف', 'g': 'گ', 'h': 'ه',
  'i': 'ی', 'j': 'ج', 'k': 'ک', 'l': 'ل', 'm': 'م', 'n': 'ن', 'o': 'خ', 'p': 'پ',
  'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت', 'u': 'ض', 'v': 'و', 'w': 'ص', 'x': 'ط',
  'y': 'ظ', 'z': 'ز', '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵',
  '6': '۶', '7': '۷', '8': '۸', '9': '۹', ':': 'چ', '/': 'آ', '.': 'ژ', '-': 'ذ',
  '_': 'ئ', '+': 'ء', '=': 'أ', '?': 'ؤ', '&': 'إ', '#': 'ً', '@': 'ٍ', '%': 'ٌ',
  ' ': ' ', '\n': '\n'
};

// نشانگر حروف بزرگ
const CAPITAL_MARKER = 'ـ';

// ساخت reverse map
const PERSIAN_REVERSE = {};
for (const [en, fa] of Object.entries(PERSIAN_MAP)) {
  PERSIAN_REVERSE[fa] = en;
}

function encodePersian(text) {
  let result = '';
  for (const char of text) {
    const isUpper = char >= 'A' && char <= 'Z';
    const lower = char.toLowerCase();
    
    if (PERSIAN_MAP[lower]) {
      result += isUpper ? CAPITAL_MARKER + PERSIAN_MAP[lower] : PERSIAN_MAP[lower];
    } else if (PERSIAN_MAP[char]) {
      result += PERSIAN_MAP[char];
    } else {
      // کاراکترهای ناشناخته را همانطور نگه می‌داریم
      result += char;
    }
  }
  return result;
}

function decodePersian(text) {
  let result = '';
  let nextIsUpper = false;
  
  for (const char of text) {
    if (char === CAPITAL_MARKER) {
      nextIsUpper = true;
      continue;
    }
    
    if (PERSIAN_REVERSE[char]) {
      const decoded = PERSIAN_REVERSE[char];
      result += nextIsUpper ? decoded.toUpperCase() : decoded;
      nextIsUpper = false;
    } else {
      result += char;
      nextIsUpper = false;
    }
  }
  return result;
}

// =====================================================
// کدگذاری جمله‌ای - 256 کلمه یکتا
// =====================================================

const BYTE_WORDS = [
  // 0-31: اسامی
  "احمد", "علی", "حسن", "محمد", "رضا", "مهدی", "امیر", "سعید",
  "فاطمه", "زهرا", "مریم", "سارا", "نرگس", "لیلا", "نازنین", "مینا",
  "تهران", "شیراز", "اصفهان", "مشهد", "تبریز", "کرج", "قم", "اهواز",
  "بهار", "تابستان", "پاییز", "زمستان", "شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه",
  // 32-63: زمان و مکان
  "چهارشنبه", "پنج‌شنبه", "جمعه", "صبح", "ظهر", "عصر", "شب", "فردا",
  "دیروز", "امروز", "هفته", "ماه", "سال", "قرن", "لحظه", "ثانیه",
  "دقیقه", "ساعت", "روز", "شروع", "پایان", "وسط", "کنار", "بالا",
  "پایین", "چپ", "راست", "جلو", "عقب", "داخل", "خارج", "دور",
  // 64-95: اشیاء خانگی
  "کتاب", "قلم", "کاغذ", "دفتر", "میز", "صندلی", "تخت", "کمد",
  "درب", "پنجره", "دیوار", "سقف", "کف", "پله", "آسانسور", "راهرو",
  "آشپزخانه", "اتاق", "حمام", "توالت", "حیاط", "بالکن", "پارکینگ", "انباری",
  "ماشین", "موتور", "دوچرخه", "اتوبوس", "مترو", "قطار", "هواپیما", "کشتی",
  // 96-127: وسایل الکترونیک و لباس
  "گوشی", "لپتاپ", "کامپیوتر", "تلویزیون", "رادیو", "یخچال", "اجاق", "ماکروویو",
  "لباس", "شلوار", "پیراهن", "کت", "کفش", "جوراب", "کلاه", "شال",
  "عینک", "ساعت", "کیف", "کمربند", "دستبند", "گردنبند", "انگشتر", "گوشواره",
  "سیب", "پرتقال", "موز", "انگور", "هندوانه", "خربزه", "گیلاس", "آلبالو",
  // 128-159: صفات
  "بزرگ", "کوچک", "بلند", "کوتاه", "پهن", "باریک", "ضخیم", "نازک",
  "سنگین", "سبک", "تند", "کند", "گرم", "سرد", "داغ", "خنک",
  "نرم", "سخت", "صاف", "ناهموار", "تمیز", "کثیف", "خشک", "مرطوب",
  "تازه", "کهنه", "جدید", "قدیمی", "روشن", "تاریک", "رنگی", "سفید",
  // 160-191: رنگ‌ها و حالات
  "سیاه", "قرمز", "آبی", "سبز", "زرد", "نارنجی", "بنفش", "صورتی",
  "خوب", "بد", "عالی", "بیمار", "سالم", "قوی", "ضعیف", "زیبا",
  "رفت", "آمد", "دید", "شنید", "گفت", "خورد", "خوابید", "نشست",
  "ایستاد", "دوید", "پرید", "افتاد", "گرفت", "داد", "برد", "آورد",
  // 192-223: اعداد و ضمایر
  "یکی", "دوتا", "سه‌تا", "چهارتا", "پنجتا", "شش‌تا", "هفت‌تا", "هشت‌تا",
  "نه‌تا", "ده‌تا", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد",
  "هشتاد", "نود", "صد", "هزار", "میلیون", "اول", "دوم", "سوم",
  "آخر", "بعد", "قبل", "همه", "هیچ", "بعضی", "هر", "این",
  // 224-255: کلمات متفرقه
  "آن", "اینجا", "آنجا", "کجا", "چه", "کی", "چرا", "چطور",
  "بله", "خیر", "شاید", "حتما", "هرگز", "همیشه", "گاهی", "اغلب",
  "زود", "دیر", "الان", "بعدا", "قبلا", "باز", "بسته", "پر",
  "خالی", "کم", "زیاد", "نصف", "ربع", "کامل", "ناقص", "آماده"
];

const WORD_TO_BYTE = {};
BYTE_WORDS.forEach((word, index) => {
  WORD_TO_BYTE[word] = index;
});

function encodeSentence(bytes) {
  const len = bytes.length;
  const dataWithLen = new Uint8Array(2 + len);
  dataWithLen[0] = (len >> 8) & 0xFF;
  dataWithLen[1] = len & 0xFF;
  dataWithLen.set(bytes, 2);
  
  const words = [];
  for (const b of dataWithLen) {
    words.push(BYTE_WORDS[b]);
  }
  
  // ساخت جملات طبیعی
  const sentences = [];
  let i = 0;
  while (i < words.length) {
    const count = Math.min(3, words.length - i);
    const chunk = words.slice(i, i + count);
    i += count;
    
    if (chunk.length === 1) {
      sentences.push(`${chunk[0]} خوبه`);
    } else if (chunk.length === 2) {
      sentences.push(`${chunk[0]} با ${chunk[1]} رفتیم`);
    } else {
      sentences.push(`${chunk[0]} و ${chunk[1]} گفتن ${chunk[2]}`);
    }
  }
  
  return sentences.join("، ");
}

function decodeSentence(text) {
  const words = text.split(/[\s،,.!?؟:;]+/).filter(w => w.length > 0);
  const bytes = [];
  
  for (const word of words) {
    if (word in WORD_TO_BYTE) {
      bytes.push(WORD_TO_BYTE[word]);
    }
  }
  
  if (bytes.length < 2) throw new Error("داده کافی نیست");
  
  const len = (bytes[0] << 8) | bytes[1];
  if (len > bytes.length - 2) throw new Error("داده ناقص یا خراب است");
  
  return new Uint8Array(bytes.slice(2, 2 + len));
}

// =====================================================
// کدگذاری ZWC (Zero-Width Characters)
// =====================================================

const ZWC_CHARS = [
  '\u200B', // Zero Width Space
  '\u200C', // Zero Width Non-Joiner
  '\u200D', // Zero Width Joiner
  '\uFEFF'  // Zero Width No-Break Space
];

const DEFAULT_CARRIER = "سلام خوبی؟ چه خبر؟ امروز هوا خوبه، کارا چطوره؟";

function encodeZWC(bytes, carrier) {
  const len = bytes.length;
  const dataWithLen = new Uint8Array(2 + len);
  dataWithLen[0] = (len >> 8) & 0xFF;
  dataWithLen[1] = len & 0xFF;
  dataWithLen.set(bytes, 2);
  
  let zwcString = '';
  for (const b of dataWithLen) {
    zwcString += ZWC_CHARS[(b >> 6) & 3];
    zwcString += ZWC_CHARS[(b >> 4) & 3];
    zwcString += ZWC_CHARS[(b >> 2) & 3];
    zwcString += ZWC_CHARS[b & 3];
  }
  
  const mid = Math.floor(carrier.length / 2);
  return carrier.slice(0, mid) + zwcString + carrier.slice(mid);
}

function decodeZWC(text) {
  let zwcString = '';
  for (const char of text) {
    if (ZWC_CHARS.includes(char)) {
      zwcString += char;
    }
  }
  
  if (zwcString.length < 8) throw new Error("داده ZWC یافت نشد");
  
  const bytes = [];
  for (let i = 0; i + 3 < zwcString.length; i += 4) {
    const b0 = ZWC_CHARS.indexOf(zwcString[i]);
    const b1 = ZWC_CHARS.indexOf(zwcString[i + 1]);
    const b2 = ZWC_CHARS.indexOf(zwcString[i + 2]);
    const b3 = ZWC_CHARS.indexOf(zwcString[i + 3]);
    bytes.push((b0 << 6) | (b1 << 4) | (b2 << 2) | b3);
  }
  
  if (bytes.length < 2) throw new Error("داده ناقص است");
  
  const len = (bytes[0] << 8) | bytes[1];
  if (len > bytes.length - 2) throw new Error("داده ناقص است");
  
  return new Uint8Array(bytes.slice(2, 2 + len));
}

// =====================================================
// ابزارهای عمومی
// =====================================================

const te = new TextEncoder();
const td = new TextDecoder();
const $ = (id) => document.getElementById(id);

function setMessage(text, type = 'info') {
  const msg = $("msg");
  msg.textContent = text;
  msg.className = 'msg ' + type;
}

function ok(t) { setMessage("✔ " + t, 'success'); }
function err(t) { setMessage("❌ " + t, 'error'); }
function info(t) { setMessage("ℹ️ " + t, 'info'); }

const hasCrypto = !!(window.crypto && window.crypto.subtle);

function randBytes(n) {
  const u = new Uint8Array(n);
  if (window.crypto && window.crypto.getRandomValues) {
    crypto.getRandomValues(u);
  } else {
    for (let i = 0; i < n; i++) {
      u[i] = Math.floor(Math.random() * 256);
    }
  }
  return u;
}

function simpleHash(str) {
  const bytes = te.encode(str);
  const result = new Uint8Array(32);
  for (let i = 0; i < bytes.length; i++) {
    result[i % 32] ^= bytes[i];
    result[(i + 1) % 32] = (result[(i + 1) % 32] + bytes[i]) & 0xFF;
    result[(i + 7) % 32] ^= (bytes[i] << 3) | (bytes[i] >> 5);
  }
  for (let round = 0; round < 100; round++) {
    for (let i = 0; i < 32; i++) {
      result[i] = (result[i] + result[(i + 1) % 32] * 31) & 0xFF;
      result[(i + 17) % 32] ^= result[i];
    }
  }
  return result;
}

// =====================================================
// فشرده‌سازی GZIP
// =====================================================

async function gzipCompress(u8) {
  if (!("CompressionStream" in window)) return u8;
  try {
    const cs = new CompressionStream("gzip");
    const stream = new Blob([u8]).stream().pipeThrough(cs);
    const ab = await new Response(stream).arrayBuffer();
    return new Uint8Array(ab);
  } catch {
    return u8;
  }
}

async function gzipDecompress(u8) {
  if (!("DecompressionStream" in window)) return u8;
  try {
    const ds = new DecompressionStream("gzip");
    const stream = new Blob([u8]).stream().pipeThrough(ds);
    const ab = await new Response(stream).arrayBuffer();
    return new Uint8Array(ab);
  } catch {
    return u8;
  }
}

// =====================================================
// رمزنگاری AES-256-GCM (امن)
// =====================================================

async function deriveKeyAES(pass, salt) {
  if (!pass) throw new Error("کلید رمزنگاری الزامی است");
  const baseKey = await crypto.subtle.importKey(
    "raw", te.encode(pass), "PBKDF2", false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function aesEncrypt(data, pass) {
  const salt = randBytes(16);
  const iv = randBytes(12);
  const key = await deriveKeyAES(pass, salt);
  const cipherAB = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);
  const cipher = new Uint8Array(cipherAB);
  
  const out = new Uint8Array(16 + 12 + cipher.length);
  out.set(salt, 0);
  out.set(iv, 16);
  out.set(cipher, 28);
  return out;
}

async function aesDecrypt(data, pass) {
  if (data.length < 29) throw new Error("داده ناقص است");
  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const cipher = data.slice(28);
  
  const key = await deriveKeyAES(pass, salt);
  try {
    const plainAB = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
    return new Uint8Array(plainAB);
  } catch {
    throw new Error("کلید نادرست است یا داده دستکاری شده");
  }
}

// =====================================================
// رمزنگاری XOR (سبک)
// =====================================================

function deriveKeyXOR(pass, salt) {
  const combined = pass + Array.from(salt).map(b => String.fromCharCode(b)).join('');
  return simpleHash(combined);
}

function xorEncrypt(data, pass) {
  const salt = randBytes(8);
  const keyBytes = deriveKeyXOR(pass, salt);
  
  const out = new Uint8Array(8 + data.length);
  out.set(salt, 0);
  
  for (let i = 0; i < data.length; i++) {
    out[8 + i] = data[i] ^ keyBytes[i % keyBytes.length];
  }
  return out;
}

function xorDecrypt(data, pass) {
  if (data.length < 9) throw new Error("داده ناقص است");
  const salt = data.slice(0, 8);
  const cipher = data.slice(8);
  
  const keyBytes = deriveKeyXOR(pass, salt);
  const out = new Uint8Array(cipher.length);
  
  for (let i = 0; i < cipher.length; i++) {
    out[i] = cipher[i] ^ keyBytes[i % keyBytes.length];
  }
  return out;
}

// =====================================================
// بسته‌بندی داده
// =====================================================

async function packData(text, pass, encStrength) {
  const raw = te.encode(text);
  
  const gz = raw.length > 50 ? await gzipCompress(raw) : raw;
  const useGzip = gz.length < raw.length;
  const payload = useGzip ? gz : raw;
  
  const version = 2;
  const encrypted = !!pass;
  const useSecure = encStrength === 'secure' && hasCrypto;
  
  let flags = 0;
  if (useGzip) flags |= 1;
  if (encrypted) flags |= 2;
  if (encrypted && useSecure) flags |= 16;
  
  let finalPayload = payload;
  
  if (encrypted) {
    if (useSecure) {
      finalPayload = await aesEncrypt(payload, pass);
    } else {
      finalPayload = xorEncrypt(payload, pass);
    }
  }
  
  const out = new Uint8Array(2 + finalPayload.length);
  out[0] = version;
  out[1] = flags;
  out.set(finalPayload, 2);
  
  return out;
}

async function unpackData(bytes, pass) {
  if (bytes.length < 2) throw new Error("داده خراب است");
  
  const version = bytes[0];
  const flags = bytes[1];
  
  if (version !== 2) throw new Error("نسخه پشتیبانی نمی‌شود");
  
  const compressed = (flags & 1) === 1;
  const encrypted = (flags & 2) === 2;
  const strengthSecure = (flags & 16) === 16;
  
  let payload = bytes.slice(2);
  
  if (encrypted) {
    if (!pass) throw new Error("کلید لازم است");
    if (strengthSecure) {
      payload = await aesDecrypt(payload, pass);
    } else {
      payload = xorDecrypt(payload, pass);
    }
  }
  
  const raw = compressed ? await gzipDecompress(payload) : payload;
  return td.decode(raw);
}

// =====================================================
// تشخیص خودکار نوع رمزنگاری
// =====================================================

function detectEncodingMethod(text) {
  // بررسی ZWC
  for (const zwc of ZWC_CHARS) {
    if (text.includes(zwc)) return 'zwc';
  }
  
  // بررسی Legacy (کلمات + ایموجی)
  if (detectLegacy(text)) {
    return 'legacy';
  }
  
  // بررسی فارسی‌ساز (اگر بیشتر حروف فارسی باشند)
  const persianChars = Object.values(PERSIAN_MAP);
  let persianCount = 0;
  let totalChars = 0;
  
  for (const char of text) {
    if (char !== ' ' && char !== '\n') {
      totalChars++;
      if (persianChars.includes(char) || char === CAPITAL_MARKER) {
        persianCount++;
      }
    }
  }
  
  if (totalChars > 0 && persianCount / totalChars > 0.7) {
    return 'persian';
  }
  
  // بررسی جمله‌ای
  const words = text.split(/[\s،,.!?؟:;]+/).filter(w => w.length > 0);
  let sentenceCount = 0;
  for (const word of words) {
    if (word in WORD_TO_BYTE) sentenceCount++;
  }
  
  if (words.length > 0 && sentenceCount / words.length > 0.3) {
    return 'sentence';
  }
  
  // fallback - بررسی مجدد Legacy با threshold پایین‌تر
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  let legacyMatched = 0;
  for (const t of tokens) {
    if (LEGACY_TOKEN_TO_INDEX.has(t)) legacyMatched++;
  }
  if (tokens.length > 0 && legacyMatched / tokens.length > 0.5) {
    return 'legacy';
  }
  
  return 'persian';
}

// =====================================================
// توابع اصلی
// =====================================================

async function encrypt() {
  $("msg").className = 'msg';
  $("msg").textContent = '';
  
  const text = $("plain").value;
  if (!text.trim()) {
    $("out").value = "";
    info("ورودی خالی است");
    return;
  }
  
  const pass = ($("pass").value || "").trim();
  const encodingMethod = $("encodingMethod").value;
  const encStrength = $("encStrength").value;
  const carrierText = $("carrierText").value.trim() || DEFAULT_CARRIER;
  
  try {
    let output;
    
    if (encodingMethod === 'persian') {
      // فارسی‌ساز - مستقیم تبدیل می‌کنیم
      let textToEncode = text;
      
      if (pass) {
        // اگر کلید داریم، اول رمزنگاری می‌کنیم
        const bytes = await packData(text, pass, encStrength);
        // تبدیل bytes به base64 و سپس به فارسی
        const b64 = btoa(String.fromCharCode(...bytes));
        textToEncode = b64;
      }
      
      output = encodePersian(textToEncode);
      
    } else if (encodingMethod === 'zwc') {
      const bytes = await packData(text, pass, encStrength);
      output = encodeZWC(bytes, carrierText);
      
    } else {
      const bytes = await packData(text, pass, encStrength);
      output = encodeSentence(bytes);
    }
    
    $("out").value = output;
    
    let statusMsg = "انجام شد";
    if (pass) {
      statusMsg += encStrength === 'secure' ? " (AES-256)" : " (سبک)";
    }
    
    if (encodingMethod === 'persian') {
      statusMsg += " — فارسی‌ساز";
    } else if (encodingMethod === 'zwc') {
      statusMsg += " — ZWC نامرئی";
    } else {
      statusMsg += " — جمله‌ای";
    }
    
    ok(statusMsg);
    
  } catch (e) {
    err(e.message || "خطا در رمزنگاری");
  }
}

async function decrypt() {
  $("msg").className = 'msg';
  $("msg").textContent = '';
  
  const coded = $("plain").value;
  if (!coded.trim()) {
    $("out").value = "";
    info("ورودی خالی است");
    return;
  }
  
  const pass = ($("pass").value || "").trim();
  const decodeMethod = $("decodeMethod").value;
  
  let method = decodeMethod;
  if (method === 'auto') {
    method = detectEncodingMethod(coded);
  }
  
  try {
    let output;
    
    if (method === 'legacy') {
      // نسخه قدیمی - کلمات + ایموجی
      const bytes = legacyTokensToBytes(coded);
      output = await unpackDataLegacy(bytes, pass);
      
    } else if (method === 'persian') {
      // فارسی‌ساز
      const decoded = decodePersian(coded);
      
      if (pass) {
        // اگر کلید داریم، باید base64 decode و سپس unpack کنیم
        try {
          const b64decoded = atob(decoded);
          const bytes = new Uint8Array(b64decoded.split('').map(c => c.charCodeAt(0)));
          output = await unpackData(bytes, pass);
        } catch {
          // شاید کلید نداشته
          output = decoded;
        }
      } else {
        output = decoded;
      }
      
    } else if (method === 'zwc') {
      const bytes = decodeZWC(coded);
      output = await unpackData(bytes, pass);
      
    } else {
      const bytes = decodeSentence(coded);
      output = await unpackData(bytes, pass);
    }
    
    $("out").value = output;
    
    let statusMsg = "انجام شد";
    if (method === 'legacy') statusMsg += " (نسخه قدیمی v1)";
    else if (method === 'persian') statusMsg += " (فارسی‌ساز)";
    else if (method === 'zwc') statusMsg += " (ZWC)";
    else statusMsg += " (جمله‌ای)";
    
    ok(statusMsg);
    
  } catch (e) {
    err(e.message || "خطا در رمزگشایی");
  }
}

function swap() {
  [$("plain").value, $("out").value] = [$("out").value, $("plain").value];
  info("جابجا شد");
}

async function copyOut() {
  const v = $("out").value;
  if (!v.trim()) {
    info("چیزی برای کپی نیست");
    return;
  }
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(v);
      info('کپی شد');
      return;
    } catch {}
  }
  
  // fallback
  const textarea = document.createElement('textarea');
  textarea.value = v;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    info('کپی شد');
  } catch {
    err('کپی نشد');
  }
  document.body.removeChild(textarea);
}

function clearForm() {
  $("plain").value = "";
  $("out").value = "";
  $("pass").value = "";
  $("carrierText").value = "";
  $("msg").textContent = "";
  $("msg").className = "msg";
}

// =====================================================
// UI Events
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
  const carrierGroup = $("carrierGroup");
  const encodingInfo = $("encodingInfo");
  const encodingInfoText = $("encodingInfoText");
  
  const infoTexts = {
    'persian': '💡 فارسی‌ساز: بهترین گزینه برای SMS — حروف انگلیسی به فارسی تبدیل می‌شوند',
    'sentence': '📝 جمله‌ای: خروجی به صورت جملات فارسی طبیعی — مناسب برای SMS',
    'zwc': '⚠️ ZWC: کاراکترهای نامرئی — فقط برای شبکه‌های اجتماعی (برای SMS مناسب نیست)'
  };
  
  function updateEncodingUI() {
    const method = $("encodingMethod").value;
    
    if (method === 'zwc') {
      carrierGroup.classList.add('visible');
      encodingInfo.className = 'info-box warning';
    } else {
      carrierGroup.classList.remove('visible');
      encodingInfo.className = 'info-box success';
    }
    
    encodingInfoText.textContent = infoTexts[method] || '';
  }
  
  updateEncodingUI();
  
  $("encodingMethod").addEventListener('change', updateEncodingUI);
  
  // Advanced toggle
  $("advancedToggle").addEventListener('click', () => {
    const opts = $("advancedOptions");
    opts.classList.toggle('visible');
    $("advancedToggle").textContent = opts.classList.contains('visible') 
      ? '⚙️ بستن تنظیمات' 
      : '⚙️ تنظیمات پیشرفته رمزگشایی';
  });
  
  // Buttons
  $("encBtn").addEventListener('click', encrypt);
  $("decBtn").addEventListener('click', decrypt);
  $("swapBtn").addEventListener('click', swap);
  $("copyBtn").addEventListener('click', copyOut);
  $("clearBtn").addEventListener('click', clearForm);
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'Enter') {
        e.preventDefault();
        encrypt();
      }
    }
  });
});
