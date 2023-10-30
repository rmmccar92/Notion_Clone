"use client";

import type { FC } from "react";
import Image from "next/image";

import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface DocumentsPageProps {}

const Documents: FC<DocumentsPageProps> = ({}) => {
  const { user } = useUser();
  // Documents comes from documents.tsx in the convex folder
  const create = useMutation(api.documents.create);
  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating Note... ⚙️",
      success: "Note created! 🥳",
      error: "Failed to create Note 😭",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Empty"
        width={300}
        height={300}
        className="hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Space!
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};
export default Documents;
