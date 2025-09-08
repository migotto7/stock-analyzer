"use client"

import { TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomeButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/");
    }

    return (
        <TrendingUp 
            className="absolute top-6 left-6 w-10 h-10 text-white cursor-pointer" 
            onClick={handleClick}    
        />
    )
}