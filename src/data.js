import HeroImage from "./assets/nauffal.png";
import TelkomLogo from "./assets/telkom-university-logo.png";
import GhaniLogo from "./assets/ghani-logo.png";
import RimbalokaLogo from "./assets/LogoRimbaloka.jpg";

import GhaniPhoto1 from "./assets/experience/Sertifikat-Magang.jpg";
import GhaniPhoto2 from "./assets/experience/ghani-team.jpg";
import GhaniPhoto3 from "./assets/experience/documentation-testing.png";
import Rimbaloka from "./assets/experience/Rimbaloka.png";
import Rimbaloka2 from "./assets/experience/Rimbaloka2.jpeg";

const Image = {
  HeroImage,
  TelkomLogo,
  GhaniLogo,
  RimbalokaLogo,
};

export default Image;

import Proyek1 from "./assets/proyek/SocialNews.jpg";
import Proyek2 from "./assets/proyek/Lapangin.jpg";
import Proyek3 from "./assets/proyek/Social News.jpg";
import Proyek4 from "./assets/proyek/Lapangin-mobile.jpg";
import Proyek5 from "./assets/proyek/QR-feedback-system.jpg";
import Proyek6 from "./assets/proyek/moola.jpg";
import Proyek7 from "./assets/proyek/Open Library.jpg";
import Proyek8 from "./assets/proyek/EKG Mart.jpg";
import Proyek9 from "./assets/proyek/n-shop.jpg";
import Proyek10 from "./assets/proyek/SocialMedia.jpg";
import Proyek11 from "./assets/proyek/TaskManagement.jpg";
import Proyek12 from "./assets/proyek/JobMatching.jpg";
import Proyek13 from "./assets/proyek/JagoMat.jpg";
import Proyek14 from "./assets/proyek/AI Agent.jpg";

import Sertifikat1 from "./assets/sertifikat/Belajar Dasar Pemrograman JavaScript - Dicoding.jpg";
import Sertifikat2 from "./assets/sertifikat/Intro to Software Engineering.jpg";
import Sertifikat3 from "./assets/sertifikat/Sertifikat Fundamental Algoritma.jpg";
import Sertifikat4 from "./assets/sertifikat/Sertifikat Fundamental Database MySQL.jpg";
import Sertifikat5 from "./assets/sertifikat/Sertifikat Fundamental Front-End Web I.jpg";
import Sertifikat6 from "./assets/sertifikat/Sertifikat Fundamental Front-End Web Development II.jpg";
import Sertifikat7 from "./assets/sertifikat/Sertifikat Mahir Membuat Website dengan Laravel 9.jpg";
import Sertifikat8 from "./assets/sertifikat/Preparation Course for Azure AI Fundamentals (AI-900).jpg";
import Sertifikat9 from "./assets/sertifikat/Olimpina-Informatika.png";
import Sertifikat10 from "./assets/sertifikat/Certificate_Kompetisi Mircosoft Agent A Thon.jpg";

export const listProyek = [
  {
    id: 1,
    gambar: Proyek1,
    nama: "Social News",
    desk: "A social news platform that allows users to read and discuss the latest news. It features a commenting system, likes, and well-organized news categories to enhance user engagement and content discovery.",
    tools: ["HTML", "CSS", "Javascript", "PHP", "MySQL"],
    dad: "100",
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: "Lapangin",
    desk: "A sports facility booking platform built with Java Spring Boot and MySQL, supporting booking management, authentication, and RESTful APIs for mobile integration.",
    tools: ["HTML", "CSS", "Javascript", "Java Spring Boot", "MySQL"],
    dad: "200",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Social News",
    desk: "A social news platform that allows users to read and discuss the latest news. It features a commenting system, likes, and well-organized news categories to enhance user engagement and content discovery.",
    tools: ["Figma"],
    dad: "300",
  },
  {
    id: 4,
    gambar: Proyek4,
    nama: "Lapangin Mobile",
    desk: "A Flutter-based mobile application that consumes RESTful APIs from the Lapangin web backend to deliver a seamless and consistent booking experience.",
    tools: ["Flutter", "Dart"],
    dad: "400",
  },
  {
    id: 5,
    gambar: Proyek5,
    nama: "QR Feedback System",
    desk: "A real-time complaint management system for mall toilet facilities. Customers scan QR codes at each toilet location to submit complaints, which are automatically routed to the appropriate WhatsApp group (Cleanliness or Infrastructure) based on the category selected. Built with Express.js backend and WhatsApp Web.js integration for instant notifications.",
    tools: [
      "Express.js",
      "WhatsApp Web.js",
      "Node.js",
      "HTML",
      "Bootstrap",
      "JavaScript",
    ],
    dad: "500",
  },
  {
    id: 6,
    gambar: Proyek6,
    nama: "Moola",
    desk: "Business Idea Competititon (Top 112). An AI-powered recruitment platform that streamlines job matching by automatically extracting skills from CVs and providing personalized, compatibility-ranked job recommendations in real-time.",
    tools: ["Figma", "Canva", "Word"],
    dad: "600",
  },
  {
    id: 7,
    gambar: Proyek7,
    nama: "Open Library",
    desk: "An open-access digital library platform that provides users with seamless access to a vast collection of books, articles, and other educational resources.",
    tools: ["Figma"],
    dad: "700",
  },
  {
    id: 8,
    gambar: Proyek8,
    nama: "EKG Mart",
    desk: "Landing page design for Ekg Mart company.",
    tools: ["Figma"],
    dad: "800",
  },
  {
    id: 9,
    gambar: Proyek9,
    nama: "N-Shop",
    desk: "N-Shop is an e-commerce platform that enables users to shop online easily and securely. It provides product search, shopping carts, wishlists, shipping cost calculation, and various features to support a smooth online shopping experience.",
    tools: ["Laravel", "HTML", "Javascript", "Bootstrap", "MySQL"],
    dad: "900",
  },
  {
    id: 10,
    gambar: Proyek10,
    nama: "Social Media API",
    desk: "A comprehensive social media backend API built with NestJS and PostgreSQL. Features include user authentication, posts with image uploads, comments, replies, likes, follow/unfollow system, real-time notifications, and full RESTful API documentation with Swagger.",
    tools: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Fastify",
      "Swagger",
      "JWT",
      "Cloudinary",
    ],
    dad: "1000",
  },
  {
    id: 11,
    gambar: Proyek11,
    nama: "Task Management",
    desk: "A comprehensive task management backend API built with Express.js and PostgreSQL. Features include workspace management, task assignments with file attachments, role-based access control, activity logging, comments system, team collaboration, and complete RESTful API documentation with Swagger.",
    tools: ["Express.js", "PostgreSQL", "Drizzle ORM", "JWT", "Swagger"],
    dad: "1100",
  },
  {
    id: 12,
    gambar: Proyek12,
    nama: "Job Matching",
    desk: "An AI-powered job matching platform that automatically matches customer CVs with relevant job opportunities using intelligent skill detection and matching algorithms. The system extracts skills from PDF CVs, analyzes candidate profiles, and provides personalized job recommendations ranked by compatibility score with real-time matching calculations and admin dashboard.",
    tools: [
      "Node.js",
      "Fastify",
      "PostgreSQL",
      "Supabase",
      "JWT Authentication",
      "RESTful API",
      "React.js",
      "PDF.js",
    ],
    dad: "1200",
  },
  {
    id: 13,
    gambar: Proyek13,
    nama: "JagoMat",
    desk: "A comprehensive mathematics learning and practice application designed for students to master mathematical concepts through interactive materials and structured quizzes. The platform features organized learning materials by topics with detailed explanations and examples, level-based quizzes with immediate answer feedback, achievement badges upon quiz completion, and real-time quiz attempt tracking. Students can learn at their own pace, take multiple quizzes per topic, and review their quiz answers with detailed explanations to improve their understanding of mathematical concepts.",
    tools: [
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "JWT Authentication",
      "RESTful API",
      "React Native",
      "Expo",
      "Axios",
    ],
    dad: "1300",
  },
  {
    id: 14,
    gambar: Proyek14,
    nama: "Maju Talent Navigator",
    desk: "Competition Agent A-Thon 2026 (Top 38). An AI agent that supports recruiters and hiring managers in evaluating HR candidates objectively, efficiently, and consistently, particularly for Human Resources Business Partner (HRBP) roles.",
    tools: ["Microsoft Agent Builder"],
    dad: "1400",
  },
];

export const listExperience = [
  {
    id: 1,
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
    logo: Image.GhaniLogo,
    photos: [
      { src: GhaniPhoto1, caption: "Internship Certificate" },
      { src: GhaniPhoto2, caption: "Team Photo" },
      { src: GhaniPhoto3, caption: "Documentation & Testing" },
    ],
    dad: 100,
  },
  {
    id: 2,
    company: "Rimbaloka Trip",
    position: "Trip Operations & Social Media Admin",
    type: "Full-time",
    duration: "Oct 2025 - Present",
    location: "Kota Bandung, West Java, Indonesia · Online",
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
    logo: Image.RimbalokaLogo,
    photos: [
      { src: Rimbaloka, caption: "Instagram Rimbaloka" },
      { src: Rimbaloka2, caption: "Trip Photo" },
    ],
    dad: 200,
  },
];

export const listSertifikat = [
  {
    id: 1,
    gambar: Sertifikat1,
    nama: "Belajar Dasar Pemrograman JavaScript",
  },
  {
    id: 2,
    gambar: Sertifikat2,
    nama: "Intro to Software Engineering",
  },
  {
    id: 3,
    gambar: Sertifikat3,
    nama: "Fundamental Algoritma",
  },
  {
    id: 4,
    gambar: Sertifikat4,
    nama: "Fundamental Database MySQL",
  },
  {
    id: 5,
    gambar: Sertifikat5,
    nama: "Fundamental Front-End Web I",
  },
  {
    id: 6,
    gambar: Sertifikat6,
    nama: "Fundamental Front-End Web Development II",
  },
  {
    id: 7,
    gambar: Sertifikat7,
    nama: "Mahir Membuat Website dengan Laravel 9",
  },
  {
    id: 8,
    gambar: Sertifikat8,
    nama: "Preparation Course for Azure AI Fundamentals (AI-900)",
  },
  {
    id: 9,
    gambar: Sertifikat9,
    nama: "Olimpina Bidang Informatika untuk Mahasiswa",
  },
  {
    id: 10,
    gambar: Sertifikat10,
    nama: "Kompetisi Microsoft Agent A Thon",
  },
];
