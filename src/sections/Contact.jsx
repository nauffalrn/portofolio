import Icon from "../components/Icon";
import { getSocialLinks, isExternal } from "../lib/socialLinks";
import Section from "./Section";

const Contact = ({ profile }) => {
  const links = getSocialLinks(profile);

  return (
    <Section id="contact" title="Contact">
      <div className="reveal grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <p className="text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl/[1.05]">
            Let&apos;s build <span className="text-zinc-500">something together</span>
            <span
              aria-hidden="true"
              className="cursor-blink ml-2 inline-block h-[0.12em] w-[0.55em] rounded-[2px] bg-accent-strong align-baseline"
            />
          </p>
        </div>

        <ul className="border-t border-zinc-800">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="group flex min-h-14 items-center gap-4 border-b border-zinc-800 py-3 transition-colors hover:text-accent"
                {...(isExternal(link.href) && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <Icon name={link.icon} className="h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-accent" />
                <span className="w-24 flex-shrink-0 text-zinc-200">{link.label}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-sm text-zinc-400">{link.text}</span>
                <Icon name="arrowUpRight" className="h-4 w-4 flex-shrink-0 text-zinc-600 group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Contact;
