import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, XCircle, RotateCcw, HelpCircle, ArrowRight, Flame, Sparkles, Filter } from 'lucide-react';

export const QuizArena: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; selectedId: string; isCorrect: boolean }[]>([]);

  // 篩選題目
  const filteredQuestions = selectedCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.category === selectedCategory);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (optionId: string) => {
    if (showExplanation || quizFinished) return;
    setSelectedOptionId(optionId);
    setShowExplanation(true);

    const isCorrect = currentQ.options.find(o => o.id === optionId)?.isCorrect ?? false;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(Math.max(maxStreak, newStreak));
      setScore(prev => prev + 100 + (newStreak > 1 ? (newStreak - 1) * 20 : 0));

      // 彩帶效果
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      setStreak(0);
    }

    setUserAnswers(prev => [...prev, {
      questionId: currentQ.id,
      selectedId: optionId,
      isCorrect
    }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setShowExplanation(false);
      setShowHint(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = (category: string = selectedCategory) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setShowExplanation(false);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
    setUserAnswers([]);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 標題與成就狀態列 */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase mb-2">
            <Trophy className="w-3.5 h-3.5" /> 實戰能力檢驗
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            文法闖關演練場 <span className="text-emerald-200 text-xl font-normal">(Nyelvtani Kvíz)</span>
          </h2>
          <p className="text-rose-100 text-sm mt-1">涵蓋母音和諧、3×3 方位格、定/不定動詞、前綴語序的綜合互動題庫</p>
        </div>

        {/* 積分與連擊看板 */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
          <div className="text-center px-2">
            <div className="text-xs text-rose-200 font-medium">總積分</div>
            <div className="text-2xl font-black text-amber-300 font-mono">{score}</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center px-2">
            <div className="text-xs text-rose-200 font-medium flex items-center gap-1 justify-center">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> 連擊
            </div>
            <div className="text-2xl font-black text-white font-mono">{streak}x</div>
          </div>
        </div>
      </div>

      {/* 題型分類過濾列 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold text-slate-600">
        <span className="text-slate-400 flex items-center gap-1 shrink-0"><Filter className="w-3.5 h-3.5" /> 類別：</span>
        {[
          { id: 'all', label: '全部題型' },
          { id: 'vowel', label: '母音和諧' },
          { id: 'spatial', label: '3×3 方位格' },
          { id: 'verb', label: '動詞雙軌變位' },
          { id: 'possession', label: '名詞領屬' },
          { id: 'wordorder', label: '動詞前綴語序' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => handleRestart(cat.id)}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap border ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {!quizFinished ? (
        /* 作答區域 */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          {/* 進度條 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>第 {currentIndex + 1} 題 / 共 {filteredQuestions.length} 題</span>
              <span className="text-red-600">{currentQ.categoryTitle}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-emerald-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 題目描述 */}
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
            {currentQ.contextHu && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-base font-bold text-slate-800 text-center tracking-wide">
                {currentQ.contextHu}
              </div>
            )}
          </div>

          {/* 選項清單 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let optionStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-800';

              if (showExplanation) {
                if (opt.isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30';
                } else if (isSelected) {
                  optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/30';
                } else {
                  optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={showExplanation}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`p-4 rounded-2xl border text-left font-semibold text-sm sm:text-base transition-all flex items-center justify-between ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0 uppercase">
                      {opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {showExplanation && opt.isCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showExplanation && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 提示按鈕與提示卡片 */}
          {!showExplanation && currentQ.hint && (
            <div className="pt-2">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-slate-400 hover:text-amber-600 transition flex items-center gap-1 font-semibold"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> 需要提示？
                </button>
              ) : (
                <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                  <strong>提示：</strong>{currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* 作答後解析卡片 */}
          {showExplanation && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">繁體中文文法深度解析</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm transition flex items-center gap-2 shadow-md"
                >
                  {currentIndex + 1 < filteredQuestions.length ? '下一題' : '查看闖關成績'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 結算頁面 */
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-4xl shadow-inner">
            🏆
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              闖關圓滿完成！Gratulálok!
            </h3>
            <p className="text-slate-500 text-sm">
              您已完成當前單元的所有測驗，展現了對匈牙利語結構的敏銳理解！
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-400 font-medium">總積分</div>
              <div className="text-2xl font-black text-slate-900 font-mono mt-1">{score}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-400 font-medium">正確率</div>
              <div className="text-2xl font-black text-emerald-600 font-mono mt-1">
                {Math.round((userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100) || 0}%
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="text-xs text-slate-400 font-medium">最高連擊</div>
              <div className="text-2xl font-black text-amber-500 font-mono mt-1">{maxStreak}x</div>
            </div>
          </div>

          <button
            onClick={() => handleRestart('all')}
            className="px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition inline-flex items-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" /> 重新測驗 / 選擇其他題型
          </button>
        </div>
      )}
    </div>
  );
};
