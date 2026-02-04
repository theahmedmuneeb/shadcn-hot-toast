# shadcn-hot-toast

Beautiful toast notifications for React with smooth animations. Built on top of [react-hot-toast](https://react-hot-toast.com/) with [Motion](https://motion.dev/) animations.

![license](https://img.shields.io/github/license/theahmedmuneeb/shadcn-hot-toast)

## Features

- 🎨 **Beautiful Design** - Follows shadcn/ui design system
- ✨ **Smooth Animations** - Spring animations powered by Motion
- 🎯 **Multiple Types** - Success, error, info, warning, and loading states
- 🔧 **Customizable** - Full control over styling and behavior
- 📦 **Easy Installation** - One command via shadcn CLI
- 🚀 **Promise Support** - Automatic state handling for async operations

## Installation

### Using shadcn CLI (Recommended)

```bash
npx shadcn@latest add https://shadcn-hot-toast.vercel.app/r/toast.json
```

### Manual Installation

1. Install dependencies:

```bash
npm install motion react-hot-toast
```

2. Copy the component files:
   - `components/ui/toast.tsx` - UI component
   - `lib/toast.ts` - Toast logic

## Usage

### Setup

Add the `Toaster` component to your app's root layout:

```tsx
// app/layout.tsx
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
}
```

### Basic Usage

```tsx
import { toast } from "@/lib/toast";

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
const loadingId = toast.loading("Saving...");
// Later dismiss it
toast.dismiss(loadingId);
```

### Promise Toast

Handle async operations with automatic state transitions:

```tsx
import { toast } from "@/lib/toast";

const saveData = async () => {
  await toast.promise(fetch("/api/save", { method: "POST" }), {
    loading: "Saving...",
    success: "Data saved successfully!",
    error: "Failed to save data",
  });
};
```

### Toaster Options

```tsx
<Toaster
  position="top-right" // Toast position
  visibleToasts={3} // Maximum visible toasts
  dismissable={true} // Show dismiss button
  toastOptions={{
    duration: 4000, // Default duration
    className: "custom-toast", // Custom class
  }}
/>
```

## API Reference

### `toast`

| Method                                       | Description                            |
| -------------------------------------------- | -------------------------------------- |
| `toast(message, options?)`                   | Show a default toast                   |
| `toast.success(message, options?)`           | Show a success toast with green icon   |
| `toast.error(message, options?)`             | Show an error toast with red icon      |
| `toast.info(message, options?)`              | Show an info toast with blue icon      |
| `toast.warning(message, options?)`           | Show a warning toast with yellow icon  |
| `toast.loading(message, options?)`           | Show a loading toast with spinner      |
| `toast.dismiss(toastId?)`                    | Dismiss a specific toast or all toasts |
| `toast.promise(promise, messages, options?)` | Handle promise states                  |

### `Toaster` Props

| Prop            | Type      | Default        | Description                      |
| --------------- | --------- | -------------- | -------------------------------- |
| `position`      | `string`  | `"top-center"` | Toast position on screen         |
| `visibleToasts` | `number`  | `undefined`    | Maximum number of visible toasts |
| `dismissable`   | `boolean` | `true`         | Show dismiss button on toasts    |
| `toastOptions`  | `object`  | `{}`           | Default options for all toasts   |

### Toast Options

| Option      | Type        | Description                      |
| ----------- | ----------- | -------------------------------- |
| `id`        | `string`    | Unique identifier for the toast  |
| `duration`  | `number`    | Duration in milliseconds         |
| `position`  | `string`    | Override position for this toast |
| `className` | `string`    | Custom CSS class                 |
| `icon`      | `ReactNode` | Custom icon                      |

## Customization

### Custom Styling

The component uses shadcn/ui CSS variables by default:

```css
/* Override in your globals.css */
.custom-toast {
  --toast-bg: hsl(var(--popover));
  --toast-color: hsl(var(--popover-foreground));
  --toast-border: hsl(var(--border));
}
```

### Custom Icons

You can pass custom icons to any toast:

```tsx
toast.success("Saved!", {
  icon: <CustomIcon />,
});
```

## Dependencies

- [react-hot-toast](https://react-hot-toast.com/) - Core toast functionality
- [motion](https://motion.dev/) - Smooth animations

## License

MIT © Ahmed Muneeb
