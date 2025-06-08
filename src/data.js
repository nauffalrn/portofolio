import HeroImage from "./assets/nauffal.jpg";

const Image = {
  HeroImage,
};

export default Image;

import Proyek1 from "./assets/proyek/proyek1.webp";
import Proyek2 from "./assets/proyek/proyek2.webp";
import Proyek3 from "./assets/proyek/proyek3.webp";

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
    desk: "Lapangin adalah aplikasi booking lapangan olahraga yang memudahkan pengguna untuk mencari dan memesan lapangan secara online.",
    tools: ["Flutter"],
    dad: "300",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Social News",
    desk: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, laborum!",
    tools: ["HTML", "CSS", "Javascript", "PHP", "MySQL"],
    dad: "400",
  },
];
