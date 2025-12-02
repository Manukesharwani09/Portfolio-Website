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
    description: "A VS Code–like online editor with real-time execution, auth, and Pro features.",
    tech: ["Next.js", "React", "Convex", "Clerk", "Piston API", "LemonSqueezy"],
    github: "https://github.com/Manukesharwani09/CodeVerse"
  },
  {
    id: 2,
    title: "ZapFind",
    description: "EV charging locator with booking system and Node.js backend.",
    tech: ["Node.js", "MongoDB", "HTML/CSS", "OpenChargeMap API"],
    github: "https://github.com/kushagra2413/Zapfind"
  },
  {
    id: 3,
    title: "BookWorm",
    description: "AI-based semantic book recommender using vector search + zero-shot classification.",
    tech: ["Python", "LangChain", "Hugging Face", "Gradio", "ChromaDB"],
    github: "https://github.com/Manukesharwani09/semantic-book-recommender"
  },
  {
    id: 4,
    title: "E-Commerce App",
    description: "A scalable MERN-based e-commerce platform.",
    tech: ["MERN Stack", "Redux", "Stripe"],
    github: "https://github.com/Manukesharwani09/e-commerce-app"
  }
];

export const BOOKS: Book[] = [
  { title: "The Haunting of Hill House", author: "Shirley Jackson", category: "HORROR" },
  { title: "I Too Had a Love Story", author: "Ravinder Singh", category: "ROMANCE" },
  { title: "Why Not Me?", author: "Anubhav Agrawal", category: "ROMANCE" },
  { title: "Me Before You", author: "Jojo Moyes", category: "ROMANCE" },
  { title: "Wish I Could Tell You", author: "Durjoy Datta", category: "ROMANCE" },
  { title: "The Perfect Us", author: "Durjoy Datta", category: "ROMANCE" },
  { title: "Everything, Everything", author: "Nicola Yoon", category: "ROMANCE" },
  { title: "It Ends With Us", author: "Colleen Hoover", category: "ROMANCE" },
  { title: "It Starts With Us", author: "Colleen Hoover", category: "ROMANCE" },
  { title: "Never Never", author: "Colleen Hoover & Tarryn Fisher", category: "ROMANCE" },
  { title: "The Fault in Our Stars", author: "John Green", category: "ROMANCE" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "FINANCE" },
  { title: "Marry Me, Stranger", author: "Novoneel Chakraborty", category: "THRILLER" },
  { title: "All Yours, Stranger", author: "Novoneel Chakraborty", category: "THRILLER" },
  { title: "Forget Me Not, Stranger", author: "Novoneel Chakraborty", category: "THRILLER" },
  { title: "Harry Potter and the Philosopher’s Stone", author: "J.K. Rowling", category: "FAMOUS" },
  { title: "Harry Potter and the Chamber of Secrets", author: "J.K. Rowling", category: "FAMOUS" },
  { title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling", category: "FAMOUS" },
  { title: "Ikigai", author: "Héctor García & Francesc Miralles", category: "SELF-HELP" },
  { title: "The Amazing Secrets of the Bhagavad Gita", author: "Gaur Gopal Das", category: "SELF-HELP" },
  { title: "The Clocks", author: "Agatha Christie", category: "MYSTERY" },
  { title: "The Silent Patient", author: "Alex Michaelides", category: "MYSTERY" },
  { title: "The Girl in Room 105", author: "Chetan Bhagat", category: "MYSTERY" },
  { title: "Atomic Habits", author: "James Clear", category: "TO BE READ" },
  { title: "Attitude Is Everything", author: "Jeff Keller", category: "TO BE READ" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", category: "TO BE READ" },
  { title: "Better Than the Best Friend", author: "Wattpad / Indie", category: "TO BE READ" },
  { title: "A Girl Who Fell in Love with Her Best Friend", author: "Wattpad / Indie", category: "TO BE READ" },
  { title: "Can Love Happen Twice?", author: "Ravinder Singh", category: "TO BE READ" },
  { title: "Dune", author: "Frank Herbert", category: "TO BE READ" },
  { title: "Bhagavad Gita", author: "Vyasa", category: "TO BE READ" },
];