"use client";

import type { FC } from "react";
import type { Id } from "@/convex/_generated/dataModel";
import { type LucideIcon, ChevronDown, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface ItemProps {
  onClick: () => void;
  label: string;
  icon: LucideIcon;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

export const Item = ({
  id,
  onClick,
  label,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  expanded,
  onExpand,
}: ItemProps) => {
  const router = useRouter();
  const handleExpend = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const create = useMutation(api.documents.create);
  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!id) return;

    const promise = create({
      title: "Untitled",
      parentDocument: id,
    }).then((document) => {
      if (!expanded) {
        onExpand?.();
      }
      // router.push(`/documents/${document}`);
    });
    toast.promise(promise, {
      loading: "Creating Note... ⚙️",
      success: "Note created! 🥳",
      error: "Failed to create Note 😭",
    });
  };
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
    >
      {!!id && (
        <div
          role="button"
          onClick={handleExpend}
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL +</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-dm hover:bg-neutral-30 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = ({ level }: { level?: number }) => {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
