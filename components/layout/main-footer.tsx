import Link from 'next/link';
import { Brain } from 'lucide-react';

export function MainFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="container-width py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-nunito font-bold text-xl text-slate-800 dark:text-white">ファミリーマインドブリッジ</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              親子関係強化と脳トレを組み合わせたWebアプリ。家族との絆を深めながら認知能力も向上させます。
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">リンク</h3>
            <div className="space-y-3">
              <Link href="/" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                ホーム
              </Link>
              <Link href="/family" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                家族
              </Link>
              <Link href="/games" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                ゲーム
              </Link>
              <Link href="/dashboard" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                分析
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">ヘルプ</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                よくある質問
              </Link>
              <Link href="#" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                お問い合わせ
              </Link>
              <Link href="#" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="#" className="block text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary transition-colors">
                利用規約
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ファミリーマインドブリッジ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}