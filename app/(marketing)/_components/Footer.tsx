import type { FC } from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="md:ml-auto flex w-full justify-between md:justify-end items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Policies
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
export default Footer;
