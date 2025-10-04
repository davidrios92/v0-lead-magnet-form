"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BusinessSnapshotSection } from "./form-sections/business-snapshot-section"
import { GoalsCapacitySection } from "./form-sections/goals-capacity-section"
import { MarketingCompetitionSection } from "./form-sections/marketing-competition-section"
import { LeadHandlingSection } from "./form-sections/lead-handling-section"
import { AspirationsSection } from "./form-sections/aspirations-section"
import { ResultsScreen } from "./results-screen"
import { ProcessingScreen } from "./processing-screen"
import { ErrorScreen } from "./error-screen"
import type { FormData, FormState } from "@/types/form-types"
import { submitFormData } from "@/lib/form-submission"

const SECTIONS = [
  { id: "business-snapshot", title: "Business Snapshot", component: BusinessSnapshotSection },
  { id: "goals-capacity", title: "Goals & Capacity", component: GoalsCapacitySection },
  { id: "marketing-competition", title: "Current Marketing & Competition", component: MarketingCompetitionSection },
  { id: "lead-handling", title: "Lead Handling", component: LeadHandlingSection },
  { id: "aspirations", title: "Aspirations", component: AspirationsSection },
]

export function LeadMagnetForm() {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    businessSnapshot: {},
    goalsCapacity: {},
    marketingCompetition: {},
    leadHandling: {},
    aspirations: {},
  })
  const [formState, setFormState] = useState<FormState>("form")
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const progress = ((currentSection + 1) / SECTIONS.length) * 100
  const CurrentSectionComponent = SECTIONS[currentSection].component

  const handleNext = () => {
    if (currentSection === 0) {
      const { name, email, trade, serviceAreas } = formData.businessSnapshot
      if (!name?.trim() || !email?.trim() || !trade?.trim() || !serviceAreas?.trim()) {
        alert("Please fill in all required fields before continuing.")
        return
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) {
        alert("Please enter a valid email address.")
        return
      }
    }

    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSubmit = async () => {
    setFormState("processing")
    setError(null)

    try {
      const result = await submitFormData(formData)
      setResults(result)
      setFormState("results")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setFormState("error")
    }
  }

  const handleRetry = () => {
    setFormState("form")
    setError(null)
  }

  if (formState === "processing") {
    return <ProcessingScreen />
  }

  if (formState === "results" && results) {
    return <ResultsScreen results={results} />
  }

  if (formState === "error") {
    return <ErrorScreen error={error} onRetry={handleRetry} />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="text-primary-foreground py-6 px-4 bg-foreground">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-background">The Agency Alternative</h1>
          <p className="text-center mt-2 text-background">Get your personalised growth plan</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentSection + 1} of {SECTIONS.length}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">{SECTIONS[currentSection].title}</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 md:p-8">
            <CurrentSectionComponent data={formData} onChange={setFormData} />
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-card border-t px-4 py-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentSection === 0}
            className="min-h-[48px] px-6 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentSection === SECTIONS.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="min-h-[48px] px-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Get My Plan
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="min-h-[48px] px-6 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
