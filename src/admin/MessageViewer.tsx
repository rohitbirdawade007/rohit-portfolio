import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Trash2, Mail, ExternalLink, User, MessageCircle, ArrowRight, Clock, ShieldInfo } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const MessageViewer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMessages(); }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch { toast.error("Telemetry failure: Communication log offline"); }
    finally { setLoading(false); }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Confirm record cleanup?")) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success("Message purged");
      fetchMessages();
    } catch {
      toast.error("Cleanup failure");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Inbound <span className="text-sky-500">Telemetry</span></h1>
           <p className="text-slate-500 font-medium text-lg">Active communication logs and contact leads from the neural portal.</p>
        </div>
      </div>

      <div className="space-y-8 max-w-6xl">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-slate-50 border border-slate-100 rounded-[3rem] animate-pulse" />
          ))
        ) : messages.length === 0 ? (
          <div className="py-40 text-center bg-slate-50 rounded-[4rem] border border-slate-100 border-dashed">
             <MessageCircle size={48} className="mx-auto mb-4 text-slate-200" />
             <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active transmissions detected</p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((m, idx) => (
              <motion.div key={m._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.05 }}>
                <Card className="group border border-slate-100 bg-white rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500 shadow-sm">
                  <CardContent className="p-0">
                    <div className="p-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-[2rem] bg-sky-50 text-sky-500 flex items-center justify-center border border-sky-100 shadow-sm group-hover:rotate-6 transition-transform">
                            <User size={28} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic leading-none mb-2">{m.name}</h3>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                               <Mail size={12} className="text-sky-500" />
                               {m.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-1 px-4 py-2 bg-slate-50 border border-slate-50 rounded-2xl">
                           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                             <Clock size={12} /> {new Date(m.createdAt).toLocaleDateString()}
                           </span>
                           <span className="text-[10px] font-black uppercase tracking-widest text-sky-500">
                             {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                      </div>
                      <div className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-sky-100 opacity-20"><ShieldInfo size={80} /></div>
                        <p className="text-slate-600 leading-relaxed font-medium italic relative z-10 text-lg">"{m.message}"</p>
                      </div>
                    </div>
                    <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center group-hover:bg-slate-50 transition-colors">
                      <a href={`mailto:${m.email}`} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-sky-500 hover:text-sky-700 transition-colors">
                        INITIATE DIRECT REPLY <ArrowRight size={16} />
                      </a>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => deleteMessage(m._id)} 
                        className="h-12 px-6 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-black uppercase tracking-widest text-[10px] border border-rose-100/50"
                      >
                        <Trash2 size={16} className="mr-2" /> Purge Record
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default MessageViewer;
