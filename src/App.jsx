import DataImage from "./data";
import { listProyek } from "./data";

function App() {
  return (
    <>
      {/* home */}
      <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
        <div className="animate__animated animate__fadeInUp animate__delay-1s">
          <h1 className="text-5xl/tight font-bold mb-6">
            Hi, Saya Muhammad Nauffal Ramdhani
          </h1>
          <p>ini mau dibuat yg fullstack/backend gerak</p>
          <div className="flex items-center sm:gap-4 gap-2">
            <a
              href="#"
              className="bg-blue-900 p-4 rounded-2xl hover:bg-blue-950"
            >
              Download CV <i className="ri-download-line ri-lg"></i>
            </a>
          </div>
        </div>
        <img
          src={DataImage.HeroImage}
          alt="Muhammad Nauffal Ramdhani"
          className="w-[500px] md:ml-auto animate__animated animate__fadeInUp animate__delay-2s"
          loading="lazy"
        />
      </div>

      {/* about */}
      <div className="about mt-32 py-10" id="about">
        <div className="xl:w-2/3 lg:w-3/4 w-full mx-auto p-7 bg-zinc-800 rounded-lg" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true">
          <img
            src={DataImage.HeroImage}
            alt="Muhammad Nauffal Ramdhani"
            className="w-12 rounded-md mb-10 sm:hidden"
            loading="lazy"
          />
          <p className="text-base/loose mb-10">I am an Informatics student at Telkom University passionate about Fullstack Development. Through collaborative
                                              projects, I have developed strong problem-solving and coding skills. I enjoy tackling complex challenges and
                                              continuously strive to learn new technologies to build scalable, high-quality software</p>
          <div className="flex items-center justify-between">
            <img
              src={DataImage.HeroImage}
              alt="Muhammad Nauffal Ramdhani"
              className="w-12 rounded-md sm:block hidden"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* project */}
      <div className="proyek mt-32 py-10" id="project">
        <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">Project</h1>
        <div className="proyek-box mt-14 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {listProyek.map((proyek) => (
            <div key={proyek.id} className="p-4 bg-zinc-800 rounded-md" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={proyek.dad} data-aos-once="true">
              <img src={proyek.gambar} alt="Proyek Image" loading="lazy" />
              <div>
                <h1 className="text-2xl font-bold my-4">{proyek.nama}</h1>
                <p className="text-base/loose mb-4">{proyek.desk}</p>
                <div className="flex flex-wrap gap-2">
                  {proyek.tools.map((tool, index) => (
                    <p
                      className="py-1 px-3 border border-zinc-500 bg-zinc-600 rounded-md font-semibold"
                      key={index}
                    >
                      {tool}
                    </p>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <a
                    href="#"
                    className="bg-violet-700 p-3 rounded-lg block border border-zinc-600 hover:bg-violet-600"
                  >
                    Lihat
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
