import { useState, useEffect, useRef } from "react";
import DataImage from "./data";
import { listProyek, listSertifikat } from "./data";
import emailjs from "@emailjs/browser";

function App() {
  const [selectedSertifikat, setSelectedSertifikat] = useState(null);
  const [selectedProyek, setSelectedProyek] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = ["Fullstack Developer", "Backend Developer"];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      const currentText = texts[currentTextIndex];

      if (!isDeleting && currentCharIndex < currentText.length) {
        setTypedText(currentText.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      } else if (isDeleting && currentCharIndex > 0) {
        setTypedText(currentText.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      } else if (!isDeleting && currentCharIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentTextIndex, texts]);

  const openModal = (sertifikat) => {
    setSelectedSertifikat(sertifikat);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedSertifikat(null);
    document.body.style.overflow = "unset";
  };

  const openProjectModal = (proyek) => {
    setSelectedProyek(proyek);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setSelectedProyek(null);
    document.body.style.overflow = "unset";
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_47vsons",
        "template_ptdk3yw",
        formRef.current,
        "oGG4FyUBPhabbQOhZ"
      )
      .then((result) => {
        console.log("SUCCESS!", result.text);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch((error) => {
        console.log("FAILED...", error);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="hero grid lg:grid-cols-2 items-center pt-10 xl:gap-0 gap-8 grid-cols-1 px-4 sm:px-8 md:px-16 lg:px-24 min-h-[80vh]"
      >
        <div className="animate__animated animate__fadeInUp animate__delay-1s order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl/tight font-bold mb-6">
            Hi, Saya Muhammad Nauffal Ramdhani
          </h1>
          <div className="mb-6 h-16 flex items-center">
            <span className="text-xl sm:text-2xl text-amber-200 font-semibold">
              {typedText}
              <span className="animate-pulse text-amber-200">|</span>
            </span>
          </div>
          <div className="flex items-center justify-center lg:justify-start sm:gap-4 gap-2">
            <a
              href="/cv/CV Muhammad Nauffal Ramdhani.pdf"
              download="CV Muhammad Nauffal Ramdhani.pdf"
              className="bg-amber-600 text-white p-3 sm:p-4 rounded-2xl hover:bg-amber-700 transition-colors duration-300 font-semibold text-sm sm:text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <i className="ri-download-line ri-lg"></i>
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end order-1 lg:order-2">
          <div className="relative animate__animated animate__fadeInUp animate__delay-2s">
            <img
              src={DataImage.HeroImage}
              alt="Muhammad Nauffal Ramdhani"
              className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] object-cover rounded-3xl shadow-2xl border-4 border-amber-200/20"
              loading="lazy"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-amber-400 rounded-3xl blur opacity-20 -z-10"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about mt-32 py-10 px-4">
        <div
          className="xl:w-2/3 lg:w-3/4 w-full mx-auto p-6 sm:p-7 bg-zinc-800 rounded-lg"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div className="mb-8 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 flex items-center justify-center bg-white p-2 rounded-lg flex-shrink-0">
              <img
                src={DataImage.TelkomLogo}
                alt="Telkom University"
                className="max-w-full max-h-full"
                loading="lazy"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold mb-1">Telkom University</h2>
              <p className="text-sm text-amber-200 mb-1">
                S1 Informatics / Computer Science
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 flex-wrap">
                <span className="bg-amber-900/40 text-amber-200 px-3 py-1 rounded-md text-xs font-medium">
                  7th Semester
                </span>
                <span className="bg-amber-900/40 text-amber-200 px-3 py-1 rounded-md text-xs font-medium">
                  GPA 3.89/4.0
                </span>
              </div>
            </div>
          </div>

          <p className="text-base/loose mb-8 text-center sm:text-left">
            I am an Informatics student at Telkom University passionate about
            Fullstack Development. Through collaborative projects, I have
            developed strong problem-solving and coding skills. I enjoy tackling
            complex challenges and continuously strive to learn new technologies
            to build scalable, high-quality software.
          </p>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-5">
            <div className="bg-zinc-700/50 p-4 rounded-lg">
              <h3 className="font-bold text-amber-200 mb-2">
                Technical Skills
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Frontend: HTML, CSS, Javascript, Tailwind CSS, Bootstrap, JQuery</li>
                <li>Backend: Java Spring Boot, PHP, Laravel</li>
                <li>Database: MySQL</li>
                <li>Tools: Git, Docker</li>
              </ul>
            </div>
            <div className="bg-zinc-700/50 p-4 rounded-lg">
              <h3 className="font-bold text-amber-200 mb-2">Interests</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Web Development</li>
                <li>Mathematical Problem Solving</li>
                <li>Critical Thinking & Analysis</li>
                <li>Machine Learning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="proyek mt-32 py-10 px-4">
        <h1
          className="text-center text-3xl sm:text-4xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Project
        </h1>
        <div className="proyek-box mt-14 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 max-w-7xl mx-auto">
          {listProyek.map((proyek) => (
            <div
              key={proyek.id}
              className="bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all duration-300 overflow-hidden hover:scale-105"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={proyek.dad}
              data-aos-once="true"
            >
              <div
                className="w-full overflow-hidden cursor-pointer group relative"
                onClick={() => openProjectModal(proyek)}
              >
                <img
                  src={proyek.gambar}
                  alt={`${proyek.nama} Project Image`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <i className="ri-zoom-in-line text-white text-2xl"></i>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl sm:text-2xl font-bold my-4">
                  {proyek.nama}
                </h2>
                <p className="text-base/loose mb-4 text-zinc-300">
                  {proyek.desk}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proyek.tools.map((tool, index) => (
                    <span
                      className="py-1 px-3 border border-zinc-500 bg-zinc-600 rounded-md font-semibold text-sm hover:bg-amber-600 hover:border-amber-600 transition-all"
                      key={index}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievement Section */}
      <section id="achievement" className="achievement mt-32 py-10 px-4">
        <h1
          className="text-center text-3xl sm:text-4xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Achievement
        </h1>
        <div className="sertifikat-box mt-14 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 max-w-7xl mx-auto">
          {listSertifikat.map((sertifikat) => (
            <div
              key={sertifikat.id}
              className="p-3 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors cursor-pointer transform hover:scale-105 duration-300"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
              onClick={() => openModal(sertifikat)}
            >
              <div className="w-full h-48 bg-white rounded-md mb-3 flex items-center justify-center overflow-hidden">
                <img
                  src={sertifikat.gambar}
                  alt={sertifikat.nama}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-sm font-bold leading-tight">
                  {sertifikat.nama}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal untuk Project */}
      {selectedProyek && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-700 z-10 transition-colors"
              aria-label="Close modal"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 pr-16">
                  {selectedProyek.nama}
                </h2>
                <div className="mb-4">
                  <img
                    src={selectedProyek.gambar}
                    alt={selectedProyek.nama}
                    className="w-full h-auto object-contain rounded-lg max-h-[60vh]"
                  />
                </div>
                <div className="text-gray-700">
                  <p className="mb-4 leading-relaxed">{selectedProyek.desk}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-600 mr-2">
                      Tech Stack:
                    </span>
                    {selectedProyek.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="py-1 px-3 bg-amber-100 text-amber-800 rounded-md font-semibold text-sm border border-amber-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal untuk sertifikat */}
      {selectedSertifikat && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative w-full mx-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 z-10 transition-colors"
              aria-label="Close modal"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 pr-12">
                {selectedSertifikat.nama}
              </h2>
              <img
                src={selectedSertifikat.gambar}
                alt={selectedSertifikat.nama}
                className="w-full max-w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="contact mt-32 py-10 px-4">
        <h1
          className="text-center text-3xl sm:text-4xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Contact
        </h1>
        <div
          className="mt-14 xl:w-2/3 lg:w-3/4 w-full mx-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div className="grid lg:grid-cols-2 gap-8 grid-cols-1">
            {/* Contact Info */}
            <div className="bg-zinc-800 p-6 sm:p-7 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-amber-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">Email</p>
                    <a
                      href="mailto:m.nauffal.ramdhani@gmail.com"
                      className="hover:text-amber-200 transition-colors text-sm sm:text-base break-all"
                    >
                      m.nauffal.ramdhani@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-linkedin-fill text-amber-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">LinkedIn</p>
                    <a
                      href="http://www.linkedin.com/in/mnauffalr"
                      className="hover:text-amber-200 transition-colors text-sm sm:text-base break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/mnauffalr
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-github-fill text-amber-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">GitHub</p>
                    <a
                      href="https://github.com/nauffalrn"
                      className="hover:text-amber-200 transition-colors text-sm sm:text-base break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/nauffalrn
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-instagram-fill text-amber-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">Instagram</p>
                    <a
                      href="https://www.instagram.com/nauffal.rn"
                      className="hover:text-amber-200 transition-colors text-sm sm:text-base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @nauffal.rn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-zinc-800 p-6 sm:p-7 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-400 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-700 rounded-md border-0 p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-400 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-700 rounded-md border-0 p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-400 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-zinc-700 rounded-md border-0 p-3 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none"
                    placeholder="What would you like to discuss?"
                    required
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-600/20 border border-green-500 rounded-md text-green-100 text-sm">
                    Your message has been sent successfully!
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-600/20 border border-red-500 rounded-md text-red-100 text-sm">
                    Failed to send message. Please try again later.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md w-full transition-colors duration-300 flex items-center justify-center ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
