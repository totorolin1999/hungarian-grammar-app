import React, { useState } from 'react';
import { POSSESSION_RULES } from '../lib/hungarian';
import { speakHungarian } from '../lib/speechUtils';
import { Crown, Volume2, Sparkles, CheckCircle } from 'lucide-react';

export const PossessionExplorer: React.FC = () => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const currentExample = POSSESSION_RULES.examples[selectedWordIndex];

  const speakText = speakHungarian;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 標題卡片 */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase mb-3">
            <Crown className="w-3.5 h-3.5" /> 歸屬哲學
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            名詞領屬後綴系統 <span className="text-amber-200 text-2xl font-normal">(Birtokos Személyjelek)</span>
          </h2>
          <p className="text-amber-100 text-base sm:text-lg leading-relaxed">
            匈牙利語中表達「我的、你的、他的」時，通常**不需要**像英語那樣說「my / your」，而是直接在名詞尾部加上人稱後綴！例如「ház (房子)」加上後綴直接變成「házam (我的房子)」、「házad (你的房子)」。
          </p>
        </div>
      </div>

      {/* 示範切換 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              三大母音類型名詞的領屬後綴變化對照
            </h3>
            <p className="text-sm text-slate-500 mt-1">選擇不同母音質地的名詞，觀察連接母音的微妙和諧流轉</p>
          </div>
          <div className="flex gap-2">
            {POSSESSION_RULES.examples.map((item, idx) => (
              <button
                key={item.word}
                onClick={() => setSelectedWordIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border ${
                  selectedWordIndex === idx
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {item.word.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* 領屬六大人稱卡片展示網格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentExample.forms.map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-amber-400 hover:bg-amber-50/20 transition space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">{f.person}</span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  {f.suffix}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-2xl font-black text-slate-900 font-mono tracking-tight group-hover:text-amber-700 transition">
                  {f.result}
                </span>
                <button
                  onClick={() => speakText(f.result)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-700 hover:bg-amber-100 transition"
                  title="朗讀"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm font-medium text-slate-600 border-t border-slate-200/60 pt-2">
                {f.meaning}
              </div>
            </div>
          ))}
        </div>

        {/* 擁有句「我有...」核心句型延伸 */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-base">
            <CheckCircle className="w-5 h-5 text-amber-600" />
            匈牙利語如何表達「我有一間房子」？(擁有句結構 Nekem van...)
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
            匈牙利語沒有相當於英語「have」的專屬動詞！表達擁有時，公式為：
            <br />
            <strong className="text-amber-800 font-mono text-sm">[與格人稱代名詞] + van / vannak + [附加領屬後綴的名詞]</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs">
              <div className="font-bold text-slate-800">Nekem van egy házam.</div>
              <div className="text-slate-500 mt-1">我有一間房子（字面：對我而言有一間我的房子）</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs">
              <div className="font-bold text-slate-800">Neked van kutyád?</div>
              <div className="text-slate-500 mt-1">你有一隻狗嗎？</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs">
              <div className="font-bold text-slate-800">Neki nincs ideje.</div>
              <div className="text-slate-500 mt-1">他沒有時間（否定使用 nincs）</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
