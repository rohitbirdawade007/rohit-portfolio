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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0a0a12]" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(108,99,255,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#6C63FF]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#1DDBA8]/6 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#6C63FF] text-white shadow-2xl shadow-[#6C63FF]/30 mb-6">
            <ShieldAlert size={40} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">INITIALIZE NODE</h1>
          <p className="text-white/40 font-medium tracking-tight">Create your master administrative credentials.</p>
        </div>

        <Card className="border border-white/[0.08] shadow-2xl rounded-[2rem] overflow-hidden bg-white/[0.04] backdrop-blur-xl">
          <CardContent className="p-10">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Setup Token</Label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#6C63FF] transition-colors" size={18} />
                  <Input
                    type="password"
                    placeholder="Enter registration token..."
                    value={regToken}
                    onChange={(e) => setRegToken(e.target.value)}
                    className="h-14 pl-12 bg-white/[0.04] border-white/[0.08] rounded-2xl font-bold text-white placeholder:text-white/20 focus:ring-2 focus:ring-[#6C63FF]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Admin Alias</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#6C63FF] transition-colors" size={18} />
                  <Input
                    type="text"
                    placeholder="E.g. rohit_admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-14 pl-12 bg-white/[0.04] border-white/[0.08] rounded-2xl font-bold text-white placeholder:text-white/20 focus:ring-2 focus:ring-[#6C63FF]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Master Passkey</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#6C63FF] transition-colors" size={18} />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 pl-12 bg-white/[0.04] border-white/[0.08] rounded-2xl font-bold text-white placeholder:text-white/20 focus:ring-2 focus:ring-[#6C63FF]"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-[#6C63FF] hover:bg-[#5B54E6] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#6C63FF]/25 active:scale-95 transition-all mt-4" 
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "DEPLOY ADMIN NODE"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
           <Link to="/admin/login" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-[#6C63FF] transition-colors flex items-center justify-center gap-2">
             <ArrowLeft size={14} /> Back to Identity Verification
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
