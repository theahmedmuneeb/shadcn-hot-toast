"use client";

import React, { useEffect } from "react";
import {
  toast as hotToast,
  Toaster as HotToaster,
  useToasterStore as useHotToasterStore,
  ToastBar as HotToastBar,
  type ToasterProps as HotToasterProps,
} from "react-hot-toast";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type ToasterProps = HotToasterProps & {
  visibleToasts?: number;
  dismissable?: boolean;
};

export function Toaster({
  visibleToasts,
  dismissable = true,
  ...props
}: ToasterProps) {
  const { toasts } = useHotToasterStore();

  useEffect(() => {
    if (visibleToasts === undefined) return;
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= visibleToasts)
      .forEach((t) => hotToast.dismiss(t.id));
  }, [toasts, visibleToasts]);

  return (
    <HotToaster
      {...props}
      toastOptions={{
        ...props.toastOptions,
        className:
          props.toastOptions?.className ??
          "bg-popover! text-popover-foreground! border!",
      }}
    >
      {(t) => (
        <HotToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && dismissable && (
                <button
                  className="ml-1 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => hotToast.dismiss(t.id)}
                  aria-label="Dismiss"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </>
          )}
        </HotToastBar>
      )}
    </HotToaster>
  );
}

// Icons
const SuccessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M382-221.91 135.91-468l75.66-75.65L382-373.22l366.43-366.43L824.09-664z"></path>
  </svg>
);

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M480-673.22q-38.65 0-65.83-27.17Q387-727.57 387-766.22t27.17-65.82q27.18-27.18 65.83-27.18t65.83 27.18Q573-804.87 573-766.22t-27.17 65.83q-27.18 27.17-65.83 27.17m-73 572.44v-492.44h146v492.44z"></path>
  </svg>
);

const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M427-391.52v-386h106v386zm0 209.04v-106h106v106z"></path>
  </svg>
);

const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M256-181.91 181.91-256l224-224-224-224L256-778.09l224 224 224-224L778.09-704l-224 224 224 224L704-181.91l-224-224z"></path>
  </svg>
);

const LoadingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M480-46q-90 0-168.97-34.08-78.97-34.07-137.92-93.03-58.96-58.95-93.03-137.92Q46-390 46-480q0-90.14 34.06-168.88 34.07-78.74 93-137.93Q232-846 311-880t169-34q26 0 44.5 18.5T543-851t-18.5 44.5T480-788q-128.01 0-218.01 89.99-89.99 89.99-89.99 218T261.99-262t218 90T698-261.99q90-90 90-218.01 0-26 18.5-44.5T851-543t44.5 18.5T914-480q0 90-34.06 169.01-34.07 79.01-93 138Q728-114 649.14-80T480-46"></path>
  </svg>
);

// Icon Component
export const IconComponent = ({
  type,
}: {
  type: "success" | "info" | "warning" | "error" | "loading";
}) => {
  const variants = {
    success: {
      className: "bg-green-500",
      icon: SuccessIcon,
    },
    info: {
      className: "bg-blue-500",
      icon: InfoIcon,
    },
    warning: {
      className: "bg-yellow-500",
      icon: WarningIcon,
    },
    error: {
      className: "bg-destructive",
      icon: ErrorIcon,
    },
    loading: {
      className: "animate-spin",
      icon: LoadingIcon,
    },
  } as const;

  return (
    <motion.div
      className={cn(
        "flex items-center justify-center rounded-full size-5",
        variants[type].className,
      )}
      {...(type !== "loading" && {
        initial: { scale: 0 },
        animate: { scale: 1 },
        exit: { scale: 0 },
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      })}
    >
      {variants[type].icon({
        className: "size-4 text-white",
      })}
    </motion.div>
  );
};
