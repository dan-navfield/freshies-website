import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.svg"
                        alt="Freshies"
                        width={120}
                        height={32}
                        className="h-8 w-auto"
                        priority
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/features" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors">
                        Features
                    </Link>
                    <div className="relative group h-full flex items-center">
                        <Link href="/learn" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors flex items-center gap-1 py-4">
                            Learn
                            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                        </Link>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block hover:block z-50">
                            <div className="w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/5 p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex flex-col gap-1">
                                    <Link href="/learn" className="block text-sm px-4 py-2.5 rounded-lg text-slate-700 hover:bg-peach-50 hover:text-deep-purple font-medium transition-colors">
                                        Learn Index
                                    </Link>
                                    <div className="h-px bg-slate-100 my-1"></div>
                                    <Link href="/learn/ingredients" className="block text-sm px-4 py-2.5 rounded-lg text-slate-700 hover:bg-peach-50 hover:text-deep-purple font-medium transition-colors">
                                        Ingredients
                                        <span className="block text-xs text-slate-400 font-normal mt-0.5">Ingredient library</span>
                                    </Link>
                                    <Link href="/learn/guides" className="block text-sm px-4 py-2.5 rounded-lg text-slate-700 hover:bg-peach-50 hover:text-deep-purple font-medium transition-colors">
                                        Guides
                                        <span className="block text-xs text-slate-400 font-normal mt-0.5">Advice & tips</span>
                                    </Link>
                                    <Link href="/learn/trends" className="block text-sm px-4 py-2.5 rounded-lg text-slate-700 hover:bg-peach-50 hover:text-deep-purple font-medium transition-colors">
                                        Trends & Questions
                                        <span className="block text-xs text-slate-400 font-normal mt-0.5">Q&A</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="/about" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors">
                        About
                    </Link>
                    <Link href="/partners" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors">
                        For Brands
                    </Link>
                    <Link href="/home-alt" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors bg-ultraviolet/5 px-3 py-1 rounded-full">
                        Concept 1
                    </Link>
                    <Link href="/home-alt-2" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors bg-ultraviolet/5 px-3 py-1 rounded-full">
                        Concept 2
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-deep-purple hover:text-ultraviolet hidden sm:block">
                        Log in
                    </Link>
                    <Button size="sm">Get the App</Button>
                </div>
            </div>
        </header>
    )
}
