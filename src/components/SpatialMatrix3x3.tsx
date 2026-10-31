import React, { useState } from 'react';
import { SPATIAL_CASES_DATA, SpatialCase, analyzeVowelHarmony, applyVowelLengthening } from '../lib/hungarian';
import { speakHungarian } from '../lib/speechUtils';
import { Navigation, Compass, Volume2, ArrowRight, ArrowLeft, Dot, HelpCircle } from 'lucide-react';

const NOUN_PRESETS = [
  { hu: 'ház', zh: '房子 (後母音)', desc: '典型封閉建築物' },
  { hu: 'kert', zh: '花園 (前扁唇)', desc: '半開放空間' },
  { hu: 'erdő', zh: '森林 (前圓唇)', desc: '自然空間' },
  { hu: 'asztal', zh: '桌子 (後母音)', desc: '表面物體' },
  { hu: 'szék', zh: '椅子 (前扁唇)', desc: '表面家具' },
  { hu: 'orvos', zh: '醫生 (後母音)', desc: '人身處所' },
  { hu: 'barát', zh: '朋友 (後母音)', desc: '人身處所' }
];

export const SpatialMatrix3x3: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('inessive');
  const [customNoun, setCustomNoun] = useState<string>('ház');

  const selectedCase = SPATIAL_CASES_DATA.find(c => c.id === selectedCaseId) || SPATIAL_CASES_DATA[1];

  // 語音朗讀
  const speakText = speakHungarian;

  // 動態衍生所選單字的特定格位
  const deriveCaseForm = (noun: string, spatialCase: SpatialCase): string => {
    const clean = noun.trim().toLowerCase();
    if (!clean) return '';
    const { alteredStem } = applyVowelLengthening(clean);
    const harmony = analyzeVowelHarmony(clean);

    switch (spatialCase.id) {
      // 內部
      case 'illative': // -ba / -be
        return `${alteredStem}${harmony.category.includes('back') || harmony.category === 'mixed' ? 'ba' : 'be'}`;
      case 'inessive': // -ban / -ben
        return `${alteredStem}${harmony.category.includes('back') || harmony.category === 'mixed' ? 'ban' : 'ben'}`;
      case 'elative': // -ból / -ből
        return `${alteredStem}${harmony.category.includes('back') || harmony.category === 'mixed' ? 'ból' : 'ből'}`;

      // 表面
      case 'sublative': // -ra / -re
        return `${alteredStem}${harmony.category.includes('back') || harmony.category === 'mixed' ? 'ra' : 're'}`;
      case 'superessive': // -n / -on / -en / -ön
        if (clean.endsWith('a') || clean.endsWith('e') || clean.endsWith('i') || clean.endsWith('o') || clean.endsWith('u')) {
          return `${alteredStem}n`;
        }
        if (harmony.category.includes('back') || harmony.category === 'mixed') {
          return `${clean}on`;
        } else if (harmony.category === 'front-rounded') {
          return `${clean}ön`;
        } else {
          return `${clean}en`;
        }
      case 'delative': // -ról / -ről
        return `${alteredStem}${harmony.category.includes('back') || harmony.category === 'mixed' ? 'ról' : 'ről'}`;

      // 身邊
      case 'allative': // -hoz / -hez / -höz
        return `${clean}${harmony.ternarySuffix.replace('-', '')}`;
      case 'adessive': // -nál / -nél
        return `${alteredStem}${harmony.category.includes('back') || harmony.category === 'mixed' ? 'nál' : 'nél'}`;
      case 'ablative': // -tól / -től
        return `${alteredStem}${harmony.category.includes('back') || harmony.category === 'mixed' ? 'tól' : 'től'}`;

      default:
        return `${clean}`;
    }
  };

  // 渲染九宮格每個儲存格
  function renderMatrixCell(id: string) {
    const item = SPATIAL_CASES_DATA.find(c => c.id === id);
    if (!item) return null;

    const isSelected = selectedCaseId === id;
    const derived = deriveCaseForm(customNoun, item);

    return (
      <button
        key={id}
        onClick={() => setSelectedCaseId(id)}
        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between min-h-[110px] ${
          isSelected
            ? 'ring-4 ring-emerald-500/20 border-emerald-600 bg-emerald-50/80 shadow-md scale-[1.02] z-10'
            : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70'
        }`}
      >
        <div className="flex items-start justify-between gap-1">
          <div className="font-black text-slate-800 text-sm sm:text-base font-mono">
            {item.suffixes.join('/')}
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            item.direction === 'inward' ? 'bg-red-100 text-red-800' :
            item.direction === 'static' ? 'bg-sky-100 text-sky-800' :
            'bg-emerald-100 text-emerald-800'
          }`}>
            {item.direction === 'inward' ? '→ 去' : item.direction === 'static' ? '• 在' : '← 來'}
          </span>
        </div>

        <div className="my-1.5">
          <div className="text-xs font-semibold text-slate-700">{item.nameZh.split('（')[0]}</div>
          <div className="text-[11px] text-slate-400 truncate">{item.questionHu}</div>
        </div>

        <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
          <span className="truncate">{derived}</span>
          <span className="text-[10px] font-normal text-slate-400 ml-1 shrink-0">範例</span>
        </div>
      </button>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 標題與視覺導言 */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase mb-3">
            <Compass className="w-3.5 h-3.5" /> 空間幾何哲學
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            3 × 3 空間方位格矩陣 <span className="text-emerald-200 text-2xl font-normal">(Térbeli Viszonyok)</span>
          </h2>
          <p className="text-teal-100 text-base sm:text-lg leading-relaxed">
            匈牙利語最讓外語學習者驚艷的正是這張嚴謹如數學矩陣的「空間地圖」！以三個維度（內部 📦、表面 📄、身邊 👤），交叉三個運動狀態（進入 $\rightarrow$、靜止 $\bullet$、離開 $\leftarrow$），構築出無懈可擊的 9 大方位格位。
          </p>
        </div>
      </div>

      {/* 單字實測切換條 */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-bold text-slate-800">選擇測試詞幹：</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {NOUN_PRESETS.map((p) => (
            <button
              key={p.hu}
              onClick={() => setCustomNoun(p.hu)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                customNoun === p.hu
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {p.hu} <span className="opacity-75 font-normal">({p.zh.split(' ')[0]})</span>
            </button>
          ))}
          <input
            type="text"
            value={customNoun}
            onChange={(e) => setCustomNoun(e.target.value)}
            placeholder="自訂名詞..."
            className="w-28 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none"
          />
        </div>
      </div>

      {/* 3x3 空間矩陣主體 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">點擊九宮格任意方格，即刻觀察空間概念與詞綴變化</h3>
            <p className="text-xs text-slate-500 mt-0.5">橫向為「空間關係」，縱向為「移動方向（去、在、來）」</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> 內部</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block"></span> 表面</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> 身邊</span>
          </div>
        </div>

        {/* 矩陣容器 */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* 欄位表頭：移動方向 */}
            <div className="grid grid-cols-4 gap-3 mb-3 text-center">
              <div className="p-3 bg-slate-100 rounded-2xl font-bold text-xs text-slate-500 flex items-center justify-center">
                空間 \ 移動
              </div>
              <div className="p-3 bg-red-50/80 rounded-2xl border border-red-200/60 font-bold text-xs sm:text-sm text-red-900 flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-1 text-red-600 font-black"><ArrowRight className="w-4 h-4" /> Hová? (去哪裡？)</span>
                <span className="text-[11px] font-medium text-red-700">朝向 / 進入 (Inward)</span>
              </div>
              <div className="p-3 bg-sky-50/80 rounded-2xl border border-sky-200/60 font-bold text-xs sm:text-sm text-sky-900 flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-1 text-sky-600 font-black"><Dot className="w-5 h-5 -mx-1" /> Hol? (在哪裡？)</span>
                <span className="text-[11px] font-medium text-sky-700">靜止 / 所在 (Static)</span>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/60 font-bold text-xs sm:text-sm text-emerald-900 flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-1 text-emerald-600 font-black"><ArrowLeft className="w-4 h-4" /> Honnan? (從哪來？)</span>
                <span className="text-[11px] font-medium text-emerald-700">離開 / 來自 (Outward)</span>
              </div>
            </div>

            {/* 第 1 列：內部關係 (Belső) */}
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex flex-col justify-center items-center text-center">
                <div className="text-2xl mb-1">📦</div>
                <div className="text-sm font-bold text-emerald-950">內部空間</div>
                <div className="text-[11px] text-emerald-700">Belső viszony</div>
              </div>

              {/* Illative (-ba/-be) */}
              {renderMatrixCell('illative')}
              {/* Inessive (-ban/-ben) */}
              {renderMatrixCell('inessive')}
              {/* Elative (-ból/-ből) */}
              {renderMatrixCell('elative')}
            </div>

            {/* 第 2 列：表面關係 (Felületi) */}
            <div className="grid grid-cols-4 gap-3 mb-3">
              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200/80 flex flex-col justify-center items-center text-center">
                <div className="text-2xl mb-1">📄</div>
                <div className="text-sm font-bold text-blue-950">表面空間</div>
                <div className="text-[11px] text-blue-700">Felületi viszony</div>
              </div>

              {/* Sublative (-ra/-re) */}
              {renderMatrixCell('sublative')}
              {/* Superessive (-n/-on/-en/-ön) */}
              {renderMatrixCell('superessive')}
              {/* Delative (-ról/-ről) */}
              {renderMatrixCell('delative')}
            </div>

            {/* 第 3 列：鄰近身邊 (Külső/Melletti) */}
            <div className="grid grid-cols-4 gap-3">
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 flex flex-col justify-center items-center text-center">
                <div className="text-2xl mb-1">👤</div>
                <div className="text-sm font-bold text-amber-950">身邊 / 鄰近</div>
                <div className="text-[11px] text-amber-700">Melletti viszony</div>
              </div>

              {/* Allative (-hoz/-hez/-höz) */}
              {renderMatrixCell('allative')}
              {/* Adessive (-nál/-nél) */}
              {renderMatrixCell('adessive')}
              {/* Ablative (-tól/-től) */}
              {renderMatrixCell('ablative')}
            </div>
          </div>
        </div>

        {/* 選中格位的深度詳解卡片 */}
        <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 font-semibold">
                  {selectedCase.questionHu}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 font-medium">
                  {selectedCase.nameHu}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                  {selectedCase.nameZh}
                  <span className="font-mono text-xl text-amber-300">
                    {selectedCase.suffixes.join(' / ')}
                  </span>
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
                  {selectedCase.description}
                </p>
              </div>

              {/* 實用生活例句 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center justify-between">
                  <span>生活實用例句</span>
                  <button
                    onClick={() => speakText(selectedCase.exampleMeaning.split('(')[0])}
                    className="hover:text-white transition flex items-center gap-1 text-[11px]"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> 試聽
                  </button>
                </div>
                <div className="text-lg font-bold text-white tracking-wide">
                  {selectedCase.exampleMeaning.split('(')[0]}
                </div>
                <div className="text-sm text-slate-300">
                  {selectedCase.exampleMeaning.includes('(') ? `(${selectedCase.exampleMeaning.split('(')[1]}` : ''}
                </div>
              </div>
            </div>

            {/* 當前詞幹衍生展示盒 */}
            <div className="w-full lg:w-72 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center justify-center space-y-3">
              <div className="text-xs text-slate-400 uppercase font-semibold">當前詞幹套用結果</div>
              <div className="text-3xl font-black text-amber-300 tracking-tight flex items-center gap-2">
                {deriveCaseForm(customNoun, selectedCase)}
                <button
                  onClick={() => speakText(deriveCaseForm(customNoun, selectedCase))}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition"
                  title="朗讀詞形"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-slate-300 border-t border-white/10 pt-3 w-full">
                基礎詞形：<span className="font-semibold text-white">{customNoun}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 匈牙利特色地理城市格位小提示 */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong>特別注意匈牙利城市格位特例：</strong> 大多數匈牙利國內城市使用「表面格（-ra / -n / -ról）」，例如：
            <span className="font-semibold mx-1">Budapestre (去布達佩斯)</span>、
            <span className="font-semibold mx-1">Budapesten (在布達佩斯)</span>、
            <span className="font-semibold mx-1">Budapestről (從布達佩斯來)</span>。
            而外國城市（如 Tajpejben, Tokióban, Londonban）通常使用「內部格（-ba / -ban / -ból）」。
          </div>
        </div>
      </div>
    </div>
  );
};
