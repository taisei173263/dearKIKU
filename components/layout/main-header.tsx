'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Brain, Home, Users, GamepadIcon, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container-width flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-nunito font-bold text-xl hidden sm:inline-block text-slate-800 dark:text-white">
              ファミリーマインドブリッジ
            </span>
            <span className="font-nunito font-bold text-xl sm:hidden text-slate-800 dark:text-white">FMB</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
            <Home className="h-4 w-4" />
            <span>ホーム</span>
          </Link>
          <Link href="/family" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
            <Users className="h-4 w-4" />
            <span>家族</span>
          </Link>
          <Link href="/games" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
            <GamepadIcon className="h-4 w-4" />
            <span>ゲーム</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
            <BarChart3 className="h-4 w-4" />
            <span>分析</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white dark:bg-slate-900 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-nunito font-bold text-xl text-slate-800 dark:text-white">ファミリーマインドブリッジ</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col p-6 space-y-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>ホーム</span>
          </Link>
          <Link
            href="/family"
            className="flex items-center gap-2 text-lg text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Users className="h-5 w-5" />
            <span>家族</span>
          </Link>
          <Link
            href="/games"
            className="flex items-center gap-2 text-lg text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <GamepadIcon className="h-5 w-5" />
            <span>ゲーム</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg text-slate-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <BarChart3 className="h-5 w-5" />
            <span>分析</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}