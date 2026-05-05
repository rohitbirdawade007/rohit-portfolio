import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProfile, uploadProfileImage } from '@/services/api';
import { useProfile } from '@/context/ProfileContext';
import { Save, Upload, User, Globe, Shield, Github, Linkedin, Twitter, Fingerprint, Plus, Trash2, Languages, Briefcase, Award, Building2, HeartHandshake, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const ProfileManager = () => {
  const { profile, refreshProfile, loading } = useProfile();
  const [formData, setFormData] = useState<any>({
    languages: [], services: [], courses: [], organizations: [], volunteer: [], testScores: [], recommendations: []
  });
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (profile) {
      setFormData({
        ...profile,
        languages: profile.languages || [],
        services: profile.services || [],
        courses: profile.courses || [],
        organizations: profile.organizations || [],
        volunteer: profile.volunteer || [],
        testScores: profile.testScores || [],
        recommendations: profile.recommendations || []
      });
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

  const handleArrayAdd = (field: string, defaultItem: any) => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), defaultItem] });
  };

  const handleArrayChange = (field: string, index: number, key: string, value: string) => {
    const updated = [...formData[field]];
    updated[index][key] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleArrayDelete = (field: string, index: number) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData({ ...formData, [field]: updated });
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
      toast.success("Identity vectors synchronized successfully");
    } catch (err) {
      toast.error("Synchronization failure");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !formData.name) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="space-y-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">Core <span className="text-[#6C63FF]">Identity</span></h1>
           <p className="text-slate-500 font-medium text-lg">Manage global parameters and LinkedIn-style extensions.</p>
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="h-16 px-10 bg-[#6C63FF] hover:bg-[#5B54E6] text-white rounded-3xl font-black uppercase tracking-widest shadow-xl">
          <Save size={18} className="mr-2" /> {saving ? 'SYNCING...' : 'SYNC IDENTITY'}
        </Button>
      </div>

      {/* CORE IDENTITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Assets Panel */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="border border-slate-100 bg-white rounded-[3rem] overflow-hidden shadow-sm">
            <CardContent className="p-10 flex flex-col items-center">
              <div className="relative group mt-8">
                <div className="w-56 h-56 rounded-[3rem] border-8 border-slate-50 overflow-hidden mb-8 bg-slate-50 flex items-center justify-center shadow-inner">
                  {formData.profileImage ? <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" /> : <User size={64} className="text-slate-200" />}
                </div>
              </div>
              <Label className="cursor-pointer h-14 w-full bg-slate-900 hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px]">
                <Upload size={16} /> RECALIBRATE PORTRAIT
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImage')} />
              </Label>
            </CardContent>
          </Card>
        </div>

        {/* Data Panel */}
        <div className="lg:col-span-8 space-y-10">
          <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm">
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center gap-3 mb-6"><Shield size={20} className="text-[#6C63FF]" /><h3 className="font-black text-xl text-slate-900 uppercase">Essential Parameters</h3></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Master Alias</Label><Input name="name" value={formData.name || ''} onChange={handleChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
                <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Professional Title</Label><Input name="title" value={formData.title || ''} onChange={handleChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
              </div>
              <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Teaser Abstract</Label><Textarea name="bio" value={formData.bio || ''} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-2xl min-h-[100px] font-medium" /></div>
                <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Comprehensive Identity Log</Label><Textarea name="about" value={formData.about || ''} onChange={handleChange} className="bg-slate-50 border-slate-100 rounded-[2.5rem] p-8 min-h-[200px] font-medium" /></div>
              <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Resume Link</Label><Input name="resumeLink" value={formData.resumeLink || ''} onChange={handleChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm">
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center gap-3 mb-6"><Globe size={20} className="text-[#6C63FF]" /><h3 className="font-black text-xl text-slate-900 uppercase">Transmission & Contact</h3></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Email Address</Label><Input name="email" value={formData.email || ''} onChange={handleChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
                <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Phone Number</Label><Input name="phone" value={formData.phone || ''} onChange={handleChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
                <div className="md:col-span-2 space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400">Location</Label><Input name="location" value={formData.location || ''} onChange={handleChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm">
            <CardContent className="p-10 space-y-8">
              <div className="flex items-center gap-3 mb-6"><Github size={20} className="text-[#6C63FF]" /><h3 className="font-black text-xl text-slate-900 uppercase">Network Matrix Links</h3></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Github size={12}/> GitHub URL</Label><Input name="github" value={formData.socialLinks?.github || ''} onChange={handleSocialChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
                <div className="space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Linkedin size={12}/> LinkedIn URL</Label><Input name="linkedin" value={formData.socialLinks?.linkedin || ''} onChange={handleSocialChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
                <div className="md:col-span-2 space-y-3"><Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2"><Twitter size={12}/> Twitter URL</Label><Input name="twitter" value={formData.socialLinks?.twitter || ''} onChange={handleSocialChange} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" /></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* EXTENSIONS */}
      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic border-b-4 border-slate-100 pb-4 mt-20">LinkedIn-Style Extensions</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Languages */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><Languages size={20} className="text-[#6C63FF]"/><CardTitle className="font-black uppercase">Languages</CardTitle></div>
            <Button size="icon" onClick={() => handleArrayAdd('languages', {name:'', proficiency:''})} className="bg-[#6C63FF] text-white rounded-xl h-8 w-8"><Plus size={14}/></Button>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {formData.languages?.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <Input value={item.name} onChange={(e) => handleArrayChange('languages', i, 'name', e.target.value)} placeholder="English" className="h-10 bg-white border-slate-200" />
                <Input value={item.proficiency} onChange={(e) => handleArrayChange('languages', i, 'proficiency', e.target.value)} placeholder="Native" className="h-10 bg-white border-slate-200" />
                <Button size="icon" variant="ghost" onClick={() => handleArrayDelete('languages', i)} className="text-rose-500 hover:bg-rose-50"><Trash2 size={14}/></Button>
              </div>
            ))}
            {formData.languages?.length === 0 && <p className="text-sm text-slate-400">No languages added.</p>}
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><Briefcase size={20} className="text-[#6C63FF]"/><CardTitle className="font-black uppercase">Services</CardTitle></div>
            <Button size="icon" onClick={() => handleArrayAdd('services', {title:'', description:''})} className="bg-[#6C63FF] text-white rounded-xl h-8 w-8"><Plus size={14}/></Button>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {formData.services?.map((item: any, i: number) => (
              <div key={i} className="flex flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex gap-3">
                  <Input value={item.title} onChange={(e) => handleArrayChange('services', i, 'title', e.target.value)} placeholder="Consulting" className="h-10 bg-white border-slate-200" />
                  <Button size="icon" variant="ghost" onClick={() => handleArrayDelete('services', i)} className="text-rose-500 hover:bg-rose-50 shrink-0"><Trash2 size={14}/></Button>
                </div>
                <Textarea value={item.description} onChange={(e) => handleArrayChange('services', i, 'description', e.target.value)} placeholder="Description..." className="bg-white border-slate-200" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Organizations */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><Building2 size={20} className="text-[#6C63FF]"/><CardTitle className="font-black uppercase">Organizations</CardTitle></div>
            <Button size="icon" onClick={() => handleArrayAdd('organizations', {name:'', role:'', duration:''})} className="bg-[#6C63FF] text-white rounded-xl h-8 w-8"><Plus size={14}/></Button>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {formData.organizations?.map((item: any, i: number) => (
              <div key={i} className="flex flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex gap-3">
                  <Input value={item.name} onChange={(e) => handleArrayChange('organizations', i, 'name', e.target.value)} placeholder="IEEE" className="bg-white border-slate-200" />
                  <Button size="icon" variant="ghost" onClick={() => handleArrayDelete('organizations', i)} className="text-rose-500 hover:bg-rose-50 shrink-0"><Trash2 size={14}/></Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input value={item.role} onChange={(e) => handleArrayChange('organizations', i, 'role', e.target.value)} placeholder="Member" className="bg-white border-slate-200" />
                  <Input value={item.duration} onChange={(e) => handleArrayChange('organizations', i, 'duration', e.target.value)} placeholder="2021 - Present" className="bg-white border-slate-200" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Test Scores */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><CheckCircle size={20} className="text-[#6C63FF]"/><CardTitle className="font-black uppercase">Test Scores</CardTitle></div>
            <Button size="icon" onClick={() => handleArrayAdd('testScores', {name:'', score:'', date:''})} className="bg-[#6C63FF] text-white rounded-xl h-8 w-8"><Plus size={14}/></Button>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {formData.testScores?.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <Input value={item.name} onChange={(e) => handleArrayChange('testScores', i, 'name', e.target.value)} placeholder="TOEFL" className="bg-white border-slate-200" />
                <Input value={item.score} onChange={(e) => handleArrayChange('testScores', i, 'score', e.target.value)} placeholder="110" className="w-20 bg-white border-slate-200" />
                <Button size="icon" variant="ghost" onClick={() => handleArrayDelete('testScores', i)} className="text-rose-500"><Trash2 size={14}/></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Courses */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm lg:col-span-2">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><Award size={20} className="text-[#6C63FF]"/><CardTitle className="font-black uppercase">Courses</CardTitle></div>
            <Button size="icon" onClick={() => handleArrayAdd('courses', {name:'', platform:'', completedAt:'', certificateUrl:''})} className="bg-[#6C63FF] text-white rounded-xl h-8 w-8"><Plus size={14}/></Button>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {formData.courses?.map((item: any, i: number) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <Input value={item.name} onChange={(e) => handleArrayChange('courses', i, 'name', e.target.value)} placeholder="Machine Learning" className="bg-white border-slate-200 md:col-span-2" />
                <Input value={item.platform} onChange={(e) => handleArrayChange('courses', i, 'platform', e.target.value)} placeholder="Coursera" className="bg-white border-slate-200" />
                <div className="flex gap-2">
                  <Input value={item.completedAt} onChange={(e) => handleArrayChange('courses', i, 'completedAt', e.target.value)} placeholder="2023" className="bg-white border-slate-200 flex-1" />
                  <Button size="icon" variant="ghost" onClick={() => handleArrayDelete('courses', i)} className="text-rose-500 shrink-0"><Trash2 size={14}/></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Volunteer */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm lg:col-span-2">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><HeartHandshake size={20} className="text-[#6C63FF]"/><CardTitle className="font-black uppercase">Volunteer</CardTitle></div>
            <Button size="icon" onClick={() => handleArrayAdd('volunteer', {role:'', organization:'', duration:'', description:''})} className="bg-[#6C63FF] text-white rounded-xl h-8 w-8"><Plus size={14}/></Button>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {formData.volunteer?.map((item: any, i: number) => (
              <div key={i} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex gap-3">
                  <Input value={item.role} onChange={(e) => handleArrayChange('volunteer', i, 'role', e.target.value)} placeholder="Mentor" className="bg-white border-slate-200" />
                  <Input value={item.organization} onChange={(e) => handleArrayChange('volunteer', i, 'organization', e.target.value)} placeholder="NGO Name" className="bg-white border-slate-200" />
                  <Button size="icon" variant="ghost" onClick={() => handleArrayDelete('volunteer', i)} className="text-rose-500 shrink-0"><Trash2 size={14}/></Button>
                </div>
                <Input value={item.duration} onChange={(e) => handleArrayChange('volunteer', i, 'duration', e.target.value)} placeholder="Jan 2022 - Present" className="bg-white border-slate-200" />
                <Textarea value={item.description} onChange={(e) => handleArrayChange('volunteer', i, 'description', e.target.value)} placeholder="Description..." className="bg-white border-slate-200" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border border-slate-100 bg-white rounded-[3rem] shadow-sm lg:col-span-2">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3"><MessageSquareQuote size={20} className="text-[#6C63FF]"/><CardTitle className="font-black uppercase">Recommendations</CardTitle></div>
            <Button size="icon" onClick={() => handleArrayAdd('recommendations', {name:'', title:'', relationship:'', text:''})} className="bg-[#6C63FF] text-white rounded-xl h-8 w-8"><Plus size={14}/></Button>
          </CardHeader>
          <CardContent className="p-8 space-y-4">
            {formData.recommendations?.map((item: any, i: number) => (
              <div key={i} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex gap-3">
                  <Input value={item.name} onChange={(e) => handleArrayChange('recommendations', i, 'name', e.target.value)} placeholder="John Doe" className="bg-white border-slate-200" />
                  <Input value={item.title} onChange={(e) => handleArrayChange('recommendations', i, 'title', e.target.value)} placeholder="CEO at Tech" className="bg-white border-slate-200" />
                  <Button size="icon" variant="ghost" onClick={() => handleArrayDelete('recommendations', i)} className="text-rose-500 shrink-0"><Trash2 size={14}/></Button>
                </div>
                <Input value={item.relationship} onChange={(e) => handleArrayChange('recommendations', i, 'relationship', e.target.value)} placeholder="Managed directly" className="bg-white border-slate-200" />
                <Textarea value={item.text} onChange={(e) => handleArrayChange('recommendations', i, 'text', e.target.value)} placeholder="Recommendation text..." className="bg-white border-slate-200" />
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default ProfileManager;
