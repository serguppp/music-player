'use client'

import Button from '@/components/Button'
import { AlertTriangle } from 'lucide-react'

export default function Page404() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[65vh]">
      <div className="flex items-center justify-center">
        <AlertTriangle className="w-16 h-16 mr-4 text-normal-pink" />
        <h1 className="text-9xl font-bold bg-gradient-to-r from-normal-pink to-normal-blue bg-clip-text text-transparent">
          404
        </h1>
      </div>
      <p className="mt-6 text-2xl font-semibold text-white">
        Oops! This page could not be found.
      </p>
      <div className="mt-10">
        <Button href="/" variant="fill" className="justify-center text-lg px-8 py-3" >
          Come back to main page
        </Button>
      </div>
    </div>
  )
}