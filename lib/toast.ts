import {
  toast as hotToast,
  type DefaultToastOptions as DefaultHotToastOptions,
  type Renderable as RenderableHotToast,
  type ToastOptions as ToastOptionsHotToast,
  type ValueOrFunction as ValueOrFunctionHotToast,
} from "react-hot-toast";
import { IconComponent } from "@/components/ui/toast";

export const toast = Object.assign(
  (message: string, opts?: ToastOptionsHotToast) => hotToast(message, opts),
  {
    success: (message: string, options?: ToastOptionsHotToast) =>
      hotToast(message, {
        ...options,
        icon: IconComponent({ type: "success" }),
      }),
    error: (message: string, options?: ToastOptionsHotToast) =>
      hotToast(message, {
        ...options,
        icon: IconComponent({ type: "error" }),
      }),
    info: (message: string, options?: ToastOptionsHotToast) =>
      hotToast(message, {
        ...options,
        icon: IconComponent({ type: "info" }),
      }),
    warning: (message: string, options?: ToastOptionsHotToast) =>
      hotToast(message, {
        ...options,
        icon: IconComponent({ type: "warning" }),
      }),
    loading: (message: string, options?: ToastOptionsHotToast) =>
      hotToast(message, {
        duration: Infinity,
        ...options,
        icon: IconComponent({ type: "loading" }),
      }),
    dismiss: (toastId?: string | undefined, toasterId?: string | undefined) =>
      hotToast.dismiss(toastId, toasterId),
    promise: <T>(
      promise: Promise<T>,
      msgs: {
        loading: RenderableHotToast;
        success?: ValueOrFunctionHotToast<RenderableHotToast, T> | undefined;
        error?: ValueOrFunctionHotToast<RenderableHotToast, any>;
      },
      opts?: DefaultHotToastOptions,
    ) =>
      hotToast.promise(promise, msgs, {
        ...opts,
        success: {
          icon: IconComponent({ type: "success" }),
          ...opts?.success,
        },
        error: {
          icon: IconComponent({ type: "error" }),
          ...opts?.error,
        },
        loading: {
          icon: IconComponent({ type: "loading" }),
          ...opts?.loading,
        },
      }),
  },
);
