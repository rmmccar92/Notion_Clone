"use client";

import type { FC } from "react";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/Toolbar";
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";
interface DocumentPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentPage: FC<DocumentPageProps> = ({ params }) => {
  const Editor = useMemo(() => {
    return dynamic(() => import("@/components/Editor"), { ssr: false });
  }, []);

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.updateDoc);
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content: content,
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3kl lg:max-w-4xl ms-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="w-[50%] h-14" />
            <Skeleton className="w-[80%] h-4" />
            <Skeleton className="w-[40%] h-4" />
            <Skeleton className="w-[60%] h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }
  return (
    <div className="pb-40">
      {/* <div className="h-[35dvh]" /> */}
      <Cover preview url={document?.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentPage;
