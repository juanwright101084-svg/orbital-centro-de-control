import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Countdown } from "@/components/Countdown";

export const metadata: Metadata = { title: "Dashboard" };

// Datos de demostración
const NEXT_LAUNCH = "2026-12-15T14:30:00Z";

const telemetry = [
  { label: "Altitud", value: "408", unit: "km" },
  { label: "Velocidad", value: "27 600", unit: "km/h" },
  { label: "Inclinación", value: "51,6", unit: "°" },
  { label: "Periodo orbital", value: "92", unit: "min" },
];

const missions = [
  {
    name: "ORB-7",
    vehicle: "Carga pesada",
    target: "Órbita baja",
    status: "Programada",
  },
  {
    name: "ORB-6",
    vehicle: "Tripulada",
    target: "Estación orbital",
    status: "En órbita",
  },
  {
    name: "ORB-5",
    vehicle: "Carga pesada",
    target: "Órbita geoestacionaria",
    status: "Completada",
  },
  {
    name: "ORB-4",
    vehicle: "Satélites",
    target: "Órbita polar",
    status: "Completada",
  },
];

const statusClass: Record<string, string> = {
  Programada: "text-sky-300",
  "En órbita": "text-emerald-300",
  Completada: "text-white/50",
};

const sectionTitle = "text-sm uppercase tracking-[0.25em] text-white/60";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login"); // defensa en profundidad

  const operator = (user.email ?? "operador").split("@")[0];
  const registered = new Date(user.created_at).toLocaleDateString("es-SV", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="relative w-full flex-1 px-5 pb-16 pt-28 sm:px-10 lg:px-24">
      <div
        aria-hidden
        className="stars pointer-events-none absolute inset-x-0 top-0 h-[60vh] opacity-60"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-white/20 pb-6">
          <div className="min-w-0">
            <p className="text-sm text-white/60">Operador conectado</p>
            <h1 className="mt-1 break-all text-3xl font-light uppercase tracking-[0.18em] sm:text-4xl">
              {operator}
            </h1>
          </div>
          <p className="flex items-center gap-2 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Sesión activa
          </p>
        </header>

        <section className="border-b border-white/20 py-10 sm:py-14">
          <h2 className={sectionTitle}>Próxima misión</h2>
          <p className="mt-2 text-2xl font-light uppercase tracking-[0.15em]">
            ORB-7, órbita baja
          </p>
          <div className="mt-8">
            <Countdown target={NEXT_LAUNCH} />
          </div>
        </section>

        <section className="py-10">
          <h2 className={`mb-5 ${sectionTitle}`}>Telemetría</h2>
          <div className="grid grid-cols-2 border-l border-t border-white/20 lg:grid-cols-4">
            {telemetry.map((t) => (
              <div
                key={t.label}
                className="border-b border-r border-white/20 p-5 sm:p-6"
              >
                <div className="text-sm text-white/60">{t.label}</div>
                <div className="mt-2 text-3xl font-light tabular-nums sm:text-4xl">
                  {t.value}
                  <span className="ml-1 text-base text-white/50">
                    {t.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-6">
          <h2 className={`mb-5 ${sectionTitle}`}>Misiones</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/30 text-xs uppercase tracking-[0.2em] text-white/50">
                  <th className="py-3 pr-4 font-medium">Misión</th>
                  <th className="py-3 pr-4 font-medium">Vehículo</th>
                  <th className="py-3 pr-4 font-medium">Destino</th>
                  <th className="py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {missions.map((m) => (
                  <tr key={m.name} className="border-b border-white/10">
                    <td className="py-4 pr-4 font-medium tracking-[0.1em]">
                      {m.name}
                    </td>
                    <td className="py-4 pr-4 text-white/70">{m.vehicle}</td>
                    <td className="py-4 pr-4 text-white/70">{m.target}</td>
                    <td className={`py-4 ${statusClass[m.status]}`}>
                      {m.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-10">
          <h2 className={`mb-5 ${sectionTitle}`}>Tu cuenta</h2>
          <dl className="grid border-l border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="min-w-0 border-b border-r border-white/20 p-5">
              <dt className="text-sm text-white/60">Correo</dt>
              <dd className="mt-1 break-all">{user.email}</dd>
            </div>
            <div className="min-w-0 border-b border-r border-white/20 p-5">
              <dt className="text-sm text-white/60">ID de usuario</dt>
              <dd className="mt-1 break-all text-sm">{user.id}</dd>
            </div>
            <div className="min-w-0 border-b border-r border-white/20 p-5">
              <dt className="text-sm text-white/60">Registro</dt>
              <dd className="mt-1">{registered}</dd>
            </div>
            <div className="min-w-0 border-b border-r border-white/20 p-5">
              <dt className="text-sm text-white/60">
                Almacenamiento de sesión
              </dt>
              <dd className="mt-1">Cookie httpOnly</dd>
            </div>
          </dl>

          {/* ⬇️ ENLACE A CONFIGURACIÓN DE CUENTA ⬇️ */}
          <div className="mt-6 flex justify-end">
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white/80 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-white"
            >
              <span>⚙️</span>
              <span>Cambiar contraseña</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        <p className="text-sm text-white/40">
          Las misiones y la telemetría son datos de demostración.
        </p>
      </div>
    </main>
  );
}