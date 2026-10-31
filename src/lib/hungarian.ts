// 匈牙利語文法核心規則引擎與常數庫

export type VowelCategory = 'back' | 'front-unrounded' | 'front-rounded' | 'mixed';

export interface VowelInfo {
  char: string;
  type: 'back' | 'front';
  rounded?: boolean;
  length: 'short' | 'long';
  ipa: string;
  note: string;
}

export const HUNGARIAN_VOWELS: Record<string, VowelInfo> = {
  'a': { char: 'a', type: 'back', rounded: true, length: 'short', ipa: '[ɒ]', note: '低後圓唇母音，類似開口略圓的「奧」' },
  'á': { char: 'á', type: 'back', rounded: false, length: 'long', ipa: '[aː]', note: '長音，類似標準「啊——」' },
  'e': { char: 'e', type: 'front', rounded: false, length: 'short', ipa: '[ɛ]', note: '開口較大的「ㄝ」' },
  'é': { char: 'é', type: 'front', rounded: false, length: 'long', ipa: '[eː]', note: '半閉長音「欸——」' },
  'i': { char: 'i', type: 'front', rounded: false, length: 'short', ipa: '[i]', note: '短「衣」' },
  'í': { char: 'í', type: 'front', rounded: false, length: 'long', ipa: '[iː]', note: '長「衣——」' },
  'o': { char: 'o', type: 'back', rounded: true, length: 'short', ipa: '[o]', note: '短「喔」' },
  'ó': { char: 'ó', type: 'back', rounded: true, length: 'long', ipa: '[oː]', note: '長「喔——」' },
  'ö': { char: 'ö', type: 'front', rounded: true, length: 'short', ipa: '[ø]', note: '前圓唇短音（德語 ö / 嘴形發喔舌位發欸）' },
  'ő': { char: 'ő', type: 'front', rounded: true, length: 'long', ipa: '[øː]', note: '前圓唇長音「öö——」' },
  'u': { char: 'u', type: 'back', rounded: true, length: 'short', ipa: '[u]', note: '短「烏」' },
  'ú': { char: 'ú', type: 'back', rounded: true, length: 'long', ipa: '[uː]', note: '長「烏——」' },
  'ü': { char: 'ü', type: 'front', rounded: true, length: 'short', ipa: '[y]', note: '前圓唇短音（注音「ㄩ」）' },
  'ű': { char: 'ű', type: 'front', rounded: true, length: 'long', ipa: '[yː]', note: '前圓唇長音「ㄩ——」' }
};

// 判定單詞的母音和諧分類
export function analyzeVowelHarmony(word: string): {
  category: VowelCategory;
  vowels: string[];
  explanation: string;
  binarySuffix: string; // -ban / -ben
  ternarySuffix: string; // -hoz / -hez / -höz
  pluralSuffix: string; // -ok / -ek / -ök
  accusativeSuffix: string; // -t, -ot, -et, -öt, -at
} {
  const cleanWord = word.trim().toLowerCase();
  const vowelsInWord: string[] = [];

  for (const ch of cleanWord) {
    if (HUNGARIAN_VOWELS[ch]) {
      vowelsInWord.push(ch);
    }
  }

  if (vowelsInWord.length === 0) {
    return {
      category: 'back',
      vowels: [],
      explanation: '未檢測到母音，預設採用後母音規則。',
      binarySuffix: '-ban',
      ternarySuffix: '-hoz',
      pluralSuffix: '-ok',
      accusativeSuffix: '-ot'
    };
  }

  // 檢查是否有後母音
  const hasBack = vowelsInWord.some(v => HUNGARIAN_VOWELS[v].type === 'back');
  const hasFront = vowelsInWord.some(v => HUNGARIAN_VOWELS[v].type === 'front');

  // 取得最後一個母音
  const lastVowel = vowelsInWord[vowelsInWord.length - 1];
  const lastVowelInfo = HUNGARIAN_VOWELS[lastVowel];

  // 少數特殊全中性母音單音節詞但接後母音詞綴（如 híd, cél, nyár, derék, szív 等）
  const specialBackExceptions = ['híd', 'cél', 'szív', 'derék', 'férfi', 'ujj', 'nyak'];
  if (specialBackExceptions.includes(cleanWord)) {
    return {
      category: 'back',
      vowels: vowelsInWord,
      explanation: `「${word}」為歷史保留之特殊詞，詞中母音雖看似前母音/中性母音，但在現代匈牙利語中一律遵循「後母音詞綴」。`,
      binarySuffix: '-ban',
      ternarySuffix: '-hoz',
      pluralSuffix: '-ak',
      accusativeSuffix: '-at'
    };
  }

  if (hasBack) {
    // 混合詞或純後母音詞（只要有後母音，通常為後母音詞，如 kávé, béka, hotel）
    const isMixed = hasFront;
    return {
      category: isMixed ? 'mixed' : 'back',
      vowels: vowelsInWord,
      explanation: isMixed 
        ? `詞中含有後母音與前母音（複合詞/外來詞）。依匈牙利語規則，以後母音為主要支配特徵，因此後綴選擇後母音形式。`
        : `詞中全為後母音（Mély hangrendű: a, á, o, ó, u, ú），後綴選擇深沉厚實的後母音形式。`,
      binarySuffix: '-ban',
      ternarySuffix: '-hoz',
      pluralSuffix: cleanWord.endsWith('a') || cleanWord.endsWith('e') ? '-k' : '-ok',
      accusativeSuffix: cleanWord.endsWith('a') || cleanWord.endsWith('e') ? '-t' : '-ot'
    };
  } else {
    // 純前母音詞，需要區分不圓唇 vs 圓唇（依最後一個母音為依據）
    const isRounded = lastVowelInfo.rounded ?? false;
    if (isRounded) {
      return {
        category: 'front-rounded',
        vowels: vowelsInWord,
        explanation: `詞中為前母音，且末尾母音為圓唇音（Ajakkerekítéses: ö, ő, ü, ű），在三分詞綴中需使用前圓唇形式（如 -höz, -tök, -ök）。`,
        binarySuffix: '-ben',
        ternarySuffix: '-höz',
        pluralSuffix: '-ök',
        accusativeSuffix: '-öt'
      };
    } else {
      return {
        category: 'front-unrounded',
        vowels: vowelsInWord,
        explanation: `詞中為前母音，且末尾母音為非圓唇扁平音（Ajakréses: e, é, i, í），在三分詞綴中採用前扁唇形式（如 -hez, -tek, -ek）。`,
        binarySuffix: '-ben',
        ternarySuffix: '-hez',
        pluralSuffix: '-ek',
        accusativeSuffix: '-et'
      };
    }
  }
}

// 詞尾長音化規則（Stem Vowel Lengthening: alma -> almát / kefe -> kefét）
export function applyVowelLengthening(stem: string): { alteredStem: string; lengthened: boolean } {
  if (stem.endsWith('a')) {
    return { alteredStem: stem.slice(0, -1) + 'á', lengthened: true };
  }
  if (stem.endsWith('e')) {
    return { alteredStem: stem.slice(0, -1) + 'é', lengthened: true };
  }
  return { alteredStem: stem, lengthened: false };
}

// 3x3 方位空間格位矩陣資料
export interface SpatialCase {
  id: string;
  nameHu: string;
  nameZh: string;
  questionHu: string;
  questionZh: string;
  category: 'interior' | 'surface' | 'proximity';
  direction: 'inward' | 'static' | 'outward';
  suffixes: string[];
  description: string;
  exampleBase: string;
  exampleForm: string;
  exampleMeaning: string;
  badgeColor: string;
}

export const SPATIAL_CASES_DATA: SpatialCase[] = [
  // 內部 (Interior / Belső viszony)
  {
    id: 'illative',
    nameHu: 'Illativus (-ba / -be)',
    nameZh: '內向格（進入內部）',
    questionHu: 'Hová? (到哪裡？)',
    questionZh: '朝向/進入內部',
    category: 'interior',
    direction: 'inward',
    suffixes: ['-ba', '-be'],
    description: '動作目標是「進入到某物/封閉空間的內部」，如走進房間、放進盒子。',
    exampleBase: 'ház (房子)',
    exampleForm: 'házba (進房子裡)',
    exampleMeaning: 'Bemegyek a házba. (我走進房子裡。)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    id: 'inessive',
    nameHu: 'Inessivus (-ban / -ben)',
    nameZh: '內在格（在內部）',
    questionHu: 'Hol? (在哪裡？)',
    questionZh: '靜止於內部',
    category: 'interior',
    direction: 'static',
    suffixes: ['-ban', '-ben'],
    description: '主體「存在或發生於某封閉空間內部」，如在房間裡、在匈牙利。',
    exampleBase: 'szoba (房間)',
    exampleForm: 'szobában (在房間裡)',
    exampleMeaning: 'A szobában ülök. (我坐在房間裡。注意 a -> á 延長)',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'elative',
    nameHu: 'Elativus (-ból / -ből)',
    nameZh: '出內格（從內部出來）',
    questionHu: 'Honnan? (從哪裡來？)',
    questionZh: '由內向外離開',
    category: 'interior',
    direction: 'outward',
    suffixes: ['-ból', '-ből'],
    description: '動作起點「從某物/空間內部出來或脫離」，也用於「由...材料製成」。',
    exampleBase: 'iskola (學校)',
    exampleForm: 'iskolából (從學校出來)',
    exampleMeaning: 'Kijövök az iskolából. (我從學校走出來。)',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },

  // 表面 (Surface / Felületi viszony)
  {
    id: 'sublative',
    nameHu: 'Sublativus (-ra / -re)',
    nameZh: '上向格（到表面上）',
    questionHu: 'Hová? (到哪裡？)',
    questionZh: '朝向/落到表面',
    category: 'surface',
    direction: 'inward',
    suffixes: ['-ra', '-re'],
    description: '動作目標是「放到或移動到某物的平面上」，城市如 Budapest, Szeged 習慣接此格！',
    exampleBase: 'asztal (桌子)',
    exampleForm: 'asztalra (到桌上)',
    exampleMeaning: 'A könyvet az asztalra teszem. (我把書放到桌上。)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    id: 'superessive',
    nameHu: 'Superessivus (-n / -on / -en / -ön)',
    nameZh: '在上格（在表面上）',
    questionHu: 'Hol? (在哪裡？)',
    questionZh: '靜止於平面上',
    category: 'surface',
    direction: 'static',
    suffixes: ['-n', '-on', '-en', '-ön'],
    description: '主體「位於某平面之上」或「位於特定的城市/島嶼/大眾運輸工具」上。',
    exampleBase: 'Budapest (布達佩斯)',
    exampleForm: 'Budapesten (在布達佩斯)',
    exampleMeaning: 'Budapesten élek. (我住在布達佩斯。)',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'delative',
    nameHu: 'Delativus (-ról / -ről)',
    nameZh: '離上格（從表面離開/關於）',
    questionHu: 'Honnan? (從哪裡來？)',
    questionZh: '從表面下來/離去',
    category: 'surface',
    direction: 'outward',
    suffixes: ['-ról', '-ről'],
    description: '從平面上下來；引申為「關於（about）」某話題（如 beszél valamiről）。',
    exampleBase: 'szék (椅子)',
    exampleForm: 'székről (從椅子上下來)',
    exampleMeaning: 'Felállok a székről. (我從椅子上站起來。)',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
  },

  // 鄰近/旁邊 (Proximity / Külső-melletti viszony)
  {
    id: 'allative',
    nameHu: 'Allativus (-hoz / -hez / -höz)',
    nameZh: '側向格（朝向/到身邊）',
    questionHu: 'Hová? (到哪裡？)',
    questionZh: '朝向身旁或某人',
    category: 'proximity',
    direction: 'inward',
    suffixes: ['-hoz', '-hez', '-höz'],
    description: '移動到某物附近、某人身邊（拜訪醫生、去朋友家），三分法母音和諧代表。',
    exampleBase: 'orvos (醫生)',
    exampleForm: 'orvoshoz (去醫生那裡)',
    exampleMeaning: 'Megyek az orvoshoz. (我要去看醫生。)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'adessive',
    nameHu: 'Adessivus (-nál / -nél)',
    nameZh: '在側格（在身旁/在某人家）',
    questionHu: 'Hol? (在哪裡？)',
    questionZh: '在附近或某人處',
    category: 'proximity',
    direction: 'static',
    suffixes: ['-nál', '-nél'],
    description: '在某物旁邊或在某人住處作客；亦用於比較級「比...（than）」結構。',
    exampleBase: 'Péter (彼得)',
    exampleForm: 'Péternél (在彼得家)',
    exampleMeaning: 'Péternél vacsorázunk. (我們在彼得家吃晚餐。)',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'ablative',
    nameHu: 'Ablativus (-tól / -től)',
    nameZh: '離側格（從身旁離開/從某人那）',
    questionHu: 'Honnan? (從哪裡來？)',
    questionZh: '離開某身旁或起點',
    category: 'proximity',
    direction: 'outward',
    suffixes: ['-tól', '-től'],
    description: '從某人身邊離開、從某起點算起；常用於「懼怕某事（fél valamitől）」。',
    exampleBase: 'anya (媽媽)',
    exampleForm: 'anyától (從媽媽那裡)',
    exampleMeaning: 'Ajándékot kaptam anyától. (我從媽媽那收到了禮物。)',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  }
];

// 動詞變位庫（含不定變位 vs 定變位）
export interface VerbConjugation {
  infinitive: string;
  meaningZh: string;
  type: 'back' | 'front-unrounded' | 'front-rounded';
  isIkVerb: boolean;
  notes: string;
  present: {
    indefinite: {
      en: string; // én
      te: string; // te
      o: string;  // ő
      mi: string; // mi
      ti: string; // ti
      ok: string; // ők
    };
    definite: {
      en: string; // én
      te: string; // te
      o: string;  // ő
      mi: string; // mi
      ti: string; // ti
      ok: string; // ők
    };
    specialLak?: string; // én szeret-lek (I love you)
  };
  sampleSentences: {
    indefinite: { hu: string; zh: string; explanation: string };
    definite: { hu: string; zh: string; explanation: string };
  };
}

export const COMMON_VERBS: VerbConjugation[] = [
  {
    infinitive: 'látni',
    meaningZh: '看見 (to see)',
    type: 'back',
    isIkVerb: false,
    notes: '經典後母音及物動詞，清楚展示定/不定變位的區別。',
    present: {
      indefinite: {
        en: 'látok',
        te: 'látsz',
        o: 'lát',
        mi: 'látunk',
        ti: 'láttok',
        ok: 'látnak'
      },
      definite: {
        en: 'látom',
        te: 'látod',
        o: 'látja',
        mi: 'látjuk',
        ti: 'látjátok',
        ok: 'látják'
      },
      specialLak: 'látlak (我看見你)'
    },
    sampleSentences: {
      indefinite: {
        hu: 'Látok egy madarat az égen.',
        zh: '我看見天空中有一隻鳥。',
        explanation: '受詞是一隻不特定的鳥（egy madarat），因此動詞使用「不定變位」látok。'
      },
      definite: {
        hu: 'Látom a madarat, amiről meséltél.',
        zh: '我看見了你剛才說的那隻鳥。',
        explanation: '受詞帶有定冠詞（a madarat），指涉特定對象，因此動詞必須使用「定變位」látom。'
      }
    }
  },
  {
    infinitive: 'kérni',
    meaningZh: '請求 / 要 (to ask for / request)',
    type: 'front-unrounded',
    isIkVerb: false,
    notes: '前母音不圓唇動詞，生活點餐必備：「Kérek egy kávét」vs「Kérem a számlát」。',
    present: {
      indefinite: {
        en: 'kérek',
        te: 'kérsz',
        o: 'kér',
        mi: 'kérünk',
        ti: 'kértek',
        ok: 'kérnek'
      },
      definite: {
        en: 'kérem',
        te: 'kéred',
        o: 'kéri',
        mi: 'kérjük',
        ti: 'kéritek',
        ok: 'kérik'
      },
      specialLak: 'kérlek (我請求你 / 請你...)'
    },
    sampleSentences: {
      indefinite: {
        hu: 'Kérek egy fekete kávét.',
        zh: '我要一杯黑咖啡。',
        explanation: '點餐單點「一杯」（egy kávét，不定受詞），使用不定變位 kérek。'
      },
      definite: {
        hu: 'Kérem a számlát, köszönöm.',
        zh: '請給我帳單，謝謝。',
        explanation: '「這份帳單」（a számlát）指當前特定的那份帳單，使用定變位 kérem。'
      }
    }
  },
  {
    infinitive: 'olvasni',
    meaningZh: '閱讀 (to read)',
    type: 'back',
    isIkVerb: false,
    notes: '詞幹以 -s 結尾（噝音動詞），第二人稱不定變位接 -ol 而非 -sz（olvasol 而非 olvassz）。',
    present: {
      indefinite: {
        en: 'olvasok',
        te: 'olvasol',
        o: 'olvas',
        mi: 'olvasunk',
        ti: 'olvastok',
        ok: 'olvasnak'
      },
      definite: {
        en: 'olvasom',
        te: 'olvasod',
        o: 'olvassa',
        mi: 'olvassuk',
        ti: 'olvassátok',
        ok: 'olvassák'
      },
      specialLak: 'olvaslak (我讀懂你/看穿你)'
    },
    sampleSentences: {
      indefinite: {
        hu: 'Gyakran olvasok könyveket este.',
        zh: '我晚上常閱讀書籍。',
        explanation: '受詞為泛指複數名詞（könyveket，無特定定冠詞），使用不定變位 olvasok。'
      },
      definite: {
        hu: 'Olvasom ezt a könyvet, nagyon izgalmas.',
        zh: '我正在讀這本書，非常精彩。',
        explanation: '受詞是指示代名詞修飾的特定書本（ezt a könyvet），必須使用定變位 olvasom。'
      }
    }
  },
  {
    infinitive: 'főzni',
    meaningZh: '烹飪 / 煮 (to cook)',
    type: 'front-rounded',
    isIkVerb: false,
    notes: '前母音圓唇動詞（ö），詞綴採用 -ök, -ünk, -tök 等圓唇母音。',
    present: {
      indefinite: {
        en: 'főzök',
        te: 'főzöl',
        o: 'főz',
        mi: 'főzünk',
        ti: 'főztök',
        ok: 'főznek'
      },
      definite: {
        en: 'főzöm',
        te: 'főzöd',
        o: 'főzi',
        mi: 'főzzük',
        ti: 'főzitek',
        ok: 'főzik'
      }
    },
    sampleSentences: {
      indefinite: {
        hu: 'Ma finom levest főzök.',
        zh: '我今天煮美味的湯。',
        explanation: '泛指「某種美味的湯」，無指定冠詞，用不定變位 főzök。'
      },
      definite: {
        hu: 'Megfőzöm az ebédet a családnak.',
        zh: '我要為家人烹煮這頓午餐。',
        explanation: '指定特定午餐（az ebédet），使用定變位 főzöm。'
      }
    }
  },
  {
    infinitive: 'lakni',
    meaningZh: '居住 (to reside/live) [-ik動詞]',
    type: 'back',
    isIkVerb: true,
    notes: '經典 -ik 不及物動詞，第三人稱單數為 lakik（而非 lak），現代第一人稱多說 lakom（傳統亦可 lakok）。不及物動詞通常無定變位。',
    present: {
      indefinite: {
        en: 'lakom / lakok',
        te: 'laksz',
        o: 'lakik',
        mi: 'lakunk',
        ti: 'laktok',
        ok: 'laknak'
      },
      definite: {
        en: '—',
        te: '—',
        o: '—',
        mi: '—',
        ti: '—',
        ok: '—'
      }
    },
    sampleSentences: {
      indefinite: {
        hu: 'Hol laksz? — Tajpejben lakom.',
        zh: '你住哪裡？— 我住在台北。',
        explanation: 'lakni 為不及物動詞，專表居住狀態，沒有受詞故僅有不定變位。'
      },
      definite: {
        hu: '— (不及物動詞無定變位)',
        zh: '—',
        explanation: '不及物動詞無法支配直接賓語，因此無定變位形式。'
      }
    }
  },
  {
    infinitive: 'szeretni',
    meaningZh: '喜愛 / 愛 (to love/like)',
    type: 'front-unrounded',
    isIkVerb: false,
    notes: '國際最知名的匈牙利語單字之一：「Szeretlek」（我愛你），體現獨特的 -lak / -lek 專屬人稱後綴。',
    present: {
      indefinite: {
        en: 'szeretek',
        te: 'szeretsz',
        o: 'szeret',
        mi: 'szeretünk',
        ti: 'szerettek',
        ok: 'szeretnek'
      },
      definite: {
        en: 'szeretem',
        te: 'szereted',
        o: 'szereti',
        mi: 'szeretjük',
        ti: 'szeretitek',
        ok: 'szeretik'
      },
      specialLak: 'Szeretlek! (我愛你！)'
    },
    sampleSentences: {
      indefinite: {
        hu: 'Nagyon szeretek utazni.',
        zh: '我非常喜歡旅行。',
        explanation: '後面接動詞不定式（utazni）時，支配不定變位 szeretek。'
      },
      definite: {
        hu: 'Nagyon szeretem a magyar nyelvet.',
        zh: '我非常喜愛匈牙利語。',
        explanation: '受詞為特定對象「這門匈牙利語（a magyar nyelvet）」，使用定變位 szeretem。'
      }
    }
  }
];

// 領屬後綴資料表（Birtoklás）
export const POSSESSION_RULES = {
  title: '名詞領屬後綴 (Birtokos személyjelek)',
  description: '匈牙利語不需頻繁使用「我的、你的」所有格代名詞，而是直接在名詞後方附加領屬人稱後綴。',
  examples: [
    {
      word: 'ház (房子 - 後母音)',
      forms: [
        { person: 'én (我)', suffix: '-am', result: 'házam', meaning: '我的房子' },
        { person: 'te (你)', suffix: '-ad', result: 'házad', meaning: '你的房子' },
        { person: 'ő (他/她)', suffix: '-a', result: 'háza', meaning: '他/她的房子' },
        { person: 'mi (我們)', suffix: '-unk', result: 'házunk', meaning: '我們的房子' },
        { person: 'ti (你們)', suffix: '-atok', result: 'házatok', meaning: '你們的房子' },
        { person: 'ők (他們)', suffix: '-uk', result: 'házuk', meaning: '他們的房子' }
      ]
    },
    {
      word: 'kert (花園 - 前母音不圓唇)',
      forms: [
        { person: 'én (我)', suffix: '-em', result: 'kertem', meaning: '我的花園' },
        { person: 'te (你)', suffix: '-ed', result: 'kerted', meaning: '你的花園' },
        { person: 'ő (他/她)', suffix: '-e', result: 'kerte', meaning: '他/她的花園' },
        { person: 'mi (我們)', suffix: '-ünk', result: 'kertünk', meaning: '我們的花園' },
        { person: 'ti (你們)', suffix: '-etek', result: 'kertetek', meaning: '你們的花園' },
        { person: 'ők (他們)', suffix: '-ük', result: 'kertük', meaning: '他們的花園' }
      ]
    },
    {
      word: 'sör (啤酒 - 前母音圓唇)',
      forms: [
        { person: 'én (我)', suffix: '-öm', result: 'söröm', meaning: '我的啤酒' },
        { person: 'te (你)', suffix: '-öd', result: 'söröd', meaning: '你的啤酒' },
        { person: 'ő (他/她)', suffix: '-e', result: 'söre', meaning: '他/她的啤酒' },
        { person: 'mi (我們)', suffix: '-ünk', result: 'sörünk', meaning: '我們的啤酒' },
        { person: 'ti (你們)', suffix: '-ötök', result: 'sörötök', meaning: '你們的啤酒' },
        { person: 'ők (他們)', suffix: '-ük', result: 'sörük', meaning: '他們的啤酒' }
      ]
    }
  ]
};
