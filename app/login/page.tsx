"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- ใช้ Component ดาวตกตัวเดิมเพื่อให้ดีไซน์ต่อเนื่อง ---
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
        <div key={star.id} className="star" style={{ left: star.left, top: star.top, animationDelay: star.delay, animationDuration: star.duration }} />
      ))}
    </div>
  );
};

export default function LoginPage() {
  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center justify-center p-6 relative">
      <ShootingStarsBackground />

      {/* ปุ่มย้อนกลับ */}
      <Link href="/" className="absolute top-8 left-8">
        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
          ← Back to Home
        </Button>
      </Link>

      <div className="w-full max-w-[450px] relative group">
        {/* แสง Aura รอบกล่อง Login */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <Card className="relative bg-zinc-900/60 border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-4 shadow-2xl">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="text-4xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              WELCOME BACK
            </div>
            <p className="text-zinc-400 text-sm">เข้าสู่ระบบเพื่อเริ่มเติมเกมที่รวดเร็วที่สุด</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Input fields จำลองด้วย Tailwind (เน้นความสวยงาม) */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-4">Username / Email</label>
                <input 
                  type="text" 
                  placeholder="Enter your username" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-4">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors">Forgot Password?</button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pb-8">
            <Button className="w-full py-7 rounded-2xl font-black text-lg bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:brightness-125 hover:scale-[1.02] transition-all duration-300">
              SIGN IN
            </Button>
            
            <p className="text-center text-zinc-500 text-sm">
              Don't have an account? 
              <Link href="#" className="text-cyan-400 hover:underline ml-1 font-bold">Sign Up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Footer เล็กๆ */}
      <div className="mt-12 text-zinc-600 text-[10px] tracking-[0.2em] uppercase font-bold">
        Secure Encryption & Protected by TOPUP.PRO
      </div>
    </div>
  );
}