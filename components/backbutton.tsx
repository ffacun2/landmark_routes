'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Backbutton(string: {string:string}) {
  const router = useRouter()

    return(
      <header className="z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex items-center gap-4 p-2">
          <button
            onClick={() => router.back()}
            className="flex items-center p-2 hover:bg-surface-secondary rounded-lg transition-colors cursor-pointer group"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className='ml-2 text-xl font-bold leading-none'>
              {string.string}
            </span>
          </button>
        </div>
      </div>
    </header>
)}