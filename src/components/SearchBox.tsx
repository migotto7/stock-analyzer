"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search } from "lucide-react";
import Image from "next/image";
import type { Suggestion } from "@/type/Suggestion";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [moved, setMoved] = useState(false);

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            setMoved(false);
            return;
        }

        const source = axios.CancelToken.source();

        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`, {
                cancelToken: source.token,
            })
            .then((res) => {
                setSuggestions(res.data.stocks?.slice(0, 4) || []);
                setMoved(true);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setSuggestions([]);
                    setMoved(false);
                }
            });

        return () => {
            source.cancel();
        }

    }, [query]);

    return (
        <div className="flex flex-col items-center w-full justify-center">
            <div
                className={`w-full flex flex-col items-center transition-transform duration-500 ${moved ? "translate-y-[-60px]" : "translate-y-0"
                    }`}
            >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white text-center">Ibovespa Stock Analyzer</h1>
                <div className="
                        flex items-center w-full max-w-[95%] sm:max-w-[500] md:max-w-[600] lg:max-w-[800] 
                        justify-between px-4 py-6 rounded-xl mx-2
                        bg-background/55 backdrop-blur-md border border-white/20 
                        placeholder-white/60 focus-within:outline-none focus-within:ring-1 focus-within:ring-white/30 shadow-lg text-white
                    "
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value.toUpperCase())}
                        placeholder="Digite o ticker da ação (ex: PETR4)"
                        className="
                            flex-1 bg-transparent outline-none text-lg placeholder-gray-400
                        "
                    />
                    <Search className="w-5 h-5 text-background/70 sm:w-6 sm:h-6" />
                </div>

                {suggestions.length > 0 && (
                    <ul role="tablist" aria-label="Escolher ação que deseja consultar" className="w-full max-w-[95%] sm:max-w-[500] md:max-w-[600px] lg:max-w-[800] mt-2 bg-background/55 divide-y divide-gray-400 rounded-xl shadow-lg overflow-hidden border border-white/20">
                        {suggestions.map((s, idx) => (
                            <li
                                role="tabpanel"
                                key={idx}
                                className="py-4 px-2 mx-2 sm:mx-4 my-3 flex items-center hover:bg-gray-800 cursor-pointer"
                            >
                                <a className="w-full flex items-center" href={`/stock/${s.stock}`}>

                                    <Image src={s.logo} alt={s.name} width={32} height={32} className="rounded mr-4" />
                                    <div className="flex flex-col w-[60%]">
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
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}