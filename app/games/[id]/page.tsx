"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, CreditCard, ShieldCheck, Zap, Star, Gift } from "lucide-react";

// --- Mock Data ---
const GAMES_DATA: Record<string, any> = {
    "1": {
        id: "1",
        name: "Valorant",
        description: "เติม Valorant Points (VP) ราคาคุ้มที่สุด สะดวก รวดเร็ว ปลอดภัย 100%",
        bg: "bg-red-950",
        accent: "text-red-500",
        gradient: "from-rose-500 to-red-600",
        icon: "🔫",
        packages: [
            { id: "vp-1", name: "380 VP", price: 115, bonus: "+0" },
            { id: "vp-2", name: "1,275 VP", price: 360, bonus: "+15" },
            { id: "vp-3", name: "2,600 VP", price: 720, bonus: "+50" },
            { id: "vp-4", name: "5,350 VP", price: 1450, bonus: "+150" },
            { id: "vp-5", name: "11,000 VP", price: 2850, bonus: "+400" },
            { id: "vp-6", name: "22,500 VP", price: 5600, bonus: "+1000", popular: true },
        ],
    },
    "2": {
        id: "2",
        name: "Genshin Impact",
        description: "เติม Genesis Crystals ราคาดีที่สุด โปรโมชั่นคูณ 2 สำหรับการเติมครั้งแรก",
        bg: "bg-blue-950",
        accent: "text-blue-400",
        gradient: "from-cyan-400 to-blue-500",
        icon: "✨",
        packages: [
            { id: "gc-1", name: "60 Crystals", price: 35, bonus: "+60" },
            { id: "gc-2", name: "300 Crystals", price: 179, bonus: "+300" },
            { id: "gc-3", name: "980 Crystals", price: 549, bonus: "+980" },
            { id: "gc-4", name: "1,980 Crystals", price: 1100, bonus: "+1980", popular: true },
            { id: "gc-5", name: "3,280 Crystals", price: 1800, bonus: "+3280" },
            { id: "gc-6", name: "6,480 Crystals", price: 3700, bonus: "+6480" },
        ],
    },
    "3": {
        id: "3",
        name: "ROV",
        description: "เติมคูปอง ROV สะดวก รวดเร็ว เข้าทันที ไม่ต้องรอนาน",
        bg: "bg-purple-950",
        accent: "text-purple-400",
        gradient: "from-purple-500 to-indigo-600",
        icon: "🛡️",
        packages: [
            { id: "rov-1", name: "35 Coupons", price: 10, bonus: "" },
            { id: "rov-2", name: "247 Coupons", price: 69, bonus: "" },
            { id: "rov-3", name: "746 Coupons", price: 205, bonus: "", popular: true },
            { id: "rov-4", name: "2,530 Coupons", price: 690, bonus: "" },
            { id: "rov-5", name: "5,150 Coupons", price: 1400, bonus: "" },
        ],
    },
    "4": {
        id: "4",
        name: "Free Fire",
        description: "เติมเพชร Free Fire ราคาประหยัด โปรโมชั่นเพียบ",
        bg: "bg-emerald-950",
        accent: "text-emerald-400",
        gradient: "from-emerald-400 to-green-600",
        icon: "🎯",
        packages: [
            { id: "ff-1", name: "100 Diamonds", price: 35, bonus: "+10" },
            { id: "ff-2", name: "310 Diamonds", price: 100, bonus: "+31" },
            { id: "ff-3", name: "1,060 Diamonds", price: 350, bonus: "+106", popular: true },
            { id: "ff-4", name: "2,180 Diamonds", price: 700, bonus: "+218" },
            { id: "ff-5", name: "5,600 Diamonds", price: 1750, bonus: "+560" },
        ],
    },
};

export default function GameDetails() {
    const params = useParams();
    const router = useRouter();
    const gameFullId = params.id as string;
    const gameId = gameFullId; // In a real app complexity might vary

    const game = GAMES_DATA[gameId];

    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<"full" | "installment">("full");
    const [installmentMonths, setInstallmentMonths] = useState<number>(3);
    const [isProcessing, setIsProcessing] = useState(false);

    // Auto-select first popular package or first one
    useEffect(() => {
        if (game && !selectedPackage) {
            const popular = game.packages.find((p: any) => p.popular);
            setSelectedPackage(popular ? popular.id : game.packages[0].id);
        }
    }, [game, selectedPackage]);

    if (!game) {
        return (
            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
                    <Link href="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const activePackage = game.packages.find((p: any) => p.id === selectedPackage);

    // Calculation Logic
    const totalPrice = activePackage ? activePackage.price : 0;
    // Interest rate mockup: 0% for 3 months, 2% for 6+ months
    const interestRate = installmentMonths > 3 ? 0.02 : 0;
    const totalInterest = totalPrice * interestRate;
    const finalPrice = totalPrice + totalInterest;
    const monthlyPayment = finalPrice / installmentMonths;

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            alert(`Payment Successful using ${paymentMethod === "full" ? "Full Payment" : `Installment (${installmentMonths} months)`}!`);
            setIsProcessing(false);
            router.push("/");
        }, 2000);
    };

    return (
        <div className={`min-h-screen text-white font-sans selection:bg-white/20 pb-20 bg-[#020617]`}>
            {/* Ambient Background */}
            <div className={`fixed inset-0 pointer-events-none -z-10`}>
                <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br ${game.gradient} opacity-[0.08] blur-[150px] rounded-full`}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full"></div>
            </div>

            {/* Navbar Simple */}
            <nav className="flex items-center px-6 py-6 border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-black/20">
                <Link href="/" className="flex items-center gap-2 group text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Store</span>
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <div className="text-sm font-medium text-zinc-400">Balance: ฿0.00</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-zinc-700 to-zinc-600 border border-white/10"></div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Column: Game Info & Packages */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Header */}
                    <div className="relative overflow-hidden rounded-3xl p-10 border border-white/10 bg-zinc-900/30 backdrop-blur-md">
                        <div className={`absolute inset-0 bg-gradient-to-r ${game.gradient} opacity-10`}></div>
                        <div className="relative flex items-center gap-8">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-zinc-950 flex items-center justify-center text-6xl shadow-2xl border border-white/10">
                                {game.icon}
                            </div>
                            <div>
                                <Badge className={`mb-3 ${game.bg} border-white/10 text-white/90 font-bold hover:bg-opacity-80`}>
                                    Official Distributor
                                </Badge>
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">{game.name}</h1>
                                <p className="text-zinc-400 max-w-lg leading-relaxed">{game.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Packages Grid */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded">1</span>
                            Select Package
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {game.packages.map((pkg: any) => {
                                const isSelected = selectedPackage === pkg.id;
                                return (
                                    <div
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg.id)}
                                        className={`
                      cursor-pointer relative group p-5 rounded-2xl border transition-all duration-300
                      ${isSelected
                                                ? `bg-gradient-to-br ${game.gradient} border-transparent shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] scale-[1.02]`
                                                : "bg-zinc-900/40 border-white/5 hover:border-white/20 hover:bg-zinc-800/60"
                                            }
                    `}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
                                                POPULAR
                                            </div>
                                        )}
                                        <div className="text-center">
                                            <div className={`text-3xl mb-1 ${isSelected ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                                                {game.icon}
                                            </div>
                                            <h3 className={`font-bold text-lg mb-1 ${isSelected ? "text-white" : "text-zinc-200"}`}>{pkg.name}</h3>
                                            {pkg.bonus && (
                                                <div className={`text-xs font-medium mb-3 ${isSelected ? "text-white/80" : "text-green-400"}`}>
                                                    Bonus {pkg.bonus}
                                                </div>
                                            )}
                                            <div className={`text-xl font-black ${isSelected ? "text-white" : "text-zinc-400"}`}>
                                                ฿{pkg.price.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment & Installment */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Payment Card */}
                    <Card className="bg-zinc-900/60 border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden sticky top-24 shadow-2xl">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-xl font-bold flex items-center gap-2 mb-1">
                                <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded">2</span>
                                Payment Details
                            </h2>
                        </div>

                        <CardContent className="p-6 space-y-6">
                            {/* Payment Method Toggle */}
                            <div className="bg-black/40 p-1.5 rounded-xl flex">
                                <button
                                    onClick={() => setPaymentMethod("full")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${paymentMethod === "full" ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
                                >
                                    <CreditCard size={16} /> Full
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("installment")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${paymentMethod === "installment" ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
                                >
                                    <Zap size={16} /> Installment
                                </button>
                            </div>

                            {/* Installment Configuration */}
                            {paymentMethod === "installment" && (
                                <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-300">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-400">Duration</span>
                                        <span className="text-white font-medium">{installmentMonths} Months</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[3, 6, 10].map(m => (
                                            <button
                                                key={m}
                                                onClick={() => setInstallmentMonths(m)}
                                                className={`py-2 rounded-lg text-sm font-bold border transition-all ${installmentMonths === m ? "border-blue-500 bg-blue-500/20 text-blue-400" : "border-white/10 bg-black/20 text-zinc-500 hover:bg-white/5"}`}
                                            >
                                                {m} Mo.
                                            </button>
                                        ))}
                                    </div>
                                    {installmentMonths > 3 && (
                                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-3">
                                            <Star className="text-yellow-500 shrink-0 mt-0.5" size={14} />
                                            <p className="text-yellow-200/80 text-xs leading-relaxed">
                                                Interest applied: 2% for plans longer than 3 months.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Summary */}
                            <div className="bg-white/5 rounded-xl p-5 space-y-3">
                                <div className="flex justify-between text-sm text-zinc-400">
                                    <span>Package</span>
                                    <span className="text-white">{activePackage?.name || "-"}</span>
                                </div>
                                <div className="flex justify-between text-sm text-zinc-400">
                                    <span>Price</span>
                                    <span className="text-white">฿{totalPrice.toLocaleString()}</span>
                                </div>
                                {paymentMethod === "installment" && totalInterest > 0 && (
                                    <div className="flex justify-between text-sm text-zinc-400">
                                        <span>Interest</span>
                                        <span className="text-red-400">+฿{totalInterest.toFixed(0)}</span>
                                    </div>
                                )}
                                <div className="h-px bg-white/10 my-2"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-zinc-300 font-medium">Total</span>
                                    <div className="text-right">
                                        {paymentMethod === "installment" ? (
                                            <>
                                                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                                    ฿{Math.ceil(monthlyPayment).toLocaleString()}<span className="text-sm text-zinc-500 text-white/50 ml-1">/mo</span>
                                                </div>
                                                <div className="text-xs text-zinc-500 mt-1">Total: ฿{Math.ceil(finalPrice).toLocaleString()}</div>
                                            </>
                                        ) : (
                                            <div className="text-3xl font-black text-white">
                                                ฿{Math.ceil(finalPrice).toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handlePayment}
                                disabled={!selectedPackage || isProcessing}
                                className={`w-full py-6 text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${paymentMethod === "installment"
                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-500/25"
                                        : `bg-gradient-to-r ${game.gradient}`
                                    }`}
                            >
                                {isProcessing ? "Processing..." : (paymentMethod === "installment" ? "Apply Installment" : "Pay Now")}
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                                <ShieldCheck size={12} /> Secure 256-bit SSL Payment
                            </div>

                        </CardContent>
                    </Card>

                    {/* Promo Banner */}
                    <div className={`p-6 rounded-3xl bg-gradient-to-br ${game.gradient} relative overflow-hidden group hover:shadow-2xl transition-all duration-500`}>
                        <div className="relative z-10">
                            <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                                <Gift className="text-white" size={16} />
                            </div>
                            <h3 className="text-white font-bold text-xl mb-1">Instant Delivery</h3>
                            <p className="text-white/80 text-sm">System processes your order automatically within 1-3 minutes.</p>
                        </div>
                        <div className="absolute -right-5 -bottom-5 text-9xl opacity-20 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                            ⚡
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}
