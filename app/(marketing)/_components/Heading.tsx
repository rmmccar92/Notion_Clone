"use client";
import { useState } from "react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { ArrowRight } from "lucide-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

interface HeadingProps {}

const Heading: FC<HeadingProps> = ({}) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
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
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter
            <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
          </Link>
        </Button>
      )}

      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Login<ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
export default Heading;
