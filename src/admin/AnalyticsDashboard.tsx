import { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { apiAuthFetch } from '@/services/api';
import { Eye, MousePointerClick, Github, Mail, TrendingUp, Activity, Clock, Zap, Target, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface AnalyticsSummary {
  totalViews: number;
  contactSubmissions: number;
  demoClicks: number;
  githubClicks: number;
  topProjects: { _id: string; title: string; count: number }[];
  recentEvents: any[];
  viewsLast7Days: { _id: string; count: number }[];
}

const COLORS = ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'];

const StatCard = ({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: number | string; sub?: string; color: string;
}) => (
  <Card className="group border border-slate-100 bg-white rounded-[2.5rem] overflow-hidden hover:shadow-xl transition-all duration-300 shadow-sm">
    <CardContent className="p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{label}</p>
          <p className={`text-4xl font-black tracking-tighter italic ${color}`}>{value}</p>
          {sub && <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{sub}</p>}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${color.replace('text-', 'bg-')}/5`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiAuthFetch('/analytics/summary')
      .then(setData)
      .catch(() => setError('Telemetry offline: Check authentication status.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-10">
      <div className="h-10 bg-slate-50 border border-slate-100 rounded-2xl w-64 animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 bg-slate-50 border border-slate-100 rounded-[2.5rem] animate-pulse" />
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="py-20 text-center bg-rose-50 rounded-[3rem] border border-rose-100 text-rose-500 flex flex-col items-center gap-4">
      <Activity size={48} />
      <p className="font-black uppercase tracking-widest text-xs">{error}</p>
    </div>
  );

  if (!data) return null;

  // Fill in missing days for last 7 days chart
  const viewsChart = (() => {
    const map = Object.fromEntries((data.viewsLast7Days || []).map(d => [d._id, d.count]));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().split('T')[0];
      return { date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), views: map[key] || 0 };
    });
  })();

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Performance <span className="text-sky-500">Telemetry</span></h1>
           <p className="text-slate-500 font-medium text-lg">Real-time engagement metrics and traffic distribution signatures.</p>
        </div>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard icon={<Eye size={22} className="text-sky-500" />} label="Surface Scans" value={data.totalViews} color="text-sky-500" sub="Total Page Views" />
        <StatCard icon={<Zap size={22} className="text-sky-500" />} label="Action Events" value={data.demoClicks} color="text-sky-500" sub="Interactive Clicks" />
        <StatCard icon={<Github size={22} className="text-slate-700" />} label="Repo Syncs" value={data.githubClicks} color="text-slate-700" sub="GitHub Inbound" />
        <StatCard icon={<Mail size={22} className="text-sky-600" />} label="Inbound Leads" value={data.contactSubmissions} color="text-sky-600" sub="Form Submissions" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Graph Card */}
        <Card className="lg:col-span-2 border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
           <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100">
                    <TrendingUp size={20} />
                 </div>
                 <div>
                    <CardTitle className="text-xl font-black tracking-tighter uppercase italic">Traffic Intensity</CardTitle>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">7-Day Analysis Window</p>
                 </div>
              </div>
              <Activity size={20} className="text-slate-200" />
           </CardHeader>
           <CardContent className="p-10 pt-10 h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={viewsChart}>
                    <defs>
                       <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 900 }} dy={20} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 900 }} dx={-20} allowDecimals={false} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.05)', backgroundColor: '#fff', padding: '15px' }} 
                       labelStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px', color: '#94a3b8', letterSpacing: '0.1em', marginBottom: '5px' }}
                       itemStyle={{ fontWeight: 900, fontSize: '14px', color: '#0ea5e9', fontStyle: 'italic' }}
                       cursor={{ stroke: '#0ea5e9', strokeWidth: 2, strokeDasharray: '5 5' }}
                    />
                    <Area type="monotone" dataKey="views" stroke="#0ea5e9" fill="url(#viewGrad)" strokeWidth={4} name="Views Detected" dot={{ fill: '#0ea5e9', strokeWidth: 3, r: 5, stroke: '#fff' }} activeDot={{ r: 8, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 4 }} />
                 </AreaChart>
              </ResponsiveContainer>
           </CardContent>
        </Card>

        {/* Top Entities */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm flex flex-col">
           <CardHeader className="p-10 pb-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100">
                    <Target size={20} />
                 </div>
                 <div>
                    <CardTitle className="text-xl font-black tracking-tighter uppercase italic">Entity Focus</CardTitle>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">High Engagement Nodes</p>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-10 flex-1 flex flex-col justify-center">
              {data.topProjects?.length > 0 ? (
                 <div className="space-y-6">
                    {data.topProjects.slice(0, 5).map((project, i) => (
                       <div key={i} className="flex flex-col gap-2 group">
                          <div className="flex items-center justify-between">
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 truncate max-w-[70%] group-hover:text-sky-500 transition-colors italic">{project.title}</span>
                             <span className="text-[10px] font-black text-sky-500 bg-sky-50 px-3 py-1 rounded-full">{project.count} hits</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }} 
                               animate={{ width: `${(project.count / data.totalViews) * 500}%` }} 
                               transition={{ duration: 1, delay: i * 0.1 }}
                               className="h-full bg-sky-500 rounded-full"
                             />
                          </div>
                       </div>
                    ))}
                 </div>
              ) : (
                 <div className="text-center py-20">
                    <Zap size={32} className="mx-auto mb-4 text-slate-100" />
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Insufficient data context</p>
                 </div>
              )}
           </CardContent>
        </Card>
      </div>

      {/* Events Log */}
      <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
        <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/20 flex flex-row items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-50 text-slate-400 flex items-center justify-center">
                 <Clock size={20} />
              </div>
              <CardTitle className="text-xl font-black tracking-tighter uppercase italic">Raw Telemetry Log</CardTitle>
           </div>
           <ArrowUpRight size={20} className="text-slate-200" />
        </CardHeader>
        <CardContent className="p-0">
           <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {data.recentEvents?.length > 0 ? (
                 <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 sticky top-0 z-10">
                       <tr>
                          <th className="p-6 pl-10 text-[9px] font-black uppercase tracking-widest text-slate-400">Sector Code</th>
                          <th className="p-6 text-[9px] font-black uppercase tracking-widest text-slate-400">Node Identifier</th>
                          <th className="p-6 text-[9px] font-black uppercase tracking-widest text-slate-400">Time Signature</th>
                          <th className="p-6 pr-10 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {data.recentEvents.map((e, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                             <td className="p-6 pl-10">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                  e.type === 'page_view' ? 'bg-sky-50 text-sky-600' :
                                  e.type === 'demo_click' ? 'bg-indigo-50 text-indigo-600' :
                                  'bg-slate-50 text-slate-500'
                                }`}>{e.type.replace('_', ' ')}</span>
                             </td>
                             <td className="p-6">
                                <span className="text-[10px] font-black text-slate-900 uppercase italic group-hover:text-sky-500 transition-colors">
                                   {e.path || e.resourceTitle || 'ROOT_NODE'}
                                </span>
                             </td>
                             <td className="p-6">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                   {new Date(e.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                             </td>
                             <td className="p-6 pr-10 text-right">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 ml-auto shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="VALID_RECEPTION" />
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              ) : (
                 <div className="py-20 text-center text-slate-300 font-black uppercase tracking-widest text-[10px]">Log buffer empty.</div>
              )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
