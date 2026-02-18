"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; // นำเข้า Link สำหรับการนำทาง
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Component ดาวตกแบบเคลื่อนไหว (Background) ---
const ShootingStarsBackground = () => {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${3 + Math.random() * 5}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617]">
      {/* แสงฟุ้งกระจาย Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
      
      <style jsx>{`
        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(-1000px) translateY(1000px) rotate(-45deg); opacity: 0; }
        }
        .star {
          position: absolute;
          width: 120px;
          height: 2px;
          background: linear-gradient(90deg, #fff, transparent);
          animation: shooting linear infinite;
        }
      `}</style>
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
};

// --- หน้าหลัก Home ---
export default function Home() {
  const games = [
    { id: 1, name: "Valorant", color: "from-rose-500 to-red-600", glow: "shadow-red-500/40", icon: "🔫", promo: "10% OFF" },
    { id: 2, name: "Genshin", color: "from-cyan-400 to-blue-500", glow: "shadow-cyan-500/40", icon: "✨", promo: "BONUS x2" },
    { id: 3, name: "ROV", color: "from-purple-500 to-indigo-600", glow: "shadow-purple-500/40", icon: "🛡️", promo: "HOT" },
    { id: 4, name: "Free Fire", color: "from-emerald-400 to-green-600", glow: "shadow-emerald-500/40", icon: "🎯", promo: "NEW" },
  ];

  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500/30">
      <ShootingStarsBackground />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-xl bg-black/40 border-b border-white/5 sticky top-0 z-50">
        <Link href="/">
          <div className="text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer">
            TOPUP.PRO
          </div>
        </Link>
        <div className="flex gap-4">
          <Link href="/marketplace">
          <Button variant="ghost" className="hover:bg-white/5 text-zinc-300">Marketplace</Button>
          </Link>
          {/* ส่วนที่แก้ไข: เพิ่ม Link ครอบปุ่ม Login */}
          <Link href="/login">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform rounded-full px-8 font-bold shadow-lg shadow-indigo-500/20">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="max-w-7xl mx-auto py-20 px-6">
        <section className="mb-20 text-center lg:text-left">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-6 py-1 px-4">
            ✨ Trusted by 1M+ Players
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            LEVEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase">Up</span> <br />
            YOUR GAME
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            สัมผัสประสบการณ์เติมเกมที่เร็วที่สุดในโลก ระบบอัตโนมัติ 24 ชม. <br className="hidden md:block" />
            การันตีความปลอดภัยด้วยระบบป้องกันการโดนแบน 100%
          </p>
        </section>

        {/* Game Cards Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <div key={game.id} className="group relative">
              {/* Card Glow Background */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${game.color} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-30 transition duration-500`}></div>
              
              <Card className="relative bg-zinc-900/50 border-white/10 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:-translate-y-4 group-hover:border-white/20">
                <CardHeader className="h-48 relative flex items-center justify-center">
                   <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20`}></div>
                   <div className="text-8xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                     {game.icon}
                   </div>
                   <Badge className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border-white/20 text-[10px] font-bold">
                     {game.promo}
                   </Badge>
                </CardHeader>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-1 tracking-tight">{game.name}</h3>
                  <p className="text-zinc-500 text-sm font-medium">Auto Delivery • 24/7</p>
                </CardContent>

                <CardFooter className="p-8 pt-0">
                  <Button className={`w-full py-7 rounded-2xl font-black text-lg bg-gradient-to-r ${game.color} shadow-2xl ${game.glow} hover:brightness-125 transition-all`}>
                    เติมเงินเลย
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}