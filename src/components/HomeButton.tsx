"use client"

import { TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomeButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    }

    return (
        <button onClick={handleClick} aria-label="home button">
            <TrendingUp
                className="absolute top-6 left-6 w-8 h-8 sm:w-10 sm:h-10 text-white"
            />
        </button>
    )
}