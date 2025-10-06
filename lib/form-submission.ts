import type { FormData, WebhookResponse } from "@/types/form-types"
import { v4 as uuidv4 } from "uuid"

const WEBHOOK_URL = "https://theagencyalternative.app.n8n.cloud/webhook/30daysplan"
const WEBHOOK_STATUS_BASE = process.env.NEXT_PUBLIC_WEBHOOK_STATUS_BASE || "https://your-n8n-status-url.com"

function extractPostcodes(serviceAreas: string): string[] {
  if (!serviceAreas) return []

  const postcodeRegex = /\b\d{3,4}\b/g
  const matches = serviceAreas.match(postcodeRegex) || []
  return [...new Set(matches)] // Remove duplicates
}

function normalizeFormData(data: FormData) {
  const idempotencyKey = uuidv4()

  console.log("[v0] DEBUG - avgJobValue raw:", data.goalsCapacity.avgJobValue)
  console.log("[v0] DEBUG - avgJobValue type:", typeof data.goalsCapacity.avgJobValue)
  console.log("[v0] DEBUG - avgJobValue >= 20000:", (data.goalsCapacity.avgJobValue || 0) >= 20000)

  return {
    metadata: {
      form_version: "1.0.0",
      submitted_at_iso: new Date().toISOString(),
      source: "lead-magnet-typeform-ui",
      idempotency_key: idempotencyKey,
    },
    business_snapshot: {
      name: data.businessSnapshot.name || "",
      email: data.businessSnapshot.email || "",
      trade: data.businessSnapshot.trade || "",
      focus: data.businessSnapshot.focus || "",
      service_areas_raw: data.businessSnapshot.serviceAreas || "",
      service_postcodes: extractPostcodes(data.businessSnapshot.serviceAreas || ""),
    },
    goals_capacity: {
      primary_goal: data.goalsCapacity.primaryGoal || "",
      jobs_per_month_capacity: {
        value: data.goalsCapacity.jobsPerMonth || 0,
        capped_at_max: (data.goalsCapacity.jobsPerMonth || 0) >= 50,
      },
      avg_job_value_aud: {
        value: data.goalsCapacity.avgJobValue || 0,
        capped_at_max: (data.goalsCapacity.avgJobValue || 0) >= 20000,
      },
      profitable_job_types: data.goalsCapacity.profitableJobTypes || "",
      travel_radius_km: {
        value: data.goalsCapacity.travelRadius || 0,
        capped_at_max: (data.goalsCapacity.travelRadius || 0) >= 50,
      },
    },
    marketing_competition: {
      ads_running: data.marketingCompetition.adsRunning || {
        google: false,
        meta: false,
        both: false,
        none: false,
      },
      lead_source_primary: data.marketingCompetition.leadSource || "",
      website_status: data.marketingCompetition.websiteStatus || "",
      top_competitor: data.marketingCompetition.topCompetitor || "",
    },
    lead_handling: {
      close_rate_percent: Math.max(5, Math.min(80, data.leadHandling.closeRate || 35)),
      typical_response_time: data.leadHandling.responseTime || "",
    },
    aspirations: {
      impact_if_consistent_leads: data.aspirations.impactIfConsistentLeads || "",
    },
  }
}

export async function submitFormData(data: FormData): Promise<WebhookResponse> {
  const normalizedData = normalizeFormData(data)

  console.log("[v0] Submitting form data to webhook:", WEBHOOK_URL)
  console.log("[v0] Normalized data:", normalizedData)

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client": "the-agency-alternative",
        "Idempotency-Key": normalizedData.metadata.idempotency_key,
      },
      body: JSON.stringify(normalizedData),
    })

    console.log("[v0] Webhook response status:", response.status)
    console.log("[v0] Webhook response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Webhook error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    try {
      const result: WebhookResponse = await response.json()
      console.log("[v0] Webhook success result:", result)

      // Handle asynchronous processing
      if (result.status === "processing" && result.job_id) {
        return await pollForResults(result.job_id)
      }

      return result
    } catch (jsonError) {
      console.log("[v0] Failed to parse JSON response:", jsonError)
      throw new Error("Invalid response from server. Please try again.")
    }
  } catch (error) {
    console.error("[v0] Form submission error:", error)
    throw new Error("Failed to submit form. Please check your connection and try again.")
  }
}

async function pollForResults(jobId: string): Promise<WebhookResponse> {
  const maxAttempts = 30 // 90 seconds with 3-second intervals
  let attempts = 0

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`${WEBHOOK_STATUS_BASE}/${jobId}`)

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`)
      }

      const result: WebhookResponse = await response.json()

      if (result.status === "ok" || result.status === "error") {
        return result
      }

      // Wait 3 seconds before next poll
      await new Promise((resolve) => setTimeout(resolve, 3000))
      attempts++
    } catch (error) {
      console.error("Polling error:", error)
      attempts++
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }

  throw new Error("Processing timeout. Please try again or contact support.")
}
