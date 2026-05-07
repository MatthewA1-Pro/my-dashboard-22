'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { BackgroundShapes } from '@/components/BackgroundShapes'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundShapes />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 border border-white/10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#00f2ff]/20 rounded-full flex items-center justify-center animate-pulse">
              <Mail className="w-10 h-10 text-[#00f2ff]" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Verify your email</h1>
          <p className="text-white/60 mb-8">
            We've sent a verification link to your email address. Please click the link to verify your account and access the dashboard.
          </p>

          <div className="space-y-4">
            <button className="btn-primary w-full cursor-pointer">
              Resend Verification Email
            </button>
            <Link 
              href="/login" 
              title="Back to Login"
              className="block text-sm text-white/40 hover:text-white transition-colors"
            >
              Back to login
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs text-white/30">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
