import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProfile, uploadProfileImage } from '@/services/api';
import { useProfile } from '@/context/ProfileContext';
import { Save, Upload, User, Globe, Shield, Github, Linkedin, Twitter, MapPin, Mail, Phone, Fingerprint } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { motion } from "framer-motion";

const ProfileManager = () => {
  const { profile, refreshProfile, loading } = useProfile();
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else if (!loading) {
      refreshProfile();
    }
  }, [profile, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      socialLinks: { ...formData.socialLinks, [e.target.name]: e.target.value }
    });
  };

  const handleVisibilityChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      visibility: { ...formData.visibility, [name]: checked }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'profileImage' | 'logo') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      toast.loading(`Synchronizing ${field} buffer...`, { id: 'upload' });
      try {
        const { url } = await uploadProfileImage(file);
        const finalUrl = import.meta.env.PROD ? url : `https://rohit-portfolio-qgd8.onrender.com${url}`;
        setFormData({ ...formData, [field]: finalUrl });
        toast.success(`${field} buffer updated`, { id: 'upload' });
      } catch (err) {
        toast.error('Matrix integration failure', { id: 'upload' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      await refreshProfile();
      toast.success("Core identity recalibrated successfully");
    } catch (err) {
      toast.error("Identity synchronization failure");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
         <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-6 shadow-xl shadow-sky-500/20"></div>
         <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Accessing Core Identity Hub...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Core <span className="text-sky-500">Identity</span></h1>
           <p className="text-slate-500 font-medium text-lg">Manage global parameters for your professional digital persona.</p>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={saving} 
          className="h-16 px-10 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all"
        >
          <Save size={18} className="mr-2" /> {saving ? 'TRANSMITTING...' : 'SYNC IDENTITY'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Assets Panel */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
            <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/20">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white border border-slate-50 text-sky-500 flex items-center justify-center shadow-sm">
                    <User size={20} />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tighter uppercase italic">Biometric Asset</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-10 flex flex-col items-center">
              <div className="relative group">
                <div className="w-56 h-56 rounded-[3rem] border-8 border-slate-50 overflow-hidden mb-8 bg-slate-50 flex items-center justify-center shadow-inner transition-transform group-hover:scale-105 duration-500">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={64} className="text-slate-200" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2">
                   <div className="w-12 h-12 bg-sky-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-sky-500/30 border-4 border-white">
                      <Fingerprint size={20} />
                   </div>
                </div>
              </div>
              <Label className="cursor-pointer h-14 w-full bg-slate-900 hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 transition-all font-black uppercase tracking-widest text-[10px]">
                <Upload size={16} /> RECALIBRATE PORTRAIT
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImage')} />
              </Label>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
            <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/20">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-2xl bg-white border border-slate-50 text-sky-500 flex items-center justify-center shadow-sm">
                    <Globe size={20} />
                 </div>
                 <CardTitle className="text-xl font-black tracking-tighter uppercase italic">Identity Logo</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="p-10 flex flex-col items-center">
               <div className="w-full h-24 rounded-2xl border-2 border-dashed border-slate-100 overflow-hidden mb-8 bg-slate-50/50 flex items-center justify-center p-4">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-slate-300 font-black uppercase tracking-widest text-[10px]">NO LOGO BUFFER</span>
                )}
              </div>
              <Label className="cursor-pointer h-12 w-full bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center gap-2 transition-all font-black uppercase tracking-widest text-[10px] border border-slate-100">
                <Upload size={14} /> SYNC BRAND ASSET
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
              </Label>
            </CardContent>
          </Card>
        </div>

        {/* Data Panel */}
        <div className="lg:col-span-8 space-y-10">
          <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center gap-3 mb-6">
                 <Shield size={20} className="text-sky-500" />
                 <h3 className="font-black text-xl italic tracking-tighter uppercase text-slate-900 border-b-2 border-sky-500 pb-1">Essential Parameters</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Master Alias</Label>
                  <Input name="name" value={formData.name || ''} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all shadow-inner" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Title</Label>
                  <Input name="title" value={formData.title || ''} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold focus:bg-white transition-all shadow-inner" />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Teaser Abstract (Hero Section)</Label>
                <Textarea name="bio" value={formData.bio || ''} onChange={handleChange} className="bg-slate-50/50 border-slate-100 rounded-2xl min-h-[100px] font-medium text-slate-600 leading-relaxed" />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Comprehensive Identity Log (About Section)</Label>
                <Textarea name="about" value={formData.about || ''} onChange={handleChange} className="bg-slate-50/50 border-slate-100 rounded-[2.5rem] p-8 min-h-[200px] font-medium text-slate-600 leading-normal" />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Documentation Archive (Resume URI)</Label>
                <Input name="resumeLink" value={formData.resumeLink || ''} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
            <CardContent className="p-10 space-y-10">
              <h3 className="font-black text-xl italic tracking-tighter uppercase text-slate-900 mb-8 flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                 Transmission & Privacy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Node</Label>
                        <Input name="email" value={formData.email || ''} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-50">
                        <Label htmlFor="showEmail" className="font-black text-[10px] uppercase tracking-widest text-slate-500">Public Channel Link</Label>
                        <Switch id="showEmail" checked={formData.visibility?.showEmail ?? true} onCheckedChange={(c) => handleVisibilityChange('showEmail', c)} className="data-[state=checked]:bg-sky-500" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Telecom Link</Label>
                        <Input name="phone" value={formData.phone || ''} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-50">
                        <Label htmlFor="showPhone" className="font-black text-[10px] uppercase tracking-widest text-slate-500">Public Protocol Display</Label>
                        <Switch id="showPhone" checked={formData.visibility?.showPhone ?? true} onCheckedChange={(c) => handleVisibilityChange('showPhone', c)} className="data-[state=checked]:bg-sky-500" />
                    </div>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Geospatial Sector</Label>
                        <Input name="location" value={formData.location || ''} onChange={handleChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                    </div>
                    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-50">
                        <Label htmlFor="showLocation" className="font-black text-[10px] uppercase tracking-widest text-slate-500">Sector Coordinates Visibility</Label>
                        <Switch id="showLocation" checked={formData.visibility?.showLocation ?? true} onCheckedChange={(c) => handleVisibilityChange('showLocation', c)} className="data-[state=checked]:bg-sky-500" />
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
             <CardContent className="p-10">
                <h3 className="font-black text-xl italic tracking-tighter uppercase text-slate-900 mb-10 flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                   Network Matrix Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"><Github size={12} className="text-sky-500"/> Neural Repo (GitHub)</Label>
                    <Input name="github" value={formData.socialLinks?.github || ''} onChange={handleSocialChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"><Linkedin size={12} className="text-sky-500"/> Professional Node (LinkedIn)</Label>
                    <Input name="linkedin" value={formData.socialLinks?.linkedin || ''} onChange={handleSocialChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2"><Twitter size={12} className="text-sky-500"/> Broadcast Channel (Twitter/X)</Label>
                    <Input name="twitter" value={formData.socialLinks?.twitter || ''} onChange={handleSocialChange} className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl font-bold" />
                  </div>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
