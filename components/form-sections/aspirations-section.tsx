"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { FormData } from "@/types/form-types"

interface AspirationsSectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

export function AspirationsSection({ data, onChange }: AspirationsSectionProps) {
  const updateAspirations = (field: string, value: any) => {
    onChange({
      ...data,
      aspirations: {
        ...data.aspirations,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your aspirations</h2>
        <p className="text-muted-foreground">Finally, tell us about your vision for the future</p>
      </div>

      <div className="space-y-6">
        {/* Question 15: Impact if Consistent Leads */}
        <div className="space-y-3">
          <Label htmlFor="impactIfConsistentLeads" className="text-base font-medium">
            If leads were flowing in consistently, what would that mean for your business? (Optional)
          </Label>
          <Textarea
            id="impactIfConsistentLeads"
            placeholder="E.g. hire more staff, expand services, work fewer hours, grow revenue..."
            value={data.aspirations.impactIfConsistentLeads || ""}
            onChange={(e) => updateAspirations("impactIfConsistentLeads", e.target.value)}
            className="min-h-[120px] text-base resize-none border-muted bg-background"
          />
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-foreground mb-2">You're almost done!</h3>
          <p className="text-muted-foreground">
            Click "Get My Plan" to receive your personalised growth strategy and PDF report.
          </p>
        </div>
      </div>
    </div>
  )
}
