import { type NextRequest, NextResponse } from "next/server"

// This is a mock API route for demonstration purposes
// In production, this would forward to your actual n8n webhook
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful response
    const mockResponse = {
      status: "ok",
      summary: {
        headline: "Immediate wins for more high-value jobs",
        bullets: [
          "Prioritise Google Ads in 3 target postcodes",
          "Build a single offer page to lift close rate from 35% → 45%",
          "Set up automated follow-up system for faster response times",
          "Focus on commercial work to increase average job value",
        ],
        est_budget_range_aud: [1500, 3500],
        est_weekly_leads_target: 12,
      },
      pdf: {
        url: "https://example.com/sample-report.pdf",
        expires_at_iso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ status: "error", message: "Internal server error" }, { status: 500 })
  }
}
