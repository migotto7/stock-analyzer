import BarTopStocks from "@/components/BarTopStocks";
import SearchBox from "@/components/SearchBox";
import Head from "next/head";
import NavbarHome from "@/components/NavbarHome";

export default function Home() {
  return (
    <>
      <Head>
        <title>Análise de ações da Ibovespa</title>
        <meta name="description" content="Veja análises, indicadores e gráficos das ações da Bovespa em tempo real." />
        <meta property="og:title" content="Análise de Ações da Bovespa" />
        <meta property="og:description" content="Descubra tendências e indicadores das principais ações brasileiras." />
      </Head>
      <NavbarHome />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
        <SearchBox />
        <BarTopStocks />
      </main>
    </>
  );
}
