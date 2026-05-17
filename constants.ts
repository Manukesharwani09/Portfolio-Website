import { Project, Book } from './types';

export const SOCIAL_LINKS = {
  github: 'https://github.com/Manukesharwani09',
  leetcode: 'https://leetcode.com/u/manukesharwani/',
  twitter: 'https://x.com/smilelikemanu',
  linkedin: '#', // Placeholder as requested
  email: 'mkesharwani125@gmail.com',
};

export const SKILLS = [
  "C++", "JavaScript (ES6+)", "Python", "SQL", "HTML", "CSS", "React.js", "Next.js", 
  "Node.js", "Express.js", "Tailwind CSS", "MongoDB", "MySQL", "Vite", "Convex", 
  "Clerk Authentication", "REST APIs", "Git", "GitHub", "Postman", "VS Code", 
  "Chrome DevTools", "LangChain", "Hugging Face Transformers", "ChromaDB", 
  "Semantic Search", "Data Structures & Algorithms", "DBMS", "Operating Systems", 
  "Computer Networks", "System Design (Basics)", "Full-Stack Development", 
  "Problem Solving", "Debugging", "Code Optimization", "UI/UX Basics", "Prompt Engineering"
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "CodeVerse",
    description: "A VS Code–like online code editor with real-time multi-language execution, Pro subscription, and auth.",
    bullets: [
      "Supports 10+ languages via Piston API with real-time execution",
      "Pro plan with LemonSqueezy payments — full billing flow",
      "Auth via Clerk with role-based access (free vs Pro)",
      "Persistent code storage using Convex real-time database",
    ],
    tech: ["Next.js", "React", "Convex", "Clerk", "Piston API", "LemonSqueezy"],
    github: "https://github.com/Manukesharwani09/CodeVerse",
    demo: "https://code-verse-plum.vercel.app",
    type: "FULLSTACK",
  },
  {
    id: 2,
    title: "ZapFind",
    description: "EV charging station locator with real-time availability, map-based search, and slot booking.",
    bullets: [
      "Integrates OpenChargeMap API for live station data across India",
      "Map-based search with geolocation and filter by connector type",
      "Slot booking system with Node.js + MongoDB backend",
      "Responsive UI with HTML/CSS — works on mobile",
    ],
    tech: ["Node.js", "MongoDB", "HTML/CSS", "OpenChargeMap API"],
    github: "https://github.com/kushagra2413/Zapfind",
    demo: null,
    type: "BACKEND",
  },
  {
    id: 3,
    title: "BookWorm",
    description: "AI-powered semantic book recommender using vector embeddings and zero-shot genre classification.",
    bullets: [
      "Vector search with ChromaDB — finds semantically similar books",
      "Zero-shot classification with Hugging Face Transformers",
      "LangChain pipeline for query processing and retrieval",
      "Gradio UI — deployable as a standalone web app",
    ],
    tech: ["Python", "LangChain", "Hugging Face", "Gradio", "ChromaDB"],
    github: "https://github.com/Manukesharwani09/semantic-book-recommender",
    demo: null,
    type: "AI/ML",
  },
  {
    id: 4,
    title: "E-Commerce App",
    description: "Scalable MERN e-commerce platform with cart, auth, Stripe checkout, and admin dashboard.",
    bullets: [
      "Full cart + wishlist with Redux state management",
      "Stripe payments with webhook-based order confirmation",
      "JWT auth with protected routes for admin panel",
      "Admin dashboard: product CRUD, order management",
    ],
    tech: ["MERN Stack", "Redux", "Stripe", "JWT"],
    github: "https://github.com/Manukesharwani09/e-commerce-app",
    demo: null,
    type: "FULLSTACK",
  }
];

export const BOOKS: Book[] = [
  // ── Best first 4 (shown by default) ──────────────────────────
  { title: "Atomic Habits", author: "James Clear", category: "SELF-HELP" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "FINANCE" },
  { title: "The Silent Patient", author: "Alex Michaelides", category: "MYSTERY" },
  { title: "Ikigai", author: "Héctor García & Francesc Miralles", category: "SELF-HELP" },

  // ── More self-help / mindset ──────────────────────────────────
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "SELF-HELP" },
  { title: "Attitude Is Everything", author: "Jeff Keller", category: "SELF-HELP" },
  { title: "The Amazing Secrets of the Bhagavad Gita", author: "Gaur Gopal Das", category: "SELF-HELP" },
  { title: "Bhagavad Gita", author: "Vyasa", category: "SELF-HELP" },

  // ── Thriller / Mystery ────────────────────────────────────────
  { title: "Marry Me, Stranger", author: "Novoneel Chakraborty", category: "THRILLER" },
  { title: "All Yours, Stranger", author: "Novoneel Chakraborty", category: "THRILLER" },
  { title: "Forget Me Not, Stranger", author: "Novoneel Chakraborty", category: "THRILLER" },
  { title: "The Clocks", author: "Agatha Christie", category: "MYSTERY" },
  { title: "The Girl in Room 105", author: "Chetan Bhagat", category: "MYSTERY" },

  // ── Sci-Fi / Famous ──────────────────────────────────────────
  { title: "Dune", author: "Frank Herbert", category: "FAMOUS" },
  { title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", category: "FAMOUS" },
  { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", category: "FAMOUS" },
  { title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling", category: "FAMOUS" },

  // ── Horror ───────────────────────────────────────────────────
  { title: "The Haunting of Hill House", author: "Shirley Jackson", category: "HORROR" },

  // ── Romance (below the fold) ─────────────────────────────────
  { title: "The Fault in Our Stars", author: "John Green", category: "ROMANCE" },
  { title: "Me Before You", author: "Jojo Moyes", category: "ROMANCE" },
  { title: "It Ends With Us", author: "Colleen Hoover", category: "ROMANCE" },
  { title: "It Starts With Us", author: "Colleen Hoover", category: "ROMANCE" },
  { title: "Never Never", author: "Colleen Hoover & Tarryn Fisher", category: "ROMANCE" },
  { title: "I Too Had a Love Story", author: "Ravinder Singh", category: "ROMANCE" },
  { title: "Can Love Happen Twice?", author: "Ravinder Singh", category: "ROMANCE" },
  { title: "Why Not Me?", author: "Anubhav Agrawal", category: "ROMANCE" },
  { title: "Wish I Could Tell You", author: "Durjoy Datta", category: "ROMANCE" },
  { title: "The Perfect Us", author: "Durjoy Datta", category: "ROMANCE" },
  { title: "Everything, Everything", author: "Nicola Yoon", category: "ROMANCE" },
  { title: "Better Than the Best Friend", author: "Wattpad / Indie", category: "ROMANCE" },
  { title: "A Girl Who Fell in Love with Her Best Friend", author: "Wattpad / Indie", category: "ROMANCE" },
];