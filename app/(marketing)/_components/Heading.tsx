"use client";
import { useState } from "react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeadingProps {}

const Heading: FC<HeadingProps> = ({}) => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Rotion</span>!
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Rotion is the workspace where <br /> you can write, plan, collaborate,
        better.
      </h3>
      <Button>
        Enter
        <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
      </Button>
    </div>
  );
};
export default Heading;
