import { RocketIcon, EditIcon, PlusIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const HowItWorksSection = () => {
  return (
    <div className="flex flex-col items-center justify-center px-10 xl:px-[15%] my-40">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium transition-all">
          Three steps to launch <br /> your dream product
        </h2>

        <p className="text-muted-foreground mt-6">
          Share your creation with the world <br /> in just 3 simple steps
        </p>
      </div>

      <MainSection />
    </div>
  );
};

function MainSection() {
  const features = [
    {
      title: "Add Your Product",
      description:
        "Create an account and submit your product with all the essential details.",
      icon: PlusIcon,
    },
    {
      title: "Customize Your Listing",
      description:
        "Enhance your product page with descriptions, images, and links to showcase its features.",
      icon: EditIcon,
    },
    {
      title: "Launch",
      description:
        "Share your product with the community and watch it gain traction.",
      icon: RocketIcon,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 pt-20 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && " dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}

      <div className="group-hover/feature:-translate-y-1 transform-gpu transition-all duration-300 flex flex-col w-full">
        <div
          className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400
      "
        >
          <Icon
            strokeWidth="1.5"
            className=" w-8 h-8 group-hover/feature:scale-90 transition-all will-change-transform"
          />
        </div>

        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />

          <span className=" transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
          {description}
        </p>
      </div>
    </div>
  );
};
