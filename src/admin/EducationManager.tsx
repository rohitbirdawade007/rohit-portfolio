import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GraduationCap, Edit, Trash2, Plus, GripVertical } from 'lucide-react';
import { toast } from "sonner";
import { getEducations, createEducation, updateEducation, deleteEducation } from '@/services/api';

const EducationManager = () => {
  const [educations, setEducations] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    degree: '', institution: '', location: '', startDate: '', endDate: '',
    description: '', coursework: '', grade: '', order: 0
  });

  const fetchEducations = async () => {
    try {
      const data = await getEducations();
      setEducations(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load education history");
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleEdit = (edu: any) => {
    setEditingId(edu._id);
    setFormData({
      ...edu,
      coursework: edu.coursework ? edu.coursework.join(', ') : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ degree: '', institution: '', location: '', startDate: '', endDate: '', description: '', coursework: '', grade: '', order: 0 });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      try {
        await deleteEducation(id);
        toast.success("Education deleted");
        fetchEducations();
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        coursework: formData.coursework.split(',').map(c => c.trim()).filter(c => c !== "")
      };
      
      if (editingId) {
        await updateEducation(editingId, payload);
        toast.success("Education updated successfully");
      } else {
        await createEducation(payload);
        toast.success("Education added successfully");
      }
      handleCancel();
      fetchEducations();
    } catch (err) {
      toast.error("An error occurred preserving data.");
    }
  };

  return (
    <div className="p-8 pb-32 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Education Timeline</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your academic history efficiently</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors sticky top-24">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                {editingId ? 'Edit Education' : 'Add New Education'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Degree / Certification</Label>
                  <Input required value={formData.degree} onChange={e => setFormData({...formData, degree: e.target.value})} placeholder="e.g. B.Tech in Computer Science" className="bg-gray-50 dark:bg-gray-950"/>
                </div>
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} placeholder="University Name" className="bg-gray-50 dark:bg-gray-950"/>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="City, Country" className="bg-gray-50 dark:bg-gray-950"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} placeholder="Aug 2018" className="bg-gray-50 dark:bg-gray-950"/>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} placeholder="May 2022 / Present" className="bg-gray-50 dark:bg-gray-950"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Grade / GPA</Label>
                  <Input value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})} placeholder="3.8/4.0 GPA" className="bg-gray-50 dark:bg-gray-950"/>
                </div>
                <div className="space-y-2">
                  <Label>Coursework (comma separated)</Label>
                  <Textarea value={formData.coursework} onChange={e => setFormData({...formData, coursework: e.target.value})} placeholder="Data Structures, Algorithms..." className="bg-gray-50 dark:bg-gray-950" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Detailed summary of activities..." className="bg-gray-50 dark:bg-gray-950 min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <Label>Timeline Order (highest shown first)</Label>
                  <Input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="bg-gray-50 dark:bg-gray-950"/>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button type="submit" className="flex-1 flex gap-2"><Plus size={16}/> {editingId ? 'Update' : 'Add'}</Button>
                  {editingId && <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          {educations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No education entries found.</div>
          ) : (
            educations.map((edu: any) => (
              <Card key={edu._id} className="bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary h-fit">
                        <GraduationCap size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold dark:text-white">{edu.degree}</h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{edu.institution}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 gap-2">
                          <span>{edu.startDate} - {edu.endDate}</span> •
                          <span>{edu.location}</span>
                          {edu.grade && <>• <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">{edu.grade}</span></>}
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed text-sm whitespace-pre-wrap">
                          {edu.description}
                        </p>
                        {edu.coursework && edu.coursework.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {edu.coursework.map((course: string, i: number) => (
                              <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                                {course}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="text-xs text-gray-400 mt-2 block">Order Index: {edu.order}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 border-l border-gray-100 dark:border-gray-800 pl-4 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(edu)} className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(edu._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationManager;
