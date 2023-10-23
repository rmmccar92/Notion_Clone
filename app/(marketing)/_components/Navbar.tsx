"use client";

import type { FC } from "react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { ModeToggle } from "@/components/theme-toggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const scroll = useScrollTop();
  return (
    <div
      className={cn(
        "dark:bg-[#1F1F1F] z-50 bg-background fixed top-0 flex items-center w-full p-6",
        scroll && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end  flex w-full justify-between items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
};
export default Navbar;
