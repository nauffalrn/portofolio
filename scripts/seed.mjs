// One-time migration: uploads existing local images to Supabase Storage and
// inserts the current hardcoded portfolio content into the database.
//
// Usage:
//   1. In Supabase Dashboard > SQL Editor, run supabase/schema.sql first.
//   2. Get your Project URL and the SERVICE ROLE key (Settings > API) -
//      NOT the anon key, this script needs elevated access to bypass RLS.
//   3. Run: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, "..", "src", "assets");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars before running this script."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
const BUCKET = "portfolio-assets";

function guessContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

async function uploadAsset(relativePath, storageFolder) {
  const absolutePath = path.join(ASSETS, relativePath);
  const fileBuffer = readFileSync(absolutePath);
  const fileName = path.basename(relativePath);
  const storagePath = `${storageFolder}/${Date.now()}-${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType: guessContentType(relativePath),
      upsert: true,
    });

  if (error) throw new Error(`Upload failed for ${relativePath}: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  console.log(`Uploaded ${relativePath} -> ${data.publicUrl}`);
  return data.publicUrl;
}

async function main() {
  console.log("Uploading images and seeding data...\n");

  // --- Profile ---
  const heroImageUrl = await uploadAsset("nauffal.png", "profile");
  const universityLogoUrl = await uploadAsset(
    "telkom-university-logo.png",
    "profile"
  );

  const { error: profileError } = await supabase
    .from("profile")
    .upsert({
      id: 1,
      name: "Muhammad Nauffal Ramdhani",
      short_name: "M. Nauffal R.",
      handle: "nauffal.rn",
      status: "Online",
      contact_button_text: "Contact Me",
      title: "Backend Developer",
      typed_texts: ["Backend Developer"],
      hero_image_url: heroImageUrl,
      university_name: "Telkom University",
      university_logo_url: universityLogoUrl,
      university_major: "S1 Informatics / Computer Science",
      badges: ["GPA 3.9/4.0", "Cum Laude"],
      about_paragraphs: [
        "I am an Informatics graduate from Telkom University with a strong interest in Backend Development. I approach software development by first understanding problems, analyzing requirements, and choosing the most appropriate solutions before turning them into reliable and efficient code.",
        "I have experience working with databases, APIs, application logic, and system design, with a strong focus on data security, scalability, maintainability, readability, and reliability. I apply principles such as SOLID, DRY, KISS, and YAGNI to build clean, well-structured, and maintainable software. Beyond coding, I enjoy solving problems, exploring different approaches, and continuously learning to deliver high-quality software solutions.",
      ],
      technical_skills: [
        "Frontend: HTML, CSS, Javascript, React Native, Tailwind CSS, Bootstrap, JQuery",
        "Backend: Java Spring Boot, PHP, Laravel, NestJS, Express js, Redis, RESTful API, GraphQL",
        "Database: MySQL, PostgreSQL",
        "Testing: Unit Testing, Katalon",
        "Version Control: Git, GitHub",
      ],
      interests: [
        "Web Development",
        "Mathematical Problem Solving",
        "Critical Thinking & Analysis",
        "Machine Learning",
        "System Analysis",
        "Project Management",
      ],
      contact_email: "m.nauffal.ramdhani@gmail.com",
      contact_linkedin: "http://www.linkedin.com/in/mnauffalr",
      contact_github: "https://github.com/nauffalrn",
      contact_instagram: "https://www.instagram.com/nauffal.rn",
    });
  if (profileError) throw profileError;
  console.log("Profile seeded.\n");

  // --- Experience ---
  const ghaniLogoUrl = await uploadAsset("ghani-logo.png", "experience");
  const rimbalokaLogoUrl = await uploadAsset(
    "LogoRimbaloka.jpg",
    "experience"
  );
  const ghaniPhoto1 = await uploadAsset(
    "experience/Sertifikat-Magang.jpg",
    "experience"
  );
  const ghaniPhoto2 = await uploadAsset(
    "experience/ghani-team.jpg",
    "experience"
  );
  const ghaniPhoto3 = await uploadAsset(
    "experience/documentation-testing.png",
    "experience"
  );
  const rimbaloka1 = await uploadAsset("experience/Rimbaloka.png", "experience");
  const rimbaloka2 = await uploadAsset(
    "experience/Rimbaloka2.jpeg",
    "experience"
  );

  const experiences = [
    {
      company: "Koperasi Konsumen Ghani Mandiri Indonesia",
      position: "Back End Developer",
      type: "Internship",
      duration: "Jul 2025 - Sep 2025 · 2 mos",
      location: "Kota Cimahi, West Java, Indonesia · On-site",
      description: [
        "Contributed to the backend development of an internal Task Management web application.",
        "Designed and implemented RESTful APIs using Express.js, PostgreSQL, and Drizzle ORM.",
        "Structured the backend following Clean Architecture and SOLID principles to ensure maintainability and scalability.",
        "Created comprehensive API documentation using Swagger, improving collaboration across development teams.",
        "Conducted basic debugging and functional checks for GMI Club, a mobile application offering digital gold transactions, arisan group savings, and zakat payment features.",
        "Strengthened technical expertise in backend engineering, API design, and database management, as well as teamwork and communication skills.",
      ],
      skills: [
        "Software Testing",
        "Back-End Web Development",
        "Express.js",
        "PostgreSQL",
        "Drizzle ORM",
        "Swagger",
      ],
      logo_url: ghaniLogoUrl,
      photos: [
        { src: ghaniPhoto1, caption: "Internship Certificate" },
        { src: ghaniPhoto2, caption: "Team Photo" },
        { src: ghaniPhoto3, caption: "Documentation & Testing" },
      ],
      order_index: 0,
    },
    {
      company: "Rimbaloka Trip",
      position: "Trip Operations & Social Media Admin",
      type: "Full-time",
      duration: "Oct 2025 - Aug 2026",
      location: "Kota Bandung, West Java, Indonesia · Hybrid",
      description: [
        "Managed participant registration and trip administration using Google Forms and spreadsheets.",
        "Handled customer inquiries and participant communication through social media and messaging platforms.",
        "Designed promotional posters and visual content for trip marketing and social media campaigns.",
        "Managed and maintained social media accounts to improve engagement and trip visibility.",
        "Coordinated rental equipment preparation and distribution during trip activities.",
        "Recorded attendance and organized participant data for operational reporting.",
        "Supported overall trip operations to ensure activities ran smoothly and efficiently.",
        "Strengthened skills in customer service, social media management, design communication, and operational coordination.",
      ],
      skills: [
        "Social Media Management",
        "Administrative Assistance",
        "Customer Service",
        "Canva",
        "Google Forms",
        "Excel",
        "Word",
      ],
      logo_url: rimbalokaLogoUrl,
      photos: [
        { src: rimbaloka1, caption: "Instagram Rimbaloka" },
        { src: rimbaloka2, caption: "Trip Photo" },
      ],
      order_index: 1,
    },
  ];

  const { error: expError } = await supabase
    .from("experiences")
    .insert(experiences);
  if (expError) throw expError;
  console.log("Experiences seeded.\n");

  // --- Projects ---
  const projectDefs = [
    ["proyek/SocialNews.jpg", "Social News", "A social news platform that allows users to read and discuss the latest news. It features a commenting system, likes, and well-organized news categories to enhance user engagement and content discovery.", ["HTML", "CSS", "Javascript", "PHP", "MySQL"]],
    ["proyek/Lapangin.jpg", "Lapangin", "A sports facility booking platform built with Java Spring Boot and MySQL, supporting booking management, authentication, and RESTful APIs for mobile integration.", ["HTML", "CSS", "Javascript", "Java Spring Boot", "MySQL"]],
    ["proyek/Social News.jpg", "Social News", "A social news platform that allows users to read and discuss the latest news. It features a commenting system, likes, and well-organized news categories to enhance user engagement and content discovery.", ["Figma"]],
    ["proyek/Lapangin-mobile.jpg", "Lapangin Mobile", "A Flutter-based mobile application that consumes RESTful APIs from the Lapangin web backend to deliver a seamless and consistent booking experience.", ["Flutter", "Dart"]],
    ["proyek/QR-feedback-system.jpg", "QR Feedback System", "A real-time complaint management system for mall toilet facilities. Customers scan QR codes at each toilet location to submit complaints, which are automatically routed to the appropriate WhatsApp group (Cleanliness or Infrastructure) based on the category selected. Built with Express.js backend and WhatsApp Web.js integration for instant notifications.", ["Express.js", "WhatsApp Web.js", "Node.js", "HTML", "Bootstrap", "JavaScript"]],
    ["proyek/moola.jpg", "Moola", "Business Idea Competititon (Top 112). An AI-powered recruitment platform that streamlines job matching by automatically extracting skills from CVs and providing personalized, compatibility-ranked job recommendations in real-time.", ["Figma", "Canva", "Word"]],
    ["proyek/Open Library.jpg", "Open Library", "An open-access digital library platform that provides users with seamless access to a vast collection of books, articles, and other educational resources.", ["Figma"]],
    ["proyek/EKG Mart.jpg", "EKG Mart", "Landing page design for Ekg Mart company.", ["Figma"]],
    ["proyek/n-shop.jpg", "N-Shop", "N-Shop is an e-commerce platform that enables users to shop online easily and securely. It provides product search, shopping carts, wishlists, shipping cost calculation, and various features to support a smooth online shopping experience.", ["Laravel", "HTML", "Javascript", "Bootstrap", "MySQL"]],
    ["proyek/SocialMedia.jpg", "Social Media API", "A comprehensive social media backend API built with NestJS and PostgreSQL. Features include user authentication, posts with image uploads, comments, replies, likes, follow/unfollow system, real-time notifications, and full RESTful API documentation with Swagger.", ["NestJS", "TypeScript", "PostgreSQL", "Drizzle ORM", "Fastify", "Swagger", "JWT", "Cloudinary"]],
    ["proyek/TaskManagement.jpg", "Task Management", "A comprehensive task management backend API built with Express.js and PostgreSQL. Features include workspace management, task assignments with file attachments, role-based access control, activity logging, comments system, team collaboration, and complete RESTful API documentation with Swagger.", ["Express.js", "PostgreSQL", "Drizzle ORM", "JWT", "Swagger"]],
    ["proyek/JobMatching.jpg", "Job Matching", "An AI-powered job matching platform that automatically matches customer CVs with relevant job opportunities using intelligent skill detection and matching algorithms. The system extracts skills from PDF CVs, analyzes candidate profiles, and provides personalized job recommendations ranked by compatibility score with real-time matching calculations and admin dashboard.", ["Node.js", "Fastify", "PostgreSQL", "Supabase", "JWT Authentication", "RESTful API", "React.js", "PDF.js"]],
    ["proyek/JagoMat.jpg", "JagoMat", "A comprehensive mathematics learning and practice application designed for students to master mathematical concepts through interactive materials and structured quizzes. The platform features organized learning materials by topics with detailed explanations and examples, level-based quizzes with immediate answer feedback, achievement badges upon quiz completion, and real-time quiz attempt tracking. Students can learn at their own pace, take multiple quizzes per topic, and review their quiz answers with detailed explanations to improve their understanding of mathematical concepts.", ["Express.js", "TypeScript", "PostgreSQL", "Supabase", "JWT Authentication", "RESTful API", "React Native", "Expo", "Axios"]],
    ["proyek/AI Agent.jpg", "Maju Talent Navigator", "Competition Agent A-Thon 2026 (Top 38). An AI agent that supports recruiters and hiring managers in evaluating HR candidates objectively, efficiently, and consistently, particularly for Human Resources Business Partner (HRBP) roles.", ["Microsoft Agent Builder"]],
  ];

  const projects = [];
  for (let i = 0; i < projectDefs.length; i++) {
    const [file, nama, desk, tools] = projectDefs[i];
    const url = await uploadAsset(file, "projects");
    projects.push({ nama, gambar_url: url, desk, tools, order_index: i });
  }
  const { error: projError } = await supabase.from("projects").insert(projects);
  if (projError) throw projError;
  console.log("Projects seeded.\n");

  // --- Certificates ---
  const certDefs = [
    ["sertifikat/Belajar Dasar Pemrograman JavaScript - Dicoding.jpg", "Belajar Dasar Pemrograman JavaScript"],
    ["sertifikat/Intro to Software Engineering.jpg", "Intro to Software Engineering"],
    ["sertifikat/Sertifikat Fundamental Algoritma.jpg", "Fundamental Algoritma"],
    ["sertifikat/Sertifikat Fundamental Database MySQL.jpg", "Fundamental Database MySQL"],
    ["sertifikat/Sertifikat Fundamental Front-End Web I.jpg", "Fundamental Front-End Web I"],
    ["sertifikat/Sertifikat Fundamental Front-End Web Development II.jpg", "Fundamental Front-End Web Development II"],
    ["sertifikat/Sertifikat Mahir Membuat Website dengan Laravel 9.jpg", "Mahir Membuat Website dengan Laravel 9"],
    ["sertifikat/Preparation Course for Azure AI Fundamentals (AI-900).jpg", "Preparation Course for Azure AI Fundamentals (AI-900)"],
    ["sertifikat/Olimpina-Informatika.png", "Olimpina Bidang Informatika untuk Mahasiswa"],
    ["sertifikat/Certificate_Kompetisi Mircosoft Agent A Thon.jpg", "Kompetisi Microsoft Agent A Thon"],
  ];

  const certificates = [];
  for (let i = 0; i < certDefs.length; i++) {
    const [file, nama] = certDefs[i];
    const url = await uploadAsset(file, "certificates");
    certificates.push({ nama, gambar_url: url, order_index: i });
  }
  const { error: certError } = await supabase
    .from("certificates")
    .insert(certificates);
  if (certError) throw certError;
  console.log("Certificates seeded.\n");

  console.log("Done! All content migrated to Supabase.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
