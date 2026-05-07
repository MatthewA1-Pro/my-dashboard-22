'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Activity, 
  Eye,
  TrendingUp,
  CreditCard
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Cell,
  Pie
} from 'recharts'

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
]

const pieData = [
  { name: 'AI Models', value: 400 },
  { name: 'Data Storage', value: 300 },
  { name: 'API Calls', value: 300 },
  { name: 'Infrastructure', value: 200 },
]

const COLORS = ['#00f2ff', '#a855f7', '#3b82f6', '#10b981']

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass p-6 rounded-2xl relative overflow-hidden group border border-white/5"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#00f2ff]/10 transition-colors">
        <Icon className="w-6 h-6 text-[#00f2ff]" />
      </div>
      <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
        <span>{change}</span>
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      </div>
    </div>
    <p className="text-white/40 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
)

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-white/40 mt-1">Real-time metrics for your AI deployments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button title="Export" className="glass px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            Export Data
          </button>
          <button className="btn-primary px-4 py-2 text-sm">
            Create Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" icon={DollarSign} trend="up" />
        <StatCard title="Active Users" value="+2,350" change="+180.1%" icon={Users} trend="up" />
        <StatCard title="API Requests" value="12.2k" change="+19%" icon={Activity} trend="up" />
        <StatCard title="Error Rate" value="0.012%" change="-4.4%" icon={Activity} trend="down" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass p-6 rounded-2xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold">Revenue Growth</h2>
            <select title="Time Range" className="bg-white/5 border border-white/5 rounded-lg px-3 py-1 text-sm focus:outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff40', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff40', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#00f2ff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00f2ff" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Model Usage Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 rounded-2xl border border-white/5"
        >
          <h2 className="text-lg font-bold mb-8">Model Usage</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-white/60">{entry.name}</span>
                </div>
                <span className="font-medium">{entry.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Activity Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3 glass p-6 rounded-2xl border border-white/5"
        >
          <h2 className="text-lg font-bold mb-8">Weekly Activity</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff40', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff40', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#00f2ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/5 overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Transactions</h2>
          <button className="text-sm text-[#00f2ff] hover:underline">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase text-white/20">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <User className="w-4 h-4 text-white/40" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">User #{i}234</p>
                        <p className="text-xs text-white/20">user{i}@example.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase rounded-full">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40">
                    May {7 - i}, 2026
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right">
                    +$345.00
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
