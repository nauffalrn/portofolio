import Icon from "../components/Icon";
import { getSocialLinks, isExternal } from "../lib/socialLinks";
import SectionTitle from "./SectionTitle";

const Contact = ({ profile }) => (
  <section id="contact" className="contact mt-32 py-10 px-4">
    <SectionTitle>Contact</SectionTitle>
    <div className="reveal mt-14 xl:w-2/3 lg:w-3/4 w-full mx-auto">
      <div className="w-full max-w-2xl mx-auto bg-zinc-800 p-6 sm:p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-8 text-center">Let's Connect</h3>
        <ul className="space-y-5 max-w-md mx-auto">
          {getSocialLinks(profile).map((link) => (
            <li key={link.label} className="flex items-center gap-4">
              <span className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-200">
                <Icon name={link.icon} className="w-6 h-6" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-zinc-400">{link.label}</span>
                <a
                  href={link.href}
                  className="hover:text-blue-200 transition-colors text-sm sm:text-base break-all"
                  {...(isExternal(link.href) && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {link.text}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Contact;
