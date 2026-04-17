import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { API_URL } from '@/services/api';
import { Trash2, Edit } from "lucide-react";

interface Research {
  _id: string;
  title: string;
  status: string;
  description: string;
}

const ResearchManager = () => {
  const [researchList, setResearchList] = useState<Research[]>([]);
  const [formData, setFormData] = useState({ title: '', status: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => { fetchResearch(); }, []);

  const fetchResearch = async () => {
    try {
      const res = await fetch(`${API_URL}/research`);
      const data = await res.json();
      setResearchList(Array.isArray(data) ? data : []);
    } catch {
      setResearchList([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const url = isEditing ? `${API_URL}/research/${currentId}` : `${API_URL}/research`;
    const res = await fetch(url, {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      toast.success("Saved");
      setFormData({ title: '', status: '', description: '' });
      setIsEditing(false);
      fetchResearch();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Research Manager</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-md">
           <CardHeader><CardTitle>Add Research</CardTitle></CardHeader>
           <CardContent>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
               <div><Label>Status</Label><Input value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} /></div>
               <div><Label>Description</Label><Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
               <Button type="submit" className="w-full">Save</Button>
             </form>
           </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {researchList.map(item => (
            <Card key={item._id} className="p-4 flex justify-between items-center shadow-sm">
              <div><h3 className="font-bold">{item.title}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{item.status}</p></div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" onClick={() => { setIsEditing(true); setCurrentId(item._id); setFormData({title: item.title, status: item.status, description: item.description}); }}><Edit size={16}/></Button>
                <Button size="icon" variant="ghost" className="text-red-500" onClick={async () => { if(confirm("Delete?")) { await fetch(`${API_URL}/research/${item._id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` } }); fetchResearch(); } }}><Trash2 size={16}/></Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchManager;
