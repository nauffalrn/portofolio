import Icon from "./Icon";
import { getSocialLinks, isExternal } from "../lib/socialLinks";
import { CONTAINER } from "../sections/Section";

const Footer = ({ profile, brand }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-zinc-800">
      <div className={`${CONTAINER} flex flex-col-reverse items-center justify-between gap-4 py-6 sm:flex-row`}>
        <p className="font-mono text-sm text-zinc-400" suppressHydrationWarning>
          &copy; {currentYear} {brand}
        </p>
        <ul className="flex items-center gap-1 sm:-mr-2.5">
          {getSocialLinks(profile).map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex h-11 w-11 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-accent"
                aria-label={link.label}
                {...(isExternal(link.href) && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <Icon name={link.icon} className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
