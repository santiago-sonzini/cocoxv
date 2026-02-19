
import "@/app/globals.css";


import { Hero } from "./hero";
import {  EventoInfo } from "./event-info";
import { Countdown } from "./countdown";

import { Metadata, ResolvingMetadata } from "next";

import CoupleSection from "./circlescouple";
import DresscodeSection from "./dresscode";
import { FormSection } from "./form";
import Gifts from "./gifts";
import { Footer } from "./footer";

type Props = {
  params: Promise<{ name: string }>;
};

export const metadata: Metadata = {
  title: "Te invitamos a nuestra boda",
  description: "Confirma tu asistencia.",
  openGraph: {
    title: "Te invitamos a nuestra boda",
    description: "Confirma tu asistencia.",
    url: "https://castellanoph.com/invitacion/taniayrodrigo",
    siteName: "Invitacion cena fin de año",
    images: [{ url: "/portada.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Te invitamos a nuestra boda",
    description: "Confirma tu asistencia.",
    card: "summary_large_image",
    images: [{ url: "/portada.jpg", width: 1200, height: 630 }],
  },
};

async function InvitacionTaniaYRodrigo({event}: any) {
 

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold">Evento no disponible</h1>
        <p className="text-muted-foreground p-2 text-center">
          El evento no está disponible
        </p>
      </div>
    );
  }

  return (
    <>

      <main>
        <div  className="bg-[#000000] relative z-10">
          <Hero event={event} />
        </div>
        <Countdown  targetDate="2023-01-31T00:00:00.000Z" title="Pronto máss información" event={event} />

        <EventoInfo  />
         <DresscodeSection/>
        {/* <EventLoveStory/> */}
        <FormSection
          event={event}
          confirmDate={new Date(event.confirm_date ?? "")}
          event_id={event.id}
        />
        <Gifts/>
       
        <Footer event={event} />
      </main>
    </>
  );
}

export default InvitacionTaniaYRodrigo;