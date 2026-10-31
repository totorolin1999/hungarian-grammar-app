import React, { useState } from 'react';
import { COMMON_VERBS, VerbConjugation } from '../lib/hungarian';
import { speakHungarian } from '../lib/speechUtils';
import { Zap, Volume2, ArrowRightLeft, BookOpen, Check, Heart } from 'lucide-react';

export const VerbConjugator: React.FC = () => {
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation>(COMMON_VERBS[0]);
  const [activeTab, setActiveTab] = useState<'both' | 'indefinite' | 'definite'>('both');

  // 語音朗讀
  const speakText = speakHungarian;

  const PERSONS = [
    { key: 'en', hu: 'én', zh: '我 (1. Sg.)' },
    { key: 'te', hu: 'te', zh: '你 (2. Sg.)' },
    { key: 'o', hu: 'ő / Ön', zh: '他/她/您 (3. Sg.)' },
    { key: 'mi', hu: 'mi', zh: '我們 (1. Pl.)' },
    { key: 'ti', hu: 'ti / Önök', zh: '你們/各位 (2. Pl.)' },
    { key: 'ok', hu: 'ők', zh: '他們 (3. Pl.)' }
  ] as const;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 標題與引言 */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase mb-3">
            <Zap className="w-3.5 h-3.5" /> 核心變位哲學
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            動詞雙軌變位器 <span className="text-amber-200 text-2xl font-normal">(Igeragozás)</span>
          </h2>
          <p className="text-rose-100 text-base sm:text-lg leading-relaxed">
            匈牙利語最獨步歐洲的文法瑰寶：每個及物動詞同時擁有兩套變位——「不定變位（Alanyi）」與「定變位（Tárgyas）」。句中受詞是明確特定的（例如「這本書」）還是泛指的（例如「一本書」），會直接改變動詞的人稱尾綴！
          </p>
        </div>
      </div>

      {/* 動詞選擇清單 */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-red-600" />
          <span className="text-sm font-bold text-slate-800">選擇示範動詞：</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {COMMON_VERBS.map((v) => (
            <button
              key={v.infinitive}
              onClick={() => setSelectedVerb(v)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                selectedVerb.infinitive === v.infinitive
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {v.infinitive} <span className="opacity-80 font-normal">({v.meaningZh.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 變位雙軌對照主體 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-extrabold text-slate-900">{selectedVerb.infinitive}</h3>
              <span className="text-sm font-semibold text-slate-500">[{selectedVerb.meaningZh}]</span>
              {selectedVerb.isIkVerb && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
                  -ik 動詞 (Ikes ige)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">{selectedVerb.notes}</p>
          </div>

          {/* 視角切換器 */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'both' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              雙軌對照
            </button>
            <button
              onClick={() => setActiveTab('indefinite')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'indefinite' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              僅不定變位
            </button>
            <button
              onClick={() => setActiveTab('definite')}
              className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'definite' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              僅定變位
            </button>
          </div>
        </div>

        {/* 雙軌變位人稱表格 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">主語人稱 (Személy)</th>
                {(activeTab === 'both' || activeTab === 'indefinite') && (
                  <th className="py-3 px-4 font-bold bg-amber-50/50 text-amber-900 rounded-t-xl">
                    不定變位 (Alanyi ragozás)
                    <span className="block text-[10px] font-normal text-amber-700 capitalize mt-0.5">
                      受詞為泛指、不定冠詞（egy）、或無受詞
                    </span>
                  </th>
                )}
                {(activeTab === 'both' || activeTab === 'definite') && (
                  <th className="py-3 px-4 font-bold bg-red-50/50 text-red-900 rounded-t-xl">
                    定變位 (Tárgyas ragozás)
                    <span className="block text-[10px] font-normal text-red-700 capitalize mt-0.5">
                      受詞為特定對象（a/az、指示詞 azt、人名）
                    </span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {PERSONS.map((p) => {
                const indefForm = selectedVerb.present.indefinite[p.key];
                const defForm = selectedVerb.present.definite[p.key];

                return (
                  <tr key={p.key} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800">{p.hu}</div>
                      <div className="text-[11px] text-slate-400">{p.zh}</div>
                    </td>

                    {(activeTab === 'both' || activeTab === 'indefinite') && (
                      <td className="py-3.5 px-4 bg-amber-50/20">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 font-mono text-base">{indefForm}</span>
                          {indefForm !== '—' && (
                            <button
                              onClick={() => speakText(`${p.hu} ${indefForm}`)}
                              className="text-slate-400 hover:text-amber-600 transition"
                              title="試聽"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}

                    {(activeTab === 'both' || activeTab === 'definite') && (
                      <td className="py-3.5 px-4 bg-red-50/20">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-base ${defForm === '—' ? 'text-slate-400' : 'font-bold text-red-700'}`}>
                            {defForm}
                          </span>
                          {defForm !== '—' && (
                            <button
                              onClick={() => speakText(`${p.hu} ${defForm}`)}
                              className="text-slate-400 hover:text-red-600 transition"
                              title="試聽"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 浪漫的 -lak / -lek 特殊變位展示 */}
        {selectedVerb.present.specialLak && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500 text-white rounded-xl shadow-sm">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-rose-900 uppercase">特殊獨家後綴：-lak / -lek</div>
                <div className="text-base font-extrabold text-rose-950 font-mono">
                  {selectedVerb.present.specialLak}
                </div>
                <div className="text-xs text-rose-700">
                  專門用於「主格我（én）$\rightarrow$ 賓格你（téged/titeket）」，無需額外加賓格代名詞！
                </div>
              </div>
            </div>
            <button
              onClick={() => speakText(selectedVerb.present.specialLak || '')}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-700 font-semibold text-xs hover:bg-rose-100 transition shadow-sm flex items-center gap-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" /> 聆聽
            </button>
          </div>
        )}

        {/* 實戰情境對比例句 */}
        <div className="pt-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ArrowRightLeft className="w-4 h-4 text-red-600" />
            實戰情境對比（何時用不定？何時用定？）
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 不定句型 */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  不定變位情境
                </span>
                <button
                  onClick={() => speakText(selectedVerb.sampleSentences.indefinite.hu)}
                  className="text-amber-800 hover:text-amber-950 text-xs flex items-center gap-1 font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 朗讀
                </button>
              </div>
              <div className="text-base font-bold text-slate-900">
                {selectedVerb.sampleSentences.indefinite.hu}
              </div>
              <div className="text-sm font-medium text-slate-600">
                {selectedVerb.sampleSentences.indefinite.zh}
              </div>
              <div className="text-xs text-amber-800 pt-1 border-t border-amber-200/60 leading-relaxed">
                <strong>文法解析：</strong>{selectedVerb.sampleSentences.indefinite.explanation}
              </div>
            </div>

            {/* 定變位句型 */}
            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-200 text-red-900">
                  定變位情境
                </span>
                {selectedVerb.sampleSentences.definite.hu !== '—' && (
                  <button
                    onClick={() => speakText(selectedVerb.sampleSentences.definite.hu)}
                    className="text-red-800 hover:text-red-950 text-xs flex items-center gap-1 font-semibold"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> 朗讀
                  </button>
                )}
              </div>
              <div className="text-base font-bold text-slate-900">
                {selectedVerb.sampleSentences.definite.hu}
              </div>
              <div className="text-sm font-medium text-slate-600">
                {selectedVerb.sampleSentences.definite.zh}
              </div>
              <div className="text-xs text-red-800 pt-1 border-t border-red-200/60 leading-relaxed">
                <strong>文法解析：</strong>{selectedVerb.sampleSentences.definite.explanation}
              </div>
            </div>
          </div>
        </div>

        {/* 定變位 5 大觸發黃金法則 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            記憶口訣：何時動詞必須使用「定變位 (Tárgyas)」？
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800">1. 受詞帶定冠詞：</span><br />
              <code className="text-red-600 font-mono font-bold">a / az</code>（如 a könyvet、az autót）
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800">2. 受詞為指示代名詞：</span><br />
              <code className="text-red-600 font-mono font-bold">ezt (這個) / azt (那個)</code>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800">3. 受詞為人名 / 專有名詞：</span><br />
              例如 Látom <code className="text-red-600 font-bold">Pétert</code> (我看見彼得)
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800">4. 第三身代名詞受詞：</span><br />
              <code className="text-red-600 font-mono font-bold">őt (他) / őket (他們)</code>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800">5. 領屬名詞受詞：</span><br />
              例如 a könyvemet (我的書)
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800">6. 引出 hogy 子句：</span><br />
              例如 Tudom, hogy... (我知道...)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
