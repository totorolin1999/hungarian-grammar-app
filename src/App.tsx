import React, { useState } from 'react';
import { VowelHarmonyExplorer } from './components/VowelHarmonyExplorer';
import { SpatialMatrix3x3 } from './components/SpatialMatrix3x3';
import { VerbConjugator } from './components/VerbConjugator';
import { CasesAssimilation } from './components/CasesAssimilation';
import { PossessionExplorer } from './components/PossessionExplorer';
import { QuizArena } from './components/QuizArena';
import { GrammarHandbook } from './components/GrammarHandbook';
import { 
  Sparkles, 
  Compass, 
  Zap, 
  Shuffle, 
  Crown, 
  Trophy, 
  BookOpen, 
  Heart,
  Globe
} from 'lucide-react';

type TabType = 'vowel' | 'spatial' | 'verb' | 'assimilation' | 'possession' | 'quiz' | 'handbook';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('vowel');

  const NAV_ITEMS: { id: TabType; label: string; huLabel: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'vowel', label: '母音和諧律', huLabel: 'Harmónia', icon: Sparkles },
    { id: 'spatial', label: '3×3 空間方位格', huLabel: 'Térbeli esetek', icon: Compass, badge: '經典' },
    { id: 'verb', label: '動詞雙軌變位', huLabel: 'Igeragozás', icon: Zap, badge: '核心' },
    { id: 'assimilation', label: '格位與同化', huLabel: 'Hasonulás', icon: Shuffle },
    { id: 'possession', label: '名詞領屬', huLabel: 'Birtoklás', icon: Crown },
    { id: 'quiz', label: '闖關演練場', huLabel: 'Kvíz', icon: Trophy, badge: '挑戰' },
    { id: 'handbook', label: '語法手冊', huLabel: 'Kalauz', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col">
      {/* 頂部裝飾三色匈牙利旗標 */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#CE2939]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#477050]" />
      </div>

      {/* 頂部導航列 */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Logo 與名稱 */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-red-500/10">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">MagyarGrammar</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold tracking-wide">
                    匈牙利語
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">烏拉爾語系文法互動學習系統</div>
              </div>
            </div>

            {/* 桌面端模組選單 */}
            <nav className="hidden xl:flex items-center gap-1.5 overflow-x-auto py-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap relative ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ${
                        isActive ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* 行動端與中螢幕水平捲動導航條 */}
        <div className="xl:hidden border-t border-slate-100 px-4 py-2 overflow-x-auto flex items-center gap-2 bg-slate-50/50">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 主要內容區 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'vowel' && <VowelHarmonyExplorer />}
        {activeTab === 'spatial' && <SpatialMatrix3x3 />}
        {activeTab === 'verb' && <VerbConjugator />}
        {activeTab === 'assimilation' && <CasesAssimilation />}
        {activeTab === 'possession' && <PossessionExplorer />}
        {activeTab === 'quiz' && <QuizArena />}
        {activeTab === 'handbook' && <GrammarHandbook />}
      </main>

      {/* 頁尾 */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">MagyarGrammar</span>
            <span>· 繁體中文匈牙利語文法學習系統</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>用心打造 · Szeretettel készült</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline ml-1" />
          </div>
        </div>
      </footer>
    </div>
  );
};
