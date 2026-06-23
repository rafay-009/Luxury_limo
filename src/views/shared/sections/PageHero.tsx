interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.16),transparent_24rem)]" aria-hidden />
      <div className="container relative z-10 py-20">
        <p className="text-sm font-normal uppercase text-cyan-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{description}</p>
      </div>
    </section>
  );
}
