import React, { useState } from 'react';
import { analyzeVowelHarmony, applyVowelLengthening } from '../lib/hungarian';
import { speakHungarian } from '../lib/speechUtils';
import { Layers, Shuffle, Sparkles, Volume2, ArrowRight } from 'lucide-react';

const ASSIMILATION_SAMPLES = [
  { word: 'busz', meaning: '公車', suffix: '-val', result: 'busszal', rule: 'sz + v -> sz-sz (搭公車)' },
  { word: 'vonat', meaning: '火車', suffix: '-val', result: 'vonattal', rule: 't + v -> t-t (搭火車)' },
  { word: 'kéz', meaning: '手', suffix: '-vel', result: 'kézzel', rule: 'z + v -> z-z (親手/用手)' },
  { word: 'barát', meaning: '朋友', suffix: '-val', result: 'baráttal', rule: 't + v -> t-t (和朋友一起)' },
  { word: 'anya', meaning: '媽媽', suffix: '-val', result: 'anyával', rule: '母音結尾直接接，a -> á 拉長 (和媽媽一起)' },
  { word: 'toll', meaning: '原子筆', suffix: '-val', result: 'tollal', rule: '原本已是雙子音 ll，同化後合為 tollal (用筆寫)' }
];

export const CasesAssimilation: React.FC = () => {
  const [testWord, setTestWord] = useState('busz');

  // 計算 -val / -vel 的同化
  const computeAssimilation = (word: string) => {
    const clean = word.trim().toLowerCase();
    if (!clean) return { result: '', explanation: '' };

    const { alteredStem, lengthened } = applyVowelLengthening(clean);
    const harmony = analyzeVowelHarmony(clean);
    const isBack = harmony.category.includes('back') || harmony.category === 'mixed';
    const baseSuffix = isBack ? 'val' : 'vel';

    // 檢查結尾是否為母音
    const vowels = 'aáeéiíoóöőuúüű';
    const lastChar = clean[clean.length - 1];

    if (vowels.includes(lastChar)) {
      return {
        result: `${alteredStem}${baseSuffix}`,
        vowelEnding: true,
        explanation: lengthened 
          ? `以短母音「${clean.slice(-1)}」結尾，母音拉長為「${alteredStem.slice(-1)}」，後接標準 -${baseSuffix}。`
          : `以母音結尾，不發生同化，直接加上 -${baseSuffix}。`
      };
    } else {
      // 子音同化
      // 檢查末尾多字母子音 (cs, dz, dzs, gy, ly, ny, sz, ty, zs)
      const digraphs = ['dzs', 'cs', 'dz', 'gy', 'ly', 'ny', 'sz', 'ty', 'zs'];
      let matchedDigraph = digraphs.find(d => clean.endsWith(d));

      if (matchedDigraph) {
        // 多字母子音同化：如 busz + val -> busszal (長音雙拼寫為 ssz 而非 szsz)
        const stemWithoutLast = clean.slice(0, -matchedDigraph.length);
        const geminate = matchedDigraph[0] + matchedDigraph; // e.g. ssz, ggy
        const suffixVowel = isBack ? 'al' : 'el';
        return {
          result: `${stemWithoutLast}${geminate}${suffixVowel}`,
          vowelEnding: false,
          explanation: `以雙字母子音「${matchedDigraph}」結尾，後綴開頭的「v」被其完全同化，拼寫合成為長子音「${geminate}」！`
        };
      } else {
        // 單子音結尾
        const stemWithoutLast = clean.slice(0, -1);
        const doubleConsonant = lastChar + lastChar;
        const suffixVowel = isBack ? 'al' : 'el';
        return {
          result: `${stemWithoutLast}${doubleConsonant}${suffixVowel}`,
          vowelEnding: false,
          explanation: `以子音「${lastChar}」結尾，後綴開頭的「v」被該子音完全同化（${lastChar} + v $\\rightarrow$ ${doubleConsonant}），形成「${stemWithoutLast}${doubleConsonant}${suffixVowel}」！`
        };
      }
    }
  };

  const assimilationData = computeAssimilation(testWord);

  const speakText = speakHungarian;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 標題引言 */}
      <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase mb-3">
            <Shuffle className="w-3.5 h-3.5" /> 音變與同化奇蹟
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            工具格同化與重要語法格 <span className="text-indigo-200 text-2xl font-normal">(Hasonulás & Esetek)</span>
          </h2>
          <p className="text-purple-100 text-base sm:text-lg leading-relaxed">
            在匈牙利語中，當接續工具格後綴 <code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-200">-val / -vel</code>（表示「和...一起 / 用...工具」）時，若詞尾為子音，詞綴的 <code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-200">v</code> 會發生百分之百的「完全同化（Teljes hasonulás）」，如變魔術般融入前一個子音！
          </p>
        </div>
      </div>

      {/* 互動同化實驗室 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              -val / -vel 完全同化動態推導機
            </h3>
            <p className="text-sm text-slate-500 mt-1">輸入任意名詞或點選下方範例，見證「v」如何被詞尾子音完全吞噬</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ASSIMILATION_SAMPLES.map(s => (
              <button
                key={s.word}
                onClick={() => setTestWord(s.word)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition ${
                  testWord === s.word ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {s.word}
              </button>
            ))}
          </div>
        </div>

        {/* 互動推導展示 */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100">
          <div className="w-full md:w-1/3 space-y-2">
            <label className="text-xs font-bold text-indigo-900 uppercase">輸入名詞：</label>
            <input
              type="text"
              value={testWord}
              onChange={(e) => setTestWord(e.target.value)}
              placeholder="輸入單字如 busz, vonat..."
              className="w-full text-xl font-bold px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-600 outline-none bg-white"
            />
          </div>

          <div className="hidden md:flex text-indigo-400">
            <ArrowRight className="w-8 h-8" />
          </div>

          <div className="flex-1 w-full bg-white p-5 rounded-2xl border border-indigo-200 shadow-sm space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase">同化合成結果：</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-black text-indigo-700 font-mono tracking-tight">
                {assimilationData.result}
              </div>
              {assimilationData.result && (
                <button
                  onClick={() => speakText(assimilationData.result)}
                  className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                  title="朗讀發音"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
              {assimilationData.explanation}
            </div>
          </div>
        </div>

        {/* 常見同化模式對照表 */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">經典生活必背同化組合</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ASSIMILATION_SAMPLES.map((s) => (
              <div key={s.word} className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition bg-white space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-800">{s.word} ({s.meaning})</span>
                  <span className="font-mono text-indigo-600 font-black">{s.result}</span>
                </div>
                <div className="text-xs text-slate-500">{s.rule}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 賓格 (-t) 與 與格 (-nak/-nek) 速成 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 賓格卡片 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
            <Layers className="w-5 h-5" /> 賓格 (Tárgyeset: -t)
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            標記動作的直接承受對象（受詞）。母音結尾直接接 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">-t</code>（詞尾 a/e 延長）；多數子音結尾則根據母音和諧插入連接母音（<code className="font-mono">-ot / -et / -öt / -at</code>）。
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>alm<span className="font-bold text-red-600">a</span> (蘋果) $\rightarrow$</span>
              <span className="font-bold font-mono text-sm text-red-600">almát (a 變長音 á)</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>asztal (桌子) $\rightarrow$</span>
              <span className="font-bold font-mono text-sm text-red-600">asztalt (可直接接或 asztalot)</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>könyv (書) $\rightarrow$</span>
              <span className="font-bold font-mono text-sm text-red-600">könyvet (插入連接母音 e)</span>
            </div>
          </div>
        </div>

        {/* 與格卡片 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg">
            <Layers className="w-5 h-5" /> 與格 (Részeshatározó eset: -nak / -nek)
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            表示「給予對象（to / for someone）」，亦是匈牙利語「擁有句（Nekem van... 我有...）」的文法支柱。
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>Péter (彼得) + -nek $\rightarrow$</span>
              <span className="font-bold font-mono text-sm text-emerald-600">Péternek (給彼得)</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>Nekem van egy autóm. $\rightarrow$</span>
              <span className="font-bold text-sm text-emerald-700">我有一輛車 (字面：給我有一輛車)</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center">
              <span>Kinek adod a kulcsot? $\rightarrow$</span>
              <span className="font-bold text-sm text-emerald-700">你把鑰匙交給誰？</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
