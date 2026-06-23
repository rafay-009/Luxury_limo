import Image from "next/image";
import { SITE_CONFIG } from "@/constants";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function OurStory() {
  const story = SITE_CONFIG.about.story;

  return (
    <section className="bg-slate-950 py-24">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-normal uppercase text-cyan-300">Our Story</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">{story.headline}</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">{story.body}</p>
          <div className="mt-8 inline-flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-center text-sm font-semibold text-cyan-200">
            EST. {SITE_CONFIG.company.founded}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
          <Image src={story.image} alt={story.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export function ValuesGrid() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="container">
        <SectionHeading centered title="Values Behind Every Ride" highlight="Values" description="Operational habits that make premium service feel effortless." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SITE_CONFIG.about.values.map((value) => (
            <article key={value.title} className="glass rounded-2xl p-6">
              <Icon name={value.icon} className="h-8 w-8 text-cyan-300" />
              <h3 className="mt-5 text-2xl font-semibold text-white">{value.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="container">
        <SectionHeading centered title="Meet the Team" highlight="Team" description="The operators and concierge leads behind the ride experience." />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {SITE_CONFIG.about.team.map((member) => (
            <article key={member.id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
              <div className="relative aspect-[4/3]">
                <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-cyan-300">{member.role}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{member.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.credentials.map((credential) => (
                    <span key={credential} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationsMarquee() {
  return (
    <section className="bg-slate-950 pb-24">
      <div className="container rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Trusted by Industry. Certified for Excellence.</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {SITE_CONFIG.about.certifications.map((cert) => (
            <div key={cert.name} className="rounded-xl border border-white/10 bg-slate-950/70 px-4 py-5 text-sm font-normal uppercase text-slate-300">
              {cert.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
