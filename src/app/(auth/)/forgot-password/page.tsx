'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { Mail, ArrowLeft, Loader2, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { BackgroundShapes } from '@/components/BackgroundShapes'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      setSent(true)
      toast.success('Reset link sent to your email!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundShapes />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 border border-white/10">
          <Link href="/login" title="Back to Login" className="inline-flex items-center text-sm text-white/40 hover:text-[#00f2ff] transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Forgot <span className="text-[#00f2ff]">Password?</span>
            </h1>
            <p className="text-white/60">Enter your email and we'll send you a reset link</p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <span>Send Reset Link</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-[#00f2ff]/10 border border-[#00f2ff]/20 rounded-lg p-4">
                <p className="text-sm text-white/80">
                  If an account exists for <span className="text-white font-medium">{email}</span>, you will receive a password reset link shortly.
                </p>
              </div>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-[#00f2ff] hover:underline"
              >
                Try another email
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
