import ResponsiveImage from "./ResponsiveImage";

// A staff ID badge hanging from a lanyard. It swings into place once on load
// and tilts slightly on hover, pivoting from the clip.
const IdBadge = ({ profile, current }) => (
  <figure className="id-badge group relative w-[15rem] sm:w-[16.5rem]">
    {/* Lanyard strap and metal clip */}
    <div aria-hidden="true" className="mx-auto flex w-12 flex-col items-center">
      <div className="relative h-20 w-7 overflow-hidden rounded-b-sm bg-zinc-800 [mask-image:linear-gradient(to_bottom,transparent,black_55%)] sm:h-24">
        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-accent-strong/80" />
        <span className="absolute inset-y-0 left-1.5 w-px bg-white/10" />
        <span className="absolute inset-y-0 right-1.5 w-px bg-white/10" />
      </div>
      <div className="-mt-1 h-5 w-12 rounded-md bg-gradient-to-b from-zinc-300 to-zinc-500 shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_2px_4px_rgb(0_0_0/0.5)]" />
      <div className="-mt-1 h-2.5 w-1.5 rounded-b bg-zinc-500" />
    </div>

    <div className="relative -mt-0.5 overflow-hidden rounded-[1.2rem] border border-white/10 bg-zinc-900 shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_30px_60px_-24px_rgb(0_0_0/0.95)]">
      {/* Punched slot the clip goes through */}
      <span
        aria-hidden="true"
        className="absolute top-3 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#0a0a0a] shadow-[inset_0_1px_2px_rgb(0_0_0/0.9)] ring-1 ring-white/10"
      />

      <div className="px-4 pt-7 pb-2.5">
        <span className="inline-flex items-baseline text-sm font-bold tracking-tight text-white">
          nauffalrn
          <span className="ml-0.5 inline-block h-[0.14em] w-[0.6em] rounded-[1px] bg-accent-strong" aria-hidden="true" />
        </span>
      </div>

      <div className="badge-photo relative mx-3.5 aspect-[4/4.2] overflow-hidden rounded-lg ring-1 ring-white/5">
        <ResponsiveImage
          image={profile.hero_image}
          alt={profile.name}
          sizes="(min-width: 640px) 325px, 292px"
          className="absolute top-[-40%] left-1/2 h-[175%] w-auto max-w-none -translate-x-[56.5%]"
          priority
        />
      </div>

      <figcaption className="px-4 pt-3.5 pb-4">
        <p className="text-xl font-bold tracking-tight text-white">{profile.short_name}</p>
        <p className="text-sm text-zinc-300">{profile.title}</p>
        {current && (
          <p className="mt-2.5 flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {current.company}
          </p>
        )}
      </figcaption>
    </div>
  </figure>
);

export default IdBadge;
