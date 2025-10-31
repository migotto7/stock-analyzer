"use client"

import { TrendingUp, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NavbarHome() {
    const router = useRouter();

    return (
        <nav className="absolute flex w-full">
            <ul className="flex w-full justify-between mt-4 mx-4">
                <li><TrendingUp color="white" size={40} /></li>
                <li>
                    <button onClick={() => router.push("/login")} className="flex border border-white rounded-xl p-4 gap-2 cursor-pointer">
                        <User color="white" />
                        <p className="text-white">Fazer Login</p>
                    </button>
                </li>
            </ul>
        </nav>
    )
}