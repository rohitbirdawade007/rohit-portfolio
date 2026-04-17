import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FolderKanban, Code, BookOpen, MessageSquare, Award, 
  ArrowUpRight, Users, Clock, Zap, ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 12,
    skills: 24,
    research: 5,
    blogs: 8,
    messages: 124
  });

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <Card className="overflow-hidden border-none bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`}>
              <Icon size={24} />
            </div>
            {trend && (
              <div className="flex items-center gap-1 text-emerald-500 text-xs font-black">
                <ArrowUpRight size={14} />
                {trend}%
              </div>
            )}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h3>
          </div>
        </div>
        <div className={`h-1 w-full bg-${color}-500/20`} />
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">System Overview</h1>
          <p className="text-slate-500 font-medium">Performance metrics and site telemetry.</p>
        </div>
        <div className="flex items-center gap-2">
           <Link to="/admin/profile">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-6 font-bold shadow-lg shadow-indigo-600/20">
              Edit Profile
            </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <StatCard title="Total Projects" value={stats.projects} icon={FolderKanban} color="blue" trend={12} />
        <StatCard title="Active Skills" value={stats.skills} icon={Code} color="indigo" />
        <StatCard title="Publications" value={stats.research} icon={BookOpen} color="purple" trend={2} />
        <StatCard title="Blog Posts" value={stats.blogs} icon={Award} color="amber" trend={5} />
        <StatCard title="Inbound Leads" value={stats.messages} icon={MessageSquare} color="rose" trend={28} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Welcome Section */}
        <Card className="lg:col-span-2 border-none bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 text-indigo-400/20 -mr-12 -mt-12">
            <ShieldCheck size={240} />
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="text-3xl font-black tracking-tight">Welcome to Command Center</CardTitle>
            <CardDescription className="text-indigo-100 font-medium opacity-80">
              Your personal full-stack deployment is operational and secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <p className="text-indigo-50 leading-relaxed max-w-xl">
              All systems are reporting normal latency. Content delivery is optimized via global CDN nodes. 
              The server is running on <span className="font-bold underline">Node.js v20 LTS</span> with MongoDB Atlas sync active.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-bold border border-white/10">
                <Clock size={14} /> 
                LAST SYNC: 2 MINS AGO
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-bold border border-white/10">
                <Zap size={14} /> 
                UPTIME: 99.9%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Help */}
        <Card className="border-none bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
              <Users size={20} className="text-indigo-600" />
              Recent Visitors
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">JD</div>
              <div>
                <p className="text-sm font-bold">John Doe</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">United States • Just Now</p>
              </div>
            </div>
             <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">MS</div>
              <div>
                <p className="text-sm font-bold">Maria Silva</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Brazil • 5m Ago</p>
              </div>
            </div>
             <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs">RK</div>
              <div>
                <p className="text-sm font-bold">Raj Kumar</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">India • 12m Ago</p>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
             <Link to="/admin/analytics" className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">
               Deep Analytics View
             </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
