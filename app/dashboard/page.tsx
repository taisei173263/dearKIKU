import { MainHeader } from '@/components/layout/main-header';
import { MainFooter } from '@/components/layout/main-footer';
import { DashboardView } from '@/components/dashboard/dashboard-view';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-grow">
        <section className="py-12 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-nunito font-bold mb-4 text-center">
              分析ダッシュボード
            </h1>
            <p className="text-center text-lg mb-12 text-slate-600 dark:text-slate-300">
              家族のゲームデータと思考パターンの分析結果
            </p>
            
            <DashboardView />
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}