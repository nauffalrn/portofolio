const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32 py-8 border-t border-zinc-800 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Muhammad Nauffal Ramdhani
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Backend Developer | Student at Telkom University
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-4 sm:gap-6 mb-4">
              <a
                href="http://www.linkedin.com/in/mnauffalr"
                className="text-zinc-400 hover:text-blue-200 transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-linkedin-fill text-xl sm:text-2xl"></i>
              </a>
              <a
                href="https://github.com/nauffalrn"
                className="text-zinc-400 hover:text-blue-200 transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-github-fill text-xl sm:text-2xl"></i>
              </a>
              <a
                href="https://www.instagram.com/nauffal.rn"
                className="text-zinc-400 hover:text-blue-200 transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-instagram-fill text-xl sm:text-2xl"></i>
              </a>
              <a
                href="mailto:m.nauffal.ramdhani@gmail.com"
                className="text-zinc-400 hover:text-blue-200 transition-colors"
                aria-label="Email"
              >
                <i className="ri-mail-fill text-xl sm:text-2xl"></i>
              </a>
            </div>
            <p className="text-zinc-500 text-xs sm:text-sm text-center md:text-right">
              &copy; {currentYear} Muhammad Nauffal Ramdhani. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
