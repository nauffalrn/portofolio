import HeroImage from "./assets/nauffal.png";
import TelkomLogo from "./assets/telkom-university-logo.png";
import GhaniLogo from "./assets/ghani-logo.png";

// Import foto experience dengan path yang benar
import GhaniPhoto1 from "./assets/experience/Sertifikat-Magang.jpg";
import GhaniPhoto2 from "./assets/experience/ghani-team.jpg";
import GhaniPhoto3 from "./assets/experience/documentation-testing.png";

const Image = {
  HeroImage,
  TelkomLogo,
  GhaniLogo,
};

export default Image;

import Proyek1 from "./assets/proyek/Lapangin.jpg";
import Proyek2 from "./assets/proyek/Lapangin-mobile.jpg";
import Proyek3 from "./assets/proyek/SocialNews.jpg";
import Proyek4 from "./assets/proyek/n-shop.jpg";
import Proyek5 from "./assets/proyek/SocialMedia.jpg";
import Proyek6 from "./assets/proyek/TaskManagement.jpg";

import Sertifikat1 from "./assets/sertifikat/Belajar Dasar Pemrograman JavaScript - Dicoding.jpg";
import Sertifikat2 from "./assets/sertifikat/Intro to Software Engineering.jpg";
import Sertifikat3 from "./assets/sertifikat/Sertifikat Fundamental Algoritma.jpg";
import Sertifikat4 from "./assets/sertifikat/Sertifikat Fundamental Database MySQL.jpg";
import Sertifikat5 from "./assets/sertifikat/Sertifikat Fundamental Front-End Web I.jpg";
import Sertifikat6 from "./assets/sertifikat/Sertifikat Fundamental Front-End Web Development II.jpg";
import Sertifikat7 from "./assets/sertifikat/Sertifikat Mahir Membuat Website dengan Laravel 9.jpg";
import Sertifikat8 from "./assets/sertifikat/Preparation Course for Azure AI Fundamentals (AI-900).jpg";

export const listProyek = [
  {
    id: 1,
    gambar: Proyek1,
    nama: "Lapangin Website",
    desk: "A sports facility booking platform built with Java Spring Boot and MySQL, supporting booking management, authentication, and RESTful APIs for mobile integration.",
    tools: ["HTML", "CSS", "Javascript", "Java Spring Boot", "MySQL"],
    dad: "200",
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: "Lapangin Mobile",
    desk: "A Flutter-based mobile application that consumes RESTful APIs from the Lapangin web backend to deliver a seamless and consistent booking experience.",
    tools: ["Flutter", "Dart"],
    dad: "300",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Social News",
    desk: "A social news platform that allows users to read and discuss the latest news. It features a commenting system, likes, and well-organized news categories to enhance user engagement and content discovery.",
    tools: ["HTML", "CSS", "Javascript", "PHP", "MySQL"],
    dad: "400",
  },
  {
    id: 4,
    gambar: Proyek4,
    nama: "N-Shop",
    desk: "N-Shop is an e-commerce platform that enables users to shop online easily and securely. It provides product search, shopping carts, wishlists, shipping cost calculation, and various features to support a smooth online shopping experience.",
    tools: ["Laravel", "HTML", "Javascript", "Bootstrap", "MySQL"],
    dad: "500",
  },
  {
  id: 5,
  gambar: Proyek5,
  nama: "Social Media API",
  desk: "A comprehensive social media backend API built with NestJS and PostgreSQL. Features include user authentication, posts with image uploads, comments, replies, likes, follow/unfollow system, real-time notifications, and full RESTful API documentation with Swagger.",
  tools: ["NestJS", "TypeScript", "PostgreSQL", "Drizzle ORM", "Fastify", "Swagger", "JWT", "Cloudinary"],
  dad: "600",
  },
  {
  id: 6,
  gambar: Proyek6,
  nama: "Task Management API",
  desk: "A comprehensive task management backend API built with Express.js and PostgreSQL. Features include workspace management, task assignments with file attachments, role-based access control, activity logging, comments system, team collaboration, and complete RESTful API documentation with Swagger.",
  tools: ["Express.js", "PostgreSQL", "Drizzle ORM", "JWT", "Swagger"],
  dad: "700",
}
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
];
