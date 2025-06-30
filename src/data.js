import HeroImage from "./assets/nauffal.jpg";
import TelkomLogo from "./assets/telkom-university-logo.png";

const Image = {
  HeroImage,
  TelkomLogo,
};

export default Image;

import Proyek1 from "./assets/proyek/Lapangin.jpg";
import Proyek2 from "./assets/proyek/Lapangin-mobile.jpg";
import Proyek3 from "./assets/proyek/SocialNews.jpg";
import Proyek4 from "./assets/proyek/n-shop.jpg";

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
    desk: "Lapangin adalah aplikasi booking lapangan olahraga yang memudahkan pengguna untuk mencari dan memesan lapangan secara online.",
    tools: ["HTML", "CSS", "Javascript", "Java Spring Boot", "MySQL"],
    dad: "200",
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: "Lapangin Mobile",
    desk: "Versi mobile dari aplikasi Lapangin yang dibangun dengan Flutter. Menyediakan pengalaman booking lapangan yang seamless di perangkat mobile dengan UI yang intuitif dan performa yang optimal.",
    tools: ["Flutter", "Dart"],
    dad: "300",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Social News",
    desk: "Platform berita sosial yang memungkinkan pengguna untuk membaca, dan mendiskusikan berita terkini. Dilengkapi dengan sistem komentar, like, dan kategori berita yang terorganisir.",
    tools: ["HTML", "CSS", "Javascript", "PHP", "MySQL"],
    dad: "400",
  },
  {
    id: 4, 
    gambar: Proyek4,
    nama: "N-Shop",
    desk: "Platform e-commerce yang memungkinkan pengguna untuk berbelanja online dengan mudah dan aman. Dilengkapi dengan fitur pencarian produk, keranjang belanja, wishlist, perhitungan ongkir dan berbagai fitur lain yang membantu pengguna dalam berbelanja.",
    tools: ["Laravel", "HTML", "Javascript", "Bootstrap", "MySQL"],
    dad: "500",
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
