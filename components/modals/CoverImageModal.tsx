"use client";

import { useState, type FC } from "react";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { useCoverImage } from "@/hooks/use-cover-image";

import { SingleImageDropzone } from "@/components/SingleImageDropZone";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";

interface CoverImageModalProps {}

export const CoverImageModal: FC<CoverImageModalProps> = ({}) => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const image = useCoverImage();
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const updateDoc = useMutation(api.documents.updateDoc);
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      const res = await edgestore.publicFiles.upload({
        file,
        options: { replaceTargetUrl: coverImage.url },
      });
      await updateDoc({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    image.onClose();
  };

  return (
    <Dialog open={image.isOpen} onOpenChange={image.onClose}>
      <DialogContent>
        <DialogHeader className="text-center text-lg font-semibold">
          <h2>Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
