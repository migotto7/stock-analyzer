import StockBarChart from "@/components/StockBarChart";
import { HistoricalDataPrice } from "@/type/HistoricalDataPrice";
import { MoveUp, MoveDown, ChartColumnIncreasing } from "lucide-react";
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

    const isBuyOpportunity = stock.regularMarketPrice <= stock.fiftyTwoWeekLow * 1.1;
    const price12Months = ((stock.regularMarketPrice - stock.fiftyTwoWeekLow) / (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) * 100;

    return (
        <div className="p-8 max-w-5xl mx-auto bg-background/55 backdrop-blur-md border border-white/20  rounded-xl my-10">
            <div className="flex items-center mb-6">
                <Image src={stock.logo} alt={stock.shortName} width={50} height={50} className="mr-6 rounded" />
                <h1 className="text-3xl font-bold text-gray-100">{stock.longName} ({stock.ticker})</h1>
            </div>

            <div className="flex justify-between gap-8 mb-8">
                <div className="bg-gray-500 rounded-lg flex flex-col items-center w-40">
                    <div className="w-full px-4 py-2 rounded-t-lg text-center bg-gray-700">
                        <span className="text-gray-100">Preço atual</span>
                    </div>
                    <h2 className="text-2xl text-white px-6 py-4 font-semibold">R$ {stock.regularMarketPrice.toFixed(2)}</h2>
                </div>
                <div className="bg-gray-500 rounded-lg flex flex-col items-center w-40">
                    <div className="w-full px-4 py-2 rounded-t-lg text-center bg-gray-700">
                        <span className="text-gray-100">Variação (hoje)</span>
                    </div>
                    <h2 className={`text-2xl px-6 py-4 font-semibold flex items-center ${stock.regularMarketChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stock.regularMarketChangePercent.toFixed(2)}% {stock.regularMarketChange >= 0 ? <MoveUp /> : <MoveDown />}
                    </h2>
                </div>
                <div className="bg-gray-500 rounded-lg flex flex-col items-center w-40">
                    <div className="w-full px-4 py-2 rounded-t-lg text-center bg-gray-700">
                        <span className="text-gray-100">P/L</span>
                    </div>
                    <h2 className="text-2xl px-6 py-4 text-white font-semibold">
                        {stock.priceEarnings.toFixed(2)}
                    </h2>
                </div>
                <div className="bg-gray-500 rounded-lg flex flex-col items-center w-40">
                    <div className="w-full px-4 py-2 rounded-t-lg text-center bg-gray-700">
                        <span className="text-gray-100">EPS</span>
                    </div>
                    <h2 className="text-2xl px-6 py-4 text-white font-semibold">
                        {stock.earningsPerShare.toFixed(2)}
                    </h2>
                </div>
                <div className="bg-gray-500 rounded-lg flex flex-col items-center w-40">
                    <div className="w-full px-4 py-2 rounded-t-lg text-center bg-gray-700">
                        <span className="text-gray-100">Compra</span>
                    </div>
                    <h2 className={`text-2xl px-6 py-4 font-semibold ${isBuyOpportunity ? "text-green-500" : "text-yellow-500"}`}>
                        {isBuyOpportunity ? "Sim" : "Não"}
                    </h2>
                </div>
            </div>
            {/* Exemplo de gráfico: preço intraday */}
            <div className="mb-8 w-full">
                <div className="bg-gray-500 rounded-lg flex flex-col items-center ">
                    <div className="w-full px-4 py-2 rounded-t-lg text-center bg-gray-700">
                        <span className="text-gray-100">Faixa do dia</span>
                    </div>
                    <div className="p-4 rounded text-white">
                        <p>Min: R$ {stock.regularMarketDayLow.toFixed(2)}</p>
                        <p>Max: R$ {stock.regularMarketDayHigh.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Faixa 52 semanas */}
            <div className="mb-8">
                <div className="flex text-center justify-center bg-gray-700 py-4 text-gray-100 text-xl font-bold rounded-t-lg mb-4">
                    <ChartColumnIncreasing />
                    <h3 className="ml-4">Faixa 52 semanas</h3>
                </div>
                <div className="w-full bg-gray-500 h-4 rounded overflow-hidden relative">
                    {/* Marcador do preço atual */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-300 bg-gray-600 shadow-lg"
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
            <div className="mb-8 rounded-xl">
                <div className="flex text-center justify-center bg-gray-700 py-4 text-gray-100 text-xl font-bold rounded-t-lg">
                    <ChartColumnIncreasing />
                    <h3 className="ml-4">Histórico de cotação (30 dias)</h3>
                </div>
                <StockBarChart data={stock.historicalDataPrice} />
            </div>
        </div>
    );
}