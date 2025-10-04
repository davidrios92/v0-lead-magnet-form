"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormData } from "@/types/form-types"

interface MarketingCompetitionSectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

export function MarketingCompetitionSection({ data, onChange }: MarketingCompetitionSectionProps) {
  const updateMarketingCompetition = (field: string, value: any) => {
    onChange({
      ...data,
      marketingCompetition: {
        ...data.marketingCompetition,
        [field]: value,
      },
    })
  }

  const handleAdsRunningChange = (value: string) => {
    updateMarketingCompetition("adsRunning", value)
  }

  const currentAdsRunning =
    typeof data.marketingCompetition.adsRunning === "string" ? data.marketingCompetition.adsRunning : ""

  const adsOptions = [
    { value: "Google", label: "Google", id: "platform-google" },
    { value: "Meta", label: "Meta (Facebook/Instagram)", id: "platform-meta" },
    { value: "Both", label: "Both", id: "platform-both" },
    { value: "None", label: "None", id: "platform-none" },
  ]

  const leadSourceOptions = [
    { value: "Word of mouth", label: "Word of mouth", id: "word-of-mouth" },
    { value: "Google", label: "Google", id: "source-google" },
    { value: "Facebook", label: "Facebook", id: "facebook-leads" },
    { value: "Referrals", label: "Referrals", id: "referrals" },
    { value: "Other", label: "Other", id: "other-leads" },
  ]

  const websiteOptions = [
    { value: "Yes", label: "Yes", id: "website-yes" },
    { value: "No", label: "No", id: "website-no" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Current marketing & competition</h2>
        <p className="text-muted-foreground">Tell us about your current marketing efforts</p>
      </div>

      <div className="space-y-8">
        {/* Question 9: Ads Running */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Do you already run any ads?</Label>
          <div className="space-y-3">
            {adsOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors bg-background"
              >
                <input
                  type="radio"
                  id={option.id}
                  name="adsRunning"
                  value={option.value}
                  checked={currentAdsRunning === option.value}
                  onChange={(e) => handleAdsRunningChange(e.target.value)}
                  className="w-4 h-4 text-primary border-2 border-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-background"
                />
                <Label htmlFor={option.id} className="text-base cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 10: Lead Source */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Where do most of your leads come from today?</Label>
          <div className="space-y-3">
            {leadSourceOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors bg-background"
              >
                <input
                  type="radio"
                  id={option.id}
                  name="leadSource"
                  value={option.value}
                  checked={(data.marketingCompetition.leadSource || "") === option.value}
                  onChange={(e) => updateMarketingCompetition("leadSource", e.target.value)}
                  className="w-4 h-4 text-primary border-2 border-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-background"
                />
                <Label htmlFor={option.id} className="text-base cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 11: Website Status */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Do you have a website?</Label>
          <div className="space-y-3">
            {websiteOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors bg-background"
              >
                <input
                  type="radio"
                  id={option.id}
                  name="websiteStatus"
                  value={option.value}
                  checked={(data.marketingCompetition.websiteStatus || "") === option.value}
                  onChange={(e) => updateMarketingCompetition("websiteStatus", e.target.value)}
                  className="w-4 h-4 text-primary border-2 border-muted-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-background"
                />
                <Label htmlFor={option.id} className="text-base cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 12: Top Competitor */}
        <div className="space-y-3">
          <Label htmlFor="topCompetitor" className="text-base font-medium">
            Who do you see as your biggest competitor locally? (Optional)
          </Label>
          <Input
            id="topCompetitor"
            placeholder="Company name or type of business..."
            value={data.marketingCompetition.topCompetitor || ""}
            onChange={(e) => updateMarketingCompetition("topCompetitor", e.target.value)}
            className="min-h-[48px] text-base border-muted bg-background"
          />
        </div>
      </div>
    </div>
  )
}
