"use client";

import { type FC, useState, useEffect } from "react";

import SettingsModal from "@/components/modals/SettingsModal";
import { CoverImageModal } from "@/components/modals/CoverImageModal";

export const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
