import ResponsiveImage from "../components/ResponsiveImage";

const ListCard = ({ title, items }) => (
  <div className="bg-zinc-700/50 p-4 rounded-lg">
    <h3 className="font-bold text-blue-200 mb-2">{title}</h3>
    <ul className="list-disc pl-5 text-sm space-y-1">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const About = ({ profile }) => (
  <section id="about" className="about mt-32 py-10 px-4">
    <h2 className="sr-only">About</h2>
    <div className="reveal xl:w-2/3 lg:w-3/4 w-full mx-auto p-6 sm:p-7 bg-zinc-800 rounded-lg">
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 flex items-center justify-center bg-white p-2 rounded-lg flex-shrink-0">
          <ResponsiveImage
            image={profile.university_logo}
            alt={profile.university_name}
            sizes="64px"
            className="max-w-full max-h-full w-auto h-auto"
          />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold mb-1">{profile.university_name}</h3>
          <p className="text-sm text-blue-200 mb-1">{profile.university_major}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4 flex-wrap">
            {(profile.badges || []).map((badge) => (
              <span
                key={badge}
                className="bg-blue-900/40 text-blue-200 px-3 py-1 rounded-md text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-base/loose mb-8 text-center sm:text-left space-y-4">
        {(profile.about_paragraphs || []).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-5">
        <ListCard title="Technical Skills" items={profile.technical_skills || []} />
        <ListCard title="Interests" items={profile.interests || []} />
      </div>
    </div>
  </section>
);

export default About;
