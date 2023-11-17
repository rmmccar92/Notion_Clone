"use client";

import type { FC } from "react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import { Title } from "./Title";
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar: FC<NavbarProps> = ({ isCollapsed, onResetWidth }) => {
  const params = useParams();
  const doc = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (doc === null) {
    return null;
  }

  if (doc === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full h-4 flex items-center gap-x-4">
        <Title.Skeleton />
      </nav>
    );
  }
  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={doc} />
        </div>
      </nav>
    </>
  );
};
