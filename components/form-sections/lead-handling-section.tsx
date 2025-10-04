"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/types/form-types"

interface LeadHandlingSectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

const RESPONSE_TIME_OPTIONS = ["5 min", "10 min", "15 min", "30 min", "1 hr", "2 hrs", "4 hrs", "8 hrs", "24 hrs+"]

export function LeadHandlingSection({ data, onChange }: LeadHandlingSectionProps) {
  const updateLeadHandling = (field: string, value: any) => {
    onChange({
      ...data,
      leadHandling: {
        ...data.leadHandling,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Lead handling</h2>
        <p className="text-muted-foreground">Help us understand how you handle enquiries</p>
      </div>

      <div className="space-y-8">
        {/* Question 13: Close Rate */}
        <div className="space-y-4">
          <Label className="text-base font-medium">What's your close rate from enquiry to job?</Label>
          <div className="px-3">
            <Slider
              value={[data.leadHandling.closeRate || 35]}
              onValueChange={(value) => updateLeadHandling("closeRate", value[0])}
              max={80}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>5%</span>
              <span className="font-medium text-base text-foreground">{data.leadHandling.closeRate || 35}%</span>
              <span>80%</span>
            </div>
          </div>
        </div>

        {/* Question 14: Response Time */}
        <div className="space-y-4">
          <Label className="text-base font-medium">When a lead comes in, how quickly do you usually respond?</Label>
          <RadioGroup
            value={data.leadHandling.responseTime || ""}
            onValueChange={(value) => updateLeadHandling("responseTime", value)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {RESPONSE_TIME_OPTIONS.map((time) => (
              <div
                key={time}
                className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors bg-background"
              >
                <RadioGroupItem value={time} id={time} className="min-w-[20px] min-h-[20px]" />
                <Label htmlFor={time} className="text-base cursor-pointer flex-1">
                  {time}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <p className="text-sm text-muted-foreground">Faster replies lift close rate. We'll factor this in.</p>
        </div>
      </div>
    </div>
  )
}
