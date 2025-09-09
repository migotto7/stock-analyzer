import NavbarTicker from "@/components/NavbarTicker";
import StockBarChart from "@/components/StockBarChart";
import { HistoricalDataPrice } from "@/type/HistoricalDataPrice";
import { MoveUp, MoveDown, ChartColumnIncreasing, DollarSign, Percent, Landmark, HandCoins, ArrowBigUp } from "lucide-react";
import Image from "next/image";

interface StockProps {
    params: {
        ticker: string;
    };
}

interface StockData {
    currency: string;
    marketCap: number;
    shortName: string;
    longName: string;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    ticker: string;
    logo: string;
    priceEarnings: number;
    earningsPerShare: number;
    historicalDataPrice: HistoricalDataPrice[];
}

async function fetchStock(ticker: string): Promise<StockData | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acoes/${ticker}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function StockPage({ params }: StockProps) {
    const { ticker } = await params;
    const stock = await fetchStock(ticker)

    if (!stock) return <div>Erro ao carregar dados da ação</div>

    const fairPrice = (stock.earningsPerShare * stock.priceEarnings).toFixed(2);

    return (
        <div>
            <NavbarTicker />
            <div className="p-8 max-w-5xl mx-auto bg-background/55 backdrop-blur-md border border-white/20 rounded-xl my-6">
                <div tabIndex={0} className="flex items-center mb-6">
                    <Image src={stock.logo} alt={stock.shortName} width={50} height={50} className="mr-6 rounded" />
                    <h1 className="text-3xl font-bold text-gray-100">{stock.longName} ({stock.ticker})</h1>
                </div>

                <div className="flex justify-between gap-5 mb-8 h-[120px]">
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3">
                        <div className="bg-green-900 w-16 h-16 rounded-2xl flex items-center justify-center">
                            <DollarSign className="text-green-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-md text-gray-300">Preço atual</span>
                            <h2 className="text-white text-xl font-semibold pt-2">R$ {stock.regularMarketPrice.toFixed(2)}</h2>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3">
                        <div className="bg-emerald-900 w-16 h-16 rounded-2xl flex items-center justify-center">
                            <Percent className="text-emerald-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-md text-gray-300">Variação</span>
                            <h2 className={`text-xl font-semibold pt-2 flex items-center ${stock.regularMarketChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {stock.regularMarketChangePercent.toFixed(2)}% {stock.regularMarketChange >= 0 ? <MoveUp /> : <MoveDown />}
                            </h2>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3">
                        <div className="bg-teal-900 w-16 h-16 rounded-2xl flex items-center justify-center">
                            <Landmark className="text-teal-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-md text-gray-300">P/L</span>
                            <h2 className="text-white text-xl font-semibold pt-2">{stock.priceEarnings.toFixed(2)}</h2>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3">
                        <div className="bg-orange-900 w-16 h-16 rounded-2xl flex items-center justify-center">
                            <HandCoins className="text-orange-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-md text-gray-300">EPS</span>
                            <h2 className="text-white text-xl font-semibold pt-2">{stock.earningsPerShare.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-5 mb-8 h-[120px]">
                    <div tabIndex={0} className="bg-gray-800 w-full px-4 py-5 rounded-xl">
                        <span className="text-md text-gray-300">Faixa do dia</span>
                        <div className="my-4">
                            <div className="w-full bg-gray-500 h-3 rounded overflow-hidden relative">
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-2 h-3 bg-green-500 shadow-lg"
                                    style={{
                                        left: `${((stock.regularMarketPrice - stock.regularMarketDayLow) /
                                            (stock.regularMarketDayHigh - stock.regularMarketDayLow)) * 100}%`,
                                        transform: "translateX(-50%)",
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-sm mt-2 text-gray-300">
                                <span>R$ {stock.regularMarketDayLow.toFixed(2)}</span>
                                <span>R$ {stock.regularMarketDayHigh.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full px-4 py-5 rounded-xl">
                        <span className="text-md text-gray-300">Faixa 52 semanas</span>
                        <div className="my-4">
                            <div className="w-full bg-gray-500 h-3 rounded overflow-hidden relative">
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-2 h-3 bg-green-500 shadow-lg"
                                    style={{
                                        left: `${((stock.regularMarketPrice - stock.fiftyTwoWeekLow) /
                                            (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) * 100}%`,
                                        transform: "translateX(-50%)",
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-sm mt-2 text-gray-300">
                                <span>R$ {stock.fiftyTwoWeekLow.toFixed(2)}</span>
                                <span>R$ {stock.fiftyTwoWeekHigh.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full px-4 py-5 rounded-xl">
                        <span className="text-md text-gray-300">Preço justo</span>
                        <div className="my-4">
                            <div className="w-full bg-gray-500 h-3 rounded overflow-hidden relative">
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-2 h-3 bg-green-500 shadow-lg"
                                    style={{
                                        left: `${fairPrice}`,
                                        transform: "translateX(-50%)",
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-sm mt-2 text-gray-300">
                                <span>R$ {stock.fiftyTwoWeekLow.toFixed(2)}</span>
                                <span>R$ {stock.fiftyTwoWeekHigh.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-8 rounded-xl">
                    <div className="flex text-center justify-center bg-gray-800 py-4 text-gray-300 text-md rounded-t-lg">
                        <ChartColumnIncreasing />
                        <span className="ml-2">Histórico de cotação (30 dias)</span>
                    </div>
                    <StockBarChart data={stock.historicalDataPrice} />
                </div>
            </div>
        </div>
    );
}