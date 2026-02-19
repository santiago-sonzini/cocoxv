

import SaveTheDate, { Event_SaveTheDate } from "@/components/invitacion/save-the-date/default";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Save The Date",
  description: "Guarda la fecha de nuestro evento",
  openGraph: {
    title: "Save The Date",
  description: "Guarda la fecha de nuestro evento",
    url: "https://castellanoph.com/invitacion/taniayrodrigo",
    siteName: "Invitacion cena fin de año",
    images: [{ url: "/portada.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Save The Date",
    description: "Guarda la fecha de nuestro evento",
    card: "summary_large_image",
    images: [{ url: "/portada.jpg", width: 1200, height: 630 }],
  },
};
export default function SaveTheDatePage() {
  const event: Event_SaveTheDate = {
    hero_link: {
      desktop: "https://wnziihzxwhwxfwxkkulo.supabase.co/storage/v1/object/public/eventos/coco/PORTADA%20COCO%20II.mp4",
      mobile: "https://wnziihzxwhwxfwxkkulo.supabase.co/storage/v1/object/public/eventos/coco/PORTADA%20VERTICAL%20COCO.mp4",
    },
    targetDate: "2026-11-21T24:00:00.000Z",
    countdown_title: "Pronto más información",
    
  };

  return <SaveTheDate event={event} />;
}
