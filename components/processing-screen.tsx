"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

export function ProcessingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 15
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-accent mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Analysing your answers...</h2>
          <p className="text-muted-foreground">We're creating your personalised growth plan</p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground">This usually takes 30-60 seconds</p>
        </div>

        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          <p>✓ Analysing your market position</p>
          <p>✓ Calculating lead targets</p>
          <p>✓ Generating recommendations</p>
          <p className="opacity-50">⏳ Creating your PDF report</p>
        </div>
      </Card>
    </div>
  )
}
