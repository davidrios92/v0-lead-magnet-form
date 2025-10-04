export interface BusinessSnapshot {
  name: string
  email: string
  trade?: string
  focus?: "Residential" | "Commercial" | "Both"
  serviceAreas?: string
}

export interface GoalsCapacity {
  primaryGoal?: "More calls immediately" | "More quality/high-value jobs" | "Consistent pipeline of work"
  jobsPerMonth?: number
  avgJobValue?: number
  profitableJobTypes?: string
  travelRadius?: number
}

export interface MarketingCompetition {
  adsRunning?: {
    google: boolean
    meta: boolean
    both: boolean
    none: boolean
  }
  leadSource?: "Word of mouth" | "Google" | "Facebook" | "Referrals" | "Other"
  websiteStatus?: "Works well" | "Needs work" | "No"
  topCompetitor?: string
}

export interface LeadHandling {
  closeRate?: number
  responseTime?: "5 min" | "10 min" | "15 min" | "30 min" | "1 hr" | "2 hrs" | "4 hrs" | "8 hrs" | "24 hrs+"
}

export interface Aspirations {
  impactIfConsistentLeads?: string
}

export interface FormData {
  businessSnapshot: BusinessSnapshot
  goalsCapacity: GoalsCapacity
  marketingCompetition: MarketingCompetition
  leadHandling: LeadHandling
  aspirations: Aspirations
}

export type FormState = "form" | "processing" | "results" | "error"

export interface WebhookResponse {
  status: "ok" | "processing" | "error"
  summary?: {
    headline: string
    bullets: string[]
    est_budget_range_aud?: [number, number]
    est_weekly_leads_target?: number
  }
  pdf?: {
    url: string
    expires_at_iso?: string
  }
  job_id?: string
  message?: string
}
