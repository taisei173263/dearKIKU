import { MainHeader } from '@/components/layout/main-header';
import { MainFooter } from '@/components/layout/main-footer';
import { PatternGame } from '@/components/games/pattern-game';

export default function PatternGamePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-grow">
        <PatternGame />
      </main>
      <MainFooter />
    </div>
  );
}