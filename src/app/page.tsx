import BarTopStocks from "@/components/BarTopStocks";
import SearchBox from "@/components/SearchBox";
import HomeButton from "@/components/HomeButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <HomeButton />
      <SearchBox />
      <BarTopStocks />
    </main>
  );
}
