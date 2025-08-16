import { MainHeader } from '@/components/layout/main-header';
import { MainFooter } from '@/components/layout/main-footer';
import { FamilyManagement } from '@/components/family/family-management';

export default function FamilyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-grow">
        <section className="py-12 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-nunito font-bold mb-4 text-center">
              家族メンバー管理
            </h1>
            <p className="text-center text-lg mb-12 text-slate-600 dark:text-slate-300">
              家族のメンバーを登録して、一緒にゲームを楽しみましょう
            </p>
            
            <FamilyManagement />
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}