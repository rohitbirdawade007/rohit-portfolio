import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { ShieldAlert, User, Lock, Key, ArrowLeft, Loader2 } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [regToken, setRegToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username, 
          password, 
          registrationToken: regToken 
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Admin Node Initialized! You can now log in.");
        navigate('/admin/login');
      } else {
        toast.error(data.msg || "Initialization failed. Check your token.");
      }
    } catch (error) {
      toast.error("Network instability detected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate opacity-[0.1]" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-sky-500 text-white shadow-2xl shadow-sky-500/30 mb-6">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">INITIALIZE NODE</h1>
          <p className="text-slate-500 font-medium tracking-tight">Create your master administrative credentials.</p>
        </div>

        <Card className="border border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden bg-white">
          <CardContent className="p-10">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Setup Token</Label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
                  <Input
                    type="password"
                    placeholder="Enter registration token..."
                    value={regToken}
                    onChange={(e) => setRegToken(e.target.value)}
                    className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Admin Alias</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
                  <Input
                    type="text"
                    placeholder="E.g. rohit_admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Master Passkey</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" size={18} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 bg-slate-50 border-none rounded-2xl font-bold"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all mt-4" 
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "DEPLOY ADMIN NODE"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
           <Link to="/admin/login" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors flex items-center justify-center gap-2">
             <ArrowLeft size={14} /> Back to Identity Verification
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
