import Link from 'next/link'
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
                    <Link href="/learn" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors">
                        Learn
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-deep-purple hover:text-ultraviolet transition-colors">
                        About
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
