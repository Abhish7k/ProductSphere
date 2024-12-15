import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CarouselComponent = ({ productImages }: { productImages: string[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="w-full overflow-hidden md:overflow-visible"
    >
      <CarouselContent>
        {Array.from({
          length: productImages.length,
        }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-[80%] lg:basis-2/3 2xl:basis-1/3"
          >
            <Image
              priority
              src={productImages[index]}
              alt="product-image"
              width={500}
              height={500}
              className="rounded-md object-cover border border-gray-200 h-60 w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
};

export default CarouselComponent;
