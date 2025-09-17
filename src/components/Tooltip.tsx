import { ReactNode } from "react";

interface TooltipProps {
    children: ReactNode,
    title: string,
    text: string
}

export function Tooltip({ children, text, title }: TooltipProps) {
    return (
        <div className="relative flex items-center group">
            {children}

            <div className="
                absolute bottom-full mb-3 -right-1
                w-[280px] max-w-[90vw]
                px-4 py-3 rounded-lg bg-gray-600 text-gray-100
                opacity-0 group-hover:opacity-100
                scale-95 group-hover:scale-100
                transition-all duration-200 ease-out
                pointer-events-none
                shadow-xl z-50
            ">
                <div className="absolute right-2 top-full w-0 h-0 border-l-7 border-r-7 border-t-9 border-l-transparent border-r-transparent border-t-gray-600" />

                <h3 className="text-sm font-semibold mb-1">{title}</h3>
                <p className="text-xs text-gray-300 leading-snug">{text}</p>
            </div>
        </div>
    )
}