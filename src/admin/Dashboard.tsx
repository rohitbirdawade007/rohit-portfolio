import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FolderKanban, Code, BookOpen, MessageSquare, Award, 
  ArrowUpRight, Users, Clock, Zap, ShieldCheck,
  LayoutGrid, Activity, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 12,
    skills: 24,
    research: 5,
    blogs: 8,
    messages: 124
  });

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <motion.div whileHover={{ y: -5 }}>
      <Card className="overflow-hidden border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group rounded-3xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className={`p-4 rounded-2xl bg-sky-50 text-sky-500 group-hover:scale-110 transition-transform`}>
              <Icon size={22} />
            </div>
            {trend && (
              <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-emerald-50 rounded-full">
                <TrendingUp size={12} />
                +{trend}%
              </div>
            )}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{title}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Command <span className="text-sky-500">Center</span></h1>
          <p className="text-slate-500 font-medium text-lg">Predictive system metrics and portfolio telemetry.</p>
        </div>
        <div className="flex items-center gap-3">
           <Link to="/admin/profile">
            <Button className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 rounded-2xl h-14 px-8 font-bold shadow-sm active:scale-95 transition-all">
              Configuration
            </Button>
           </Link>
           <Link to="/">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-2xl h-14 px-8 font-bold shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
              Live Site
            </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <StatCard title="Project Node" value={stats.projects} icon={FolderKanban} trend={12} />
        <StatCard title="Tech Stack" value={stats.skills} icon={Code} />
        <StatCard title="Research" value={stats.research} icon={BookOpen} trend={2} />
        <StatCard title="Insights" value={stats.blogs} icon={Award} trend={5} />
        <StatCard title="Telemetry" value={stats.messages} icon={MessageSquare} trend={28} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Welcome Section */}
        <Card className="lg:col-span-2 border border-slate-100 bg-white shadow-sm rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 text-sky-50 opacity-10">
            <ShieldCheck size={320} />
          </div>
          <CardHeader className="p-12 relative z-10 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-500 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-sky-100 w-fit">
               <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" /> SYSTEM_ONLINE
            </div>
            <CardTitle className="text-4xl font-black tracking-tight text-slate-900 mb-4">Central Processing Unit</CardTitle>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl">
               Your autonomous portfolio system is initialized. Content delivery and database synchronization are currently operational.
            </p>
          </CardHeader>
          <CardContent className="p-12 pt-0 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sky-500 shadow-sm"><Zap size={16} /></div>
                     <span className="text-xs font-black uppercase tracking-widest text-slate-400">Environment</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">NOJE.JS v20 LTS • MONGODB ATLAS</p>
               </div>
               <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sky-500 shadow-sm"><Activity size={16} /></div>
                     <span className="text-xs font-black uppercase tracking-widest text-slate-400">Sync Status</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">UPTIME: 99.9% • LATENCY: 24ms</p>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Traffic */}
        <Card className="border border-slate-100 bg-white shadow-sm rounded-[3rem] overflow-hidden flex flex-col">
          <CardHeader className="p-10 pb-6">
            <CardTitle className="text-xl font-black tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center shadow-sm">
                <Users size={20} />
              </div>
              Traffic Nodes
            </CardTitle>
          </CardHeader>
          <CardContent className="px-10 flex-grow space-y-6">
            {[
              { name: "Node: US-EAST", label: "RECRUITER • JUST NOW", color: "sky" },
              { name: "Node: EU-WEST", label: "DEVELOPER • 5M AGO", color: "sky" },
              { name: "Node: IN-SOUTH", label: "ANONYMOUS • 12M AGO", color: "sky" },
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-xs text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors border border-slate-100">PN</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{node.name}</p>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{node.label}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-10 pt-6 border-t border-slate-50 text-center">
             <Link to="/admin/analytics" className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 hover:text-sky-700 transition-colors flex items-center justify-center gap-2">
               Full Latency Report <ArrowUpRight size={14} />
             </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
