"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

import { cn } from "./utils";

type ModalContextValue = { onClose?: () => void };
const ModalContext = React.createContext<ModalContextValue>({});

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

function Modal({ open, onOpenChange, children }: ModalProps) {
  const mounted = useMounted();

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!mounted) return null;

  return createPortal(
    <ModalContext.Provider value={{ onClose: () => onOpenChange(false) }}>
      <AnimatePresence>{open ? children : null}</AnimatePresence>
    </ModalContext.Provider>,
    document.body,
  );
}

type ModalOverlayProps = React.ComponentProps<typeof motion.div> & {
  onClose?: () => void;
};

function ModalOverlay({ className, onClose, ...props }: ModalOverlayProps) {
  return (
    <motion.div
      data-slot="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "fixed inset-0 z-50 bg-black/65 backdrop-blur-[4px]",
        className,
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      {...props}
    />
  );
}

export type ModalContentProps = React.ComponentProps<typeof motion.div>;

function ModalContent({ className, children, ...props }: ModalContentProps) {
  const { onClose } = React.useContext(ModalContext);

  return (
    <>
      <ModalOverlay onClose={onClose} />
      <motion.div
        data-slot="modal-content"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, type: "spring", stiffness: 280, damping: 28 }}
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[min(640px,95vw)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] focus:outline-none",
          className,
        )}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
}

export { Modal, ModalContent };

