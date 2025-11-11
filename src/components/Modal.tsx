"use client";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({ open, onClose, title, children, className }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
			className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8"
      role="dialog"
      aria-modal="true"
    >
			<div
				className="absolute inset-0 bg-black/60"
				onClick={onClose}
				aria-hidden="true"
			/>
      <div
				className={`relative z-10 w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl md:p-16 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
				{title && (
					<div className="mb-6 flex items-center justify-center">
						<h2 className="text-3xl font-bold text-amber-500">{title}</h2>					 
					</div>
				)}
        {children}
      </div>
    </div>
  );
}
