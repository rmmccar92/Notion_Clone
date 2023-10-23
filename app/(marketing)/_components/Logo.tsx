import type { FC } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

// cn is a utility to create dynamic classNames
import { cn } from "@/lib/utils";
interface LogoProps {}

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

const Logo: FC<LogoProps> = ({}) => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.svg"
        alt="Rotion"
        width={40}
        height={40}
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        alt="Rotion"
        width={40}
        height={40}
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Rotion</p>
    </div>
  );
};
export default Logo;
