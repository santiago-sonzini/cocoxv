"use client";

import Image from "next/image";
import { MapsGalleryDialog } from "./image-zoom";

export const EventoInfo = () => {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold italic">
            El lugar que elegimos
          </h2>

          <p className="text-sm font-sans text-gray-600">
            Estancias Laguna Escondida
          </p>

          {/* Logo */}
          <div className="flex justify-center py-2">
            <Image
              src="https://vwcvvwhlyaarcfmsqhvo.supabase.co/storage/v1/object/public/eventos/taniayrodrigo/logoubicacion.jpeg"
              alt="Logo Estancia Laguna Escondida"
              width={220}
              height={160}
              className="h-auto w-40 md:w-44 object-contain"
            />
          </div>

          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            A continuación te dejamos las referencias para llegar con más facilidad al lugar.
          </p>

          <a
            href="https://maps.app.goo.gl/anSnp67T4mRHuerL9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition"
          >
            Ver ubicación en Google Maps
          </a>
        </div>

        {/* Maps */}
        <MapsGalleryDialog/>

      </div>
    </section>
  );
};
