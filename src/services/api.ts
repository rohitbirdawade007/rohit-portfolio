export const API_URL = import.meta.env.VITE_API_URL || "https://rohit-portfolio-qgd8.onrender.com/api";
export const BASE_URL = API_URL.replace('/api', '');

/**
 * Resolves an asset path to a full URL.
 * - Full HTTP URLs are returned as-is.
 * - Backend-uploaded paths (contain /uploads/ or similar) get BASE_URL prepended.
 * - Local public-folder paths (short paths like /profile.png) are returned as-is
 *   so the browser serves them from the Vite dev server or the deployed CDN.
 */
export const getAssetUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  // Backend-stored files typically live under /uploads/
  if (path.includes('/uploads/') || path.includes('/api/')) {
    return `${BASE_URL}${path}`;
  }
  // Local public-folder file (e.g., /profile.png) — serve from origin
  return path;
};

// ─── Auth helper ──────────────────────────────────────────────────────────────
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ─── Generic fetcher ──────────────────────────────────────────────────────────
export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ msg: 'Request failed' }));
    throw new Error(err.msg || `API error: ${res.status}`);
  }
  return res.json();
};

// ─── Authenticated fetcher (admin) ────────────────────────────────────────────
export const apiAuthFetch = async (endpoint: string, options: RequestInit = {}) => {
  return apiFetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...((options.headers as Record<string, string>) || {})
    }
  });
};

// ─── Projects ─────────────────────────────────────────────────────────────────
export const getProjects = () => apiFetch('/projects');
export const getProject  = (id: string) => apiFetch(`/projects/${id}`);
export const createProject = (data: FormData) =>
  apiFetch('/projects', { method: 'POST', headers: getAuthHeader(), body: data });
export const updateProject = (id: string, data: FormData) =>
  apiFetch(`/projects/${id}`, { method: 'PUT', headers: getAuthHeader(), body: data });
export const deleteProject = (id: string) =>
  apiAuthFetch(`/projects/${id}`, { method: 'DELETE' });

// ─── Achievements ─────────────────────────────────────────────────────────────
export const getAchievements = () => apiFetch('/achievements');
export const getAchievement  = (id: string) => apiFetch(`/achievements/${id}`);
export const createAchievement = (data: object) =>
  apiAuthFetch('/achievements', { method: 'POST', body: JSON.stringify(data) });
export const updateAchievement = (id: string, data: object) =>
  apiAuthFetch(`/achievements/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAchievement = (id: string) =>
  apiAuthFetch(`/achievements/${id}`, { method: 'DELETE' });

// ─── Experience ───────────────────────────────────────────────────────────────
export const getExperiences = () => apiFetch('/experience');
export const getExperience  = (id: string) => apiFetch(`/experience/${id}`);
export const createExperience = (data: object) =>
  apiAuthFetch('/experience', { method: 'POST', body: JSON.stringify(data) });
export const updateExperience = (id: string, data: object) =>
  apiAuthFetch(`/experience/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteExperience = (id: string) =>
  apiAuthFetch(`/experience/${id}`, { method: 'DELETE' });

// ─── Education ────────────────────────────────────────────────────────────────
export const getEducations = () => apiFetch('/education');
export const getEducation  = (id: string) => apiFetch(`/education/${id}`);
export const createEducation = (data: object) =>
  apiAuthFetch('/education', { method: 'POST', body: JSON.stringify(data) });
export const updateEducation = (id: string, data: object) =>
  apiAuthFetch(`/education/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteEducation = (id: string) =>
  apiAuthFetch(`/education/${id}`, { method: 'DELETE' });

// ─── Research ─────────────────────────────────────────────────────────────────
export const getResearchList = () => apiFetch('/research');
export const getResearchItem = (id: string) => apiFetch(`/research/${id}`);
export const createResearch  = (data: object) =>
  apiAuthFetch('/research', { method: 'POST', body: JSON.stringify(data) });
export const updateResearch  = (id: string, data: object) =>
  apiAuthFetch(`/research/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteResearch  = (id: string) =>
  apiAuthFetch(`/research/${id}`, { method: 'DELETE' });

// ─── Certifications ───────────────────────────────────────────────────────────
export const getCertifications  = () => apiFetch('/certifications');
export const getCertification   = (id: string) => apiFetch(`/certifications/${id}`);
export const createCertification = (data: object) =>
  apiAuthFetch('/certifications', { method: 'POST', body: JSON.stringify(data) });
export const updateCertification = (id: string, data: object) =>
  apiAuthFetch(`/certifications/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteCertification = (id: string) =>
  apiAuthFetch(`/certifications/${id}`, { method: 'DELETE' });

// ─── Messages (public POST only) ──────────────────────────────────────────────
export const sendMessage = (data: { name: string; email: string; message: string }) =>
  apiFetch('/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

// ─── Admin Auth ───────────────────────────────────────────────────────────────
export const adminLogin = (credentials: { username: string; password: string }) =>
  apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

export const getAdminMe = () => apiAuthFetch('/auth/me');

// ─── Profile System ──────────────────────────────────────────────────────────
export const getProfile = () => apiFetch('/profile');
export const updateProfile = (data: object) =>
  apiAuthFetch('/profile', { method: 'PUT', body: JSON.stringify(data) });
export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  // Important: Do not set Content-Type header manually, let fetch set boundary
  return fetch(`${API_URL}/profile/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: formData
  }).then(res => res.json());
};

// ─── AI Chatbot ──────────────────────────────────────────────────────────────
export const sendAIChat = (message: string, history: Array<{ role: 'ai' | 'user'; text: string }>) =>
  apiFetch('/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history })
  });
