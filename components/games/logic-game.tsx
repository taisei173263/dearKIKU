'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Star, Home, Timer } from 'lucide-react';
import { LogicPuzzle } from '@/lib/types';
import { Confetti } from '@/components/ui/confetti';
import { cn } from '@/lib/utils';
import { BarChart3 } from 'lucide-react';

// Mock logic puzzles
const mockPuzzles: Record<string, LogicPuzzle[]> = {
  easy: [
    {
      id: '1',
      title: '数列パズル',
      description: '次に来る数字はなんでしょう？ 2, 4, 6, 8, ...',
      difficulty: 'easy',
      puzzleData: {
        sequence: [2, 4, 6, 8],
        options: [9, 10, 12, 14],
        answer: 10,
      },
    },
    {
      id: '2',
      title: 'パターン認識',
      description: '次の図形のパターンで、?に入るものはどれ？',
      difficulty: 'easy',
      puzzleData: {
        patternType: 'shape',
        options: ['circle', 'square', 'triangle', 'star'],
        answer: 'triangle',
      },
    },
  ],
  medium: [
    {
      id: '3',
      title: '論理問題',
      description: 'AさんはBさんより年上です。CさんはAさんより年下です。3人の中で最年少なのは？',
      difficulty: 'medium',
      puzzleData: {
        options: ['Aさん', 'Bさん', 'Cさん', '判断できない'],
        answer: 'Cさん',
      },
    },
    {
      id: '4',
      title: '推理パズル',
      description: '4人の子供がそれぞれ別の色のボールを持っています。次のヒントから、誰がどの色のボールを持っているか推理してください。',
      difficulty: 'medium',
      puzzleData: {
        hints: [
          'タロウは赤いボールではありません',
          'ハナコは青いボールを持っています',
          'ケイスケは緑か黄色のボールです',
          'ユミは黄色いボールではありません',
        ],
        question: '赤いボールを持っているのは誰？',
        options: ['タロウ', 'ハナコ', 'ケイスケ', 'ユミ'],
        answer: 'ユミ',
      },
    },
  ],
};

export function LogicGame() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium'>('easy');
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed'>('playing');
  const [showConfetti, setShowConfetti] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  const currentPuzzle = mockPuzzles[difficulty][currentPuzzleIndex];
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, gameState]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium') => {
    setDifficulty(newDifficulty);
    setCurrentPuzzleIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setGameState('playing');
    setTimer(0);
  };
  
  const handleAnswerSelect = (answer: string | number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isAnswerCorrect = answer === currentPuzzle.puzzleData.answer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    
    setIsTimerRunning(false);
  };
  
  const handleNextPuzzle = () => {
    if (currentPuzzleIndex < mockPuzzles[difficulty].length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsTimerRunning(true);
    } else {
      setGameState('completed');
    }
  };
  
  const resetGame = () => {
    setCurrentPuzzleIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setGameState('playing');
    setTimer(0);
    setIsTimerRunning(true);
  };
  
  const renderOptions = () => {
    const options = currentPuzzle.puzzleData.options;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {options.map((option, index) => (
          <Card
            key={index}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              isAnswered && option === currentPuzzle.puzzleData.answer
                ? "border-2 border-green-500 bg-green-50 dark:bg-green-900/20"
                : isAnswered && option === selectedAnswer
                ? "border-2 border-red-500 bg-red-50 dark:bg-red-900/20"
                : "border-2 border-gray-200 dark:border-gray-700"
            )}
            onClick={() => handleAnswerSelect(option)}
          >
            <CardContent className="p-6 text-center">
              <p className="text-lg font-medium">{option}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  const renderPuzzleContent = () => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BrainCircuit className={cn(
              "h-5 w-5",
              difficulty === 'easy' ? "text-blue-500" : "text-orange-500"
            )} />
            <span className={cn(
              "text-sm font-medium px-2 py-1 rounded",
              difficulty === 'easy' 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" 
                : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
            )}>
              {difficulty === 'easy' ? '簡単' : '普通'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-slate-500" />
            <span className="text-sm font-medium">{formatTime(timer)}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{currentPuzzle.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{currentPuzzle.description}</p>
        
        {currentPuzzle.puzzleData.hints && (
          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg mb-6">
            <p className="font-medium mb-2">ヒント:</p>
            <ul className="list-disc pl-5 space-y-1">
              {currentPuzzle.puzzleData.hints.map((hint, index) => (
                <li key={index} className="text-sm text-slate-600 dark:text-slate-300">
                  {hint}
                </li>
              ))}
            </ul>
            {currentPuzzle.puzzleData.question && (
              <p className="font-medium mt-4">{currentPuzzle.puzzleData.question}</p>
            )}
          </div>
        )}
        
        {currentPuzzle.puzzleData.sequence && (
          <div className="flex items-center justify-center gap-6 my-8">
            {currentPuzzle.puzzleData.sequence.map((num, index) => (
              <div key={index} className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl font-bold">
                {num}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center text-xl font-bold">
              ?
            </div>
          </div>
        )}
        
        {renderOptions()}
        
        {isAnswered && (
          <div className={cn(
            "mt-6 p-4 rounded-lg text-center",
            isCorrect 
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
          )}>
            <p className="font-medium">
              {isCorrect 
                ? '正解です！素晴らしい！' 
                : `不正解です。正解は ${currentPuzzle.puzzleData.answer} でした。`}
            </p>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-[calc(100vh-64px-200px)]">
      <div className="max-w-4xl mx-auto">
        {gameState === 'playing' ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-nunito font-bold text-slate-800 dark:text-white">
                論理思考パズル
              </h1>
              <div className="flex items-center gap-2">
                <div className="text-lg font-medium text-slate-800 dark:text-white">
                  {score} / {currentPuzzleIndex + 1}
                </div>
              </div>
            </div>
            
            <Tabs value={difficulty} onValueChange={(value) => handleDifficultyChange(value as 'easy' | 'medium')} className="mb-8">
              <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2">
                <TabsTrigger value="easy">簡単</TabsTrigger>
                <TabsTrigger value="medium">普通</TabsTrigger>
              </TabsList>
              
              <TabsContent value="easy" className="mt-6">
                {renderPuzzleContent()}
              </TabsContent>
              
              <TabsContent value="medium" className="mt-6">
                {renderPuzzleContent()}
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                disabled={!isAnswered}
                onClick={handleNextPuzzle}
                className={cn(
                  "text-lg px-8 py-6",
                  difficulty === 'easy' 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-orange-500 hover:bg-orange-600"
                )}
              >
                {currentPuzzleIndex < mockPuzzles[difficulty].length - 1 ? '次のパズル' : '結果を見る'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className={cn(
              "inline-block text-white py-3 px-6 rounded-full mb-6",
              difficulty === 'easy' ? "bg-blue-500" : "bg-orange-500"
            )}>
              ゲーム完了！
            </div>
            <h2 className="text-3xl md:text-4xl font-nunito font-bold mb-4 text-slate-800 dark:text-white">
              おめでとうございます！
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className={cn(
                "text-5xl font-bold",
                difficulty === 'easy' ? "text-blue-500" : "text-orange-500"
              )}>
                {score}
              </div>
              <div className="text-2xl text-slate-600 dark:text-slate-400">/ {mockPuzzles[difficulty].length}</div>
            </div>
            
            <div className="text-lg font-medium flex items-center justify-center gap-2 mb-8">
              <Timer className="h-5 w-5 text-slate-500" />
              <span>所要時間: {formatTime(timer)}</span>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg mb-8">
              <div className="flex justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-8 w-8",
                      i < Math.round(score / mockPuzzles[difficulty].length * 5)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                {score === mockPuzzles[difficulty].length
                  ? '素晴らしい！論理的思考力が高いですね！'
                  : score >= mockPuzzles[difficulty].length / 2
                  ? '良い結果です！さらに論理的思考力を鍛えましょう。'
                  : 'まだまだ伸びしろがあります！このゲームを通じて論理的思考力を鍛えましょう。'}
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
                className={cn(
                  "px-6 py-6",
                  difficulty === 'easy' 
                    ? "bg-blue-500 hover:bg-blue-600" 
                    : "bg-orange-500 hover:bg-orange-600"
                )}
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

function BrainCircuit(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
      <path d="M16 8V5c0-1.1.9-2 2-2" />
      <path d="M12 13h4" />
      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
      <path d="M12 8h8" />
      <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    </svg>
  );
}