'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BadgeCheck, Plus, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { FamilyMember, COLORS } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export function FamilyManagement() {
  const router = useRouter();
  const { toast } = useToast();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'お父さん', color: COLORS.BLUE, avatar: '👨' },
    { id: '2', name: 'お母さん', color: COLORS.ORANGE, avatar: '👩' },
  ]);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    avatar: '👦'
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const avatarOptions = ['👨', '👩', '👦', '👧', '👴', '👵', '🧒', '👶'];
  
  const handleAddMember = () => {
    if (!newMember.name) {
      toast({
        title: "名前を入力してください",
        variant: "destructive",
      });
      return;
    }
    
    if (familyMembers.length >= 4) {
      toast({
        title: "最大4人まで登録できます",
        description: "これ以上メンバーを追加できません",
        variant: "destructive",
      });
      return;
    }
    
    const colorOptions = Object.values(COLORS);
    const usedColors = familyMembers.map(member => member.color);
    const availableColors = colorOptions.filter(color => !usedColors.includes(color));
    const randomColor = availableColors[0] || colorOptions[0];
    
    const member: FamilyMember = {
      id: Date.now().toString(),
      name: newMember.name,
      color: randomColor,
      avatar: newMember.avatar || '👦',
    };
    
    setFamilyMembers([...familyMembers, member]);
    setNewMember({ name: '', avatar: '👦' });
    setIsDialogOpen(false);
    
    toast({
      title: "メンバーを追加しました",
      description: `${member.name}を家族に追加しました`,
    });
  };
  
  const handleUpdateMember = () => {
    if (!newMember.name || !editingId) return;
    
    setFamilyMembers(prevMembers => 
      prevMembers.map(member => 
        member.id === editingId 
          ? { ...member, name: newMember.name, avatar: newMember.avatar || member.avatar }
          : member
      )
    );
    
    setNewMember({ name: '', avatar: '👦' });
    setEditingId(null);
    setIsDialogOpen(false);
    
    toast({
      title: "メンバー情報を更新しました",
    });
  };
  
  const handleDeleteMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
    
    toast({
      title: "メンバーを削除しました",
    });
  };
  
  const handleEditMember = (member: FamilyMember) => {
    setNewMember({ name: member.name, avatar: member.avatar });
    setEditingId(member.id);
    setIsDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setNewMember({ name: '', avatar: '👦' });
    setEditingId(null);
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {familyMembers.map((member) => (
          <Card key={member.id} className={cn("transition-all hover:shadow-md", 
            member.color === COLORS.BLUE && "border-blue-300 dark:border-blue-700",
            member.color === COLORS.GREEN && "border-green-300 dark:border-green-700",
            member.color === COLORS.ORANGE && "border-orange-300 dark:border-orange-700",
            member.color === COLORS.PURPLE && "border-purple-300 dark:border-purple-700"
          )}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span>{member.name}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditMember(member)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMember(member.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-6 flex flex-col items-center">
              <div className={cn("text-5xl my-4 bg-slate-100 dark:bg-slate-800 rounded-full p-4 h-20 w-20 flex items-center justify-center",
                member.color === COLORS.BLUE && "bg-blue-100 dark:bg-blue-900/40",
                member.color === COLORS.GREEN && "bg-green-100 dark:bg-green-900/40",
                member.color === COLORS.ORANGE && "bg-orange-100 dark:bg-orange-900/40",
                member.color === COLORS.PURPLE && "bg-purple-100 dark:bg-purple-900/40"
              )}>
                {member.avatar}
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-center">
              <Badge color={member.color} />
            </CardFooter>
          </Card>
        ))}
        
        {familyMembers.length < 4 && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Card className="border-dashed cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800 flex flex-col items-center justify-center h-[220px]">
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <Plus className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground font-medium">メンバーを追加</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? 'メンバー情報の編集' : '新しいメンバーを追加'}</DialogTitle>
                <DialogDescription>
                  {editingId 
                    ? 'メンバー情報を更新してください。' 
                    : '家族のメンバー情報を入力してください。最大4人まで登録できます。'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">名前</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="名前を入力"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label>アバター</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setNewMember({ ...newMember, avatar })}
                        className={cn(
                          "h-12 text-2xl rounded-md flex items-center justify-center",
                          newMember.avatar === avatar
                            ? "bg-primary/20 ring-2 ring-primary"
                            : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                        )}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={handleDialogClose}>
                  キャンセル
                </Button>
                <Button onClick={editingId ? handleUpdateMember : handleAddMember}>
                  {editingId ? '更新' : '追加'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <Separator className="my-8" />
      
      <div className="flex justify-center">
        <Button 
          size="lg"
          className="px-8"
          onClick={() => router.push('/games')}
          disabled={familyMembers.length < 2}
        >
          ゲームで遊ぶ <BadgeCheck className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
      {familyMembers.length < 2 && (
        <p className="text-center text-muted-foreground">
          ゲームを始めるには最低2人の家族メンバーが必要です
        </p>
      )}
    </div>
  );
}

function Badge({ color }: { color: string }) {
  return (
    <div className={cn(
      "text-xs font-medium px-2 py-1 rounded-full",
      color === COLORS.BLUE && "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
      color === COLORS.GREEN && "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
      color === COLORS.ORANGE && "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
      color === COLORS.PURPLE && "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
    )}>
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-current" />
        <span>登録済み</span>
      </div>
    </div>
  );
}