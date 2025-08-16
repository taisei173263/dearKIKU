import { Brain, PuzzleIcon, BarChart3, Users } from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "パターン認識ゲーム",
    description: "家族の好みや考え方を予測する楽しいゲームで、お互いをより深く理解しましょう。"
  },
  {
    icon: <PuzzleIcon className="h-10 w-10 text-amber-500" />,
    title: "論理思考パズル",
    description: "家族全員の論理的思考力を鍛える、年齢に合わせた難易度のパズルに挑戦できます。"
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-green-500" />,
    title: "思考パターン分析",
    description: "ゲーム結果から家族それぞれの思考パターンを可視化し、相互理解を深めます。"
  },
  {
    icon: <Users className="h-10 w-10 text-violet-500" />,
    title: "家族の相性マップ",
    description: "家族間の相性を分析して表示。コミュニケーションのヒントが得られます。"
  }
];

export function AppFeatures() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="font-nunito text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-white">
            家族で楽しく学べる機能
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            ファミリーマインドブリッジは、ゲームを通じて家族の絆を深める様々な機能を提供します。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-nunito text-xl font-bold mb-3 text-slate-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}