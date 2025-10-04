"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { FormData } from "@/types/form-types"

interface BusinessSnapshotSectionProps {
  data: FormData
  onChange: (data: FormData) => void
}

export function BusinessSnapshotSection({ data, onChange }: BusinessSnapshotSectionProps) {
  const updateBusinessSnapshot = (field: string, value: any) => {
    onChange({
      ...data,
      businessSnapshot: {
        ...data.businessSnapshot,
        [field]: value,
      },
    })
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Let's start with your business</h2>
        <p className="text-muted-foreground">Tell us about yourself and your trade</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-base font-medium">
            Your Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={data.businessSnapshot.name || ""}
            onChange={(e) => updateBusinessSnapshot("name", e.target.value)}
            className="min-h-[48px] text-base border border-muted bg-background"
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="email" className="text-base font-medium">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={data.businessSnapshot.email || ""}
            onChange={(e) => updateBusinessSnapshot("email", e.target.value)}
            className="min-h-[48px] text-base border border-muted bg-background"
            required
          />
        </div>

        {/* Question 1: Trade */}
        <div className="space-y-3">
          <Label htmlFor="trade" className="text-base font-medium">
            What trade are you in? <span className="text-destructive">*</span>
          </Label>
          <Input
            id="trade"
            placeholder="E.g. electrician, plumber, painter, landscaper..."
            value={data.businessSnapshot.trade || ""}
            onChange={(e) => updateBusinessSnapshot("trade", e.target.value)}
            className="min-h-[48px] text-base border border-muted bg-background"
            required
          />
        </div>

        {/* Question 2: Focus */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Do you want to focus on residential, commercial, or both?</Label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer bg-background">
              <input
                type="radio"
                name="focus"
                value="Residential"
                checked={data.businessSnapshot.focus === "Residential"}
                onChange={(e) => updateBusinessSnapshot("focus", e.target.value)}
                className="min-w-[20px] min-h-[20px] text-primary"
              />
              <span className="text-base flex-1">Residential</span>
            </label>
            <label className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer bg-background">
              <input
                type="radio"
                name="focus"
                value="Commercial"
                checked={data.businessSnapshot.focus === "Commercial"}
                onChange={(e) => updateBusinessSnapshot("focus", e.target.value)}
                className="min-w-[20px] min-h-[20px] text-primary"
              />
              <span className="text-base flex-1">Commercial</span>
            </label>
            <label className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer bg-background">
              <input
                type="radio"
                name="focus"
                value="Both"
                checked={data.businessSnapshot.focus === "Both"}
                onChange={(e) => updateBusinessSnapshot("focus", e.target.value)}
                className="min-w-[20px] min-h-[20px] text-primary"
              />
              <span className="text-base flex-1">Both</span>
            </label>
          </div>
        </div>

        {/* Question 3: Service Areas */}
        <div className="space-y-3">
          <Label htmlFor="serviceAreas" className="text-base font-medium">
            Where do you want more work? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="serviceAreas"
            placeholder="List cities, regions or postcodes (e.g. Sydney, Perth, Illawarra, 2000, 3050, 6001)"
            value={data.businessSnapshot.serviceAreas || ""}
            onChange={(e) => updateBusinessSnapshot("serviceAreas", e.target.value)}
            className="min-h-[100px] text-base resize-none border-muted bg-background"
            required
          />
          <p className="text-sm text-muted-foreground">Add cities or postcodes separated by commas.</p>
        </div>
      </div>
    </div>
  )
}
