import { MainHeader } from '@/components/layout/main-header';
import { MainFooter } from '@/components/layout/main-footer';
import { LogicGame } from '@/components/games/logic-game';

export default function LogicGamePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-grow">
        <LogicGame />
      </main>
      <MainFooter />
    </div>
  );
}