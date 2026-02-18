"use client"; // สำคัญมาก: ต้องอยู่บรรทัดที่ 1

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- ส่วนของ Background ดาวตก ---
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
        <div
          key={star.id}
          className="absolute h-[1px] w-[80px] bg-gradient-to-r from-white to-transparent star-anim"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

// --- หน้าหลัก Marketplace ---
export default function MarketplacePage() {
  const [category, setCategory] = useState("All");

  const products = [
    { id: 1, name: "Valorant Points", price: "300 THB", type: "PC Games", icon: "💎", tag: "Popular" },
    { id: 2, name: "Genshin Welkin", price: "175 THB", type: "Mobile Games", icon: "🌙", tag: "Hot" },
    { id: 3, name: "Steam Wallet", price: "500 THB", type: "Gift Cards", icon: "🎮", tag: "Best Seller" },
    { id: 4, name: "ROV Shells", price: "200 THB", type: "Mobile Games", icon: "⚔️", tag: "New" },
  ];

  return (
    <div className="min-h-screen text-white relative">
      <ShootingStars />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/20 border-b border-white/5 sticky top-0 z-50">
        <Link href="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          TOPUP.PRO
        </Link>
        <div className="flex gap-4">
          <Link href="/"><Button variant="ghost">Home</Button></Link>
          <Link href="/login"><Button className="bg-blue-600 rounded-full px-6">Login</Button></Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-2 tracking-tight">MARKETPLACE</h1>
          <p className="text-zinc-500">เลือกซื้อไอเทมยอดนิยมจากทั่วโลก</p>
        </div>

        {/* Categories Filter */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-4">
          {["All", "PC Games", "Mobile Games", "Gift Cards"].map((cat) => (
            <Button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-xl px-8 transition-all ${
                category === cat ? "bg-cyan-500 text-white" : "bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products
            .filter((p) => category === "All" || p.type === category)
            .map((item) => (
              <Card key={item.id} className="bg-zinc-900/40 border-white/5 backdrop-blur-xl rounded-[2rem] hover:border-cyan-500/50 transition-all group">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400/30 mb-1">{item.tag}</Badge>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-cyan-400 font-black">{item.price}</p>
                  </div>
                </CardContent>
                <CardFooter className="px-8 pb-8 pt-0">
                  <Button className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 hover:bg-cyan-500 hover:text-white transition-all font-bold">
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
    </div>
  );
}