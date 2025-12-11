import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-deep-purple text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <Link href="/" className="text-2xl font-bold text-mint lowercase tracking-tight">
                        freshies
                    </Link>
                    <p className="mt-4 text-sm text-white/80">
                        Skincare made simple, safe, and fun for the next generation.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-mint">Product</h3>
                    <Link href="/features" className="text-sm hover:text-mint transition-colors">Features</Link>
                    <Link href="/safety" className="text-sm hover:text-mint transition-colors">Safety</Link>
                    <Link href="/download" className="text-sm hover:text-mint transition-colors">Download</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-mint">Company</h3>
                    <Link href="/about" className="text-sm hover:text-mint transition-colors">About Us</Link>
                    <Link href="/contact" className="text-sm hover:text-mint transition-colors">Contact</Link>
                    <Link href="/privacy" className="text-sm hover:text-mint transition-colors">Privacy Policy</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-mint">Connect</h3>
                    <a href="#" className="text-sm hover:text-mint transition-colors">Instagram</a>
                    <a href="#" className="text-sm hover:text-mint transition-colors">TikTok</a>
                    <a href="#" className="text-sm hover:text-mint transition-colors">Twitter</a>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
                © {new Date().getFullYear()} Freshies. All rights reserved.
            </div>
        </footer>
    )
}
