export interface QuizQuestion {
  id: string;
  category: 'vowel' | 'spatial' | 'verb' | 'possession' | 'wordorder';
  categoryTitle: string;
  question: string;
  contextHu?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  hint?: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. 母音和諧律
  {
    id: 'vowel-1',
    category: 'vowel',
    categoryTitle: '母音和諧律 (Hangrend)',
    question: '單字「ablak (窗戶)」全由後母音（a）組成，若要加上內在格後綴「在...裡 (-ban/-ben)」，正確形式為何？',
    contextHu: 'ablak + [ -ban / -ben ]',
    options: [
      { id: 'a', text: 'ablakben', isCorrect: false },
      { id: 'b', text: 'ablakban', isCorrect: true },
      { id: 'c', text: 'ablakbön', isCorrect: false },
      { id: 'd', text: 'ablakbán', isCorrect: false }
    ],
    explanation: '「ablak」中的兩個母音均為「a」（後母音 Mély hangrendű），在二選一後綴中必須選擇後母音形式「-ban」，因此正確為「ablakban（在窗戶裡/上）」。',
    hint: 'a 是後母音，需搭配後母音後綴。'
  },
  {
    id: 'vowel-2',
    category: 'vowel',
    categoryTitle: '母音和諧律 (Hangrend)',
    question: '單字「sör (啤酒)」為前圓唇母音（ö），若要加上「朝向...(-hoz / -hez / -höz)」，應選用哪一個？',
    contextHu: 'sör + [ -hoz / -hez / -höz ]',
    options: [
      { id: 'a', text: 'sörhöz', isCorrect: true },
      { id: 'b', text: 'sörhez', isCorrect: false },
      { id: 'c', text: 'sörhoz', isCorrect: false },
      { id: 'd', text: 'sörnak', isCorrect: false }
    ],
    explanation: '母音「ö」屬於前母音圓唇音（Ajakkerekítéses），在三分詞綴（-hoz/-hez/-höz）中需對應前圓唇的「-höz」，因此是「sörhöz」。',
    hint: 'ö 和 ü 都是前圓唇母音。'
  },
  {
    id: 'vowel-3',
    category: 'vowel',
    categoryTitle: '詞尾拉長 (Hangnyújtás)',
    question: '單字「alma (蘋果)」以短母音「a」結尾，當加上賓格後綴「-t」時，會發生什麼變化？',
    contextHu: 'alma + -t',
    options: [
      { id: 'a', text: 'almat', isCorrect: false },
      { id: 'b', text: 'almát', isCorrect: true },
      { id: 'c', text: 'almot', isCorrect: false },
      { id: 'd', text: 'almak', isCorrect: false }
    ],
    explanation: '匈牙利語規則：以短 a 或短 e 結尾的名詞在接續任何後綴時，詞尾母音必須拉長！a 變為 á，e 變為 é。因此 alma + -t 變成「almát」。',
    hint: '注意詞尾 a 變成 á 的拉長規則。'
  },

  // 2. 空間方位格
  {
    id: 'spatial-1',
    category: 'spatial',
    categoryTitle: '3×3 空間方位格 (Helyhatározók)',
    question: '句子「Bemegyek a szobá___ (我走進房間裡)」，需要表示「進入封閉空間內部」，應填入哪個後綴？',
    contextHu: 'Bemegyek a szobá____ .',
    options: [
      { id: 'a', text: '-ban', isCorrect: false },
      { id: 'b', text: '-ba', isCorrect: true },
      { id: 'c', text: '-ból', isCorrect: false },
      { id: 'd', text: '-ra', isCorrect: false }
    ],
    explanation: '「Bemenni（走進）」搭配進入內部的方向（Hová? 朝哪去？），內部向向格後綴為「-ba / -be」。因 szoba 經拉長為 szobá-，所以是「szobába」。-ban 則是靜止在內（Hol?）。',
    hint: '進入內部用 -ba/-be，靜止在內用 -ban/-ben。'
  },
  {
    id: 'spatial-2',
    category: 'spatial',
    categoryTitle: '3×3 空間方位格 (Helyhatározók)',
    question: '在匈牙利語中，絕大多數匈牙利本國城市（如 Budapest, Szeged, Debrecen）的「在...城市」習慣使用哪一類格位？',
    contextHu: 'Budapest___ élek. (我住在布達佩斯。)',
    options: [
      { id: 'a', text: '內部格 (-ban / -ben)', isCorrect: false },
      { id: 'b', text: '表面格 / 在上格 (-n / -on / -en / -ön)', isCorrect: true },
      { id: 'c', text: '側向格 (-hoz / -hez / -höz)', isCorrect: false },
      { id: 'd', text: '與格 (-nak / -nek)', isCorrect: false }
    ],
    explanation: '匈牙利語有特殊的傳統地理慣用：多數本國城市使用「表面在上格（Superessive -n/-on/-en/-ön）」！例如 Budapesten, Szegeden, Debrecenben 是少數例外（以 -ban 結尾）。外國城市（如 Tajpejben, Tokióban, Londonban）則多用 -ban/-ben。',
    hint: '首都布達佩斯是「Budapesten」。'
  },
  {
    id: 'spatial-3',
    category: 'spatial',
    categoryTitle: '3×3 空間方位格 (Helyhatározók)',
    question: '「Péter____ vacsorázom. (我在彼得家吃晚餐 / 我在彼得身旁)」，應使用哪一個表示「在某人身邊/處所」的後綴？',
    contextHu: 'Péter____ vacsorázom.',
    options: [
      { id: 'a', text: 'Péternél', isCorrect: true },
      { id: 'b', text: 'Péterben', isCorrect: false },
      { id: 'c', text: 'Péterre', isCorrect: false },
      { id: 'd', text: 'Péternek', isCorrect: false }
    ],
    explanation: '表示「在某人處所/身邊（Adessivus）」使用「-nál / -nél」。Péter 是前母音，故加上「-nél」成為「Péternél」。',
    hint: '造訪某人家或在某人身旁用 -nál/-nél。'
  },

  // 3. 動詞雙軌變位
  {
    id: 'verb-1',
    category: 'verb',
    categoryTitle: '動詞雙軌變位 (Igeragozás)',
    question: '請看兩句：「Olvasok egy könyvet.」vs「Olvasom a könyvet.」，為什麼第一句用 olvasok，第二句用 olvasom？',
    contextHu: 'Olvasok egy könyvet. vs Olvasom a könyvet.',
    options: [
      { id: 'a', text: '第一句是過去式，第二句是現在式', isCorrect: false },
      { id: 'b', text: '第一句受詞是不定冠詞（egy），用不定變位；第二句受詞是定冠詞（a），用定變位', isCorrect: true },
      { id: 'c', text: '第一句是女性說話，第二句是男性說話', isCorrect: false },
      { id: 'd', text: '第一句動詞是 -ik 動詞，第二句不是', isCorrect: false }
    ],
    explanation: '匈牙利語最重要特徵之一：受詞為不定受詞（如 egy könyv 一本書、或泛指名詞）時動詞用「不定變位（Alanyi: olvasok）」；受詞為特定對象（如 a könyv 這本書、指示代名詞 azt 等）時，必須使用「定變位（Tárgyas: olvasom）」。',
    hint: '注意受詞前面的冠詞（egy vs a/az）。'
  },
  {
    id: 'verb-2',
    category: 'verb',
    categoryTitle: '動詞雙軌變位 (Igeragozás)',
    question: '匈牙利語著名的告白金句「Szeretlek! (我愛你！)」，動詞詞尾「-lek」所表達的主語與受詞關係為何？',
    contextHu: 'Szeret-lek!',
    options: [
      { id: 'a', text: '他愛我', isCorrect: false },
      { id: 'b', text: '我（第一人稱單數）愛你（第二人稱單/複數）', isCorrect: true },
      { id: 'c', text: '我們愛他們', isCorrect: false },
      { id: 'd', text: '你愛他', isCorrect: false }
    ],
    explanation: '「-lak / -lek」是匈牙利語非常特殊的專門後綴，專門表示「主語是 én（我），受詞是 téged / titeket（你或你們）」！例如 Látlak (我看見你)、Várlak (我等你)。',
    hint: '「-lak / -lek」是專門表達「第一人稱主格 $\\rightarrow$ 第二人稱賓格」的後綴。'
  },
  {
    id: 'verb-3',
    category: 'verb',
    categoryTitle: '動詞雙軌變位 (Igeragozás)',
    question: '「-ik 動詞」（Ikes igék）在傳統標準語法中，第三人稱單數（ő）以及第一人稱單數（én）有何特點？',
    contextHu: 'Pl. lakni: ő lakik, én lakom',
    options: [
      { id: 'a', text: '第三人稱單數詞尾為 -ik，第一人稱單數不定常為 -om/-em/-öm', isCorrect: true },
      { id: 'b', text: '所有的 -ik 動詞都不能接任何賓語', isCorrect: false },
      { id: 'c', text: '-ik 動詞只用於過去式', isCorrect: false },
      { id: 'd', text: '-ik 動詞永遠不區分定變位與不定變位', isCorrect: false }
    ],
    explanation: '-ik 動詞（如 lakik, iszik, eszik, alszik）在字典形式（即現在式第三人稱單數）即帶有 -ik。且在第一人稱不定變位中，標準語法採用類似定變位的 -om / -em / -öm（如 alszom, lakom）。',
    hint: '字典收錄的詞形通常是 ő ...ik。'
  },

  // 4. 領屬後綴
  {
    id: 'possession-1',
    category: 'possession',
    categoryTitle: '名詞領屬結構 (Birtoklás)',
    question: '要把「ház (房子)」變成「我的房子」，加上第一人稱領屬後綴後應為：',
    contextHu: 'ház + én -> ?',
    options: [
      { id: 'a', text: 'házem', isCorrect: false },
      { id: 'b', text: 'házam', isCorrect: true },
      { id: 'c', text: 'házom', isCorrect: false },
      { id: 'd', text: 'én ház', isCorrect: false }
    ],
    explanation: '「ház」是後母音詞，第一人稱單數的領屬連接母音採用後母音「-am」，因此是「a házam（我的房子）」。匈牙利語平常不需加 én，除非要強烈對比強調。',
    hint: '後母音子音結尾名詞，通常接 -am。'
  },

  // 5. 語序與動詞前綴
  {
    id: 'wordorder-1',
    category: 'wordorder',
    categoryTitle: '動詞前綴與語序 (Igekötők és Szórend)',
    question: '「Elmegyek a moziba. (我要去電影院。)」在加上否定詞「nem」變成「我不去電影院」時，前綴「el-」的位置會發生什麼變化？',
    contextHu: 'Nem ________ a moziba.',
    options: [
      { id: 'a', text: 'nem elmegyek (前綴依然在動詞前面)', isCorrect: false },
      { id: 'b', text: 'nem megyek el (前綴被分離並移到動詞後方)', isCorrect: true },
      { id: 'c', text: 'nem megy el-ek (前綴移到動詞中間)', isCorrect: false },
      { id: 'd', text: 'el nem megyek (否定詞 nem 夾在中間)', isCorrect: false }
    ],
    explanation: '動詞前綴（Igekötők: meg-, el-, ki-, be- 等）在正常肯定句中黏在動詞前；但在被「nem」否定時，前綴必須與動詞分離，並後退至動詞之後！即「Nem megyek el a moziba.」。這是匈牙利語最經典的焦點語序現象。',
    hint: '否定時動詞前綴會「跳」到動詞後方。'
  }
];
