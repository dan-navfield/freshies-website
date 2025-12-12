'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <div className="bg-red-50 p-4 rounded text-left mb-6 font-mono text-sm border border-red-200 overflow-auto max-w-2xl mx-auto">
                {error.message}
                {error.stack && <pre className="mt-2 text-xs opacity-75">{error.stack}</pre>}
            </div>
            <button
                onClick={() => reset()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Try again
            </button>
        </div>
    )
}
