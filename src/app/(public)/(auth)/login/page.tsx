"use client"

import { TrendingUp } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter();

    const handleSubmit = () => {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
    
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 md:items-end md:p-0 bg-gray-900">
            <div className="flex flex-col items-center justify-around min-h-screen md:justify-between md:py-6 w-full md:min-h-screen md:w-1/3 bg-gray-300 rounded-xl md:rounded-l-xl shadow-2xs">
                <div className="flex h-fit gap-3 items-center">
                    <TrendingUp size={30} color="white" className="bg-gray-800 w-10 h-10 p-2 rounded-xl" />
                    <h1 className="text-xl md:text-2xl font-black">Ibo stock analyzer</h1>
                </div>

                <div className="flex flex-col items-center gap-6 w-full">
                    <h2 className="text-3xl font-bold">Login</h2>
                    <form className="flex flex-col gap-5 w-full items-center" onSubmit={handleSubmit}>
                        <input className="w-8/10 md:w-3/4 bg-gray-100 p-4 rounded-2xl outline-gray-500" placeholder="Email" type="email" id="email" required />
                        <input className="w-8/10 md:w-3/4 bg-gray-100 p-4 rounded-2xl outline-gray-500" placeholder="Senha" type="password" id="password" required />
                        <button className="bg-gray-800 w-8/10 md:w-3/4 p-4 text-white rounded-2xl hover:bg-gray-700 cursor-pointer">Entrar</button>
                    </form>
                    <div className="w-3/4 flex flex-row justify-between items-center">
                        <div className="border-t w-1/3" />
                        <p>Entre com</p>
                        <div className="border-t w-1/3" />
                    </div>
                    <div className="w-8/10 md:w-3/4 gap-4 flex flex-col">
                        <button className="w-full flex items-center justify-center bg-white p-3 rounded-2xl gap-2 hover:bg-gray-200 cursor-not-allowed" disabled>
                            <FcGoogle size={28} />
                            <span>Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center bg-white p-3 rounded-2xl gap-2 hover:bg-gray-200 cursor-not-allowed" disabled>
                            <FaGithub size={28} />
                            <span>Github</span>
                        </button>
                    </div>
                </div>

                <div className="flex gap-2 w-8/10 md:w-3/4 items-center justify-center text-sm md:text-base">
                    <p>Ainda não tem uma conta?</p>
                    <p className="text-sky-900 underline cursor-pointer" onClick={() => router.push("/register")}>Registre-se</p>
                </div>
            </div>
        </div>
    )
}