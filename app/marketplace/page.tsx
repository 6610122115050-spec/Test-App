"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ShootingStars = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    const newStars = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 40}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${3 + Math.random() * 6}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020617]">
      <style>{`
        @keyframes fall {
          0% { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(-800px) translateY(800px) rotate(-35deg); opacity: 0; }
        }
        .star-anim { animation: fall linear infinite; }
      `}</style>
      {stars.map((star) => (
        <div key={star.id} className="absolute h-[1px] w-[80px] bg-gradient-to-r from-white to-transparent star-anim"
          style={{ left: star.left, top: star.top, animationDelay: star.delay, animationDuration: star.duration, opacity: 0 }}
        />
      ))}
    </div>
  );
};

export default function MarketplacePage() {
  const [category, setCategory] = useState("All");

  const products = [
    { id: 1, name: "Valorant Points", price: "300 THB", type: "PC Games", icon: "💎", tag: "Popular" },
    { id: 2, name: "Genshin Welkin", price: "175 THB", type: "Mobile Games", icon: "🌙", tag: "Hot" },
    { id: 3, name: "Steam Wallet", price: "500 THB", type: "Gift Cards", icon: "🎮", tag: "Best Seller" },
    { id: 4, name: "ROV Shells", price: "200 THB", type: "Mobile Games", icon: "⚔️", tag: "New" },
  ];

  return (
    <div className="min-h-screen text-white relative font-sans">
      <ShootingStars />

      {/* Navbar - ปรับให้ตัวหนังสือ Login ขาวชัดเจน */}
      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/40 border-b border-white/10 sticky top-0 z-50">
        <Link href="/" className="text-3xl font-black tracking-tighter bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
          TOPUP.PRO
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-white hover:text-cyan-400 font-bold transition-colors">Home</Link>
          <Link href="/login">
            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 font-black shadow-lg shadow-blue-900/40">
              LOGIN
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-16 px-6">
        {/* Header - เพิ่มความสว่างและขนาด */}
        <div className="mb-14">
          <h1 className="text-6xl font-black mb-4 tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
            MARKETPLACE
          </h1>
          <p className="text-zinc-300 text-xl font-medium">
            เลือกซื้อไอเทมยอดนิยมจากทั่วโลก <span className="text-cyan-400">ราคาดีที่สุดในไทย</span>
          </p>
        </div>

        {/* Filter Categories - ปรับให้มองเห็นปุ่มชัดขึ้น */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {["All", "PC Games", "Mobile Games", "Gift Cards"].map((cat) => (
            <Button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-2xl px-10 py-7 text-lg font-bold transition-all border-2 ${
                category === cat 
                ? "bg-cyan-500 border-cyan-300 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)]" 
                : "bg-zinc-900/80 border-white/10 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid - ปรับชื่อสินค้าให้ขาวเด่น */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products
            .filter((p) => category === "All" || p.type === category)
            .map((item) => (
              <Card key={item.id} className="bg-zinc-900/60 border-2 border-white/5 backdrop-blur-2xl rounded-[2.5rem] hover:border-cyan-500/50 transition-all group overflow-hidden shadow-2xl">
                <CardContent className="p-10 flex items-center gap-8">
                  <div className="text-6xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold mb-2">
                      {item.tag}
                    </Badge>
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-cyan-400 font-black text-2xl tracking-tight">
                      {item.price}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="px-10 pb-10 pt-0">
                  <Button className="w-full bg-white/10 hover:bg-cyan-500 hover:text-white border-2 border-white/10 rounded-2xl py-8 text-xl font-black transition-all shadow-inner">
                    BUY NOW
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
    </div>
  );
}