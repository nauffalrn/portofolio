import Icon from "../components/Icon";
import IdBadge from "../components/IdBadge";
import { CONTAINER } from "./Section";

const isCurrent = (exp) => /present/i.test(exp.duration || "");

const ActionLink = ({ href, icon, children, primary = false }) => {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-semibold transition-colors ${
        primary
          ? "bg-accent-strong text-accent-ink hover:bg-accent"
          : "text-zinc-100 ring-1 ring-zinc-700 hover:bg-zinc-800 hover:ring-zinc-600"
      }`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <Icon name={icon} className="h-5 w-5" />
      {children}
    </a>
  );
};

const Hero = ({ profile, experiences }) => {
  const current = experiences.find(isCurrent);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className={`${CONTAINER} grid grid-cols-1 items-center gap-12 pt-8 pb-16 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-8`}
    >
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl/[1.05]">
          {profile.name}
        </h1>
        <p className="mt-4 text-xl font-medium text-zinc-300 sm:text-2xl">{profile.title}</p>

        {current && (
          <p className="mt-6 flex items-center gap-2.5 font-mono text-sm text-zinc-400">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>
              Currently {current.position} at{" "}
              <span className="text-zinc-200">{current.company}</span>
            </span>
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {profile.contact_email && (
            <ActionLink href={`mailto:${profile.contact_email}`} icon="mail" primary>
              Email me
            </ActionLink>
          )}
          {profile.contact_linkedin && (
            <ActionLink href={profile.contact_linkedin} icon="linkedin">
              LinkedIn
            </ActionLink>
          )}
          {profile.contact_github && (
            <ActionLink href={profile.contact_github} icon="github">
              GitHub
            </ActionLink>
          )}
        </div>
      </div>

      <div className="flex justify-center lg:justify-end lg:pr-10">
        <IdBadge profile={profile} current={current} />
      </div>
    </section>
  );
};

export default Hero;
