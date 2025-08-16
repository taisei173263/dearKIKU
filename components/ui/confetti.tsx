'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Confetti() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    animationDelay: number;
  }>>([]);

  useEffect(() => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-purple-500',
      'bg-pink-500',
    ];
    
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 20,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      animationDelay: Math.random() * 0.5,
    }));
    
    setParticles(newParticles);
    
    // Cleanup
    return () => {
      setParticles([]);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute rounded-sm",
            particle.color
          )}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `celebration 1.5s ease-out forwards`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}