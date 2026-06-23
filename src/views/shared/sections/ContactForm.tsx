"use client";

import { useMemo, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

type ContactValues = Record<string, string | number | undefined>;

export function ContactForm() {
  const { contact, company } = SITE_CONFIG;
  const [sent, setSent] = useState(false);
  const schema = useMemo(() => {
    const shape = Object.fromEntries(
      contact.form.fields.map((field) => [
        field.name,
        field.required ? z.coerce.string().min(1, `${field.label} is required`) : z.coerce.string().optional(),
      ])
    );
    return z.object(shape);
  }, [contact.form.fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({ resolver: zodResolver(schema) as unknown as Resolver<ContactValues> });

  async function onSubmit(values: ContactValues) {
    await fetch(contact.form.apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSent(true);
  }

  return (
    <section className="bg-slate-950 py-24">
      <div className="container grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white">Request a Quote</h2>
          {sent ? (
            <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-emerald-100">
              <CheckCircle2 className="mb-4 h-9 w-9 text-emerald-300" />
              <p className="text-xl font-bold">{contact.form.successMessage}</p>
            </div>
          ) : (
            <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
              {contact.form.fields.map((field) => (
                <label key={field.name} className={field.type === "textarea" ? "grid gap-1.5 md:col-span-2" : "grid gap-1.5"}>
                  <span className="text-xs font-normal uppercase text-slate-400">{field.label}</span>
                  {field.type === "select" ? (
                    <select className="focus-ring h-12 rounded-lg border border-white/10 bg-slate-950/70 px-3 text-white" {...register(field.name)}>
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea className="focus-ring min-h-32 rounded-lg border border-white/10 bg-slate-950/70 px-3 py-3 text-white" placeholder={field.placeholder} {...register(field.name)} />
                  ) : (
                    <input className="focus-ring h-12 rounded-lg border border-white/10 bg-slate-950/70 px-3 text-white" placeholder={field.placeholder} type={field.type} {...register(field.name)} />
                  )}
                  {errors[field.name] ? <span className="text-xs text-red-300">{String(errors[field.name]?.message)}</span> : null}
                </label>
              ))}
              <button className="cyan-cta focus-ring rounded-lg px-5 py-3 font-bold text-slate-950 md:col-span-2" style={{ background: "var(--gradient-cta)" }} type="submit">
                {contact.form.submitLabel}
              </button>
            </form>
          )}
        </div>
        <aside className="grid content-start gap-5">
          <div className="glass rounded-2xl p-6">
            <p className="text-sm font-normal uppercase text-cyan-300">Concierge</p>
            <a className="mt-4 flex items-center gap-3 text-2xl font-bold text-white" href={`tel:${company.phone.replace(/[^\d+]/g, "")}`}>
              <Phone className="h-6 w-6 text-cyan-300" />
              {company.phone}
            </a>
            <p className="mt-4 text-slate-300">{contact.info.phoneCTA}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-sm font-normal uppercase text-cyan-300">Hours</p>
            {company.hours.map((hour) => (
              <p key={hour.days} className="mt-3 text-slate-300">
                <span className="font-semibold text-white">{hour.days}:</span> {hour.time}
              </p>
            ))}
            <p className="mt-4 text-slate-400">{company.email}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
