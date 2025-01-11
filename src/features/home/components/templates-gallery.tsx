import { TEMPLATES } from "@/features/home/core/constants";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TemplatesGallery = () => {
  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-y-4 py-6 px-16">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {TEMPLATES.map(({ id, label, imageUrl }) => (
              <CarouselItem
                key={id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div className="flex flex-col gap-y-2.5 aspect-[3/4]">
                  <button
                    className="size-full flex flex-col justify-center items-center rounded-sm transition border bg-white hover:bg-blue-50 hover:border-blue-500"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <p className="text-sm font-medium truncate">{label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplatesGallery;
