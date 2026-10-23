import ResponsiveImage from "../components/ResponsiveImage";
import Section from "./Section";

// Skills are stored as "Group: item, item, item"; split them for a scannable list.
function parseSkill(line) {
  const separator = line.indexOf(":");
  if (separator === -1) return { group: "", items: line };
  return { group: line.slice(0, separator).trim(), items: line.slice(separator + 1).trim() };
}

const About = ({ profile }) => {
  const skills = (profile.technical_skills || []).map(parseSkill);
  const interests = profile.interests || [];

  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal max-w-[65ch]">
          <div className="space-y-5 text-base/relaxed text-zinc-300 sm:text-lg/relaxed">
            {(profile.about_paragraphs || []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {interests.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-semibold">Interests</h3>
              <ul className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-full bg-zinc-900 px-3.5 py-1.5 text-sm text-zinc-200 ring-1 ring-zinc-700/70 transition-colors hover:bg-zinc-800 hover:ring-zinc-600"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="reveal space-y-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white p-2">
              <ResponsiveImage
                image={profile.university_logo}
                alt={profile.university_name}
                sizes="64px"
                className="max-h-full max-w-full h-auto w-auto"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold">{profile.university_name}</h3>
              <p className="text-sm text-zinc-400">{profile.university_major}</p>
              {(profile.badges || []).length > 0 && (
                <p className="mt-1 font-mono text-sm text-accent">
                  {profile.badges.join(" · ")}
                </p>
              )}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">Technical skills</h3>
              <dl className="divide-y divide-zinc-800 border-y border-zinc-800">
                {skills.map(({ group, items }) => (
                  <div key={group + items} className="grid gap-1 py-3 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                    <dt className="text-sm text-zinc-400">{group}</dt>
                    <dd className="font-mono text-sm/relaxed text-zinc-200">{items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default About;
