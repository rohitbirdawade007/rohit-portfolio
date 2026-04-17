import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Trash2, Mail, ExternalLink, User, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
    } catch { toast.error("Communication failure with sector."); }
    finally { setLoading(false); }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete message?")) return;
    const token = localStorage.getItem('adminToken');
    await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchMessages();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic">INBOUND LEADS</h1>
          <p className="text-slate-500 font-medium italic">Active communication log from the portfolio portal.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-5xl">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 bg-white dark:bg-slate-900 rounded-[2rem] animate-pulse" />
          ))
        ) : messages.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm">
             <MessageCircle size={48} className="mx-auto mb-4 text-slate-200" />
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No active transmissions detected.</p>
          </div>
        ) : (
          messages.map(m => (
            <Card key={m._id} className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                        <User size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black tracking-tight">{m.name}</h3>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <Mail size={12} />
                           {m.email}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-black bg-slate-50 dark:bg-slate-800 border-none px-4 py-1">
                      {new Date(m.createdAt).toLocaleString()}
                    </Badge>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">"{m.message}"</p>
                  </div>
                </div>
                <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors">
                  <a href={`mailto:${m.email}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">
                    Direct Reply <ArrowRight size={14} />
                  </a>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => deleteMessage(m._id)} 
                    className="h-10 px-4 rounded-xl text-rose-500 hover:text-white hover:bg-rose-500 transition-all font-black uppercase tracking-widest text-[10px]"
                  >
                    <Trash2 size={16} className="mr-2" /> Purge Record
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageViewer;
