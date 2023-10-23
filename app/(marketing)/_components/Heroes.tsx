import type { FC } from "react";
import Image from "next/image";

interface HeroesProps {}

const Heroes: FC<HeroesProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-content-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[300px] md:w-[400px] md:h-[400px]">
          <Image
            className="object-contain dark:hidden"
            src="/documents.png"
            alt="Documents"
            fill
          />
          <Image
            className="hidden dark:block object-contain"
            src="/documents-dark.png"
            alt="Documents"
            fill
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <Image
            className="object-contain dark:hidden"
            src="/reading.png"
            alt="Reading"
            fill
          />
          <Image
            className="hidden dark:block object-contain "
            src="/reading-dark.png"
            alt="Reading"
            fill
          />
        </div>
      </div>
    </div>
  );
};
export default Heroes;
