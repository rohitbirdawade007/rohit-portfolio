import { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { apiAuthFetch } from '@/services/api';
import { Eye, MousePointerClick, Github, Mail, TrendingUp, Activity, Clock } from 'lucide-react';

interface AnalyticsSummary {
  totalViews: number;
  contactSubmissions: number;
  demoClicks: number;
  githubClicks: number;
  topProjects: { _id: string; title: string; count: number }[];
  recentEvents: any[];
  viewsLast7Days: { _id: string; count: number }[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

const StatBox = ({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: number | string; sub?: string; color: string;
}) => (
  <div className={`bg-white dark:bg-gray-900 transition-colors rounded-xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-shadow`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">{label}</p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
        {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
      </div>
      <div className={`p-2.5 rounded-xl ${color.replace('text-', 'bg-')}/10`}>
        {icon}
      </div>
    </div>
  </div>
);

const AnalyticsDashboard = () => {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiAuthFetch('/analytics/summary')
      .then(setData)
      .catch(() => setError('Could not load analytics. Ensure you are logged in.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="p-6 space-y-4">
      <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded w-48 animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="p-6 text-red-500 flex items-center gap-2">
      <Activity size={18} /> {error}
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
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">Analytics Overview</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time portfolio performance metrics</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox icon={<Eye size={20} className="text-indigo-500" />} label="Total Page Views" value={data.totalViews} color="text-indigo-500" />
        <StatBox icon={<MousePointerClick size={20} className="text-purple-500" />} label="Demo Clicks" value={data.demoClicks} color="text-purple-500" />
        <StatBox icon={<Github size={20} className="text-gray-700 dark:text-gray-300" />} label="GitHub Clicks" value={data.githubClicks} color="text-gray-700 dark:text-gray-300" />
        <StatBox icon={<Mail size={20} className="text-green-500" />} label="Contact Forms" value={data.contactSubmissions} color="text-green-500" />
      </div>

      {/* Views Chart */}
      <div className="bg-white dark:bg-slate-900 transition-colors border-none shadow-sm rounded-[2rem] p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight">Traffic Intensity</h3>
            <p className="text-xs text-slate-500 font-medium">Page views distribution (7-Day window)</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={viewsChart}>
            <defs>
              <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dx={-10} allowDecimals={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }} 
              itemStyle={{ fontWeight: 900, fontSize: '12px', color: '#4f46e5' }}
            />
            <Area type="monotone" dataKey="views" stroke="#4f46e5" fill="url(#viewGrad)" strokeWidth={4} name="Views" dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Projects */}
        {data.topProjects?.length > 0 && (
          <div className="bg-white dark:bg-gray-900 transition-colors border border-gray-100 dark:border-gray-800 rounded-xl p-5">
            <h3 className="font-semibold mb-4">Most Viewed Projects</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.topProjects.slice(0, 5)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} allowDecimals={false} />
                <YAxis type="category" dataKey="title" width={120} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip contentStyle={{ borderRadius: 8 }} />
                <Bar dataKey="count" name="Views" radius={[0, 4, 4, 0]}>
                  {data.topProjects.slice(0, 5).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Recent Events */}
        <div className="bg-white dark:bg-gray-900 transition-colors border border-gray-100 dark:border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="text-gray-400" />
            <h3 className="font-semibold">Recent Events</h3>
          </div>
          <div className="space-y-2 max-h-52 overflow-y-auto">
            {(data.recentEvents || []).map((e, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
                    e.type === 'page_view' ? 'bg-indigo-50 text-indigo-600' :
                    e.type === 'demo_click' ? 'bg-purple-50 text-purple-600' :
                    e.type === 'github_click' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' :
                    'bg-green-50 text-green-600'
                  }`}>{e.type.replace('_', ' ')}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">{e.path || e.resourceTitle || '—'}</span>
                </div>
                <span className="text-gray-400 text-xs">
                  {new Date(e.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            {!data.recentEvents?.length && (
              <p className="text-gray-400 text-sm text-center py-8">No events yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
