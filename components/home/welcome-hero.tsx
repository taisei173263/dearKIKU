import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function WelcomeHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-800/50"></div>
      
      <div className="container-width relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-nunito text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
            <span className="text-primary">ファミリーマインドブリッジ</span>で
            <br />家族の絆を深めよう
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl">
            楽しいゲームを通して家族の思考パターンを理解し、
            コミュニケーションの質を高めるためのWebアプリです。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/family">
              <Button size="lg" className="px-6 py-6 rounded-xl text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                今すぐ始める <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="px-6 py-6 rounded-xl text-lg border-2 hover:bg-secondary/50 transition-all duration-300">
                詳しく見る
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.pexels.com/photos/7282800/pexels-photo-7282800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="親子でアプリを使用している様子"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}