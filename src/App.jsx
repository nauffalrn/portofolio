import { useState, useEffect } from "react";
import ProfileCard from "./components/profile Card/profileCard";
import {
  fetchProfile,
  fetchExperiences,
  fetchProjects,
  fetchCertificates,
} from "./lib/api";
import { isSupabaseConfigured } from "./lib/supabaseClient";

function App() {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [selectedSertifikat, setSelectedSertifikat] = useState(null);
  const [selectedProyek, setSelectedProyek] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedExperiencePhoto, setSelectedExperiencePhoto] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoadError(
        "Supabase belum dikonfigurasi. Salin .env.example ke .env dan isi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY."
      );
      setLoading(false);
      return;
    }

    Promise.all([
      fetchProfile(),
      fetchExperiences(),
      fetchProjects(),
      fetchCertificates(),
    ])
      .then(([profileData, experienceData, projectData, certificateData]) => {
        setProfile(profileData);
        setExperiences(experienceData);
        setProjects(projectData);
        setCertificates(certificateData);
      })
      .catch((err) => setLoadError(err.message || "Gagal memuat data."))
      .finally(() => setLoading(false));
  }, []);

  const texts =
    profile?.typed_texts?.length > 0 ? profile.typed_texts : ["Developer"];

  useEffect(() => {
    if (!profile) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharIndex, isDeleting, currentTextIndex, profile]);

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

  const openExperiencePhotoModal = (photo) => {
    setSelectedExperiencePhoto(photo);
    document.body.style.overflow = "hidden";
  };

  const closeExperiencePhotoModal = () => {
    setSelectedExperiencePhoto(null);
    document.body.style.overflow = "unset";
  };

  if (loadError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <p className="text-red-400 text-center max-w-md">{loadError}</p>
      </div>
    );
  }

  if (loading || !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="hero grid lg:grid-cols-2 items-center pt-10 gap-8 lg:gap-0 grid-cols-1 px-4 sm:px-8 md:px-12 lg:px-40 xl:px-60 min-h-[80vh]"
      >
        <div className="animate__animated animate__fadeInUp animate__delay-1s order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl/tight font-bold mb-6">
            Hi, I'm {profile.name}
          </h1>
          <div className="mb-6 h-16 flex items-center">
            <span className="text-xl sm:text-2xl text-blue-200 font-semibold">
              {typedText}
              <span className="animate-pulse text-blue-200">|</span>
            </span>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end order-1 lg:order-2 lg:-ml-16 xl:-ml-24">
          <ProfileCard
            name={profile.short_name}
            title={profile.title}
            handle={profile.handle}
            status={profile.status}
            contactText={profile.contact_button_text}
            avatarUrl={profile.hero_image_url}
            showUserInfo={true}
            enableTilt={false}
            enableMobileTilt={false}
            onContactClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
              window.location.hash = "contact";
            }}
          />
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
                src={profile.university_logo_url}
                alt={profile.university_name}
                className="max-w-full max-h-full"
                loading="lazy"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold mb-1">
                {profile.university_name}
              </h2>
              <p className="text-sm text-blue-200 mb-1">
                {profile.university_major}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 flex-wrap">
                {(profile.badges || []).map((badge, index) => (
                  <span
                    key={index}
                    className="bg-blue-900/40 text-blue-200 px-3 py-1 rounded-md text-xs font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-base/loose mb-8 text-center sm:text-left space-y-4">
            {(profile.about_paragraphs || []).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-5">
            <div className="bg-zinc-700/50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-200 mb-2">
                Technical Skills
              </h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {(profile.technical_skills || []).map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-700/50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-200 mb-2">Interests</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {(profile.interests || []).map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience mt-32 py-10 px-4">
        <h1
          className="text-center text-3xl sm:text-4xl font-bold mb-2"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Experience
        </h1>
        <div className="experience-box mt-14 grid md:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto">
          {experiences.map((exp, expIndex) => (
            <div
              key={exp.id}
              className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-all duration-300 h-full"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={expIndex * 100}
              data-aos-once="true"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={exp.logo_url}
                    alt={exp.company}
                    className="w-full h-full object-contain block"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">
                    {exp.position}
                  </h2>
                  <h3 className="text-base sm:text-lg text-blue-200 mb-1">
                    {exp.company} · {exp.type}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-1">{exp.duration}</p>
                  <p className="text-sm text-zinc-400 mb-4">{exp.location}</p>

                  <ul className="list-disc list-inside space-y-2 mb-4 text-zinc-300 text-sm sm:text-base">
                    {(exp.description || []).map((desc, index) => (
                      <li key={index} className="leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {(exp.skills || []).map((skill, index) => (
                      <span
                        key={index}
                        className="py-1 px-3 bg-blue-900/40 text-blue-200 rounded-md text-xs sm:text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {exp.photos && exp.photos.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3 text-blue-200">
                        <i className="ri-image-line mr-2"></i>
                        Documentation
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {exp.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="relative group cursor-pointer overflow-hidden rounded-lg bg-zinc-700"
                            style={{ aspectRatio: "1/1" }}
                            onClick={() => openExperiencePhotoModal(photo)}
                          >
                            <img
                              src={photo.src}
                              alt={
                                photo.caption || `Experience photo ${index + 1}`
                              }
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <i className="ri-zoom-in-line text-white text-2xl"></i>
                            </div>
                            {photo.caption && (
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2">
                                <p className="text-white text-xs text-center font-medium">
                                  {photo.caption}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
          {visibleProjects.map((proyek, proyekIndex) => (
            <div
              key={proyek.id}
              className="bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all duration-300 overflow-hidden hover:scale-105 cursor-pointer"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={proyekIndex * 100}
              data-aos-once="true"
              onClick={() => openProjectModal(proyek)}
            >
              <div className="w-full overflow-hidden group relative">
                <img
                  src={proyek.gambar_url}
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
                <div className="flex flex-wrap gap-2">
                  {(proyek.tools || []).map((tool, index) => (
                    <span
                      className="py-1 px-3 border border-zinc-500 bg-zinc-600 rounded-md font-semibold text-sm hover:bg-blue-600 hover:border-blue-600 transition-all"
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

        {projects.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
            >
              {showAllProjects ? "Show Less" : "More Projects"}
            </button>
          </div>
        )}
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
          {certificates.map((sertifikat) => (
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
                  src={sertifikat.gambar_url}
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
            <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-16">
                  {selectedProyek.nama}
                </h2>
                <div className="mb-4">
                  <img
                    src={selectedProyek.gambar_url}
                    alt={selectedProyek.nama}
                    className="w-full h-auto object-contain rounded-lg max-h-[60vh]"
                  />
                </div>
                <div className="text-zinc-200">
                  <p className="mb-4 leading-relaxed">{selectedProyek.desk}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-zinc-300 mr-2">
                      Tech Stack:
                    </span>
                    {(selectedProyek.tools || []).map((tool, index) => (
                      <span
                        key={index}
                        className="py-1 px-3 bg-blue-900/40 text-blue-200 rounded-md font-semibold text-sm border border-blue-700/40"
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
          <div className="bg-zinc-800 rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative w-full mx-4 border border-zinc-700">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 z-10 transition-colors"
              aria-label="Close modal"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-12">
                {selectedSertifikat.nama}
              </h2>
              <img
                src={selectedSertifikat.gambar_url}
                alt={selectedSertifikat.nama}
                className="w-full max-w-full h-auto object-contain rounded-lg bg-zinc-900 p-2"
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
          <div className="w-full max-w-2xl mx-auto">
            {/* Contact Info */}
            <div className="bg-zinc-800 p-6 sm:p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Let's Connect
              </h2>
              <div className="space-y-5 max-w-md mx-auto">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-blue-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">Email</p>
                    <a
                      href={`mailto:${profile.contact_email}`}
                      className="hover:text-blue-200 transition-colors text-sm sm:text-base break-all"
                    >
                      {profile.contact_email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-linkedin-fill text-blue-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">LinkedIn</p>
                    <a
                      href={profile.contact_linkedin}
                      className="hover:text-blue-200 transition-colors text-sm sm:text-base break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.contact_linkedin?.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-github-fill text-blue-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">GitHub</p>
                    <a
                      href={profile.contact_github}
                      className="hover:text-blue-200 transition-colors text-sm sm:text-base break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.contact_github?.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-instagram-fill text-blue-200 text-xl"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-400">Instagram</p>
                    <a
                      href={profile.contact_instagram}
                      className="hover:text-blue-200 transition-colors text-sm sm:text-base"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{profile.contact_instagram?.split("/").filter(Boolean).pop()}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Photo Modal */}
      {selectedExperiencePhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeExperiencePhotoModal}
        >
          <button
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center z-10 transition-colors shadow-lg"
            onClick={closeExperiencePhotoModal}
            aria-label="Close photo"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
          <div
            className="max-w-7xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedExperiencePhoto.src}
                alt={selectedExperiencePhoto.caption || "Experience photo"}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                loading="lazy"
              />
            </div>
            {selectedExperiencePhoto.caption && (
              <div className="mt-4 bg-zinc-900/80 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="text-white text-center text-base sm:text-lg font-medium">
                  {selectedExperiencePhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
