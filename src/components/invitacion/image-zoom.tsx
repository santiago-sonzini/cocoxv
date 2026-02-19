"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  {
    src: "https://vwcvvwhlyaarcfmsqhvo.supabase.co/storage/v1/object/public/eventos/taniayrodrigo/MAPAS-01.png",
    alt: "Mapa de acceso 1",
  },
  {
    src: "https://vwcvvwhlyaarcfmsqhvo.supabase.co/storage/v1/object/public/eventos/taniayrodrigo/MAPAS-02.png",
    alt: "Mapa de acceso 2",
  },
];

export function MapsGalleryDialog() {
  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  const handleOpen = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <>
      {/* Grid original */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((img, index) => (
          <button
            key={img.src}
            onClick={() => handleOpen(index)}
            className="cursor-zoom-in"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={900}
              height={600}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>

      {/* Dialog con carousel */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl p-0 bg-black/95 border-none">
          <Carousel
            opts={{ startIndex }}
            className="relative w-full"
          >
            <CarouselContent>
              {images.map((img) => (
                <CarouselItem
                  key={img.src}
                  className="flex items-center justify-center"
                >
                  <div className="overflow-auto max-h-[80vh] max-w-full p-4">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1600}
                      height={1200}
                      className="w-auto h-auto max-w-full transition-transform duration-300 scale-150 cursor-zoom-in"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
