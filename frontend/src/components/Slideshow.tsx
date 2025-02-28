<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";

function useSwipe(api: CarouselApi | null) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isManual, setIsManual] = useState(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoScroll = () => {
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    setIsManual(true);
    manualTimeoutRef.current = setTimeout(() => setIsManual(false), 5000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    resetAutoScroll();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || !api) return;

    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > 100) {
      api.scrollNext();
    } else if (swipeDistance < -100) {
      api.scrollPrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd, isManual };
}

function SlideshowItem({
  Image,
  caption: quote,
  alt,
}: {
  Image: string;
  caption: string;
  alt: string;
}) {
  return (
    <CarouselItem className="pl-0">
      <div className="relative h-full w-full">
        <img src={Image} alt={alt} className="h-full w-full object-cover" />
        <div className="absolute  left-0 bottom-0 h-[50%] w-full bg-gradient-to-t from-black to-black/0 z-10"></div>
        <h1 className="absolute lg:text-2xl text-xl pr-10 text-white left-10 bottom-20 z-20">
          &quot;{quote}&quot;
        </h1>
      </div>
    </CarouselItem>
  );
}

export default function Slideshow({
  className,
  items,
  autoScrollInterval = 5000,
  header,
}: {
  items: { Image: string; caption: string; alt: string }[];
  autoScrollInterval?: number | false;
  header?: string;
  className?: ClassNameValue;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const { handleTouchStart, handleTouchMove, handleTouchEnd, isManual } = useSwipe(api);

  useEffect(() => {
    if (!api || isManual || autoScrollInterval === false) return;

    const interval = setInterval(() => api.scrollNext(), autoScrollInterval);
    return () => clearInterval(interval);
  }, [api, isManual, autoScrollInterval]);

  return (
    <Carousel
      className={cn("", className)}
      opts={{
        loop: true,
      }}
      setApi={setApi}
    >
      {header && (
        <h1 className="absolute top-10 left-10 z-50 text-5xl text-background font-black font-stretch-ultra-condensed">
          {header}
        </h1>
      )}
      <div className="absolute  left-0 top-0 h-[50%] w-full bg-gradient-to-b from-black/50 to-black/0 z-10"></div>
      <CarouselContent
        className="ml-0 w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item) => (
          <SlideshowItem key={item.alt} Image={item.Image} caption={item.caption} alt={item.alt} />
        ))}
      </CarouselContent>
    </Carousel>
  );
=======
import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
  } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import disp1 from "@assets/disp1.jpg";
import disp2 from "@assets/disp2.jpg";
import disp3 from "@assets/disp3.jpg";
import disp4 from "@assets/disp4.jpg";
import { useSwipe } from "@/hooks/useSwipe";

const items = [
  {
    Image: disp1,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp1",
  },
  {
    Image: disp2,
    quote: "Loewm ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp2",
  },
  {
    Image: disp3,
    quote: "Loewm ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp3",
  },
  {
    Image: disp4,
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp4",
  },
];

function SlideshowItem({Image, quote, alt} : {Image: string, quote: string, alt: string}) {
  return (
      <CarouselItem className="pl-0">
        <div className="relative h-full w-full">
          <img src={Image} alt={alt} className="h-full w-full object-cover"/>
          <div className="absolute  left-0 bottom-0 h-[50%] w-full bg-gradient-to-t from-black to-black/0 z-10"></div>
          <h1 className="absolute lg:text-2xl text-xl pr-10 text-white left-10 bottom-20 z-20">&quot;{quote}&quot;</h1>
        </div>
      </CarouselItem>
  )
}

export default function Slideshow({className} : {className: string}) {
  const [api, setApi] = useState<CarouselApi>()
  const { handleTouchStart, handleTouchMove, handleTouchEnd, isManual } = useSwipe(api);

  useEffect(() => {
    if (!api || isManual) return;

    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api, isManual]);

  return (
    <Carousel className={cn("", className)} 
        opts={{
            loop: true,
        }}
        setApi={setApi}
        >
        <CarouselContent className="ml-0 w-full h-full" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {items.map((item) => (
             <SlideshowItem key={item.alt} Image={item.Image} quote={item.quote} alt={item.alt}/>
          ))}
        </CarouselContent>
    </Carousel>
  )
>>>>>>> 7cbbbe6 (Added slideshow to the login page)
}
