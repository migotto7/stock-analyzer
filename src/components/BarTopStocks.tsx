"use client"

import axios from "axios";
import { useEffect, useState } from "react"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DataStock {
    stock: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    market_cap: number;
    logo: string;
    sector: string;
    type: string;
}

export default function BarTopStocks() {
    const [data, setData] = useState<DataStock[]>([]);
    const x = useMotionValue(0);
    const [isPaused, setIsPaused] = useState(false)
    const router = useRouter();

    useEffect(() => {
        axios.get(`https://brapi.dev/api/quote/list?type=stock&sortBy=volume&sortOrder=desc&limit=20&page=1`)
            .then((res) => {
                if (res.data.stocks) {
                    setData(res.data.stocks);
                } else {
                    setData([]);
                }
            })
            .catch((err) => {
                console.error({ error: err.message })
            })
    }, []);

    useAnimationFrame((t, delta) => {
        if (!isPaused) {
            const move = (delta / 1000) * 50;
            const totalWidth = Math.max(data.length * 200, 1);
            x.set((x.get() - move) % totalWidth);
        }
    });

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 overflow-hidden">
            <motion.div
                style={{ x }}
                className="flex gap-8 py-1 sm:py-2"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {[...data, ...data].map((stock, i) => (
                    <div key={i}
                        className="flex flex-col gap-y-2 gap-2 min-w-[180px] sm:min-w-[150px] md:min-w-[200px] px-2 py-3 sm:py-5 cursor-pointer hover:bg-gray-700/40 rounded-xl"
                        onClick={() => router.push(`/stock/${stock.stock}`)}
                    >
                        <div className="flex gap-2 items-center">
                            <Image src={stock.logo} alt={stock.stock} width={28} height={28} />
                            <span className="font-semibold">{stock.stock}</span>
                        </div>
                        <div className="flex gap-2 ites">
                            <span className="text-md text-gray-300">R$ {stock.close.toFixed(2)}</span>
                            <span
                                className={`text-md font-bold ${Number.isFinite(stock?.change) && (stock.change >= 0) ? "text-green-400" : "text-red-400"
                                    }`}
                            >
                                {Number.isFinite(stock?.change)
                                    ? `${stock.change >= 0 ? "+" : ""} ${stock.change.toFixed(2)}%`
                                    : "-"
                                }
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
} 