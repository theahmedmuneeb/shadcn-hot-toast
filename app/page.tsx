"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

// Environment variables
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "https://your-domain.com";
const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || "your-username/shadcn-hot-toast";
const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME || "Your Name";

export default function DocsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({
    code,
    id,
    language = "tsx",
  }: {
    code: string;
    id: string;
    language?: string;
  }) => (
    <div className="relative group">
      <pre className="bg-card border rounded-lg p-4 overflow-x-auto text-sm">
        <code className="text-muted-foreground">{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute top-2 right-2 p-2 rounded-md bg-muted/50 hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      >
        {copied === id ? (
          <svg
            className="size-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );

  const DemoButton = ({
    children,
    onClick,
    variant = "default",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "success" | "error" | "warning" | "info" | "loading";
  }) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      success: "bg-green-500 text-white hover:bg-green-600",
      error: "bg-red-500 text-white hover:bg-red-600",
      warning: "bg-yellow-500 text-black hover:bg-yellow-600",
      info: "bg-blue-500 text-white hover:bg-blue-600",
      loading: "bg-muted text-muted-foreground hover:bg-muted/80",
    };

    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <svg
                className="size-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold">shadcn-hot-toast</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Beautiful toast notifications for React with smooth animations.
            Built on top of{" "}
            <a
              href="https://react-hot-toast.com"
              className="text-primary underline underline-offset-4"
            >
              react-hot-toast
            </a>{" "}
            with{" "}
            <a
              href="https://motion.dev"
              className="text-primary underline underline-offset-4"
            >
              Motion
            </a>{" "}
            animations.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://github.com/${GITHUB_REPO}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border hover:bg-muted transition-colors"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="#installation"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "🎨",
                title: "Beautiful Design",
                desc: "Follows shadcn/ui design system",
              },
              {
                icon: "✨",
                title: "Smooth Animations",
                desc: "Spring animations powered by Motion",
              },
              {
                icon: "🎯",
                title: "Multiple Types",
                desc: "Success, error, info, warning, loading",
              },
              {
                icon: "🔧",
                title: "Customizable",
                desc: "Full control over styling",
              },
              {
                icon: "📦",
                title: "Easy Installation",
                desc: "One command via shadcn CLI",
              },
              {
                icon: "🚀",
                title: "Promise Support",
                desc: "Auto state handling for async",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-4 rounded-lg border bg-card"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Live Demo</h2>
          <div className="p-6 rounded-lg border bg-card">
            <p className="text-muted-foreground mb-4">
              Click the buttons below to see the toasts in action:
            </p>
            <div className="flex flex-wrap gap-3">
              <DemoButton onClick={() => toast("Hello World! 👋")}>
                Default
              </DemoButton>
              <DemoButton
                variant="success"
                onClick={() => toast.success("Successfully saved!")}
              >
                Success
              </DemoButton>
              <DemoButton
                variant="error"
                onClick={() => toast.error("Something went wrong")}
              >
                Error
              </DemoButton>
              <DemoButton
                variant="warning"
                onClick={() => toast.warning("Please be careful")}
              >
                Warning
              </DemoButton>
              <DemoButton
                variant="info"
                onClick={() => toast.info("Did you know?")}
              >
                Info
              </DemoButton>
              <DemoButton
                variant="loading"
                onClick={() => {
                  const id = toast.loading("Loading...");
                  setTimeout(() => {
                    toast.dismiss(id);
                  }, 2000);
                }}
              >
                Loading
              </DemoButton>
              <DemoButton
                onClick={() => {
                  toast.promise(
                    new Promise((resolve) => setTimeout(resolve, 2000)),
                    {
                      loading: "Saving...",
                      success: "Data saved!",
                      error: "Failed to save",
                    },
                  );
                }}
              >
                Promise
              </DemoButton>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="mb-16 scroll-mt-8">
          <h2 className="text-2xl font-bold mb-6">Installation</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="size-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                  1
                </span>
                Using shadcn CLI (Recommended)
              </h3>
              <CodeBlock
                id="install-cli"
                code={`npx shadcn@latest add ${DOMAIN}/r/toast.json`}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or manually
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="size-6 rounded-full bg-muted text-muted-foreground text-sm flex items-center justify-center">
                  1
                </span>
                Install dependencies
              </h3>
              <CodeBlock
                id="install-deps"
                code="npm install motion react-hot-toast"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="size-6 rounded-full bg-muted text-muted-foreground text-sm flex items-center justify-center">
                  2
                </span>
                Copy the component files
              </h3>
              <p className="text-muted-foreground mb-2">
                Copy{" "}
                <a
                  href={`https://github.com/${GITHUB_REPO}/blob/main/components/ui/toast.tsx`}
                  className="px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 transition-colors underline underline-offset-2"
                >
                  components/ui/toast.tsx
                </a>{" "}
                and{" "}
                <a
                  href={`https://github.com/${GITHUB_REPO}/blob/main/lib/toast.ts`}
                  className="px-1.5 py-0.5 rounded bg-muted hover:bg-muted/80 transition-colors underline underline-offset-2"
                >
                  lib/toast.ts
                </a>{" "}
                to your project.
              </p>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Usage</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">1. Add the Toaster</h3>
              <p className="text-muted-foreground mb-3">
                Add the Toaster component to your app&apos;s root layout:
              </p>
              <CodeBlock
                id="usage-toaster"
                code={`// app/layout.tsx
import { Toaster } from "@/components/ui/toast";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">2. Show toasts</h3>
              <p className="text-muted-foreground mb-3">
                Import and use the toast function anywhere in your app:
              </p>
              <CodeBlock
                id="usage-toast"
                code={`import { toast } from "@/lib/toast";

// Simple toast
toast("Hello World!");

// Success toast
toast.success("Successfully saved!");

// Error toast
toast.error("Something went wrong");

// Info toast
toast.info("Did you know?");

// Warning toast
toast.warning("Please be careful");

// Loading toast
const id = toast.loading("Saving...");
toast.dismiss(id); // Dismiss later`}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">3. Promise toast</h3>
              <p className="text-muted-foreground mb-3">
                Handle async operations with automatic state transitions:
              </p>
              <CodeBlock
                id="usage-promise"
                code={`import { toast } from "@/lib/toast";

const saveData = async () => {
  await toast.promise(
    fetch("/api/save", { method: "POST" }),
    {
      loading: "Saving...",
      success: "Data saved successfully!",
      error: "Failed to save data",
    }
  );
};`}
              />
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">API Reference</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">toast methods</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Method
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      ["toast(message, options?)", "Show a default toast"],
                      [
                        "toast.success(message, options?)",
                        "Show a success toast with green icon",
                      ],
                      [
                        "toast.error(message, options?)",
                        "Show an error toast with red icon",
                      ],
                      [
                        "toast.info(message, options?)",
                        "Show an info toast with blue icon",
                      ],
                      [
                        "toast.warning(message, options?)",
                        "Show a warning toast with yellow icon",
                      ],
                      [
                        "toast.loading(message, options?)",
                        "Show a loading toast with spinner",
                      ],
                      [
                        "toast.dismiss(toastId?)",
                        "Dismiss a specific toast or all toasts",
                      ],
                      [
                        "toast.promise(promise, msgs, options?)",
                        "Handle promise states automatically",
                      ],
                    ].map(([method, desc]) => (
                      <tr key={method} className="border-b">
                        <td className="py-3 px-4">
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            {method}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Toaster props</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Prop</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">
                        Default
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      [
                        "position",
                        "string",
                        '"top-center"',
                        "Toast position on screen",
                      ],
                      [
                        "visibleToasts",
                        "number",
                        "undefined",
                        "Max visible toasts",
                      ],
                      ["dismissable", "boolean", "true", "Show dismiss button"],
                      [
                        "toastOptions",
                        "object",
                        "{}",
                        "Default options for all toasts",
                      ],
                    ].map(([prop, type, def, desc]) => (
                      <tr key={prop} className="border-b">
                        <td className="py-3 px-4">
                          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                            {prop}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {type}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {def}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Toaster Options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Toaster Options</h2>
          <CodeBlock
            id="toaster-options"
            code={`<Toaster
  position="top-right"       // Toast position
  visibleToasts={3}          // Maximum visible toasts
  dismissable={true}         // Show dismiss button
  toastOptions={{
    duration: 4000,          // Default duration
    className: "custom-toast" // Custom class
  }}
/>`}
          />
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 text-center text-muted-foreground">
          <p>
            Built with ❤️ using{" "}
            <a
              href="https://react-hot-toast.com"
              className="underline underline-offset-4"
            >
              react-hot-toast
            </a>{" "}
            and{" "}
            <a
              href="https://motion.dev"
              className="underline underline-offset-4"
            >
              Motion
            </a>
          </p>
          <p className="mt-2 text-sm">MIT © {AUTHOR_NAME}</p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://antigravity.google/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors text-sm"
            >
              <img
                src="https://antigravity.google/assets/image/antigravity-logo.png"
                alt="Antigravity"
                className="size-4"
              />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-medium">
                Made with Antigravity
              </span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
