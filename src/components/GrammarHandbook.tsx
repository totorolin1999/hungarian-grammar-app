import React, { useState } from 'react';
import { BookOpen, Search, Compass, Zap, Layers, AlertTriangle } from 'lucide-react';

export const GrammarHandbook: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const SECTIONS = [
    {
      id: 'intro',
      title: '1. 匈牙利語的核心本質 (Nyelvi alapok)',
      keywords: ['烏拉爾', '語系', '芬蘭', '烏戈爾', '黏著語', '文法性別', '後綴', 'agglutináló', 'uralic'],
      icon: BookOpen,
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            匈牙利語（Magyar nyelv）不屬於英語、德語、法語所在的印歐語系，而是隸屬於<strong>烏拉爾語系（Uralic）芬蘭-烏戈爾語族</strong>。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">✅ 無文法性別 (Nincs nyelvtani nem)</strong>
              沒有「陽性、陰性、中性」之分，第三人稱代名詞「ő」同時涵蓋他、她、它，非常平等直觀！
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <strong className="text-slate-900 block mb-1">✅ 高度黏著語 (Agglutináló nyelv)</strong>
              透過在單詞詞根後層層「黏貼」後綴來表達時態、格位、人稱與數，如：
              <code className="text-red-600 font-bold block mt-1">ház-am-ban (在我的房子裡)</code>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'consonants',
      title: '2. 子音發音與雙字母子音 (Kettős mássalhangzók)',
      keywords: ['子音', '發音', '雙字母', 'cs', 'gy', 'ly', 'ny', 'sz', 'ty', 'zs', 'mássalhangzó', '捲舌'],
      icon: Layers,
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            匈牙利語中許多子音是由兩個（甚至三個）字母組成的獨立音素，不可拆開拼讀：
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">cs</span>: [tʃ] 類似「ㄔ」(család)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">gy</span>: [ɟ] 軟顎「ㄉㄧ」(gyerek)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">ly</span>: [j] 發「ㄧ/y」(hely)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">ny</span>: [ɲ] 鼻音「ㄋㄧ」(anya)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">sz</span>: [s] 清音「ㄙ」(szia)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">s</span>: [ʃ] 捲舌「ㄕ」(sör)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">ty</span>: [c] 清音「ㄊㄧ」(kutya)</div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200"><span className="text-red-600 font-bold">zs</span>: [ʒ] 濁音「ㄖ」(zseb)</div>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>超重要發音防雷：</strong>匈牙利語的單個「s」發英文「sh（ㄕ）」音；而英文發音「s」在匈語中寫作「sz」！千萬別念反了。
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'wordorder',
      title: '3. 動詞前綴與「焦點語序」 (Igekötők & Fókusz-rendszer)',
      keywords: ['語序', '前綴', '焦點', '否定', 'igekötő', 'fókusz', 'SVO', '分離', 'nem', '疑問'],
      icon: Zap,
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            匈牙利語並非固定 SVO（主-謂-賓）語序，而是由<strong>「主題（Topic）」</strong>與<strong>「焦點（Focus）」</strong>決定語序，強調的重心緊鄰動詞前方。
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="font-bold text-slate-900 text-xs uppercase">動詞前綴（Igekötők: meg-, el-, be-, ki-, fel-, le-）的分離規則：</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border">
                <span>肯定常態：前綴與動詞結合</span>
                <span className="font-mono font-bold text-emerald-700">Elmegyek az iskolába. (我去學校。)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border">
                <span>否定句：nem 佔據焦點位置，前綴跳到動詞後！</span>
                <span className="font-mono font-bold text-red-700">Nem megyek el az iskolába. (我不去學校。)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded-lg border">
                <span>疑問詞/強調：疑問詞佔據焦點，前綴後移</span>
                <span className="font-mono font-bold text-blue-700">Mikor mész el? (你何時離開？)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cases-overview',
      title: '4. 名詞 18 格位系統一覽表 (A magyar esetrendszer)',
      keywords: ['格位', '18格', '賓格', '與格', '工具格', '領屬', '主格', '空間格', '-ban', '-nak', '-val', 'eset', '後綴'],
      icon: Compass,
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>匈牙利語名詞擁有 18 個豐富格位，取代印歐語言的前置詞（Preposition）：</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">主格 (Nominative):</strong> Ø (無後綴)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">賓格 (Accusative):</strong> -t (直接受詞)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">與格 (Dative):</strong> -nak / -nek (給...)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">內在格 (Inessive):</strong> -ban / -ben (在內)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">內向格 (Illative):</strong> -ba / -be (進入)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">出內格 (Elative):</strong> -ból / -ből (出來)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">在上格 (Superessive):</strong> -n / -on / -en / -ön
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">上向格 (Sublative):</strong> -ra / -re (到...上)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">離上格 (Delative):</strong> -ról / -ről (從...下)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">在側格 (Adessive):</strong> -nál / -nél (在身旁)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">側向格 (Allative):</strong> -hoz / -hez / -höz
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">離側格 (Ablative):</strong> -tól / -től (離開)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">工具格 (Instrumental):</strong> -val / -vel (用...)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">因果格 (Causal-Final):</strong> -ért (為了...)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">變換格 (Translative):</strong> -vá / -vé (變成...)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">界限格 (Terminative):</strong> -ig (直到...)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">形式格 (Essive-Formal):</strong> -ként (作為...)
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong className="text-slate-900">狀態格 (Essive-Modal):</strong> -ul / -ül (如...)
            </div>
          </div>
        </div>
      )
    }
  ];

  const filteredSections = SECTIONS.filter(s => {
    const term = searchTerm.toLowerCase();
    return (
      s.title.toLowerCase().includes(term) ||
      s.id.toLowerCase().includes(term) ||
      s.keywords.some(kw => kw.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 頂部橫幅 */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> 權威繁體中文指南
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            匈牙利語語法精華速查手冊 <span className="text-amber-400 font-normal text-2xl">(Nyelvtani Kalauz)</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            為中文學習者量身打造的文法邏輯總整理，破除印歐語言思維定勢，掌握烏拉爾語系的優雅幾何美感。
          </p>
        </div>
      </div>

      {/* 搜尋欄位 */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="搜尋手冊章節關鍵字 (例如: 子音, 前綴, 語序, 18格)..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm font-semibold outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition"
        />
      </div>

      {/* 章節列表 */}
      <div className="space-y-6">
        {filteredSections.map(sec => {
          const Icon = sec.icon;
          return (
            <div key={sec.id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{sec.title}</h3>
              </div>
              {sec.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
