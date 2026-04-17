const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    let project;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(req.params.id);
    }
    if (!project) {
      project = await Project.findOne({ slug: req.params.id });
    }
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects
router.post('/', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, problemStatement, description, techStack, githubUrl, demoUrl } = req.body;
    
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Parse techStack if it's sent as a JSON string
    let parsedTechStack = [];
    if (techStack) {
      if (typeof techStack === 'string') {
        try { parsedTechStack = JSON.parse(techStack); } 
        catch (e) { parsedTechStack = techStack.split(',').map(s => s.trim()); }
      } else if (Array.isArray(techStack)) {
        parsedTechStack = techStack;
      }
    }

    const newProject = new Project({
      title,
      problemStatement,
      description,
      techStack: parsedTechStack,
      image: imageUrl,
      githubUrl,
      demoUrl
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/projects/:id
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
  try {
    const { title, problemStatement, description, techStack, githubUrl, demoUrl } = req.body;
    
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    let parsedTechStack = project.techStack;
    if (techStack) {
      if (typeof techStack === 'string') {
        try { parsedTechStack = JSON.parse(techStack); } 
        catch (e) { parsedTechStack = techStack.split(',').map(s => s.trim()); }
      } else if (Array.isArray(techStack)) {
        parsedTechStack = techStack;
      }
    }

    project.title = title || project.title;
    project.problemStatement = problemStatement || project.problemStatement;
    project.description = description || project.description;
    project.techStack = parsedTechStack;
    project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
    project.demoUrl = demoUrl !== undefined ? demoUrl : project.demoUrl;
    
    if (req.file) {
      project.image = `/uploads/${req.file.filename}`;
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/projects/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
