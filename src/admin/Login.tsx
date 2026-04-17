import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { ShieldCheck, Lock, User, ArrowLeft, Loader2 } from "lucide-react";

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
        toast.success("Authentication successful. Welcome back!");
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
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#020617] p-6 selection:bg-indigo-100 selection:text-indigo-900 transition-colors relative overflow-hidden">
      {/* Elite Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[130px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/15 blur-[130px] rounded-full animate-float-slow" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full animate-pulse-slow delay-700" />
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 mb-6 group hover:rotate-6 transition-transform">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 italic">AUTHENTICATE</h1>
          <p className="text-slate-500 font-medium">Verify your identity to proceed to Command Center.</p>
        </div>

        <Card className="border-none shadow-2xl shadow-indigo-600/5 bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="space-y-1 pb-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 text-slate-100 dark:text-slate-800 -mr-4 -mt-4">
              <Lock size={80} />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Administrative Alias</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 pl-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Passkey</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all mt-4" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} />
                    AUTHORIZING...
                  </div>
                ) : (
                  "INITIATE ACCESS"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Abandone Mission
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
