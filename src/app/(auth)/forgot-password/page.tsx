"use client";
import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { forgotPassword, type ActionState } from "@/lib/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const initial: ActionState = {};

export default function ForgotPasswordPage() {
  const [state, action] = useActionState(forgotPassword, initial);
  
  const [hasEntered, setHasEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHasEntered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.4;
      videoRef.current.play();
    }
  };

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-black pt-12 md:pt-16">
      
      {/* Video de Fondo: ARTEMIS */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          hasEntered ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/videos/artemis-x.mp4" type="video/mp4" />
      </video>

      {/* Overlay sutil */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent transition-opacity duration-1000 ${
          hasEntered ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* 🚪 PANTALLA DE ENTRADA */}
      {!hasEntered && (
        <div className="relative z-20 flex min-h-[70vh] w-full flex-col items-center justify-center px-6">
          <h1 className="mb-2 text-5xl font-bold tracking-[0.3em] text-white md:text-7xl">
            ORBITAL
          </h1>
          <p className="mb-12 text-sm uppercase tracking-[0.5em] text-blue-400">
            Recuperación de Acceso
          </p>
          
          <button
            onClick={handleEnter}
            className="group relative flex items-center gap-3 rounded-full border-2 border-white/30 bg-black/40 px-10 py-4 text-white backdrop-blur-md transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/20 hover:scale-105 animate-pulse"
          >
            <span className="text-sm font-semibold uppercase tracking-widest">
              Iniciar Protocolo
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="mt-6 text-xs text-gray-500">
            Presiona para activar el audio y continuar
          </p>
        </div>
      )}

      {/* 📝 FORMULARIO DE RECUPERACIÓN */}
      {hasEntered && (
        <div className="relative z-10 w-full max-w-sm p-6 animate-[fadeInUp_0.8s_ease-out]">
          <h1 className="mb-2 text-center text-3xl font-bold text-white drop-shadow-lg">
            Recuperar contraseña
          </h1>
          <p className="mb-6 text-center text-sm text-gray-300">
            Te enviaremos un enlace a tu correo
          </p>

          <form action={action} className="space-y-4" noValidate>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Correo"
                required
                autoComplete="email"
                className="w-full rounded border border-white/20 bg-black/50 p-3 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-500 focus:outline-none transition"
              />
              {state.fieldErrors?.email && (
                <p className="mt-1 text-sm text-red-400">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            {state.error && (
              <p role="alert" className="text-sm text-red-400">
                {state.error}
              </p>
            )}

            {state.success && (
              <p role="status" className="text-sm text-green-400">
                {state.success}
              </p>
            )}

            <SubmitButton>Enviar enlace</SubmitButton>
          </form>

          <div className="mt-6 text-center text-sm text-gray-200 drop-shadow-md">
            <Link href="/login" className="hover:text-white transition">
              <span className="underline">Volver a iniciar sesión</span>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}