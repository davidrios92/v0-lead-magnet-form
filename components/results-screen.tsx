"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, CheckCircle } from "lucide-react"
import type { WebhookResponse } from "@/types/form-types"

interface ResultsScreenProps {
  results: WebhookResponse
}

export function ResultsScreen({ results }: ResultsScreenProps) {
  const handleDownloadPDF = () => {
    if (results.pdf?.url) {
      window.open(results.pdf.url, "_blank")
    }
  }

  const handleBookCall = () => {
    window.open("https://ghl.email.theagencyalternative.com/widget/booking/1Y2o50TwMbtDOzw1Oli6", "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="text-primary-foreground py-6 px-4 bg-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-background" />
          <h1 className="text-2xl md:text-3xl font-bold">Your Growth Plan is Ready!</h1>
        </div>
      </header>

      {/* Results Content */}
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Summary Card */}
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {results.summary?.headline || "Your tailored growth plan"}
            </h2>

            {results.summary?.bullets && (
              <ul className="space-y-3 mb-6">
                {results.summary.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Badges for estimates */}
            <div className="flex flex-wrap gap-3 mb-6">
              {results.summary?.est_budget_range_aud && (
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Budget: ${results.summary.est_budget_range_aud[0].toLocaleString("en-AU")} - $
                  {results.summary.est_budget_range_aud[1].toLocaleString("en-AU")} AUD
                </Badge>
              )}
              {results.summary?.est_weekly_leads_target && (
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Target: {results.summary.est_weekly_leads_target} leads/week
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleDownloadPDF}
                className="w-full min-h-[48px] bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={!results.pdf?.url}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Your PDF Plan
              </Button>

              {/* Placeholder for booking button - would be shown if CALENDLY_URL is provided */}
              <Button variant="outline" onClick={handleBookCall} className="w-full min-h-[48px] bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Strategy Call
              </Button>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Download and review your personalised PDF plan</p>
              <p>2. Book a strategy call to discuss implementation</p>
              <p>3. Start implementing the quick wins immediately</p>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">
              Created by <span className="font-semibold text-foreground">The Agency Alternative</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
