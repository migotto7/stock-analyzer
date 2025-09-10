"use client"

import { Home, Search } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Suggestion } from "@/type/Suggestion";
import Image from "next/image";
import Link from "next/link";

export default function NavbarTicker() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const source = axios.CancelToken.source();

        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setSuggestions(res.data.stocks?.slice(0, 4) || []);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setSuggestions([]);
                }
            });

        return () => {
            source.cancel();
        }
    }, [query]);

    const handleClick = (stock: string) => {
        router.push(`/stock/${stock}`);
    }

    return (
        <nav className="mx-auto max-w-5xl flex md:gap-2">
            <Link href="/" aria-label="home button" className="h-16 md:h-20 w-16 md:w-[10%] flex items-center justify-center md:border-b md:border-l md:border-r rounded-b-2xl md:rounded-b-3xl border-white/20 
                    hover:bg-gray-500 focus:bg-gray-500
                    hover:border-0 
                    transition-all duration-300 ease-in-out
                    hover:h-22 focus:h-22">
                <Home className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </Link>
            <div className="relative flex-1">
                <div className="
                        w-full h-16 md:h-20 py-3 md:py-6 px-4 md:px-6 flex items-center border-b border-l border-r rounded-b-3xl border-white/20 text-white
                        placeholder-white/60 focus-within:outline-none focus-within:ring-1 focus-within:ring-white/30 shadow-lg
                    ">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                        placeholder="Digite o ticker da ação (ex: PETR4)"
                        className="flex-1 bg-transparent outline-none text-sm md:text-lg placeholder-gray-400"
                    />
                    <Search className="w-4 h-4 text-background/70 sm:w-6 sm:h-6" />
                </div>
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 mt-2 w-full bg-gray-800 backdrop-blur-md rounded-xl border border-white/20 text-white z-20 overflow-hidden shadow-lg
                    
                   ">
                        {suggestions.map((s, idx) => (
                            <li
                                key={idx}
                                className="py-4 px-2 mx-2 sm:mx-4 my-3 flex items-center hover:bg-gray-600 cursor-pointer"
                            >
                                <button className="w-full flex items-center cursor-pointer" onClick={() => handleClick(s.stock)}>
                                    <Image src={s.logo} alt={s.name} width={28} height={28} className="rounded mr-4" />
                                    <div className="flex flex-col w-[60%] items-start">
                                        <span className="font-semibold text-sm sm:text-base">{s.stock}</span>
                                        <span className="text-xs sm:text-sm text-gray-400">{s.name}</span>
                                    </div>
                                    <div className="ml-auto text-xs sm:text-sm flex flex-col items-end">
                                        <span className="font-medium text-sm sm:text-base">R$ {s.close.toFixed(2)}</span>
                                        <span
                                            className={`ml-2 ${s.change >= 0 ? "text-green-400" : "text-red-400"
                                                }`}
                                        >
                                            {s.change >= 0 ? "↑" : "↓"} {Math.abs(s.change).toFixed(2)}%
                                        </span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
}