'use client'

import { useState } from 'react'
import { DM_Sans } from 'next/font/google'

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function ProductInquiryForm({ productName }: { productName: string }) {
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    try {
      const formData = new FormData(form)
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setSuccess(true)
        form.reset()
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-gray-100 border border-gray-200 shadow-lg p-8 md:p-10">
      <h2 className={`text-3xl font-bold text-black mb-8 text-center ${dmsans.className}`}>
        Product Inquiry
      </h2>
      <form
        className="space-y-6 max-w-2xl mx-auto"
        action="https://formsubmit.co/ajax/hr@atozee.net"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value={`New Inquiry: ${productName}`} />
        <input type="hidden" name="_template" value="box" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          <div>
            <input
              type="text"
              name="name"
              required
              placeholder="Name*"
              className="w-full px-4 md:px-8 py-4 md:py-6 text-base md:text-lg border border-gray-200 focus:ring-1 focus:ring-[#D3B683] focus:border-[#D3B683] outline-none transition bg-white placeholder-gray-500"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email*"
              className="w-full px-4 md:px-8 py-4 md:py-6 text-base md:text-lg border border-gray-200 focus:ring-1 focus:ring-[#D3B683] focus:border-[#D3B683] outline-none transition bg-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company"
              className="w-full px-4 md:px-8 py-4 md:py-6 text-base md:text-lg border border-gray-200 focus:ring-1 focus:ring-[#D3B683] focus:border-[#D3B683] outline-none transition bg-white placeholder-gray-500"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full px-4 md:px-8 py-4 md:py-6 text-base md:text-lg border border-gray-200 focus:ring-1 focus:ring-[#D3B683] focus:border-[#D3B683] outline-none transition bg-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="w-full">
          <input
            type="text"
            name="subject"
            required
            readOnly
            value={`Inquiry about ${productName}`}
            className="w-full px-4 md:px-8 py-4 md:py-6 text-base md:text-lg border border-gray-200 bg-gray-50 cursor-not-allowed placeholder-gray-500"
          />
        </div>

        <div className="w-full">
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Message*"
            className="w-full px-4 md:px-8 py-4 md:py-6 text-base md:text-lg border border-gray-200 focus:ring-1 focus:ring-[#D3B683] focus:border-[#D3B683] outline-none transition bg-white min-h-[100px] md:min-h-[120px] placeholder-gray-500"
          ></textarea>
        </div>

        {success && (
          <div className="p-4 mb-4 text-center text-green-700 bg-green-100 border border-green-200">
            Thank you for your inquiry! We&apos;ll get back to you soon.
          </div>
        )}

        <div className="pt-2 md:pt-4 w-full md:w-96 mx-auto">
          <button
            type="submit"
            className="w-full px-4 py-4 items-center text-base md:text-lg bg-black text-white font-medium hover:bg-gray-900 transition duration-300 focus:outline-none focus:ring-1 focus:ring-[#6B4F3B]"
          >
            SUBMIT INQUIRY
          </button>
        </div>
      </form>
    </div>
  )
}