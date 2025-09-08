import BarTopStocks from "@/components/BarTopStocks";
import SearchBox from "@/components/SearchBox";
import { TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <SearchBox />
      <BarTopStocks />
    </main>
  );
}
