"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export function BrowserRedirect() {
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera
    const isFacebookApp = ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1 || ua.indexOf("Instagram") > -1
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua)

    if (isFacebookApp && isMobile) {
      const currentUrl = window.location.href

      // For Android - attempt to open in Chrome
      if (/Android/i.test(ua)) {
        // Try Chrome intent URL
        window.location.href =
          "intent://" +
          currentUrl.replace("https://", "").replace("http://", "") +
          "#Intent;scheme=https;package=com.android.chrome;end"

        // Fallback to Chrome custom URL scheme after 1 second
        setTimeout(() => {
          window.location.href = "googlechrome://" + currentUrl.replace("https://", "").replace("http://", "")
        }, 1000)
      }

      // For iOS - show instructions (automatic redirect not possible)
      if (/iPhone|iPad|iPod/i.test(ua)) {
        setShowIOSInstructions(true)
      }
    }
  }, [])

  if (!showIOSInstructions) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => setShowIOSInstructions(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Open in Safari</h2>
          <p className="text-gray-600">For the best experience, please open this form in Safari:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Tap the three dots (•••) at the bottom right</li>
            <li>Select "Open in Safari"</li>
            <li>Complete your assessment there</li>
          </ol>
          <button
            onClick={() => setShowIOSInstructions(false)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
