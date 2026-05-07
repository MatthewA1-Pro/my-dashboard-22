'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  PieChart as PieChartIcon,
  TrendingUp,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-[#00f2ff]/20 border-t-[#00f2ff] rounded-full animate-spin" />
          <div className="absolute inset-0 blur-xl bg-[#00f2ff]/20 rounded-full animate-pulse" />
        </div>
      </div>
    )
  }

  if (!user) return null

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard', active: true },
    { icon: BarChart3, label: 'Analytics', href: '#' },
    { icon: Users, label: 'Customers', href: '#' },
    { icon: PieChartIcon, label: 'Reports', href: '#' },
    { icon: TrendingUp, label: 'Revenue', href: '#' },
    { icon: Activity, label: 'Activity', href: '#' },
    { icon: Settings, label: 'Settings', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed lg:relative z-50 w-64 h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#00f2ff] rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">A</span>
                </div>
                <span className="font-bold text-xl tracking-tight">Antigravity</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active 
                      ? 'bg-[#00f2ff]/10 text-[#00f2ff]' 
                      : 'text-white/40 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? 'text-[#00f2ff]' : 'group-hover:text-white'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-white/5">
              <button
                onClick={signOut}
                className="flex items-center space-x-3 px-4 py-3 w-full text-white/40 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 lg:px-8 bg-[#050505]/80 backdrop-blur-md z-40">
          <div className="flex items-center">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="mr-4 text-white/40 hover:text-white transition-colors cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                placeholder="Search analytics..."
                className="bg-white/5 border border-white/5 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00f2ff]/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-white/40 hover:text-white transition-colors cursor-pointer" title="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#00f2ff] rounded-full border-2 border-[#050505]" />
            </button>
            
            <div className="h-8 w-px bg-white/5 mx-2" />

            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{user.email?.split('@')[0]}</p>
                <p className="text-xs text-white/40 mt-1">Free Plan</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-tr from-[#00f2ff] to-purple-500 rounded-full flex items-center justify-center font-bold text-xs">
                {user.email?.[0].toUpperCase()}
              </div>
              <ChevronDown className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
