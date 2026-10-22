import ProfileCard from "../components/profile Card/profileCard";
import TypedText from "../components/TypedText";

const Hero = ({ profile }) => {
  const typedTexts = profile.typed_texts?.length
    ? profile.typed_texts
    : [profile.title];

  return (
    <section
      id="home"
      className="hero grid lg:grid-cols-2 items-center pt-10 gap-8 lg:gap-0 grid-cols-1 px-4 sm:px-8 md:px-12 lg:px-40 xl:px-60 min-h-[80vh]"
    >
      <div className="order-2 lg:order-1">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl/tight font-bold mb-6">
          Hi, I'm {profile.name}
        </h1>
        <p className="mb-6 h-16 flex items-center">
          <TypedText
            texts={typedTexts}
            className="text-xl sm:text-2xl text-blue-200 font-semibold"
          />
        </p>
      </div>
      <div className="flex justify-center lg:justify-end order-1 lg:order-2 lg:-ml-16 xl:-ml-24">
        <ProfileCard
          name={profile.short_name}
          title={profile.title}
          handle={profile.handle}
          status={profile.status}
          contactText={profile.contact_button_text}
          avatar={profile.hero_image}
          contactHref="#contact"
          enableTilt={false}
        />
      </div>
    </section>
  );
};

export default Hero;
