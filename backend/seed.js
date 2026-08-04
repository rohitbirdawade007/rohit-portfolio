/**
 * seed.js — Full Portfolio Seed (All GitHub Repositories)
 * Run: node backend/seed.js
 */

require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const Achievement  = require('./models/Achievement');
const Experience   = require('./models/Experience');
const Research     = require('./models/Research');
const Project      = require('./models/Project');
const Skill        = require('./models/Skill');
const Education    = require('./models/Education');
const Profile      = require('./models/Profile');

// ─── Profile ──────────────────────────────────────────────────────────────────
const profileData = {
  name: "Rohit Sandip Birdawade",
  title: "AI Engineer | ML Engineer | Full-Stack Developer",
  bio: "AI & ML Engineer with expertise in building production-grade intelligent systems spanning Generative AI, RAG pipelines, Computer Vision, NLP, and IoT. Specialized in deploying scalable AI solutions that solve real-world challenges across healthcare, agriculture, and security domains.",
  about: "I am an engineering graduate from Shri Chhatrapati Shivajiraje College of Engineering, Pune, dedicated to Artificial Intelligence and Machine Learning. With 7+ production-grade projects spanning RAG systems, transformer networks, computer vision, and IoT, I bridge the gap between research and deployment. I am a national-level award winner (NLPC-2025) and published researcher, actively building AI tools that matter.",
  email: "rohitbirdawade2875@gmail.com",
  location: "Pune, India",
  profileImage: "/profile.png",
  resumeLink: "/resume.pdf",
  socialLinks: {
    github: "https://github.com/rohitbirdawade007",
    linkedin: "https://linkedin.com/in/rohit-birdawade-299b6b278",
    twitter: "https://twitter.com/rohitsb"
  }
};

// ─── Projects (All GitHub Repos) ──────────────────────────────────────────────
const projectsData = [
  {
    title: "MedAI — Intelligent Clinical Decision Support System",
    slug: "medai-clinical-decision-support",
    description: "An enterprise-grade Clinical Decision Support System (CDSS) combining Retrieval-Augmented Generation, Hybrid Search, and Responsible AI to deliver grounded, citation-backed medical knowledge retrieval for clinical workflows.",
    problemStatement: "Clinicians face information overload from fragmented medical literature and patient data, leading to delayed or suboptimal treatment decisions. Existing search tools lack contextual reasoning and explainability.",
    solution: "Built a RAG-powered AI platform that fuses BM25 keyword retrieval and ChromaDB dense vector search via Reciprocal Rank Fusion (RRF), grounding LLM responses in real clinical documents with confidence scoring, hallucination detection, and full audit trails.",
    fullDescription: "MedAI is an end-to-end enterprise AI platform supporting Doctors, Engineers, and Admins. It processes PDF/DOCX/TXT documents with OCR fallback, performs semantic chunking, and enables clinical Q&A with source citations. Features include patient report explanation (CBC, ECG, LFT, KFT), document summarization, role-based access control with JWT authentication, and regulatory-compliant audit logging.",
    keyFeatures: [
      "RAG pipeline: BM25 + ChromaDB vector search fused via Reciprocal Rank Fusion",
      "Role-Based Access Control — Doctors, Engineers, Admin with JWT auth",
      "Patient Report Interpretation (CBC, ECG, LFT, KFT) in plain language",
      "Responsible AI guardrails: confidence scoring, hallucination detection",
      "Full audit trail for regulatory compliance",
      "Document intelligence: PDF/DOCX/TXT with OCR fallback, auto-indexing",
      "Versioned prompt templates (v1.0, v1.1) for reproducible experiments"
    ],
    techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "React", "Vite", "Docker", "JWT"],
    aiModels: ["GPT-4o", "LangChain RAG Pipeline", "BM25", "Reciprocal Rank Fusion", "ChromaDB Embeddings"],
    category: "Generative AI",
    difficulty: "Expert",
    status: "Active",
    featured: true,
    deployment: "Docker Compose",
    architecture: "Microservices — FastAPI backend, React+Vite frontend, ChromaDB vector store, BM25 index, LangChain orchestration",
    achievements: ["Enterprise-grade RAG implementation with dual-retrieval fusion", "Responsible AI framework with explainability and audit compliance"],
    githubUrl: "https://github.com/rohitbirdawade007/Intelligent-Clinical-Decision-Support-System-using-RAG-Hybrid-Search-and-Responsible-AI",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
  },
  {
    title: "AI Secure Code Reviewer",
    slug: "ai-secure-code-reviewer",
    description: "An AI-powered static analysis platform that combines Semgrep's rule-based engine with LangChain + GPT-4o to detect Python vulnerabilities, explain them in plain English, suggest hardened code fixes, and export a comprehensive security report.",
    problemStatement: "Traditional SAST tools generate cryptic security alerts that developers struggle to act on. There is no unified tool that both detects vulnerabilities and provides actionable, AI-explained remediation in a developer-friendly interface.",
    solution: "Integrated Semgrep for deterministic CWE/CVE and OWASP Top 10 detection with a LangChain + GPT-4o layer that translates findings into plain-English explanations and proposes secure code rewrites, packaged with GitHub repo integration and report export.",
    fullDescription: "AI Secure Code Reviewer allows developers to upload Python code directly or fetch it from any public GitHub repository. Semgrep performs static analysis against OWASP Top 10 and CWE patterns. LangChain orchestrates GPT-4o to explain each vulnerability contextually and generate hardened replacement code. Results are compiled into downloadable HTML/PDF security reports using Jinja2 and WeasyPrint.",
    keyFeatures: [
      "Semgrep integration for OWASP Top 10, CWE/CVE pattern detection",
      "GitHub repo URL input — fetch and analyze remote code directly",
      "AI explanations via LangChain + GPT-4o / Ollama Llama3",
      "Secure code fix suggestions for each detected vulnerability",
      "HTML and PDF security report generation with Jinja2 + WeasyPrint",
      "Dark Cyberpunk UI with drag-and-drop file upload"
    ],
    techStack: ["Python", "FastAPI", "LangChain", "OpenAI GPT-4o", "Semgrep", "Jinja2", "PyGitHub", "HTML/CSS/JS"],
    aiModels: ["GPT-4o", "Llama3 (Ollama)", "LangChain", "Semgrep Rule Engine"],
    category: "AI & Security",
    difficulty: "Advanced",
    status: "Active",
    featured: true,
    deployment: "Local / Self-hosted",
    architecture: "FastAPI backend + Vanilla JS frontend, Semgrep CLI integration, LangChain orchestration, Jinja2 report generation",
    achievements: ["Qualcomm-aligned security engineering architecture", "Dual AI engine support: cloud (GPT-4o) and local (Ollama Llama3)"],
    githubUrl: "https://github.com/rohitbirdawade007/AI-Secure-Code-Reviewer",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop"
  },
  {
    title: "AI Music Composition System with Transformer Networks",
    slug: "ai-music-composition-transformer",
    description: "A deep learning system that uses Transformer architecture trained on MIDI corpora to autonomously compose original music pieces. Generates harmonically consistent multi-instrument compositions from a seed prompt.",
    problemStatement: "Creating original music requires significant domain expertise and time. AI models that generate music often lack harmonic consistency or the ability to compose coherent multi-instrument arrangements across varying time signatures.",
    solution: "Implemented a Transformer-based sequence model trained on a curated MIDI dataset. The model learns long-range musical dependencies for harmonic, rhythmic, and melodic consistency. A custom tokenization scheme converts MIDI events to token sequences suitable for transformer attention.",
    fullDescription: "The system processes MIDI files through custom tokenization (pitch, duration, velocity, tempo tokens), trains a Transformer decoder model with positional encodings suited for musical sequences, and generates new compositions through autoregressive sampling. Includes temperature-controlled creativity, seed-based generation for reproducibility, and MIDI-to-audio conversion for playback.",
    keyFeatures: [
      "Custom MIDI tokenization: pitch, duration, velocity, tempo tokens",
      "Transformer decoder architecture with musical positional encoding",
      "Autoregressive generation with temperature-controlled creativity",
      "Multi-instrument arrangement generation",
      "Seed-based reproducible music generation",
      "MIDI-to-audio conversion for real-time playback"
    ],
    techStack: ["Python", "PyTorch", "Transformer Networks", "music21", "pretty_midi", "NumPy"],
    aiModels: ["Transformer Decoder (custom)", "MIDI Sequence Model"],
    category: "Generative AI",
    difficulty: "Expert",
    status: "Completed",
    featured: true,
    deployment: "Local Python environment",
    architecture: "Transformer decoder with custom MIDI tokenizer, autoregressive sampling, music21 for MIDI processing",
    achievements: ["End-to-end generative music pipeline from raw MIDI to playable composition", "Custom musical tokenization scheme for transformer compatibility"],
    githubUrl: "https://github.com/rohitbirdawade007/AI-Based-Music-Composition-System-Using-Transformer-Networks",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop"
  },
  {
    title: "AI-Powered Diet Recommendation System",
    slug: "diet-recommendation-system",
    description: "A personalized nutrition planning system that uses machine learning to recommend optimal meal plans based on user health metrics, dietary restrictions, nutritional goals, and real-time food database integration.",
    problemStatement: "Generic diet plans fail to account for individual health conditions, preferences, and nutritional requirements. Manual diet planning by nutritionists is time-consuming and inaccessible to most people.",
    solution: "Developed an ML-powered recommendation engine that ingests user biometrics (age, weight, BMI, activity level, health conditions) and dietary preferences to generate personalized, nutritionally balanced meal plans validated against established dietary guidelines.",
    fullDescription: "The system leverages collaborative filtering and content-based recommendation algorithms combined with nutritional databases. It provides daily, weekly meal plans with caloric distribution, macronutrient breakdown, and shopping lists. Integrates with food APIs for real-time nutritional data lookup and includes meal substitution suggestions for dietary restriction compliance.",
    keyFeatures: [
      "ML-based personalized meal recommendation engine",
      "BMI, health condition, and dietary restriction awareness",
      "Caloric and macronutrient target tracking",
      "Weekly meal plan generation with shopping lists",
      "Food API integration for real-time nutritional data",
      "Meal substitution engine for dietary compliance"
    ],
    techStack: ["Python", "Machine Learning", "Pandas", "Scikit-learn", "Flask", "PowerShell"],
    aiModels: ["Collaborative Filtering", "Content-Based Recommendation", "Nutritional ML Model"],
    category: "Machine Learning",
    difficulty: "Intermediate",
    status: "Completed",
    featured: false,
    deployment: "Flask / Local",
    architecture: "ML recommendation engine + Flask API + food database integration",
    achievements: ["Personalized nutrition planning combining ML with clinical dietary guidelines"],
    githubUrl: "https://github.com/rohitbirdawade007/diet-recommendation-system",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop"
  },
  {
    title: "AI and IoT Integration for Sustainable Agriculture",
    slug: "sustainable-agriculture-ai-iot",
    description: "A production-deployed AI + IoT system that monitors crop health in real-time using sensor networks and CNN models, enabling precision agriculture interventions. Won 1st Prize at NLPC-2025 (National Level Project Competition).",
    problemStatement: "Farmers lose significant crop yield annually due to late detection of diseases, suboptimal irrigation, and resource mismanagement. Traditional monitoring is manual, costly, and lacks real-time insights.",
    solution: "Deployed a distributed IoT sensor network (soil moisture, temperature, humidity, pH) integrated with a CNN-based crop anomaly detection model. A FastAPI backend aggregates sensor data and model predictions into a real-time dashboard for data-driven farming decisions.",
    fullDescription: "The system uses ESP32/Arduino-based IoT nodes to collect environmental data at field scale. A TensorFlow CNN model processes plant imagery from field cameras for disease detection with 94%+ accuracy. The FastAPI backend exposes REST APIs for sensor ingestion and model inference. A React dashboard visualizes real-time metrics, crop health status, and irrigation recommendations.",
    keyFeatures: [
      "Distributed IoT sensor network: soil, temperature, humidity, pH monitoring",
      "CNN-based real-time crop disease detection (94%+ accuracy)",
      "FastAPI backend for sensor data ingestion and ML inference",
      "React real-time dashboard with crop health metrics",
      "Automated irrigation and resource usage recommendations",
      "Multi-field scalable architecture"
    ],
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "IoT Sensors", "ESP32", "MongoDB"],
    aiModels: ["CNN (Crop Disease Detection)", "TensorFlow Image Classification"],
    category: "AI & IoT",
    difficulty: "Advanced",
    status: "Completed",
    featured: true,
    deployment: "Cloud + Edge IoT Nodes",
    architecture: "Edge IoT nodes → FastAPI gateway → MongoDB → React dashboard + CNN inference server",
    achievements: ["🥇 1st Prize — NLPC-2025 (National Level Project Competition, IETE Pune & MMCOE)", "Published research paper at NCIRST-2025", "94%+ crop disease detection accuracy"],
    githubUrl: "https://github.com/rohitbirdawade007",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop"
  },
  {
    title: "Amazon Product Analytics — Power BI Dashboard",
    slug: "amazon-product-analytics-powerbi",
    description: "An interactive business intelligence dashboard analyzing Amazon e-commerce product data, uncovering pricing trends, category performance, rating distributions, and seller insights through rich Power BI visualizations.",
    problemStatement: "E-commerce businesses struggle to extract actionable insights from large product datasets. Raw Amazon product data lacks structured analysis for strategic pricing, category optimization, and competitive benchmarking.",
    solution: "Built a comprehensive Power BI dashboard with custom DAX measures, multi-dimensional slicers, and interactive drill-throughs to analyze 50K+ Amazon product records across categories, pricing bands, ratings, and seller metrics.",
    fullDescription: "The dashboard ingests and transforms Amazon product CSV data through Power Query, builds a star-schema data model, and delivers 10+ report pages covering: category performance heatmaps, price-vs-rating scatter analysis, top sellers by category, review sentiment distribution, seasonal trend analysis, and product ranking factors. Optimized for executive and analyst use cases.",
    keyFeatures: [
      "10+ interactive Power BI report pages with drill-through capability",
      "Custom DAX measures for advanced KPI calculations",
      "Price-vs-rating correlation analysis across product categories",
      "Top seller and brand performance benchmarking",
      "Time-series trend analysis for pricing and demand patterns",
      "Power Query data transformation and cleaning pipeline"
    ],
    techStack: ["Power BI", "DAX", "Power Query", "Excel", "SQL"],
    aiModels: [],
    category: "Data Analytics",
    difficulty: "Intermediate",
    status: "Completed",
    featured: false,
    deployment: "Power BI Service",
    architecture: "CSV ingestion → Power Query ETL → Star Schema Data Model → Power BI Dashboard",
    achievements: ["Analyzed 50K+ Amazon product records with custom DAX analytics"],
    githubUrl: "https://github.com/rohitbirdawade007/amazon-product-analytics-powerbi",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop"
  }
];

// ─── Skills (Comprehensive, Grouped by Category) ───────────────────────────────
const skillsData = [
  // Programming Languages
  { name: "Python", category: "Programming Languages", proficiency: 95, color: "#3776AB" },
  { name: "JavaScript", category: "Programming Languages", proficiency: 85, color: "#F7DF1E" },
  { name: "TypeScript", category: "Programming Languages", proficiency: 80, color: "#3178C6" },
  { name: "C / C++", category: "Programming Languages", proficiency: 75, color: "#00599C" },
  { name: "SQL", category: "Programming Languages", proficiency: 78, color: "#336791" },

  // AI / ML
  { name: "Machine Learning", category: "AI / ML", proficiency: 90, color: "#FF6B6B" },
  { name: "Deep Learning", category: "AI / ML", proficiency: 88, color: "#FF6B6B" },
  { name: "Computer Vision", category: "AI / ML", proficiency: 85, color: "#FF6B6B" },
  { name: "Natural Language Processing", category: "AI / ML", proficiency: 80, color: "#FF6B6B" },
  { name: "Reinforcement Learning", category: "AI / ML", proficiency: 65, color: "#FF6B6B" },

  // Generative AI & LLMs
  { name: "LangChain", category: "Generative AI & LLMs", proficiency: 88, color: "#1C3C3C" },
  { name: "RAG Pipelines", category: "Generative AI & LLMs", proficiency: 90, color: "#10a37f" },
  { name: "OpenAI GPT-4o", category: "Generative AI & LLMs", proficiency: 85, color: "#10a37f" },
  { name: "Ollama / Llama3", category: "Generative AI & LLMs", proficiency: 78, color: "#FF6B35" },
  { name: "Prompt Engineering", category: "Generative AI & LLMs", proficiency: 87, color: "#9B59B6" },
  { name: "Vector Databases", category: "Generative AI & LLMs", proficiency: 82, color: "#8B5CF6" },

  // ML Frameworks
  { name: "TensorFlow", category: "ML Frameworks", proficiency: 88, color: "#FF6F00" },
  { name: "PyTorch", category: "ML Frameworks", proficiency: 82, color: "#EE4C2C" },
  { name: "Scikit-learn", category: "ML Frameworks", proficiency: 90, color: "#F89939" },
  { name: "OpenCV", category: "ML Frameworks", proficiency: 85, color: "#5C3EE8" },
  { name: "Hugging Face", category: "ML Frameworks", proficiency: 78, color: "#FFD21E" },
  { name: "Keras", category: "ML Frameworks", proficiency: 80, color: "#D00000" },

  // Backend
  { name: "FastAPI", category: "Backend", proficiency: 85, color: "#009688" },
  { name: "Node.js", category: "Backend", proficiency: 82, color: "#339933" },
  { name: "Express.js", category: "Backend", proficiency: 80, color: "#000000" },
  { name: "Flask", category: "Backend", proficiency: 78, color: "#000000" },
  { name: "REST API Design", category: "Backend", proficiency: 88, color: "#FF6B6B" },

  // Frontend
  { name: "React", category: "Frontend", proficiency: 85, color: "#61DAFB" },
  { name: "TypeScript / React", category: "Frontend", proficiency: 80, color: "#3178C6" },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 88, color: "#06B6D4" },
  { name: "Framer Motion", category: "Frontend", proficiency: 75, color: "#BB4B96" },
  { name: "Vite", category: "Frontend", proficiency: 82, color: "#646CFF" },

  // Databases
  { name: "MongoDB", category: "Databases", proficiency: 85, color: "#47A248" },
  { name: "ChromaDB", category: "Databases", proficiency: 80, color: "#8B5CF6" },
  { name: "PostgreSQL", category: "Databases", proficiency: 70, color: "#336791" },
  { name: "Redis", category: "Databases", proficiency: 65, color: "#DC382D" },

  // DevOps & Cloud
  { name: "Docker", category: "DevOps & Cloud", proficiency: 78, color: "#2496ED" },
  { name: "Docker Compose", category: "DevOps & Cloud", proficiency: 76, color: "#2496ED" },
  { name: "Git / GitHub", category: "DevOps & Cloud", proficiency: 90, color: "#F05032" },
  { name: "Vercel", category: "DevOps & Cloud", proficiency: 82, color: "#000000" },
  { name: "Render", category: "DevOps & Cloud", proficiency: 78, color: "#46E3B7" },

  // IoT & Embedded
  { name: "IoT Sensor Integration", category: "IoT & Embedded", proficiency: 88, color: "#27AE60" },
  { name: "ESP32 / Arduino", category: "IoT & Embedded", proficiency: 82, color: "#00979D" },
  { name: "Edge AI Deployment", category: "IoT & Embedded", proficiency: 75, color: "#E74C3C" },
  { name: "MQTT Protocol", category: "IoT & Embedded", proficiency: 72, color: "#660066" },

  // Data Science & Analytics
  { name: "Pandas", category: "Data Science", proficiency: 92, color: "#150458" },
  { name: "NumPy", category: "Data Science", proficiency: 90, color: "#013243" },
  { name: "Power BI", category: "Data Science", proficiency: 80, color: "#F2C811" },
  { name: "DAX", category: "Data Science", proficiency: 75, color: "#F2C811" },
  { name: "Matplotlib / Seaborn", category: "Data Science", proficiency: 85, color: "#11557C" },

  // Security
  { name: "OWASP / CWE Patterns", category: "Security", proficiency: 75, color: "#E74C3C" },
  { name: "Semgrep SAST", category: "Security", proficiency: 72, color: "#FF6B35" },
  { name: "Secure Code Review", category: "Security", proficiency: 78, color: "#C0392B" },
];

// ─── Achievements ──────────────────────────────────────────────────────────────
const achievementsData = [
  {
    title: 'Excellence of the Year Award',
    organization: "Shri Chhatrapati Shivajiraje College of Engineering",
    date: 'A.Y. 2024-25',
    type: 'award', category: 'achievements',
    description: 'Honored for outstanding contributions to technical and non-technical activities across the academic year.',
    image: "/lovable-uploads/ce935f5a-f5f3-4a0b-bae5-f403b99e1b88.png",
    slug: 'excellence-of-the-year-award'
  },
  {
    title: '🥇 1st Prize — National Level Project Competition (NLPC-2025)',
    organization: 'IETE Pune Centre and MMCOE Pune',
    date: 'April 2025',
    type: 'competition', category: 'achievements',
    description: 'First place at the prestigious NLPC-2025 for the project "AI and IoT Integration for Sustainable Agriculture" — competing against 100+ teams from across India.',
    image: "/lovable-uploads/7ab3b6a9-aa17-49fe-a240-7b9b8a2c9a68.png",
    slug: 'nlpc-2025-first-prize-mmcoe'
  },
  {
    title: 'State Level Project Competition — Participant',
    organization: 'Rajgad Dnyanpeeth Technical Campus',
    date: 'April 2025',
    type: 'competition', category: 'achievements',
    description: 'Participated in State Level Project Competition under Anant Nirmal Techutsav 2K25.',
    image: "/lovable-uploads/20e20354-9542-4315-a9ce-3976d34a7c89.png",
    slug: 'state-level-techutsav-2k25'
  }
];

// ─── Research ──────────────────────────────────────────────────────────────────
const researchData = [
  {
    title: "A Review on AI and IoT Integration in Sustainable Agriculture",
    authors: "Rohit Birdawade, et al.",
    journal: "NCIRST-2025",
    year: "2025", status: "Published",
    description: "Comprehensive review of modern AI + IoT optimization techniques for sustainable farming using distributed sensor networks and ML-based crop anomaly detection.",
    image: "/lovable-uploads/247ab65a-b250-4b85-bf9a-0417ac01dbfc.png",
    slug: 'ai-iot-sustainable-agriculture'
  }
];

// ─── Skills (current — already above) ─────────────────────────────────────────
// ─── Education ────────────────────────────────────────────────────────────────
const educationData = [
  {
    institution: "Shri Chhatrapati Shivajiraje College of Engineering",
    degree: "BE - Computer Engineering",
    location: "Pune, India",
    startDate: "2021", endDate: "2025",
    description: "Specialization in Artificial Intelligence, Machine Learning, and IoT systems. Excellence of the Year Award winner (2024-25). Final year project won 1st Prize at National Level.",
    grade: "8.7 CGPA"
  }
];

// ─── Experience ───────────────────────────────────────────────────────────────
const experienceData = [
  {
    company: 'UshaiTechLabs',
    role: 'Full Stack Developer',
    duration: '2024 – Present',
    techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'FastAPI'],
    description: 'Leading full-stack development of internal dashboarding systems, lead management platforms, and AI-powered features. Architected the backend REST API, admin dashboard, and integrated AI chatbot functionality.',
    slug: 'ushai-tech-labs-fullstack'
  }
];

// ─── Seed Function ────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Profile
    await Profile.findOneAndUpdate({}, profileData, { upsert: true });
    console.log('✅ Seeded Profile');

    // Projects
    for (const item of projectsData) {
      await Project.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true, setDefaultsOnInsert: true });
    }
    console.log(`✅ Seeded ${projectsData.length} projects`);

    // Skills — clear and re-seed with new category structure
    await Skill.deleteMany({});
    await Skill.insertMany(skillsData);
    console.log(`✅ Seeded ${skillsData.length} skills across ${[...new Set(skillsData.map(s => s.category))].length} categories`);

    // Achievements
    for (const item of achievementsData) {
      await Achievement.findOneAndUpdate({ slug: item.slug }, item, { upsert: true });
    }
    console.log(`✅ Seeded ${achievementsData.length} achievements`);

    // Research
    for (const item of researchData) {
      await Research.findOneAndUpdate({ slug: item.slug }, item, { upsert: true });
    }
    console.log(`✅ Seeded ${researchData.length} research entries`);

    // Education
    await Education.deleteMany({});
    await Education.insertMany(educationData);
    console.log(`✅ Seeded ${educationData.length} education entries`);

    // Experience
    for (const item of experienceData) {
      await Experience.findOneAndUpdate({ slug: item.slug }, item, { upsert: true });
    }
    console.log(`✅ Seeded ${experienceData.length} experience entries`);

    console.log('\n🎉 Full portfolio database seeding complete!');
    console.log(`📊 Summary: ${projectsData.length} projects | ${skillsData.length} skills | ${achievementsData.length} achievements`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
