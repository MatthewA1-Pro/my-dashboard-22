'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Github, Mail, Lock, Chrome, Facebook, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { BackgroundShapes } from '@/components/BackgroundShapes'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
      setLoading(false)
    } else {
      toast.success('Successfully logged in!')
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) toast.error(error.message)
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
        <div className="glass rounded-2xl p-8 border border-white/10 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#00f2ff]/20 rounded-full blur-2xl" />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Welcome <span className="text-[#00f2ff]">Back</span>
            </h1>
            <p className="text-white/60">Log in to your Antigravity AI account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-medium text-white/80">Password</label>
                <Link href="/forgot-password" title="Forgot Password" className="text-xs text-[#00f2ff] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 px-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#00f2ff] focus:ring-[#00f2ff]/50" />
              <label htmlFor="remember" className="text-sm text-white/60 select-none">Remember me</label>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0b0b0b] px-2 text-white/40">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => handleSocialLogin('google')} title="Google Login" className="glass py-2 flex justify-center rounded-lg glass-hover">
              <Chrome className="w-5 h-5 text-white/80" />
            </button>
            <button onClick={() => handleSocialLogin('github')} title="GitHub Login" className="glass py-2 flex justify-center rounded-lg glass-hover">
              <Github className="w-5 h-5 text-white/80" />
            </button>
            <button onClick={() => handleSocialLogin('facebook')} title="Facebook Login" className="glass py-2 flex justify-center rounded-lg glass-hover">
              <Facebook className="w-5 h-5 text-white/80" />
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            Don't have an account?{' '}
            <Link href="/signup" title="Sign Up" className="text-[#00f2ff] font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
