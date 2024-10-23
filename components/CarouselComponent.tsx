import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CarouselComponent = ({ productImages }: { productImages: string[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full overflow-hidden md:overflow-visible"
    >
      <CarouselContent>
        {Array.from({
          length: productImages.length,
        }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/2">
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
