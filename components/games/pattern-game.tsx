'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Home, ArrowRight, Star } from 'lucide-react';
import { PatternQuestion } from '@/lib/types';
import { Confetti } from '@/components/ui/confetti';
import { cn } from '@/lib/utils';

// Mock questions for the pattern recognition game
const mockQuestions: PatternQuestion[] = [
  {
    id: '1',
    question: 'お父さんが好きな色はどれでしょう？',
    targetMemberId: '1',
    answerId: '2',
    options: [
      { id: '1', text: '赤' },
      { id: '2', text: '青' },
      { id: '3', text: '緑' },
      { id: '4', text: '黄色' },
    ],
  },
  {
    id: '2',
    question: 'お母さんが休日にしたいことはどれでしょう？',
    targetMemberId: '2',
    answerId: '3',
    options: [
      { id: '1', text: '映画鑑賞' },
      { id: '2', text: 'ショッピング' },
      { id: '3', text: '読書' },
      { id: '4', text: 'カフェでくつろぐ' },
    ],
  },
  {
    id: '3',
    question: 'お父さんが好きな食べ物はどれでしょう？',
    targetMemberId: '1',
    answerId: '1',
    options: [
      { id: '1', text: 'ラーメン' },
      { id: '2', text: 'ピザ' },
      { id: '3', text: 'カレー' },
      { id: '4', text: 'ステーキ' },
    ],
  },
  {
    id: '4',
    question: 'お母さんが好きな季節はどれでしょう？',
    targetMemberId: '2',
    answerId: '4',
    options: [
      { id: '1', text: '春' },
      { id: '2', text: '夏' },
      { id: '3', text: '秋' },
      { id: '4', text: '冬' },
    ],
  },
  {
    id: '5',
    question: 'お父さんが苦手なものはどれでしょう？',
    targetMemberId: '1',
    answerId: '3',
    options: [
      { id: '1', text: '虫' },
      { id: '2', text: '高所' },
      { id: '3', text: 'なす' },
      { id: '4', text: '乗り物' },
    ],
  },
];

export function PatternGame() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const [showConfetti, setShowConfetti] = useState(false);
  
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;
  
  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    
    setSelectedOptionId(optionId);
    setIsAnswered(true);
    
    if (optionId === currentQuestion.answerId) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setGameState('completed');
    }
  };
  
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setGameState('playing');
  };
  
  const getOptionCardClass = (optionId: string) => {
    if (!isAnswered) {
      return 'border-2 hover:border-blue-400 hover:shadow-md cursor-pointer';
    }
    
    if (optionId === currentQuestion.answerId) {
      return 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20';
    }
    
    if (optionId === selectedOptionId && optionId !== currentQuestion.answerId) {
      return 'border-2 border-red-500 bg-red-50 dark:bg-red-900/20';
    }
    
    return 'border-2 opacity-70';
  };
  
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-[calc(100vh-64px-200px)]">
      <div className="max-w-4xl mx-auto">
        {gameState === 'playing' ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-nunito font-bold text-slate-800 dark:text-white">
                パターン認識ゲーム
              </h1>
              <div className="flex items-center gap-2">
                <div className="text-lg font-medium text-slate-800 dark:text-white">
                  {score} / {currentQuestionIndex + 1}
                </div>
              </div>
            </div>
            
            <Progress value={progress} className="h-2 mb-8" />
            
            <div className="mb-10 text-center">
              <div className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 py-2 px-4 rounded-full mb-4">
                質問 {currentQuestionIndex + 1}/{mockQuestions.length}
              </div>
              <h2 className="text-2xl md:text-3xl font-nunito font-bold mb-8 text-slate-800 dark:text-white">
                {currentQuestion.question}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    "p-6 transition-all duration-300",
                    getOptionCardClass(option.id)
                  )}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">{option.text}</p>
                    {isAnswered && option.id === currentQuestion.answerId && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                    {isAnswered && option.id === selectedOptionId && option.id !== currentQuestion.answerId && (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                disabled={!isAnswered}
                onClick={handleNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-6"
              >
                {currentQuestionIndex < mockQuestions.length - 1 ? '次の質問' : '結果を見る'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="inline-block bg-blue-500 text-white py-3 px-6 rounded-full mb-6">
              ゲーム完了！
            </div>
            <h2 className="text-3xl md:text-4xl font-nunito font-bold mb-4 text-slate-800 dark:text-white">
              おめでとうございます！
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="text-5xl font-bold text-blue-500">
                {score}
              </div>
              <div className="text-2xl text-slate-600 dark:text-slate-400">/ {mockQuestions.length}</div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg mb-8">
              <div className="flex justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-8 w-8",
                      i < Math.round(score / mockQuestions.length * 5)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                {score === mockQuestions.length
                  ? 'すばらしい！家族のことをよく理解していますね！'
                  : score >= mockQuestions.length / 2
                  ? '良い結果です！さらに家族について知る機会を増やしましょう。'
                  : 'まだまだ発見があります！このゲームを通じて家族についてもっと知りましょう。'}
              </p>
              
              <p className="text-slate-600 dark:text-slate-400">
                このスコアは分析ダッシュボードに記録されます
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-6 py-6"
                onClick={() => router.push('/dashboard')}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                分析を見る
              </Button>
              <Button
                size="lg"
                className="px-6 py-6"
                onClick={resetGame}
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                もう一度プレイ
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="px-6 py-6"
                onClick={() => router.push('/games')}
              >
                <Home className="mr-2 h-5 w-5" />
                ゲーム選択に戻る
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {showConfetti && <Confetti />}
    </div>
  );
}

// Internal component to avoid importing from barrel file
function BarChart3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16v-3" />
      <path d="M11 16v-8" />
      <path d="M15 16v-5" />
      <path d="M19 16v-2" />
    </svg>
  );
}