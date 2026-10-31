import React, { useState, useMemo } from 'react';
import { HUNGARIAN_VOWELS, analyzeVowelHarmony, applyVowelLengthening } from '../lib/hungarian';
import { speakHungarian } from '../lib/speechUtils';
import { Volume2, Sparkles, BookOpen, Layers, Info, CheckCircle2 } from 'lucide-react';

const PRESET_WORDS = [
  { word: 'ablak', meaning: '窗戶', desc: '純後母音' },
  { word: 'ember', meaning: '人', desc: '純前母音（扁平）' },
  { word: 'sör', meaning: '啤酒', desc: '純前母音（圓唇）' },
  { word: 'kávé', meaning: '咖啡', desc: '混合詞（以後母音支配）' },
  { word: 'repülőtér', meaning: '機場', desc: '複合前母音' },
  { word: 'alma', meaning: '蘋果', desc: '詞尾 a -> á 拉長' },
  { word: 'kefe', meaning: '刷子', desc: '詞尾 e -> é 拉長' },
  { word: 'híd', meaning: '橋', desc: '歷史特殊例外詞' }
];

export const VowelHarmonyExplorer: React.FC = () => {
  const [inputWord, setInputWord] = useState('ablak');
  const [selectedVowel, setSelectedVowel] = useState<string | null>('a');

  // 計算分析結果
  const analysis = useMemo(() => {
    return analyzeVowelHarmony(inputWord);
  }, [inputWord]);

  // 詞尾長音化檢查
  const lengthening = useMemo(() => {
    return applyVowelLengthening(inputWord.trim().toLowerCase());
  }, [inputWord]);

  // 語音朗讀
  const speakText = speakHungarian;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 標題與引言卡片 */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-emerald-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 核心基礎律動
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            母音和諧律 <span className="text-emerald-200 text-2xl font-normal">(Magánhangzó-harmónia)</span>
          </h2>
          <p className="text-rose-100 text-base sm:text-lg leading-relaxed">
            匈牙利語作為黏著語（Agglutinative），單字如同音符一般流暢和諧。詞根中的母音音色（深厚後母音 vs 清亮前母音）會如磁鐵般吸引對應的詞綴，形成二分法（如 <code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-200">-ban/-ben</code>）或三分法（如 <code className="bg-black/20 px-1.5 py-0.5 rounded text-amber-200">-hoz/-hez/-höz</code>）。
          </p>
        </div>
      </div>

      {/* 互動輸入與即時推導 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-600" />
              即時母音和諧分析器
            </h3>
            <p className="text-sm text-slate-500 mt-1">輸入任意匈牙利語詞幹，演算法即時剖析音和諧分類與詞綴衍生</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-400">快速範例：</span>
            {PRESET_WORDS.slice(0, 5).map(item => (
              <button
                key={item.word}
                onClick={() => setInputWord(item.word)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition ${
                  inputWord === item.word
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {item.word}
              </button>
            ))}
          </div>
        </div>

        {/* 輸入區塊 */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder="請輸入匈牙利語單字 (例如: barát, egyetem, gyümölcs)..."
              className="w-full text-lg sm:text-xl font-semibold px-5 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition text-slate-800 placeholder:text-slate-400"
            />
            {inputWord && (
              <button
                onClick={() => speakText(inputWord)}
                title="聆聽發音"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* 分析結果卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* 分類結果 */}
          <div className="p-5 rounded-2xl border bg-slate-50/70 border-slate-200/80 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">母音歸類特徵</div>
            <div className="flex items-center gap-2">
              <span className={`inline-block w-3.5 h-3.5 rounded-full ${
                analysis.category === 'back' ? 'bg-amber-500 ring-4 ring-amber-100' :
                analysis.category === 'mixed' ? 'bg-orange-500 ring-4 ring-orange-100' :
                analysis.category === 'front-rounded' ? 'bg-emerald-500 ring-4 ring-emerald-100' :
                'bg-sky-500 ring-4 ring-sky-100'
              }`} />
              <div className="text-xl font-bold text-slate-900">
                {analysis.category === 'back' && '後母音 (Mély hangrend)'}
                {analysis.category === 'mixed' && '複合/後母音支配 (Vegyes hangrend)'}
                {analysis.category === 'front-rounded' && '前圓唇母音 (Magas - Kerekített)'}
                {analysis.category === 'front-unrounded' && '前扁平母音 (Magas - Réses)'}
              </div>
            </div>
            <div className="text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/60">
              {analysis.explanation}
            </div>
            {lengthening.lengthened && (
              <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>詞尾母音拉長法則：</strong>原詞以「{inputWord.slice(-1)}」結尾，接續格位或後綴時詞幹自動延長為「
                  <span className="font-bold underline decoration-amber-500">{lengthening.alteredStem}</span>
                  」。
                </span>
              </div>
            )}
          </div>

          {/* 詞中母音分解 */}
          <div className="p-5 rounded-2xl border bg-slate-50/70 border-slate-200/80 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">詞內母音辨識</div>
            <div className="flex flex-wrap gap-2 min-h-[44px] items-center">
              {analysis.vowels.length > 0 ? (
                analysis.vowels.map((v, i) => {
                  const info = HUNGARIAN_VOWELS[v];
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedVowel(v)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-base transition flex items-center gap-1.5 border ${
                        info.type === 'back'
                          ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200'
                          : info.rounded
                          ? 'bg-emerald-100/80 border-emerald-300 text-emerald-900 hover:bg-emerald-200'
                          : 'bg-sky-100/80 border-sky-300 text-sky-900 hover:bg-sky-200'
                      }`}
                    >
                      <span>{v}</span>
                      <span className="text-[10px] font-normal opacity-75">({info.type === 'back' ? '後' : info.rounded ? '前圓' : '前扁'})</span>
                    </button>
                  );
                })
              ) : (
                <span className="text-sm text-slate-400 italic">詞中未檢測到匈牙利語母音</span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              點擊母音查看詳細發音音標與口腔發音位置說明。
            </p>
          </div>

          {/* 自動推薦後綴結果 */}
          <div className="p-5 rounded-2xl border bg-slate-50/70 border-slate-200/80 space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">自動接續詞綴示範</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 font-medium">在...裡面 (-ban/-ben)：</span>
                <span className="font-bold text-red-600">
                  {lengthening.alteredStem}
                  <span className="underline decoration-red-400">{analysis.binarySuffix}</span>
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 font-medium">朝向... (-hoz/-hez/-höz)：</span>
                <span className="font-bold text-emerald-600">
                  {inputWord.trim().toLowerCase()}
                  <span className="underline decoration-emerald-400">{analysis.ternarySuffix}</span>
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-200/60">
                <span className="text-slate-500 font-medium">複數形 (-ok/-ek/-ök)：</span>
                <span className="font-bold text-blue-600">
                  {lengthening.alteredStem}
                  <span className="underline decoration-blue-400">{analysis.pluralSuffix}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 14 個匈牙利語母音全覽與音標指南 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              匈牙利語 14 個母音系統總覽表
            </h3>
            <p className="text-sm text-slate-500 mt-1">匈牙利語極度重視母音的長短音與圓扁唇，點擊單個字母可試聽並查看中文發音指引</p>
          </div>
        </div>

        {/* 14 個字母矩陣 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {Object.entries(HUNGARIAN_VOWELS).map(([ch, info]) => {
            const isSelected = selectedVowel === ch;
            const isBack = info.type === 'back';
            const isRounded = info.rounded;

            return (
              <button
                key={ch}
                onClick={() => setSelectedVowel(ch)}
                className={`p-3.5 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 relative ${
                  isSelected
                    ? 'ring-2 ring-red-500 border-red-500 shadow-md bg-red-50/50'
                    : isBack
                    ? 'bg-amber-50/40 border-amber-200/70 hover:bg-amber-50'
                    : isRounded
                    ? 'bg-emerald-50/40 border-emerald-200/70 hover:bg-emerald-50'
                    : 'bg-sky-50/40 border-sky-200/70 hover:bg-sky-50'
                }`}
              >
                <div className="text-2xl font-black text-slate-900">{ch}</div>
                <div className="text-xs font-mono font-medium text-slate-500">{info.ipa}</div>
                <div className="flex gap-1 text-[10px]">
                  <span className={`px-1.5 py-0.5 rounded font-semibold ${
                    isBack ? 'bg-amber-200 text-amber-900' : 'bg-sky-200 text-sky-900'
                  }`}>
                    {isBack ? '後' : '前'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                    {info.length === 'long' ? '長' : '短'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 當前選中母音詳細卡片 */}
        {selectedVowel && HUNGARIAN_VOWELS[selectedVowel] && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl font-black text-amber-300">
                {selectedVowel}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">國際音標 {HUNGARIAN_VOWELS[selectedVowel].ipa}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                    {HUNGARIAN_VOWELS[selectedVowel].type === 'back' ? '後母音 (Mély)' : '前母音 (Magas)'}
                    {HUNGARIAN_VOWELS[selectedVowel].rounded !== undefined && (HUNGARIAN_VOWELS[selectedVowel].rounded ? ' · 圓唇' : ' · 扁唇')}
                    {` · ${HUNGARIAN_VOWELS[selectedVowel].length === 'long' ? '長音' : '短音'}`}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-snug">
                  {HUNGARIAN_VOWELS[selectedVowel].note}
                </p>
              </div>
            </div>

            <button
              onClick={() => speakText(selectedVowel)}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition flex items-center gap-2 shrink-0 shadow-sm"
            >
              <Volume2 className="w-4 h-4" /> 聆聽發音
            </button>
          </div>
        )}

        {/* 規律速記原則提示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
            <div className="text-sm font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600" /> 後母音 (Mély) 記憶訣竅
            </div>
            <div className="text-xs text-amber-800 leading-relaxed">
              字母：<span className="font-bold">a, á, o, ó, u, ú</span>。<br />
              發音舌位在口腔後方，音色低沉渾厚，後綴常帶有 a/o/u（如 -ban, -hoz, -nak, -ból）。
            </div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/80">
            <div className="text-sm font-bold text-sky-900 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-600" /> 前扁唇母音 (Magas - Réses)
            </div>
            <div className="text-xs text-sky-800 leading-relaxed">
              字母：<span className="font-bold">e, é, i, í</span>。<br />
              發音舌位偏前、嘴角拉平（微露齒），後綴常使用 e/i（如 -ben, -hez, -nek, -ből）。
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <div className="text-sm font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 前圓唇母音 (Magas - Kerekített)
            </div>
            <div className="text-xs text-emerald-800 leading-relaxed">
              字母：<span className="font-bold">ö, ő, ü, ű</span>。<br />
              舌位在前面但雙唇嘟圓，在三分法詞綴中擁有專屬圓唇形式（如 -höz, -tök, -ök）。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
