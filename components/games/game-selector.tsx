'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, PuzzleIcon, ArrowRight } from 'lucide-react';

const games = [
  {
    id: 'pattern',
    title: 'パターン認識ゲーム',
    description: '家族の好みや考え方を予測して、お互いの理解を深めましょう。',
    icon: <Brain className="h-8 w-8 text-[#4A90E2]" />,
    image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'logic',
    title: '論理思考パズル',
    description: '論理的思考力を鍛える、様々な難易度のパズルに挑戦できます。',
    icon: <PuzzleIcon className="h-8 w-8 text-[#F5A623]" />,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    color: 'from-orange-500 to-orange-600',
  },
];

export function GameSelector() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  
  const handleGameSelection = (gameId: string) => {
    setSelectedGame(gameId);
    setTimeout(() => {
      router.push(`/games/${gameId}`);
    }, 500);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {games.map((game) => (
        <Card 
          key={game.id}
          className={`overflow-hidden transition-transform duration-300 hover:shadow-lg ${
            selectedGame === game.id ? 'scale-[1.02]' : ''
          }`}
        >
          <div className="relative h-48">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${game.color} opacity-60`}></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-center">
              <div className="bg-white dark:bg-slate-900 rounded-full p-3 w-fit">
                {game.icon}
              </div>
              <h3 className="text-2xl font-nunito font-bold mt-3 text-white">
                {game.title}
              </h3>
            </div>
          </div>
          
          <CardContent className="p-6">
            <p className="text-slate-600 dark:text-slate-300">
              {game.description}
            </p>
          </CardContent>
          
          <CardFooter className="pb-6 pt-0">
            <Button 
              className={`w-full ${
                game.id === 'pattern' ? 'bg-[#4A90E2] hover:bg-[#4A90E2]/90' : 'bg-[#F5A623] hover:bg-[#F5A623]/90'
              }`}
              onClick={() => handleGameSelection(game.id)}
            >
              プレイする <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}