"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Suggestion = {
    stock: string;
    name: string;
    logo: string;
    close: number;
    change: number;
    sector: string | null;
};

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [moved, setMoved] = useState(false);

    const router = useRouter();

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

    const handleClick = (stock: string) => {
        router.push(`/stock/${stock}`)
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div
                className={`w-full flex flex-col items-center transition-all duration-500 ${moved ? "translate-y-[-150px] mt-20" : "translate-y-0"
                    }`}
            >
                <h1 className="text-3xl font-bold mb-6 text-white">Ibovespa Stock Analyzer</h1>
                <div className="
                        flex items-center w-[900px] max-w-[95%]  
                        justify-between px-4 py-6 rounded-xl
                        bg-background/55 backdrop-blur-md border border-white/20 
                        placeholder-white/60 focus-within:outline-none focus-within:ring-1 focus-within:ring-white/30 shadow-lg
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
                    <Search className="w-6 h-6 text-background/70" />
                </div>

                {suggestions.length > 0 && (
                    <ul className="w-[900px] max-w-[95%] mt-2 bg-background/55 divide-y divide-gray-400 rounded-xl shadow-lg overflow-hidden border border-white/20">
                        {suggestions.map((s, idx) => (
                            <li
                                key={idx}
                                className="py-6 px-2 mx-4 my-5 flex items-center hover:bg-gray-800 cursor-pointer"
                                onClick={() => handleClick(s.stock)}
                            >
                                <a className="w-full flex items-center" href={`/stock/${s.stock}`}>

                                    <Image src={s.logo} alt={s.name} width={40} height={40} className="rounded mr-4" />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{s.stock}</span>
                                        <span className="text-sm text-gray-400">{s.name}</span>
                                    </div>
                                    <div className="ml-auto text-sm flex flex-col items-end">
                                        <span className="font-medium text-base">R$ {s.close.toFixed(2)}</span>
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