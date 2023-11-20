"use client";
import type { FC } from "react";
import type { Id } from "@/convex/_generated/dataModel";

import { toast } from "sonner";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

import { ConfirmModal } from "@/components/modals/ConfirmModal";

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner: FC<BannerProps> = ({ documentId }) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = async () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing document...",
      success: "Document removed",
      error: "Failed to remove document",
    });
    router.push("/documents");
  };

  const onRestore = async () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored",
      error: "Failed to restore document",
    });
  };
  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the trash</p>
      <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal "
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal "
        >
          Permanently Delete Page
        </Button>
      </ConfirmModal>
    </div>
  );
};
