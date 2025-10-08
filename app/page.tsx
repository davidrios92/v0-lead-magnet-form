import { LeadMagnetForm } from "@/components/lead-magnet-form"
import { BrowserRedirect } from "@/components/browser-redirect"

export default function HomePage() {
  return (
    <main className="bg-background m-0 p-0 w-full">
      <BrowserRedirect />
      <LeadMagnetForm />
    </main>
  )
}
