"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/types/form-types"

interface GoalsCapacitySectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

export function GoalsCapacitySection({ data, onChange }: GoalsCapacitySectionProps) {
  const updateGoalsCapacity = (field: string, value: any) => {
    onChange({
      ...data,
      goalsCapacity: {
        ...data.goalsCapacity,
        [field]: value,
      },
    })
  }

  const formatJobValue = (value: number) => {
    if (value >= 20000) return "$20,000+"
    return `$${value.toLocaleString("en-AU")}`
  }

  const formatTravelRadius = (value: number) => {
    if (value >= 50) return "50km+"
    return `${value}km`
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Your goals and capacity</h2>
        <p className="text-muted-foreground">Help us understand what you're aiming for</p>
      </div>

      <div className="space-y-8">
        {/* Question 4: Primary Goal */}
        <div className="space-y-4">
          <Label className="text-base font-medium">What's your #1 goal right now?</Label>
          <RadioGroup
            value={data.goalsCapacity.primaryGoal || ""}
            onValueChange={(value) => updateGoalsCapacity("primaryGoal", value)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors bg-background">
              <RadioGroupItem
                value="More calls immediately"
                id="more-calls"
                className="min-w-[20px] min-h-[20px] border-muted"
              />
              <Label htmlFor="more-calls" className="text-base cursor-pointer flex-1">
                More calls immediately
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors bg-background">
              <RadioGroupItem
                value="More quality/high-value jobs"
                id="quality-jobs"
                className="min-w-[20px] min-h-[20px] border-muted"
              />
              <Label htmlFor="quality-jobs" className="text-base cursor-pointer flex-1">
                More quality/high-value jobs
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors bg-background">
              <RadioGroupItem
                value="Consistent pipeline of work"
                id="consistent-pipeline"
                className="min-w-[20px] min-h-[20px] border-muted"
              />
              <Label htmlFor="consistent-pipeline" className="text-base cursor-pointer flex-1">
                Consistent pipeline of work
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Question 5: Jobs Per Month */}
        <div className="space-y-4">
          <Label className="text-base font-medium">How many jobs can you realistically take per month?</Label>
          <div className="px-3">
            <Slider
              value={[data.goalsCapacity.jobsPerMonth || 10]}
              onValueChange={(value) => updateGoalsCapacity("jobsPerMonth", value[0])}
              max={50}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>0</span>
              <span className="font-medium text-base text-foreground">
                {data.goalsCapacity.jobsPerMonth >= 50 ? "50+" : data.goalsCapacity.jobsPerMonth || 10} jobs
              </span>
              <span>50+</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Be realistic—this helps us set the right lead targets.</p>
        </div>

        {/* Question 6: Average Job Value */}
        <div className="space-y-4">
          <Label className="text-base font-medium">What's your average job value? (AUD)</Label>
          <div className="px-3">
            <Input
              type="number"
              placeholder="Enter amount (e.g., 2000)"
              value={data.goalsCapacity.avgJobValue || ""}
              onChange={(e) => updateGoalsCapacity("avgJobValue", Number.parseInt(e.target.value) || 0)}
              min="200"
              max="50000"
              step="100"
              className="min-h-[48px] text-base border-muted bg-background"
            />
            <p className="text-sm text-muted-foreground mt-2">Enter your average job value in AUD</p>
          </div>
        </div>

        {/* Question 7: Profitable Job Types */}
        <div className="space-y-3">
          <Label htmlFor="profitableJobTypes" className="text-base font-medium">
            What type of jobs are most profitable for you?
          </Label>
          <Input
            id="profitableJobTypes"
            placeholder="E.g., kitchen renovations, commercial fit-outs..."
            value={data.goalsCapacity.profitableJobTypes || ""}
            onChange={(e) => updateGoalsCapacity("profitableJobTypes", e.target.value)}
            className="min-h-[48px] text-base border-muted bg-background"
          />
        </div>

        {/* Question 8: Travel Radius */}
        <div className="space-y-4">
          <Label className="text-base font-medium">How far are you willing to travel for work?</Label>
          <div className="px-3">
            <Slider
              value={[data.goalsCapacity.travelRadius || 25]}
              onValueChange={(value) => updateGoalsCapacity("travelRadius", value[0])}
              max={50}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>5km</span>
              <span className="font-medium text-base text-foreground">
                {formatTravelRadius(data.goalsCapacity.travelRadius || 25)}
              </span>
              <span>50km+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
