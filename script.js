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
// کدگذاری SMS فشرده - کلمات کوتاه برای پیامک
// =====================================================

// 64 کلمه کوتاه = 6 بیت به ازای هر کلمه
const SMS_WORDS_64 = [
  // ۲ حرفی (۱۶ کلمه) - رایج‌ترین
  'که', 'با', 'از', 'به', 'تا', 'در', 'یک', 'دو',
  'هم', 'شد', 'رو', 'چی', 'کو', 'کی', 'چه', 'نه',
  // ۲-۳ حرفی (۲۴ کلمه)
  'من', 'تو', 'او', 'ما', 'شب', 'دل', 'سر', 'پا',
  'آب', 'گل', 'خب', 'بد', 'کم', 'هی', 'آن', 'وی',
  'برو', 'بیا', 'خوب', 'بله', 'نگو', 'بگو', 'چرا', 'اگر',
  // ۳-۴ حرفی (۲۴ کلمه)
  'هست', 'نیست', 'شده', 'کرد', 'گفت', 'رفت', 'کار', 'خبر',
  'یکی', 'همه', 'چند', 'اون', 'این', 'بود', 'شود', 'کنم',
  'میام', 'میرم', 'دیگه', 'باشه', 'خونه', 'فردا', 'امروز', 'سلام',
];

const SMS_WORD_TO_INDEX = new Map(SMS_WORDS_64.map((w, i) => [w, i]));

function encodeSmsCompact(bytes) {
  const len = bytes.length;
  
  // ساخت رشته بیت‌ها: 16 بیت طول + داده
  let allBits = '';
  allBits += ((len >> 8) & 0xFF).toString(2).padStart(8, '0');
  allBits += (len & 0xFF).toString(2).padStart(8, '0');
  for (const b of bytes) {
    allBits += b.toString(2).padStart(8, '0');
  }
  
  // تبدیل به کلمات (هر 6 بیت = 1 کلمه)
  const words = [];
  for (let i = 0; i < allBits.length; i += 6) {
    const chunk = allBits.slice(i, i + 6).padEnd(6, '0');
    const idx = parseInt(chunk, 2);
    words.push(SMS_WORDS_64[idx]);
  }
  
  return words.join(' ');
}

function decodeSmsCompact(text) {
  // استخراج کلمات
  const inputWords = text.split(/\s+/).filter(w => SMS_WORD_TO_INDEX.has(w));
  
  if (inputWords.length < 3) throw new Error("داده کافی نیست");
  
  // تبدیل به بیت‌ها
  let allBits = '';
  for (const word of inputWords) {
    const idx = SMS_WORD_TO_INDEX.get(word);
    allBits += idx.toString(2).padStart(6, '0');
  }
  
  if (allBits.length < 16) throw new Error("داده ناقص است");
  
  // خواندن طول
  const lenHigh = parseInt(allBits.slice(0, 8), 2);
  const lenLow = parseInt(allBits.slice(8, 16), 2);
  const len = (lenHigh << 8) | lenLow;
  
  const neededBits = 16 + len * 8;
  if (allBits.length < neededBits) throw new Error("داده ناقص است - کلمات کم است");
  
  // استخراج بایت‌ها
  const bytes = [];
  for (let i = 16; i < neededBits; i += 8) {
    bytes.push(parseInt(allBits.slice(i, i + 8), 2));
  }
  
  return new Uint8Array(bytes);
}

function detectSmsCompact(text) {
  const words = text.split(/\s+/);
  let smsWordCount = 0;
  for (const word of words) {
    if (SMS_WORD_TO_INDEX.has(word)) smsWordCount++;
  }
  // اگر بیش از 60% کلمات از لیست SMS باشند
  return smsWordCount >= 3 && (smsWordCount / words.length) > 0.5;
}

// =====================================================
// کدگذاری SMS-Stealth - پنهان‌نگاری در متن فارسی کوتاه
// =====================================================

// متن‌های با تراکم خیلی بالای حروف ک/ی/ه/و (۷۰-۸۰%)
// این متن‌ها طوری طراحی شدن که در ~۶۵ کاراکتر ۴۸+ بیت جا بشه
const STEALTH_TEMPLATES = [
  'کیو کیو کیو کوی کوی هی هی یکی یکی کو', // 37 char, ~28 hg
  'کو کی یکی کوی هی وی کوکو یکی کی هی', // ~35 char, ~26 hg
  'یکی کوکو کی کی یکی کوی هی وی کو', // 31 char, ~24 hg
  'کیکو کیکو هی یکی کوی کوی وی هی', // 30 char, ~24 hg
  'هی کی کو یکی یکی کوی کوی وی هی', // 29 char, ~22 hg
  'کو کو یکی کی کی هی هی وی وی کوی', // 30 char, ~24 hg
  'یکی یکی کوکو هی کی وی کوی کوی', // 28 char, ~22 hg
  'کی کی کو کو یه یه هی هی وی وی یکی', // 31 char, ~24 hg
];

function encodeStealth(bytes) {
  const len = bytes.length;
  
  // ساخت رشته بیت‌ها
  let allBits = '';
  allBits += ((len >> 8) & 0xFF).toString(2).padStart(8, '0');
  allBits += (len & 0xFF).toString(2).padStart(8, '0');
  for (const b of bytes) {
    allBits += b.toString(2).padStart(8, '0');
  }
  
  const homoglyphChars = HOMOGLYPH_PAIRS.map(p => p[0]);
  
  // پیدا کردن template با کافی بودن ظرفیت
  let bestTemplate = null;
  let bestCount = 0;
  
  for (const template of STEALTH_TEMPLATES) {
    let count = 0;
    for (const c of template) {
      if (homoglyphChars.includes(c)) count++;
    }
    if (count >= allBits.length && (bestTemplate === null || template.length < bestTemplate.length)) {
      bestTemplate = template;
      bestCount = count;
    }
  }
  
  // اگر هیچ template کافی نبود، چند تا رو ترکیب کن
  if (!bestTemplate) {
    let combined = '';
    let totalCount = 0;
    for (const template of STEALTH_TEMPLATES) {
      combined += (combined ? ' ' : '') + template;
      for (const c of template) {
        if (homoglyphChars.includes(c)) totalCount++;
      }
      if (totalCount >= allBits.length) break;
    }
    bestTemplate = combined;
    bestCount = totalCount;
  }
  
  if (bestCount < allBits.length) {
    throw new Error("داده خیلی بزرگ است - حداکثر " + Math.floor((bestCount - 16) / 8) + " بایت");
  }
  
  // Encode کردن بیت‌ها در متن
  let result = '';
  let bitIdx = 0;
  
  for (const char of bestTemplate) {
    const pairIdx = homoglyphChars.indexOf(char);
    if (pairIdx !== -1 && bitIdx < allBits.length) {
      const bit = allBits[bitIdx] === '1' ? 1 : 0;
      result += HOMOGLYPH_PAIRS[pairIdx][bit];
      bitIdx++;
    } else {
      result += char;
    }
  }
  
  return result;
}

function decodeStealth(text) {
  const homoglyphChars = HOMOGLYPH_PAIRS.map(p => p[0]);
  
  // خواندن بیت‌ها از همگلیف‌ها
  let allBits = '';
  for (const char of text) {
    for (let i = 0; i < HOMOGLYPH_PAIRS.length; i++) {
      if (char === HOMOGLYPH_PAIRS[i][0]) {
        allBits += '0';
        break;
      } else if (char === HOMOGLYPH_PAIRS[i][1]) {
        allBits += '1';
        break;
      }
    }
  }
  
  if (allBits.length < 16) throw new Error("داده کافی نیست");
  
  // خواندن طول
  const lenHigh = parseInt(allBits.slice(0, 8), 2);
  const lenLow = parseInt(allBits.slice(8, 16), 2);
  const len = (lenHigh << 8) | lenLow;
  
  const neededBits = 16 + len * 8;
  if (allBits.length < neededBits) throw new Error("داده ناقص است");
  
  // استخراج بایت‌ها
  const bytes = [];
  for (let i = 16; i < neededBits; i += 8) {
    bytes.push(parseInt(allBits.slice(i, i + 8), 2));
  }
  
  return new Uint8Array(bytes);
}

function detectStealth(text) {
  // بررسی اینکه متن شامل همگلیف عربی باشد و شبیه template های ما باشد
  let arabicVariants = 0;
  let persianChars = 0;
  
  for (const char of text) {
    if (char === 'ك' || char === 'ي' || char === 'ە' || char === 'ۆ') arabicVariants++;
    if (char === 'ک' || char === 'ی' || char === 'ه' || char === 'و') persianChars++;
  }
  
  const total = arabicVariants + persianChars;
  // اگر تعداد کافی همگلیف داشته باشد و ترکیبی از فارسی و عربی باشد
  return total >= 16 && arabicVariants >= 8 && persianChars >= 4;
}

// =====================================================
// کدگذاری SMS-Mini - کوتاه‌ترین خروجی با Base62
// =====================================================

const BASE62_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// تبدیل bytes به Base62
function bytesToBase62(bytes) {
  // تبدیل به عدد بزرگ با prefix 1 برای حفظ leading zeros
  let num = 1n; // شروع با 1 برای جلوگیری از گم شدن leading zeros
  for (const b of bytes) {
    num = num * 256n + BigInt(b);
  }
  
  let result = '';
  while (num > 0n) {
    result = BASE62_CHARS[Number(num % 62n)] + result;
    num = num / 62n;
  }
  return result;
}

// تبدیل Base62 به bytes
function base62ToBytes(str) {
  let num = 0n;
  for (const c of str) {
    const idx = BASE62_CHARS.indexOf(c);
    if (idx === -1) continue; // skip invalid chars
    num = num * 62n + BigInt(idx);
  }
  
  const bytes = [];
  while (num > 1n) { // تا 1 (نه 0) چون با 1 شروع کردیم
    bytes.unshift(Number(num % 256n));
    num = num / 256n;
  }
  return new Uint8Array(bytes);
}

// Encode با SMS-Mini
function encodeSMSMini(bytes) {
  const len = bytes.length;
  
  // ۲ بایت طول + داده
  const withLen = new Uint8Array(2 + len);
  withLen[0] = (len >> 8) & 0xFF;
  withLen[1] = len & 0xFF;
  withLen.set(bytes, 2);
  
  const code = bytesToBase62(withLen);
  
  // متن‌های پوشش طبیعی با {} جای کد
  const templates = [
    'سلام! ببین {} چیه',
    'این {} رو چک کن',
    'برات فرستادم {} نگاش کن',
    'رمزت {} یادت نره',
    'کد {} رو بگیر',
  ];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return template.replace('{}', code);
}

// Decode با SMS-Mini  
function decodeSMSMini(text) {
  // پیدا کردن کد Base62 - رشته‌ای که فقط از a-z A-Z 0-9 تشکیل شده و حداقل ۵ کاراکتر باشه
  const match = text.match(/\b([a-zA-Z][a-zA-Z0-9]{4,})\b/);
  if (!match) throw new Error("کد SMS-Mini یافت نشد");
  
  const code = match[1];
  const withLen = base62ToBytes(code);
  
  if (withLen.length < 2) throw new Error("داده ناقص است");
  
  const len = (withLen[0] << 8) | withLen[1];
  if (withLen.length < 2 + len) throw new Error("داده ناقص است");
  
  return new Uint8Array(withLen.slice(2, 2 + len));
}

// تشخیص SMS-Mini
function detectSMSMini(text) {
  // بررسی وجود کد Base62 (رشته لاتین ۵+ کاراکتر) در متن فارسی
  const hasLatin = /\b[a-zA-Z][a-zA-Z0-9]{4,}\b/.test(text);
  const hasPersian = /[\u0600-\u06FF]/.test(text);
  return hasLatin && hasPersian;
}

// =====================================================
// کدگذاری همگلیف (Homoglyph) - حروف یکسان با کد متفاوت
// =====================================================

// جفت‌های همگلیف: [حالت 0, حالت 1]
const HOMOGLYPH_PAIRS = [
  ['ک', 'ك'],  // کاف فارسی vs عربی
  ['ی', 'ي'],  // یای فارسی vs عربی
  ['ه', 'ە'],  // هه vs ەی کردی
  ['و', 'ۆ'],  // واو vs واو کردی
];

// تولید متن حامل خودکار با تعداد کافی حروف همگلیف
function generateHomoglyphCarrier(neededBits) {
  // جملات با کلی ک، ی، ه، و
  const sentences = [
    "سلام دوست عزیزم خوبی؟ امروز یک روز خوبی بود و کارها همه خوب پیش میره.",
    "یکی از دوستام زنگ زد و گفت فردا میاد اینجا و میخوایم بریم بیرون.",
    "هوا که عالیه و همه چیز رو به راهه، نگران هیچی نباش عزیزم.",
    "دیروز رفتیم خونه یکی از بچه‌ها و کلی خوش گذشت و خندیدیم.",
    "میخوام یه چیزی بگم که خیلی مهمه و باید حتما بدونی عزیزم.",
    "کارهای امروز همه تموم شد و میخوام برم یه دوری بزنم بیرون.",
    "یه خبر خوب دارم که باید بهت بگم و خیلی خوشحالت میکنه.",
    "همه چیز مثل همیشه خوبه و زندگی داره خوب پیش میره عزیزم.",
    "دیدی چه هوای خوبی شده؟ میخوام برم کوه و یه پیاده‌روی کنم.",
    "یکی از همکارام گفت که یه کار خوب پیدا کرده و میخواد بره.",
    "خیلی وقته که ندیدمت و دلم برات تنگ شده عزیز دلم.",
    "امروز یه اتفاق خوب افتاد که باید بهت بگم و خوشحال میشی.",
    "کارهای خونه رو انجام دادم و حالا میخوام یه استراحتی کنم.",
    "یه فیلم خوب دیدم که خیلی قشنگ بود و توصیه میکنم ببینی.",
    "هفته دیگه میخوام برم سفر و یه تعطیلات خوب داشته باشم.",
    "دوستام همه خوبن و هر روز باهاشون حرف میزنم و میخندیم.",
    "یه کتاب خوب خوندم که خیلی یاد گرفتم ازش و بهت میگم.",
    "کارهای اداره سخت شده ولی همه چیز رو به راهه نگران نباش.",
    "میخوام یه غذای خوشمزه درست کنم و دعوتت کنم بیای اینجا.",
    "همه بچه‌ها سلام میرسونن و میگن کی میای که ببینیمت.",
  ];
  
  let carrier = '';
  let homoglyphCount = 0;
  const homoglyphChars = HOMOGLYPH_PAIRS.map(p => p[0]);
  
  while (homoglyphCount < neededBits) {
    for (const sentence of sentences) {
      carrier += sentence + ' ';
      for (const char of sentence) {
        if (homoglyphChars.includes(char)) homoglyphCount++;
      }
      if (homoglyphCount >= neededBits) break;
    }
  }
  
  return carrier.trim();
}

// متن حامل کوتاه پیش‌فرض
const HOMOGLYPH_CARRIER_SHORT = "سلام دوست عزیزم، امروز یک روز خوبی بود. کارها همه خوب پیش میره. یکی از دوستام زنگ زد و گفت فردا میاد اینجا. هوا هم که عالیه، میخوایم بریم بیرون یه دوری بزنیم. همه چیز رو به راهه، نگران نباش.";

function encodeHomoglyph(bytes, carrier) {
  // تبدیل bytes به رشته بیتی
  let bitString = '';
  const len = bytes.length;
  bitString += ((len >> 8) & 0xFF).toString(2).padStart(8, '0');
  bitString += (len & 0xFF).toString(2).padStart(8, '0');
  for (const b of bytes) {
    bitString += b.toString(2).padStart(8, '0');
  }
  
  // اگر متن حامل داده شده، استفاده کن وگرنه تولید کن
  const carrierText = carrier && carrier.trim() ? carrier : generateHomoglyphCarrier(bitString.length + 50);
  
  const homoglyphChars = HOMOGLYPH_PAIRS.map(p => p[0]);
  let result = '';
  let bitIndex = 0;
  
  for (const char of carrierText) {
    const pairIndex = homoglyphChars.indexOf(char);
    if (pairIndex !== -1 && bitIndex < bitString.length) {
      const bit = bitString[bitIndex] === '1' ? 1 : 0;
      result += HOMOGLYPH_PAIRS[pairIndex][bit];
      bitIndex++;
    } else {
      result += char;
    }
  }
  
  if (bitIndex < bitString.length) {
    throw new Error("متن حامل کوتاه است - نیاز به متن بلندتر دارید");
  }
  
  return result;
}

function decodeHomoglyph(text) {
  let bitString = '';
  
  for (const char of text) {
    for (let i = 0; i < HOMOGLYPH_PAIRS.length; i++) {
      if (char === HOMOGLYPH_PAIRS[i][0]) {
        bitString += '0';
        break;
      } else if (char === HOMOGLYPH_PAIRS[i][1]) {
        bitString += '1';
        break;
      }
    }
  }
  
  if (bitString.length < 16) throw new Error("داده همگلیف یافت نشد");
  
  const lenHigh = parseInt(bitString.slice(0, 8), 2);
  const lenLow = parseInt(bitString.slice(8, 16), 2);
  const len = (lenHigh << 8) | lenLow;
  
  const neededBits = 16 + len * 8;
  if (bitString.length < neededBits) throw new Error("داده ناقص است");
  
  const bytes = [];
  for (let i = 16; i < neededBits; i += 8) {
    bytes.push(parseInt(bitString.slice(i, i + 8), 2));
  }
  
  return new Uint8Array(bytes);
}

// =====================================================
// کدگذاری همگلیف + ایموجی (ترکیبی) - بهترین برای SMS
// =====================================================

// گروه‌های ایموجی برای رمزگذاری - ایموجی‌های ساده بدون variation selector
const EMOJI_ENCODE_GROUPS = [
  ['😊', '🙂', '😃', '😄'],  // 2 bits - سلام/خوشحال
  ['💙', '💚', '💛', '💜'],   // 2 bits - قلب
  ['👍', '👌', '🤝', '🤞'],   // 2 bits - تأیید
  ['🌸', '🌺', '🌹', '🌷'],   // 2 bits - گل
];

// تولید متن حامل برای همگلیف+ایموجی
function generateHomoglyphEmojiCarrier(neededBits) {
  const templates = [
    "سلام خوبی؟ دیروز یکی از دوستام زنگ زد و گفت که یه خبر خوب داره گفت فردا میاد پیشم و میخوایم بریم بیرون یه دوری بزنیم خیلی خوشحالم که میبینمش و کلی حرف داریم",
    "هوا امروز خیلی خوبه میخوام برم بیرون و یه پیاده‌روی کنم توی پارک کاری نداری که انجام بدم؟ بگو تا برات انجام بدم عزیزم",
    "دیدی چه خبر شد؟ یکی از بچه‌ها کارش درست شد و خیلی خوشحاله همه خوشحالیم براش همه چیز عالیه و زندگی خوب پیش میره",
    "سلام عزیزم همه چی خوبه و کارها داره پیش میره منتظرتم که بیای زود بیا که دلم خیلی تنگ شده برات عزیزم",
    "یه چیزی میخوام بگم که خیلی مهمه دیروز یکی از دوستام زنگ زد و گفت که یه کار خوب پیدا کرده خیلی خوشحالم براش امیدوارم همه چیز خوب پیش بره",
    "امروز یه روز خوبی بود و کارهام همه درست شد میخوام یه استراحتی کنم هوا هم که عالیه شاید برم بیرون یه دوری بزنم",
    "دیروز رفتیم خونه یکی از دوستام و کلی خوش گذشت و خندیدیم همه چیز خوب بود و یه غذای خوشمزه درست کرده بود",
    "کارهای امروز همه تموم شد و حالا میتونم یه کم استراحت کنم هوای بیرون هم که عالیه میخوام برم پارک",
    "یه خبر خوب دارم که باید بهت بگم و خیلی خوشحالت میکنه منتظرم که بیای تا بهت بگم چی شده عزیزم",
    "همه چیز مثل همیشه خوبه و زندگی داره خوب پیش میره هر روز بهتر از دیروز میشه و خوشحالم از این بابت",
    "دیدی چه هوای خوبی شده؟ میخوام برم کوه و یه پیاده‌روی خوب داشته باشم هوا خنکه و آفتاب قشنگ میتابه",
    "یکی از همکارام گفت که یه کار خوب پیدا کرده و میخواد بره خیلی براش خوشحالم و امیدوارم موفق بشه",
    "خیلی وقته که ندیدمت و دلم برات تنگ شده عزیز دلم کی میای که ببینمت و کلی حرف بزنیم",
    "امروز یه اتفاق خوب افتاد که باید بهت بگم و خوشحال میشی یکی از دوستام زنگ زد و خبر داد",
    "کارهای خونه رو انجام دادم و حالا میخوام یه استراحتی کنم همه چیز رو به راهه نگران نباش عزیزم",
    "یه فیلم خوب دیدم که خیلی قشنگ بود و توصیه میکنم ببینی داستانش خیلی جالب بود و بازیگراش عالی بودن",
    "هفته دیگه میخوام برم سفر و یه تعطیلات خوب داشته باشم کلی برنامه دارم و میخوام خوش بگذرونم",
    "دوستام همه خوبن و هر روز باهاشون حرف میزنم و میخندیم زندگی خوبه و همه چیز عالی پیش میره",
    "یه کتاب خوب خوندم که خیلی یاد گرفتم ازش و بهت میگم خیلی جالب بود و توصیه میکنم بخونیش",
    "کارهای اداره سخت شده ولی همه چیز رو به راهه نگران نباش همکارام خیلی خوبن و کمکم میکنن",
    "میخوام یه غذای خوشمزه درست کنم و دعوتت کنم بیای اینجا کی میای که منتظرتم عزیزم؟",
    "همه بچه‌ها سلام میرسونن و میگن کی میای که ببینیمت دلمون برات تنگ شده و منتظریم بیای",
    "امروز هوا خیلی خوبه و میخوام برم بیرون یه دوری بزنم کاری نداری که انجام بدم؟ بگو عزیزم",
    "یکی از دوستام داره میاد اینجا و میخوایم بریم بیرون یه غذا بخوریم و کلی حرف بزنیم",
  ];
  
  const homoglyphChars = HOMOGLYPH_PAIRS.map(p => p[0]);
  let carrier = '';
  let currentCount = 0;
  let templateIdx = 0;
  
  // ادامه تا وقتی که به تعداد کافی برسیم
  while (currentCount < neededBits) {
    const template = templates[templateIdx % templates.length];
    carrier += (carrier ? ' ' : '') + template;
    for (const char of template) {
      if (homoglyphChars.includes(char)) currentCount++;
    }
    templateIdx++;
  }
  
  return carrier;
}

const HOMOGLYPH_EMOJI_CARRIERS = [
  "سلام خوبی؟ {e0} دیروز یکی از دوستام زنگ زد {e1} گفت فردا میاد پیشم {e2} خیلی خوشحالم که میبینمش",
];

function encodeHomoglyphEmoji(bytes, carrierIndex) {
  const len = bytes.length;
  
  let allBits = '';
  allBits += ((len >> 8) & 0xFF).toString(2).padStart(8, '0');
  allBits += (len & 0xFF).toString(2).padStart(8, '0');
  for (const b of bytes) {
    allBits += b.toString(2).padStart(8, '0');
  }
  
  let bitIndex = 0;
  
  const emojis = [];
  for (let i = 0; i < 3 && bitIndex + 2 <= allBits.length; i++) {
    const bits = parseInt(allBits.slice(bitIndex, bitIndex + 2), 2);
    emojis.push(EMOJI_ENCODE_GROUPS[i][bits]);
    bitIndex += 2;
  }
  
  // تولید متن حامل با طول کافی
  const remainingBits = allBits.length - bitIndex;
  let carrier = generateHomoglyphEmojiCarrier(remainingBits + 100);
  
  // اضافه کردن ایموجی‌ها به ابتدای متن برای اطمینان از نمایش
  const emojiPrefix = emojis.join(' ') + ' ';
  carrier = emojiPrefix + carrier;
  
  if (bitIndex < allBits.length) {
    const bitsToEncode = allBits.slice(bitIndex);
    const homoglyphChars = HOMOGLYPH_PAIRS.map(p => p[0]);
    let resultCarrier = '';
    let rBitIdx = 0;
    
    for (const char of carrier) {
      const pairIndex = homoglyphChars.indexOf(char);
      if (pairIndex !== -1 && rBitIdx < bitsToEncode.length) {
        const bit = bitsToEncode[rBitIdx] === '1' ? 1 : 0;
        resultCarrier += HOMOGLYPH_PAIRS[pairIndex][bit];
        rBitIdx++;
      } else {
        resultCarrier += char;
      }
    }
    
    if (rBitIdx < bitsToEncode.length) {
      throw new Error("متن حامل برای این داده کوتاه است - داده خیلی بزرگ است");
    }
    
    return resultCarrier;
  }
  
  return carrier;
}

function decodeHomoglyphEmoji(text) {
  let allBits = '';
  
  // خواندن ایموجی‌ها - فقط 3 گروه اول (6 بیت)
  for (let g = 0; g < 3; g++) {
    let foundEmoji = false;
    for (let idx = 0; idx < EMOJI_ENCODE_GROUPS[g].length; idx++) {
      const emoji = EMOJI_ENCODE_GROUPS[g][idx];
      if (text.includes(emoji)) {
        allBits += idx.toString(2).padStart(2, '0');
        foundEmoji = true;
        break;
      }
    }
    // اگر ایموجی پیدا نشد، فرض کن 00
    if (!foundEmoji) {
      allBits += '00';
    }
  }
  
  // خواندن همگلیف‌ها
  for (const char of text) {
    for (let i = 0; i < HOMOGLYPH_PAIRS.length; i++) {
      if (char === HOMOGLYPH_PAIRS[i][0]) {
        allBits += '0';
        break;
      } else if (char === HOMOGLYPH_PAIRS[i][1]) {
        allBits += '1';
        break;
      }
    }
  }
  
  if (allBits.length < 16) throw new Error("داده ترکیبی یافت نشد");
  
  const lenHigh = parseInt(allBits.slice(0, 8), 2);
  const lenLow = parseInt(allBits.slice(8, 16), 2);
  const len = (lenHigh << 8) | lenLow;
  
  const neededBits = 16 + len * 8;
  if (allBits.length < neededBits) throw new Error("داده ناقص است");
  
  const bytes = [];
  for (let i = 16; i < neededBits; i += 8) {
    bytes.push(parseInt(allBits.slice(i, i + 8), 2));
  }
  
  return new Uint8Array(bytes);
}

// =====================================================
// کدگذاری فینگلیش (Finglish) - تنوع نوشتاری
// =====================================================

const FINGLISH_WORDS = [
  { variants: ['salam', 'salaam', 'slm', 'sallam'], meaning: 'سلام' },
  { variants: ['khoob', 'khub', 'khoub', 'khob'], meaning: 'خوب' },
  { variants: ['chetori', 'chetory', 'chetoori', 'chetowri'], meaning: 'چطوری' },
  { variants: ['mersi', 'merci', 'mamnoon', 'mamnun'], meaning: 'ممنون' },
  { variants: ['hasti', 'hasty', 'hesti', 'hesty'], meaning: 'هستی' },
  { variants: ['mikham', 'mikhaam', 'mikhwam', 'mikhaham'], meaning: 'میخوام' },
  { variants: ['miram', 'mirm', 'meerom', 'miraam'], meaning: 'میرم' },
  { variants: ['beram', 'bram', 'berim', 'brim'], meaning: 'برم' },
  { variants: ['koja', 'kja', 'kuja', 'kojaa'], meaning: 'کجا' },
  { variants: ['alan', 'alaan', 'hala', 'halaa'], meaning: 'الان' },
  { variants: ['farda', 'fardaa', 'frd', 'frda'], meaning: 'فردا' },
  { variants: ['dirooz', 'dirouz', 'diruz', 'diroz'], meaning: 'دیروز' },
  { variants: ['emrooz', 'emruz', 'imruz', 'emroz'], meaning: 'امروز' },
  { variants: ['shab', 'shb', 'shob', 'shub'], meaning: 'شب' },
  { variants: ['sobh', 'sobeh', 'sob', 'subh'], meaning: 'صبح' },
  { variants: ['doost', 'dust', 'dost', 'doust'], meaning: 'دوست' },
  { variants: ['khabar', 'khabr', 'xabar', 'khabari'], meaning: 'خبر' },
  { variants: ['bache', 'bacheh', 'bche', 'baache'], meaning: 'بچه' },
  { variants: ['maman', 'mamaan', 'madar', 'maadar'], meaning: 'مامان' },
  { variants: ['baba', 'babaa', 'pedar', 'pedaar'], meaning: 'بابا' },
  { variants: ['khone', 'khune', 'khoone', 'khooneh'], meaning: 'خونه' },
  { variants: ['mashine', 'mashin', 'machine', 'machin'], meaning: 'ماشین' },
  { variants: ['telefon', 'telefn', 'telifon', 'phone'], meaning: 'تلفن' },
  { variants: ['kar', 'kaar', 'kr', 'karr'], meaning: 'کار' },
  { variants: ['pool', 'pul', 'poul', 'poool'], meaning: 'پول' },
  { variants: ['ghaza', 'ghazaa', 'qaza', 'qazaa'], meaning: 'غذا' },
  { variants: ['chai', 'chaay', 'chay', 'chaaee'], meaning: 'چای' },
  { variants: ['ab', 'aab', 'aabe', 'abe'], meaning: 'آب' },
  { variants: ['havaa', 'hava', 'hva', 'hawaa'], meaning: 'هوا' },
  { variants: ['ruz', 'rooz', 'roz', 'rouz'], meaning: 'روز' },
  { variants: ['age', 'agar', 'ageh', 'agr'], meaning: 'اگه' },
  { variants: ['vali', 'valy', 'wali', 'ammaa'], meaning: 'ولی' },
  // کلمات اضافه برای ظرفیت بیشتر
  { variants: ['aslan', 'aslaan', 'asln', 'aslan'], meaning: 'اصلا' },
  { variants: ['hatman', 'hatmann', 'hatmn', 'htman'], meaning: 'حتما' },
  { variants: ['fekr', 'fikr', 'fkr', 'feekr'], meaning: 'فکر' },
  { variants: ['eshgh', 'eshq', 'ishgh', 'ishq'], meaning: 'عشق' },
  { variants: ['delam', 'dilam', 'delm', 'dilm'], meaning: 'دلم' },
  { variants: ['yadet', 'yaadet', 'yaadt', 'yadt'], meaning: 'یادت' },
  { variants: ['miduni', 'miduny', 'midooni', 'midoony'], meaning: 'میدونی' },
  { variants: ['nemidun', 'nmidon', 'nemidoon', 'nemidunam'], meaning: 'نمیدونم' },
  { variants: ['bebin', 'bebeen', 'bebn', 'bbeen'], meaning: 'ببین' },
  { variants: ['begoo', 'begu', 'begou', 'bgo'], meaning: 'بگو' },
  { variants: ['biyaa', 'biya', 'bia', 'biaa'], meaning: 'بیا' },
  { variants: ['boro', 'bro', 'berow', 'brow'], meaning: 'برو' },
  { variants: ['bashe', 'baashe', 'bshe', 'basheh'], meaning: 'باشه' },
  { variants: ['nist', 'neest', 'nst', 'niist'], meaning: 'نیست' },
  { variants: ['hast', 'haast', 'hst', 'hasst'], meaning: 'هست' },
  { variants: ['dare', 'daareh', 'dareh', 'dre'], meaning: 'داره' },
  { variants: ['nadare', 'nadareh', 'ndareh', 'nadre'], meaning: 'نداره' },
  { variants: ['rafti', 'rafty', 'rfti', 'raftii'], meaning: 'رفتی' },
  { variants: ['omadi', 'oomadi', 'omdy', 'oomdy'], meaning: 'اومدی' },
  { variants: ['didi', 'didii', 'ddy', 'didee'], meaning: 'دیدی' },
  { variants: ['gofti', 'gofty', 'gfti', 'goftii'], meaning: 'گفتی' },
  { variants: ['shenidi', 'shenidy', 'shnidi', 'shnidy'], meaning: 'شنیدی' },
  { variants: ['kardi', 'kardy', 'krdi', 'kardii'], meaning: 'کردی' },
  { variants: ['khasti', 'khasty', 'xasti', 'khastii'], meaning: 'خسته‌ای' },
  { variants: ['gorosne', 'gorosneh', 'gorosna', 'grosne'], meaning: 'گرسنه' },
  { variants: ['teshne', 'teshneh', 'tshne', 'teshnaa'], meaning: 'تشنه' },
  { variants: ['khosh', 'xosh', 'khsh', 'khossh'], meaning: 'خوش' },
  { variants: ['narahat', 'narahaat', 'nrahat', 'nrahaat'], meaning: 'ناراحت' },
  { variants: ['asabi', 'asabii', 'asaby', 'asabani'], meaning: 'عصبانی' },
  { variants: ['inja', 'injaa', 'enja', 'eenja'], meaning: 'اینجا' },
  { variants: ['onja', 'ounjaa', 'oonja', 'unja'], meaning: 'اونجا' },
  { variants: ['chikar', 'chikaar', 'chkar', 'chekar'], meaning: 'چیکار' },
  { variants: ['baraye', 'baraaye', 'baraye', 'baray'], meaning: 'برای' },
  { variants: ['haminja', 'haminjaa', 'hminja', 'haminj'], meaning: 'همینجا' },
  { variants: ['onam', 'oonam', 'unam', 'ounam'], meaning: 'اونم' },
  { variants: ['inam', 'eenam', 'inm', 'iinam'], meaning: 'اینم' },
  { variants: ['faghat', 'faqat', 'fghat', 'faqt'], meaning: 'فقط' },
  { variants: ['hamishe', 'hamisheh', 'hmshe', 'hamisha'], meaning: 'همیشه' },
  { variants: ['hichvaght', 'hichvaqt', 'hchvght', 'hichvaqht'], meaning: 'هیچوقت' },
  { variants: ['shayad', 'shaayad', 'shyd', 'shaiad'], meaning: 'شاید' },
  { variants: ['albate', 'albatte', 'albte', 'albateh'], meaning: 'البته' },
  { variants: ['ehtemalan', 'ehtemaaln', 'ehtmalan', 'ihtmalan'], meaning: 'احتمالا' },
  { variants: ['ziad', 'ziyad', 'zyd', 'ziaad'], meaning: 'زیاد' },
  { variants: ['kam', 'kamm', 'km', 'kaam'], meaning: 'کم' },
  { variants: ['kheili', 'kheyli', 'khyli', 'khili'], meaning: 'خیلی' },
  { variants: ['yekam', 'yekaam', 'yekm', 'ykam'], meaning: 'یکم' },
  { variants: ['tamum', 'tamoom', 'tmum', 'tamoum'], meaning: 'تموم' },
  { variants: ['shoru', 'shoroo', 'shro', 'shorou'], meaning: 'شروع' },
  { variants: ['akhar', 'aakhar', 'akhr', 'aakhaar'], meaning: 'آخر' },
  { variants: ['aval', 'avval', 'awwal', 'awall'], meaning: 'اول' },
  { variants: ['baad', 'bad', 'baade', 'baaden'], meaning: 'بعد' },
  { variants: ['ghabl', 'qabl', 'ghbl', 'qbl'], meaning: 'قبل' },
  { variants: ['alan', 'aalaan', 'aln', 'alaan'], meaning: 'الان' },
  { variants: ['baadan', 'baadaan', 'baadn', 'badn'], meaning: 'بعدا' },
  { variants: ['digar', 'digeh', 'dige', 'digaar'], meaning: 'دیگه' },
  { variants: ['behtare', 'behtareh', 'bhtare', 'behtar'], meaning: 'بهتره' },
  { variants: ['badtare', 'badtareh', 'bdtare', 'badtar'], meaning: 'بدتره' },
  { variants: ['mitooni', 'mitoony', 'mitouni', 'mituni'], meaning: 'میتونی' },
  { variants: ['nemitooni', 'nemitoony', 'nmitooni', 'nmituni'], meaning: 'نمیتونی' },
  { variants: ['bayad', 'baayad', 'byd', 'baiad'], meaning: 'باید' },
  { variants: ['nabayad', 'nabaayad', 'nbyd', 'nabaiad'], meaning: 'نباید' },
  { variants: ['mikham', 'mikhaam', 'mkhm', 'mikhm'], meaning: 'میخوام' },
  { variants: ['nemikham', 'nemikhaam', 'nmkhm', 'nmikhaam'], meaning: 'نمیخوام' },
  { variants: ['mishe', 'misheh', 'mshe', 'mishah'], meaning: 'میشه' },
  { variants: ['nemishe', 'nemisheh', 'nmshe', 'nmishah'], meaning: 'نمیشه' },
  { variants: ['cheghad', 'cheqad', 'chghd', 'cheqadr'], meaning: 'چقدر' },
  { variants: ['chand', 'chnd', 'chaand', 'channd'], meaning: 'چند' },
  { variants: ['kodum', 'kodoom', 'kodom', 'kudum'], meaning: 'کدوم' },
  { variants: ['kasi', 'kasy', 'ksi', 'kasii'], meaning: 'کسی' },
  { variants: ['hichi', 'hichy', 'hchi', 'hichii'], meaning: 'هیچی' },
  { variants: ['hame', 'hameh', 'hme', 'hamme'], meaning: 'همه' },
  { variants: ['harchi', 'harchii', 'hrchi', 'harci'], meaning: 'هرچی' },
  { variants: ['mage', 'mageh', 'mge', 'magge'], meaning: 'مگه' },
  { variants: ['pas', 'pss', 'paas', 'pass'], meaning: 'پس' },
  { variants: ['chon', 'choon', 'chun', 'choun'], meaning: 'چون' },
  { variants: ['ta', 'taa', 'ttta', 'taaa'], meaning: 'تا' },
  { variants: ['ke', 'keh', 'kkeh', 'keeh'], meaning: 'که' },
  { variants: ['ba', 'baa', 'baaa', 'bba'], meaning: 'با' },
  { variants: ['be', 'beh', 'beeh', 'bbe'], meaning: 'به' },
  { variants: ['az', 'azz', 'aaz', 'azze'], meaning: 'از' },
  { variants: ['dar', 'darr', 'daar', 'drar'], meaning: 'در' },
  { variants: ['oon', 'un', 'uun', 'oun'], meaning: 'اون' },
  { variants: ['in', 'een', 'iin', 'iiun'], meaning: 'این' },
  { variants: ['ye', 'yek', 'yeh', 'yak'], meaning: 'یه' },
  { variants: ['do', 'dow', 'doo', 'dou'], meaning: 'دو' },
  { variants: ['se', 'seh', 'see', 'seeh'], meaning: 'سه' },
  { variants: ['chahar', 'chaar', 'char', 'chahaar'], meaning: 'چهار' },
  { variants: ['panj', 'pnj', 'panjj', 'paanj'], meaning: 'پنج' },
  { variants: ['shish', 'shsh', 'sheesh', 'shesh'], meaning: 'شش' },
  { variants: ['haft', 'hft', 'hafft', 'haaft'], meaning: 'هفت' },
  { variants: ['hasht', 'hsht', 'hashht', 'haasht'], meaning: 'هشت' },
  { variants: ['noh', 'nuh', 'nooh', 'no'], meaning: 'نه' },
  { variants: ['dah', 'dahh', 'daah', 'da'], meaning: 'ده' },
  { variants: ['sad', 'saad', 'sadd', 'sd'], meaning: 'صد' },
  { variants: ['hezar', 'hezaar', 'hzar', 'hezr'], meaning: 'هزار' },
  { variants: ['milion', 'milioon', 'milyon', 'meelion'], meaning: 'میلیون' },
  { variants: ['saat', 'saaet', 'sat', 'saaaat'], meaning: 'ساعت' },
  { variants: ['daghighe', 'daqiqe', 'daghiqe', 'dghighe'], meaning: 'دقیقه' },
  { variants: ['sanie', 'saniye', 'sanyeh', 'saniyeh'], meaning: 'ثانیه' },
  { variants: ['hafte', 'hafteh', 'haafteh', 'hfte'], meaning: 'هفته' },
  { variants: ['maah', 'mah', 'mahh', 'maaah'], meaning: 'ماه' },
  { variants: ['saal', 'sal', 'saall', 'saaal'], meaning: 'سال' },
  { variants: ['shanbe', 'shanbeh', 'shambe', 'shanbee'], meaning: 'شنبه' },
  { variants: ['jome', 'jomee', 'jomeh', 'jomme'], meaning: 'جمعه' },
  { variants: ['sobhane', 'sobhaane', 'sbhane', 'sobhne'], meaning: 'صبحانه' },
  { variants: ['nahar', 'nahaar', 'nahr', 'nahhar'], meaning: 'ناهار' },
  { variants: ['sham', 'shaam', 'shamm', 'shm'], meaning: 'شام' },
  { variants: ['nan', 'naan', 'noon', 'nuun'], meaning: 'نان' },
  { variants: ['goosht', 'gusht', 'gosht', 'gousht'], meaning: 'گوشت' },
  { variants: ['morgh', 'murgh', 'mrgh', 'morq'], meaning: 'مرغ' },
  { variants: ['mahi', 'mahii', 'mahee', 'mahy'], meaning: 'ماهی' },
  { variants: ['berenj', 'branj', 'berenj', 'berenjj'], meaning: 'برنج' },
  { variants: ['sabzi', 'sabzy', 'sabzii', 'sbzi'], meaning: 'سبزی' },
  { variants: ['mive', 'miveh', 'meeveh', 'mivee'], meaning: 'میوه' },
  { variants: ['shir', 'sheer', 'shir', 'shiir'], meaning: 'شیر' },
  { variants: ['panir', 'paneer', 'pnir', 'paniir'], meaning: 'پنیر' },
  { variants: ['tokhmmorgh', 'tokhmemorgh', 'tokhm', 'tokhmorgh'], meaning: 'تخم‌مرغ' },
  { variants: ['namak', 'nmaak', 'nmak', 'namakk'], meaning: 'نمک' },
  { variants: ['felfel', 'flfl', 'felfl', 'felfell'], meaning: 'فلفل' },
  { variants: ['roghan', 'rowqan', 'roqan', 'roghaan'], meaning: 'روغن' },
  { variants: ['ghand', 'qand', 'ghnd', 'qhand'], meaning: 'قند' },
  { variants: ['shekar', 'shekr', 'shekaar', 'shkar'], meaning: 'شکر' },
  { variants: ['asal', 'asl', 'asaal', 'asall'], meaning: 'عسل' },
];

// ظرفیت فینگلیش: تعداد کلمات × 2 بیت / 8 = بایت
const FINGLISH_CAPACITY = Math.floor(FINGLISH_WORDS.length * 2 / 8);

const FINGLISH_TEMPLATES = [
  "{0}! {1} {2}? {3} {4}.",
  "{0}, {1}. {2} {3} {4}?",
  "{0} {1}, {2} {3}. {4}!",
  "{0}! {1} {2} {3} {4}.",
];

function encodeFinglish(bytes) {
  const len = bytes.length;
  
  let allBits = '';
  allBits += ((len >> 8) & 0xFF).toString(2).padStart(8, '0');
  allBits += (len & 0xFF).toString(2).padStart(8, '0');
  for (const b of bytes) {
    allBits += b.toString(2).padStart(8, '0');
  }
  
  const words = [];
  let bitIndex = 0;
  let wordIndex = 0;
  
  while (bitIndex < allBits.length && wordIndex < FINGLISH_WORDS.length) {
    const bitsNeeded = 2;
    if (bitIndex + bitsNeeded > allBits.length) break;
    
    const bits = parseInt(allBits.slice(bitIndex, bitIndex + bitsNeeded), 2);
    words.push(FINGLISH_WORDS[wordIndex].variants[bits]);
    
    bitIndex += bitsNeeded;
    wordIndex++;
  }
  
  if (bitIndex < allBits.length) {
    const maxBytes = Math.floor(FINGLISH_WORDS.length * 2 / 8);
    throw new Error("فینگلیش فقط برای پیام‌های کوتاه مناسب است (حداکثر " + maxBytes + " بایت). برای لینک‌های بلند از روش همگلیف یا ZWC استفاده کنید.");
  }
  
  const template = FINGLISH_TEMPLATES[Math.floor(Math.random() * FINGLISH_TEMPLATES.length)];
  let result = template;
  for (let i = 0; i < 5 && i < words.length; i++) {
    result = result.replace(`{${i}}`, words[i]);
  }
  
  if (words.length > 5) {
    result += ' ' + words.slice(5).join(' ');
  }
  
  for (let i = 0; i < 5; i++) {
    result = result.replace(`{${i}}`, '');
  }
  
  return result.replace(/\s+/g, ' ').trim();
}

function decodeFinglish(text) {
  const inputWords = text.toLowerCase().replace(/[!?,\.]/g, ' ').split(/\s+/).filter(w => w.length > 0);
  
  let allBits = '';
  
  for (const word of inputWords) {
    for (let i = 0; i < FINGLISH_WORDS.length; i++) {
      const variantIndex = FINGLISH_WORDS[i].variants.findIndex(v => v.toLowerCase() === word);
      if (variantIndex !== -1) {
        allBits += variantIndex.toString(2).padStart(2, '0');
        break;
      }
    }
  }
  
  if (allBits.length < 16) throw new Error("داده فینگلیش یافت نشد");
  
  const lenHigh = parseInt(allBits.slice(0, 8), 2);
  const lenLow = parseInt(allBits.slice(8, 16), 2);
  const len = (lenHigh << 8) | lenLow;
  
  const neededBits = 16 + len * 8;
  if (allBits.length < neededBits) throw new Error("داده ناقص است - کلمات بیشتری لازم است");
  
  const bytes = [];
  for (let i = 16; i < neededBits; i += 8) {
    bytes.push(parseInt(allBits.slice(i, i + 8), 2));
  }
  
  return new Uint8Array(bytes);
}

// توابع تشخیص روش‌های جدید
function detectFinglish(text) {
  const words = text.toLowerCase().replace(/[!?,\.]/g, ' ').split(/\s+/).filter(w => w.length > 0);
  if (words.length < 3) return false;
  
  let matched = 0;
  for (const word of words) {
    for (const fw of FINGLISH_WORDS) {
      if (fw.variants.some(v => v.toLowerCase() === word)) {
        matched++;
        break;
      }
    }
  }
  
  return matched / words.length > 0.5;
}

function detectHomoglyph(text) {
  // فقط همگلیف خالص: باید همگلیف عربی داشته باشد ولی ایموجی از گروه‌های ما نداشته باشد
  let hasArabicVariant = false;
  for (const pair of HOMOGLYPH_PAIRS) {
    if (text.includes(pair[1])) {
      hasArabicVariant = true;
      break;
    }
  }
  
  if (!hasArabicVariant) return false;
  
  // اگر ایموجی از گروه‌های ما دارد، همگلیف خالص نیست
  for (const group of EMOJI_ENCODE_GROUPS) {
    for (const emoji of group) {
      if (text.includes(emoji)) {
        return false; // این همگلیف+ایموجی است نه همگلیف خالص
      }
    }
  }
  
  return true;
}

function detectHomoglyphEmoji(text) {
  // بررسی وجود ایموجی از گروه‌های تعریف شده
  let hasOurEmoji = false;
  
  for (const group of EMOJI_ENCODE_GROUPS) {
    for (const emoji of group) {
      if (text.includes(emoji)) {
        hasOurEmoji = true;
        break;
      }
    }
    if (hasOurEmoji) break;
  }
  
  // باید حداقل یک ایموجی از گروه‌های ما داشته باشد
  if (!hasOurEmoji) return false;
  
  // بررسی حروف فارسی/عربی
  const hasPersian = /[\u0600-\u06FF]/.test(text);
  if (!hasPersian) return false;
  
  // بررسی وجود همگلیف‌های جایگزین شده (عربی)
  let hasArabicVariant = false;
  for (const pair of HOMOGLYPH_PAIRS) {
    if (text.includes(pair[1])) {
      hasArabicVariant = true;
      break;
    }
  }
  
  return hasArabicVariant;
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
  // اولویت 0: بررسی SMS-Mini (کد e62. مشخص)
  if (detectSMSMini(text)) {
    return 'sms-mini';
  }
  
  // اولویت 1: بررسی SMS فشرده (کلمات کوتاه خاص)
  if (detectSmsCompact(text)) {
    return 'sms-compact';
  }
  
  // اولویت 2: بررسی SMS-Stealth (همگلیف عربی در متن فارسی کوتاه)
  if (detectStealth(text)) {
    return 'sms-stealth';
  }
  
  // اولویت 3: بررسی همگلیف+ایموجی (ایموجی از گروه‌های ما + همگلیف عربی)
  // این باید اول باشد چون خیلی مشخص است
  if (detectHomoglyphEmoji(text)) {
    return 'homoglyph-emoji';
  }
  
  // اولویت 4: بررسی ZWC (کاراکترهای نامرئی)
  // باید تعداد زیادی ZWC داشته باشد (نه فقط نیم‌فاصله‌های عادی)
  // نیم‌فاصله (200C) در فارسی رایج است، پس باید چک کنیم ZWC واقعی داریم
  let zwcCount = 0;
  const zwcOnlyChars = ['\u200B', '\u200D', '\uFEFF']; // بدون نیم‌فاصله
  for (const char of text) {
    if (zwcOnlyChars.includes(char)) zwcCount++;
  }
  // یا تعداد زیادی 200C (نیم‌فاصله) داشته باشد که نشان‌دهنده encoding باشد
  const ninjCount = (text.match(/\u200C/g) || []).length;
  const textLength = text.replace(/\s/g, '').length;
  
  // اگر ZWC واقعی داریم یا نسبت نیم‌فاصله به متن بالاست
  if (zwcCount > 5 || (ninjCount > 10 && ninjCount / textLength > 0.1)) {
    return 'zwc';
  }
  
  // اولویت 3: بررسی فینگلیش (اگر بیشتر متن لاتین باشد)
  const latinChars = text.match(/[a-zA-Z]/g) || [];
  const persianChars = text.match(/[\u0600-\u06FF]/g) || [];
  
  if (latinChars.length > persianChars.length && detectFinglish(text)) {
    return 'finglish';
  }
  
  // اولویت 4: بررسی همگلیف خالص (همگلیف عربی بدون ایموجی از گروه‌های ما)
  if (detectHomoglyph(text)) {
    return 'homoglyph';
  }
  
  // اولویت 5: بررسی Legacy (کلمات + ایموجی)
  if (detectLegacy(text)) {
    return 'legacy';
  }
  
  // اولویت 6: بررسی جمله‌ای
  const words = text.split(/[\s،,.!?؟:;]+/).filter(w => w.length > 0);
  let sentenceCount = 0;
  for (const word of words) {
    if (word in WORD_TO_BYTE) sentenceCount++;
  }
  
  if (words.length > 0 && sentenceCount / words.length > 0.3) {
    return 'sentence';
  }
  
  // اولویت 7: بررسی فارسی‌ساز
  const persianMapChars = Object.values(PERSIAN_MAP);
  let persianCount = 0;
  let totalChars = 0;
  
  for (const char of text) {
    if (char !== ' ' && char !== '\n') {
      totalChars++;
      if (persianMapChars.includes(char) || char === CAPITAL_MARKER) {
        persianCount++;
      }
    }
  }
  
  if (totalChars > 0 && persianCount / totalChars > 0.7) {
    return 'persian';
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
      
    } else if (encodingMethod === 'homoglyph') {
      const bytes = await packData(text, pass, encStrength);
      // برای همگلیف، فقط از متن کاربر استفاده کن اگر خودش چیزی نوشته باشد
      const userCarrier = $("carrierText").value.trim();
      output = encodeHomoglyph(bytes, userCarrier);
      
    } else if (encodingMethod === 'homoglyph-emoji') {
      const bytes = await packData(text, pass, encStrength);
      output = encodeHomoglyphEmoji(bytes);
      
    } else if (encodingMethod === 'sms-compact') {
      const bytes = await packData(text, pass, encStrength);
      output = encodeSmsCompact(bytes);
      
    } else if (encodingMethod === 'sms-mini') {
      const bytes = await packData(text, pass, encStrength);
      output = encodeSMSMini(bytes);
      
    } else if (encodingMethod === 'sms-stealth') {
      const bytes = await packData(text, pass, encStrength);
      output = encodeStealth(bytes);
      
    } else if (encodingMethod === 'finglish') {
      const bytes = await packData(text, pass, encStrength);
      output = encodeFinglish(bytes);
      
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
    } else if (encodingMethod === 'homoglyph') {
      statusMsg += " — همگلیف";
    } else if (encodingMethod === 'homoglyph-emoji') {
      statusMsg += " — همگلیف+ایموجی";
    } else if (encodingMethod === 'sms-compact') {
      statusMsg += " — SMS فشرده";
    } else if (encodingMethod === 'sms-mini') {
      statusMsg += " — SMS مینی";
    } else if (encodingMethod === 'sms-stealth') {
      statusMsg += " — SMS پنهان";
    } else if (encodingMethod === 'finglish') {
      statusMsg += " — فینگلیش";
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
      
    } else if (method === 'homoglyph') {
      const bytes = decodeHomoglyph(coded);
      output = await unpackData(bytes, pass);
      
    } else if (method === 'homoglyph-emoji') {
      const bytes = decodeHomoglyphEmoji(coded);
      output = await unpackData(bytes, pass);
      
    } else if (method === 'sms-compact') {
      const bytes = decodeSmsCompact(coded);
      output = await unpackData(bytes, pass);
      
    } else if (method === 'sms-mini') {
      const bytes = decodeSMSMini(coded);
      output = await unpackData(bytes, pass);
      
    } else if (method === 'sms-stealth') {
      const bytes = decodeStealth(coded);
      output = await unpackData(bytes, pass);
      
    } else if (method === 'finglish') {
      const bytes = decodeFinglish(coded);
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
    else if (method === 'homoglyph') statusMsg += " (همگلیف)";
    else if (method === 'homoglyph-emoji') statusMsg += " (همگلیف+ایموجی)";
    else if (method === 'sms-compact') statusMsg += " (SMS فشرده)";
    else if (method === 'sms-mini') statusMsg += " (SMS مینی)";
    else if (method === 'sms-stealth') statusMsg += " (SMS پنهان)";
    else if (method === 'finglish') statusMsg += " (فینگلیش)";
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
    'sms-stealth': '🔒 SMS پنهان: داده در متن فارسی طبیعی مخفی می‌شود — کوتاه و پنهان ⭐',
    'sms-mini': '📱 SMS مینی: کوتاه‌ترین خروجی — کد Base62 + متن پوشش',
    'sms-compact': '📝 SMS فشرده: کلمات کوتاه فارسی — مناسب پیام‌های طولانی‌تر',
    'homoglyph-emoji': '😊 همگلیف+ایموجی: متن طبیعی فارسی با ایموجی — پنهان‌نگاری',
    'homoglyph': '🔤 همگلیف: داده در حروف مشابه پنهان می‌شود — برای SMS مناسب',
    'finglish': '🔠 فینگلیش: خروجی لاتین — مثل پیام‌های روزمره ایرانی‌ها',
    'persian': '💡 فارسی‌ساز: حروف انگلیسی به فارسی تبدیل می‌شوند',
    'sentence': '📝 جمله‌ای: خروجی به صورت جملات فارسی طبیعی',
    'zwc': '⚠️ ZWC: کاراکترهای نامرئی — فقط برای شبکه‌های اجتماعی (برای SMS مناسب نیست)'
  };
  
  function updateEncodingUI() {
    const method = $("encodingMethod").value;
    
    if (method === 'zwc' || method === 'homoglyph') {
      carrierGroup.classList.add('visible');
      encodingInfo.className = method === 'zwc' ? 'info-box warning' : 'info-box success';
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
