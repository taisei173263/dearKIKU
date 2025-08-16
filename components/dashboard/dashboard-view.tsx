'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import { FamilyMember } from '@/lib/types';
import { BrainCircuit, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const familyMembers: FamilyMember[] = [
  { id: '1', name: 'お父さん', color: 'blue', avatar: '👨' },
  { id: '2', name: 'お母さん', color: 'orange', avatar: '👩' },
  { id: '3', name: '子ども1', color: 'green', avatar: '👦' },
  { id: '4', name: '子ども2', color: 'purple', avatar: '👧' },
];

const skillsData = {
  '1': [
    { subject: '論理思考', A: 80, fullMark: 100 },
    { subject: 'パターン認識', A: 70, fullMark: 100 },
    { subject: '記憶力', A: 60, fullMark: 100 },
    { subject: '創造性', A: 50, fullMark: 100 },
    { subject: '集中力', A: 75, fullMark: 100 },
  ],
  '2': [
    { subject: '論理思考', A: 65, fullMark: 100 },
    { subject: 'パターン認識', A: 85, fullMark: 100 },
    { subject: '記憶力', A: 75, fullMark: 100 },
    { subject: '創造性', A: 80, fullMark: 100 },
    { subject: '集中力', A: 70, fullMark: 100 },
  ],
  '3': [
    { subject: '論理思考', A: 60, fullMark: 100 },
    { subject: 'パターン認識', A: 75, fullMark: 100 },
    { subject: '記憶力', A: 90, fullMark: 100 },
    { subject: '創造性', A: 85, fullMark: 100 },
    { subject: '集中力', A: 65, fullMark: 100 },
  ],
  '4': [
    { subject: '論理思考', A: 70, fullMark: 100 },
    { subject: 'パターン認識', A: 60, fullMark: 100 },
    { subject: '記憶力', A: 65, fullMark: 100 },
    { subject: '創造性', A: 90, fullMark: 100 },
    { subject: '集中力', A: 80, fullMark: 100 },
  ],
};

const gameHistoryData = {
  '1': [
    { game: 'パターン認識', date: '2023-05-10', score: 4, total: 5 },
    { game: '論理思考', date: '2023-05-12', score: 2, total: 2 },
    { game: 'パターン認識', date: '2023-05-15', score: 3, total: 5 },
  ],
  '2': [
    { game: 'パターン認識', date: '2023-05-10', score: 5, total: 5 },
    { game: '論理思考', date: '2023-05-12', score: 1, total: 2 },
    { game: 'パターン認識', date: '2023-05-15', score: 4, total: 5 },
  ],
  '3': [
    { game: 'パターン認識', date: '2023-05-10', score: 3, total: 5 },
    { game: '論理思考', date: '2023-05-12', score: 2, total: 2 },
    { game: 'パターン認識', date: '2023-05-15', score: 5, total: 5 },
  ],
  '4': [
    { game: 'パターン認識', date: '2023-05-10', score: 2, total: 5 },
    { game: '論理思考', date: '2023-05-12', score: 1, total: 2 },
    { game: 'パターン認識', date: '2023-05-15', score: 4, total: 5 },
  ],
};

const compatibilityData = [
  { member1: '1', member2: '2', score: 85 },
  { member1: '1', member2: '3', score: 70 },
  { member1: '1', member2: '4', score: 65 },
  { member1: '2', member2: '3', score: 90 },
  { member1: '2', member2: '4', score: 80 },
  { member1: '3', member2: '4', score: 75 },
];

const getMemberNameById = (id: string) => {
  const member = familyMembers.find(m => m.id === id);
  return member ? member.name : '';
};

const getColorForMember = (id: string) => {
  const member = familyMembers.find(m => m.id === id);
  return member ? member.color : 'blue';
};

export function DashboardView() {
  const [selectedMemberId, setSelectedMemberId] = useState(familyMembers[0].id);
  
  const handleShare = () => {
    alert('この機能は開発中です。将来的には分析結果を共有できるようになります。');
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue={selectedMemberId} onValueChange={setSelectedMemberId}>
        <TabsList className="flex w-full mb-8 overflow-x-auto p-1">
          {familyMembers.map(member => (
            <TabsTrigger 
              key={member.id} 
              value={member.id}
              className="flex-1 min-w-[120px]"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-1">{member.avatar}</span>
                <span>{member.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {familyMembers.map(member => (
          <TabsContent key={member.id} value={member.id} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BrainCircuit className="h-5 w-5 mr-2" />
                    思考パターン分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart 
                        cx="50%" 
                        cy="50%" 
                        outerRadius="80%" 
                        data={skillsData[member.id]}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar 
                          name={member.name} 
                          dataKey="A" 
                          stroke={getChartColor(member.color)} 
                          fill={getChartColor(member.color)} 
                          fillOpacity={0.6} 
                        />
                        <Tooltip />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                    <p className="mb-2">
                      <strong>{member.name}の強み:</strong> {getStrengthsForMember(member.id)}
                    </p>
                    <p>
                      <strong>成長の機会:</strong> {getGrowthOpportunitiesForMember(member.id)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    家族との相性
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {compatibilityData
                      .filter(item => item.member1 === member.id || item.member2 === member.id)
                      .map((item, index) => {
                        const otherId = item.member1 === member.id ? item.member2 : item.member1;
                        const otherMember = familyMembers.find(m => m.id === otherId);
                        
                        return (
                          <div key={index} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <span className="text-2xl mr-2">{otherMember?.avatar}</span>
                                <span className="font-medium">{otherMember?.name}との相性</span>
                              </div>
                              <div className={cn(
                                "text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center",
                                item.score >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                                item.score >= 60 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                              )}>
                                {item.score}%
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className={cn(
                                  "h-2.5 rounded-full",
                                  item.score >= 80 ? "bg-green-500" :
                                  item.score >= 60 ? "bg-blue-500" :
                                  "bg-orange-500"
                                )}
                                style={{ width: `${item.score}%` }}
                              />
                            </div>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                              {getCompatibilityInsight(item.score)}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>ゲーム履歴</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">ゲーム</th>
                        <th className="text-left py-3 px-4">日付</th>
                        <th className="text-left py-3 px-4">スコア</th>
                        <th className="text-left py-3 px-4">評価</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gameHistoryData[member.id].map((entry, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4">{entry.game}</td>
                          <td className="py-3 px-4">{entry.date}</td>
                          <td className="py-3 px-4">{entry.score} / {entry.total}</td>
                          <td className="py-3 px-4">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-5 w-5 ${
                                    i < Math.round(entry.score / entry.total * 5)
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-8">
              <Button onClick={handleShare} className="gap-2">
                <Share2 className="h-5 w-5" />
                この分析を共有する
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// Helper functions
function getChartColor(color: string) {
  const colors = {
    'blue': '#4A90E2',
    'green': '#7ED321',
    'orange': '#F5A623',
    'purple': '#9013FE',
  };
  return colors[color as keyof typeof colors] || colors.blue;
}

function getStrengthsForMember(memberId: string) {
  const data = skillsData[memberId];
  const sortedSkills = [...data].sort((a, b) => b.A - a.A);
  const topSkills = sortedSkills.slice(0, 2).map(skill => skill.subject);
  
  return `${topSkills.join('と')}に優れています。`;
}

function getGrowthOpportunitiesForMember(memberId: string) {
  const data = skillsData[memberId];
  const sortedSkills = [...data].sort((a, b) => a.A - b.A);
  const bottomSkill = sortedSkills[0].subject;
  
  return `${bottomSkill}をさらに高めるゲームに挑戦するとよいでしょう。`;
}

function getCompatibilityInsight(score: number) {
  if (score >= 80) {
    return 'とても相性が良く、お互いを理解しています。';
  } else if (score >= 60) {
    return '良好な関係ですが、さらに理解を深める余地があります。';
  } else {
    return 'コミュニケーションを増やして理解を深めましょう。';
  }
}