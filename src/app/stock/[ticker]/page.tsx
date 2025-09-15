import NavbarTicker from "@/components/NavbarTicker";
import StockBarChart from "@/components/StockBarChart";
import { HistoricalDataPrice } from "@/type/HistoricalDataPrice";
import { MoveUp, MoveDown, ChartColumnIncreasing, DollarSign, Percent, Landmark, HandCoins, Triangle } from "lucide-react";
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
            <div className="p-4 md:p-8 max-w-5xl mx-auto bg-background/55 backdrop-blur-md md:border border-white/20 rounded-xl my-6">
                <div tabIndex={0} className="flex items-center mb-6">
                    <Image src={stock.logo} alt={stock.shortName} width={50} height={50} className="mr-6 rounded" />
                    <h1 className="text-xl md:text-3xl font-bold text-gray-100">{stock.longName} ({stock.ticker})</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3 py-4 gap-1">
                        <div className="bg-green-900 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center">
                            <DollarSign className="text-green-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-sm md:text-md text-gray-300">Preço atual</span>
                            <h2 className="text-white text-lg md:text-xl font-semibold pt-1 md:pt-2">R$ {stock.regularMarketPrice.toFixed(2)}</h2>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3 py-4 gap-1">
                        <div className="bg-emerald-900 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center">
                            <Percent className="text-emerald-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-sm md:text-md text-gray-300">Variação</span>
                            <h2 className={`text-lg md:text-xl font-semibold pt-1 md:pt-2 flex items-center ${stock.regularMarketChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {stock.regularMarketChangePercent.toFixed(2)}%

                            </h2>
                        </div>
                        <div className={`rounded-4xl p-1 flex items-center justify-center ${stock.regularMarketChange >= 0 ? "text-green-500 bg-green-900" : "text-red-500 bg-red-900"}`}>
                            {stock.regularMarketChange >= 0 ? <MoveUp /> : <MoveDown />}
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3 py-4 gap-1">
                        <div className="bg-teal-900 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center">
                            <Landmark className="text-teal-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-sm md:text-md text-gray-300">P/L</span>
                            <h2 className="text-white text-lg md:text-xl font-semibold pt-1 md:pt-2">{stock.priceEarnings.toFixed(2)}</h2>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full rounded-xl flex items-center px-3 py-4 gap-1">
                        <div className="bg-orange-900 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center">
                            <HandCoins className="text-orange-500" />
                        </div>
                        <div className="mx-4">
                            <span className="text-sm md:text-md text-gray-300">EPS</span>
                            <h2 className="text-white text-lg md:text-xl font-semibold pt-1 md:pt-2">{stock.earningsPerShare.toFixed(2)}</h2>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <div tabIndex={0} className="bg-gray-800 w-full px-3 py-4 md:px-4 rounded-xl flex flex-col justify-center gap-y-3 md:gap-1">
                        <span className="text-sm md:text-lg text-gray-300">Faixa do dia</span>
                        <div className="my-2 md:my-4">
                            <div className="w-full bg-gray-500 h-2 md:h-3 rounded overflow-visible relative">
                                <div
                                    className="absolute flex flex-col items-center z-10"
                                    style={{
                                        left: `${((stock.regularMarketPrice - stock.regularMarketDayLow) /
                                            (stock.regularMarketDayHigh - stock.regularMarketDayLow)) * 100}%`,
                                        top: "-16px",
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    <Triangle
                                        className="w-3 h-4 rotate-180"
                                        fill="white"
                                        stroke="white"
                                    />
                                    <div
                                        className="w-2 h-2 md:h-3 bg-white"

                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm mt-2 text-gray-300">
                                <span>R$ {stock.regularMarketDayLow.toFixed(2)}</span>
                                <span>R$ {stock.regularMarketDayHigh.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full px-3 py-4 md:px-4 rounded-xl flex flex-col justify-center gap-y-3 md:gap-1">
                        <span className="text-sm md:text-lg text-gray-300">Faixa 52 semanas</span>
                        <div className="my-2 md:my-4">
                            <div className="w-full bg-gray-500 h-2 md:h-3 rounded overflow-visible relative">
                                <div
                                    className="absolute flex flex-col items-center z-10"
                                    style={{
                                        left: `${((stock.regularMarketPrice - stock.fiftyTwoWeekLow) /
                                            (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) * 100}%`,
                                        top: "-16px",
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    <Triangle
                                        className="w-3 h-4 rotate-180"
                                        fill="white"
                                        stroke="white"
                                    />
                                    <div
                                        className="w-2 h-2 md:h-3 bg-white"

                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm mt-2 text-gray-300">
                                <span>R$ {stock.fiftyTwoWeekLow.toFixed(2)}</span>
                                <span>R$ {stock.fiftyTwoWeekHigh.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div tabIndex={0} className="bg-gray-800 w-full px-3 py-4 md:px-4 rounded-xl flex flex-col justify-center gap-y-3 md:gap-1">
                        <span className="text-sm md:text-lg text-gray-300">Preço justo</span>
                        <div className="my-2 md:my-4">
                            <div className="w-full h-2 md:h-3 rounded overflow-visible relative bg-gradient-to-r from-red-400 via-yellow-400 to-green-400">
                                <div
                                    className="absolute flex flex-col items-center z-10"
                                    style={{
                                        left: `${fairPrice}%`,
                                        top: "-16px",
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    <Triangle
                                        className="w-3 h-4 rotate-180"
                                        fill="white"
                                        stroke="white"
                                    />
                                    <div
                                        className="w-2 h-2 md:h-3 bg-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm mt-2 text-gray-300">
                                <span>R$ {stock.fiftyTwoWeekLow.toFixed(2)}</span>
                                <span>R$ {stock.fiftyTwoWeekHigh.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-8 rounded-xl">
                    <div className="flex text-center justify-center bg-gray-800 py-4 text-gray-300 text-sm md:text-lg rounded-t-lg">
                        <ChartColumnIncreasing />
                        <span className="ml-2">Histórico de cotação (30 dias)</span>
                    </div>
                    <StockBarChart data={stock.historicalDataPrice} />
                </div>
            </div>
        </div>
    );
}