import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { ShieldCheck, Lock, User, ArrowLeft, Loader2, KeyRound } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        toast.success("Identity Verified. Directing to Command Center.");
        navigate('/admin/dashboard');
      } else {
        toast.error(data.msg || "Invalid credentials. Access denied.");
      }
    } catch (error) {
      toast.error("Network error. Firewall interference or server offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate opacity-[0.1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-slate-100 text-sky-500 shadow-xl mb-6 group hover:scale-105 transition-transform duration-500">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">VERIFY IDENTITY</h1>
          <p className="text-slate-500 font-medium tracking-tight">Access Restricted to Authorized Engineering Personnel.</p>
        </div>

        <Card className="border border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardContent className="p-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Admin Alias</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 pl-12 bg-slate-50/50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 transition-all font-bold"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Passkey</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 bg-slate-50/50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 transition-all font-bold"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all mt-4" 
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "INITIATE ACCESS"}
              </Button>
            </form>
          </CardContent>
          <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
             <Link to="/admin/register" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-600 flex items-center gap-2 transition-colors">
               <KeyRound size={14} /> Initialize New Admin Node
             </Link>
          </div>
        </Card>

        <div className="mt-10 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Sector Departure
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
