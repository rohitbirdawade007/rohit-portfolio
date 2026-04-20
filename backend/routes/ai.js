const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Research = require('../models/Research');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ msg: 'Gemini API key not configured on server.' });
    }

    // 1. Fetch Portfolio Context (could be cached for performance)
    const [profile, projects, skills, experiences, research] = await Promise.all([
      Profile.findOne(),
      Project.find(),
      Skill.find(),
      Experience.find(),
      Research.find()
    ]);

    // 2. Build System Prompt
    const systemPrompt = `
      You are an AI assistant for Rohit Birdawade's professional portfolio.
      Your goal is to answer questions about Rohit's work, skills, and background in a professional, helpful, and concise manner.

      ROHIT'S PROFILE:
      Name: ${profile?.name || 'Rohit Birdawade'}
      Title: ${profile?.title || 'AI & ML Engineer'}
      Bio: ${profile?.bio || 'Building intelligent systems.'}
      Contact: ${profile?.email}

      PROJECTS:
      ${projects.map(p => `- ${p.title}: ${p.description} (Tech: ${p.techStack.join(', ')})`).join('\n')}

      SKILLS:
      ${skills.map(s => `- ${s.name}: ${s.description}`).join('\n')}

      EXPERIENCE:
      ${experiences.map(e => `- ${e.role} at ${e.company} (${e.duration}): ${e.description}`).join('\n')}

      RESEARCH:
      ${research.map(r => `- ${r.title}: ${r.description}`).join('\n')}

      INSTRUCTIONS:
      - Be polite and professional.
      - If you don't know something based on the data provided, say you're not sure but can help with other project-related info.
      - Keep responses relatively short and suitable for a chat interface.
      - Use "Rohit" or "he" when referring to the owner of this portfolio.
    `;

    // 3. Prepare Chat
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "Hello! Who are you and who is this portfolio for?" }] },
        { role: "model", parts: [{ text: `Hi! I'm an AI assistant here to help you explore ${profile?.name || "Rohit"}'s work. He's a specialized ${profile?.title || "AI & ML Engineer"}. What would you like to know about his projects or skills?` }] },
        ...(history || []).map(m => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // 4. Send Message with system context (concatenated for flash models if system instruction is not directly used)
    const result = await chat.sendMessage(`CONTEXT: ${systemPrompt}\n\nUSER QUESTION: ${message}`);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (err) {
    console.error('AI Error:', err);
    res.status(500).json({ msg: 'Neural Uplink Error. AI processing failed.', error: err.message });
  }
});

module.exports = router;
