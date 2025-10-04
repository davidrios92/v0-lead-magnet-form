"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorScreenProps {
  error: string | null
  onRetry: () => void
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />

        <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>

        <p className="text-muted-foreground mb-6">
          {error || "We encountered an unexpected error while processing your request."}
        </p>

        <div className="space-y-3">
          <Button onClick={onRetry} className="w-full min-h-[48px] bg-accent text-accent-foreground hover:bg-accent/90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Go back and review answers
          </Button>

          <p className="text-xs text-muted-foreground">
            If the problem persists, please try again later or contact support.
          </p>
        </div>
      </Card>
    </div>
  )
}
