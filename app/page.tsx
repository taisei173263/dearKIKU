import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { MainHeader } from '@/components/layout/main-header';
import { MainFooter } from '@/components/layout/main-footer';
import { WelcomeHero } from '@/components/home/welcome-hero';
import { AppFeatures } from '@/components/home/app-features';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-grow">
        <WelcomeHero />
        <AppFeatures />
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="container-width">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-nunito font-bold mb-6 text-slate-800 dark:text-white tracking-tight">
                親子の絆を深める旅に出かけましょう
              </h2>
              <p className="text-lg mb-8 text-slate-600 dark:text-slate-300 leading-relaxed">
                ゲームを通じて楽しみながら、家族の思考パターンについて発見し、お互いをより深く理解しましょう。
              </p>
              <Link href="/family">
                <Button
                  size="lg"
                  className="px-8 py-6 rounded-xl text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  始めましょう
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}