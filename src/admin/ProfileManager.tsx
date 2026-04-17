import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProfile, uploadProfileImage } from '@/services/api';
import { useProfile } from '@/context/ProfileContext';
import { Save, Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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
      toast.loading(`Uploading ${field}...`, { id: 'upload' });
      try {
        const { url } = await uploadProfileImage(file);
        const finalUrl = import.meta.env.PROD ? url : `http://localhost:5000${url}`;
        setFormData({ ...formData, [field]: finalUrl });
        toast.success('Upload complete', { id: 'upload' });
      } catch (err) {
        toast.error('Upload failed', { id: 'upload' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Loading Profile Details...</p>
      </div>
    );
  }

  if (!loading && !formData.name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-red-500 mb-4">Network failed to sync profile context.</p>
        <Button onClick={refreshProfile}>Retry Connection</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">CORE IDENTITY</h1>
          <p className="text-slate-500 font-medium italic">Global parameters for your digital persona.</p>
        </div>
        <Button 
          onClick={handleSubmit} 
          disabled={saving} 
          className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
        >
          {saving ? 'Syncing...' : 'Sync Identity'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-gray-200 dark:border-gray-800 shadow-sm">
            <CardHeader><CardTitle className="text-gray-900 dark:text-white">Profile Picture</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full border-4 border-gray-100 dark:border-gray-800 overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <Label className="cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded flex items-center gap-2 transition">
                <Upload size={16} /> Upload Picture
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImage')} />
              </Label>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-gray-200 dark:border-gray-800 shadow-sm">
            <CardHeader><CardTitle className="text-gray-900 dark:text-white">Navbar Logo</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center">
               <div className="w-40 h-16 rounded border-2 border-dashed border-gray-200 dark:border-gray-700 overflow-hidden mb-4 bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-2">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <span className="text-gray-400 text-sm">No Logo</span>
                )}
              </div>
              <Label className="cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded flex items-center gap-2 transition">
                <Upload size={16} /> Upload Logo
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} />
              </Label>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input name="name" value={formData.name || ''} onChange={handleChange} className="bg-white dark:bg-gray-950" />
                </div>
                <div className="space-y-2">
                  <Label>Job Title / Headline</Label>
                  <Input name="title" value={formData.title || ''} onChange={handleChange} className="bg-white dark:bg-gray-950" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short Bio (Hero Section)</Label>
                <Textarea name="bio" value={formData.bio || ''} onChange={handleChange} className="bg-white dark:bg-gray-950 min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label>Detailed About (About Section)</Label>
                <Textarea name="about" value={formData.about || ''} onChange={handleChange} className="bg-white dark:bg-gray-950 min-h-[150px]" />
              </div>
              <div className="space-y-2">
                <Label>Resume PDF URL</Label>
                <Input name="resumeLink" value={formData.resumeLink || ''} onChange={handleChange} className="bg-white dark:bg-gray-950" placeholder="https://..." />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Contact & Visibility</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="space-y-2 mb-4">
                        <Label>Email</Label>
                        <Input name="email" value={formData.email || ''} onChange={handleChange} className="bg-gray-50 dark:bg-gray-950" />
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg dark:border-gray-800">
                        <Switch id="showEmail" checked={formData.visibility?.showEmail ?? true} onCheckedChange={(c) => handleVisibilityChange('showEmail', c)} />
                        <Label htmlFor="showEmail">Display Email Publicly</Label>
                    </div>
                </div>
                <div>
                    <div className="space-y-2 mb-4">
                        <Label>Phone Number</Label>
                        <Input name="phone" value={formData.phone || ''} onChange={handleChange} className="bg-gray-50 dark:bg-gray-950" />
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg dark:border-gray-800">
                        <Switch id="showPhone" checked={formData.visibility?.showPhone ?? true} onCheckedChange={(c) => handleVisibilityChange('showPhone', c)} />
                        <Label htmlFor="showPhone">Display Phone Publicly</Label>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <div className="space-y-2 mb-4">
                        <Label>Location</Label>
                        <Input name="location" value={formData.location || ''} onChange={handleChange} className="bg-gray-50 dark:bg-gray-950" />
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-lg dark:border-gray-800">
                        <Switch id="showLocation" checked={formData.visibility?.showLocation ?? true} onCheckedChange={(c) => handleVisibilityChange('showLocation', c)} />
                        <Label htmlFor="showLocation">Display Location Publicly</Label>
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors">
             <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Social Links</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>GitHub URL</Label>
                    <Input name="github" value={formData.socialLinks?.github || ''} onChange={handleSocialChange} className="bg-gray-50 dark:bg-gray-950" />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn URL</Label>
                    <Input name="linkedin" value={formData.socialLinks?.linkedin || ''} onChange={handleSocialChange} className="bg-gray-50 dark:bg-gray-950" />
                  </div>
                  <div className="space-y-2">
                    <Label>Twitter / X URL</Label>
                    <Input name="twitter" value={formData.socialLinks?.twitter || ''} onChange={handleSocialChange} className="bg-gray-50 dark:bg-gray-950" />
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
