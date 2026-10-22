import Icon from "./Icon";
import { getSocialLinks, isExternal } from "../lib/socialLinks";

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-32 py-8 border-t border-zinc-800 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-xl sm:text-2xl font-bold mb-2">{profile.name}</p>
            <p className="text-zinc-400 text-sm sm:text-base">{profile.title}</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-4 sm:gap-6 mb-4">
              {getSocialLinks(profile).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-zinc-400 hover:text-blue-200 transition-colors"
                  aria-label={link.label}
                  {...(isExternal(link.href) && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <Icon name={link.icon} className="w-6 h-6" />
                </a>
              ))}
            </div>
            <p
              className="text-zinc-400 text-xs sm:text-sm text-center md:text-right"
              suppressHydrationWarning
            >
              &copy; {currentYear} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
