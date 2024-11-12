import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "primary:outline":
          "border border-primary bg-background text-primary hover:bg-accent hover:text-accent-foreground",
        secondary:
          "border border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "border border-transparent hover:bg-accent hover:text-accent-foreground",
        link: "border border-transparent text-primary underline-offset-4 hover:underline",
        "destructive:outline":
          "border border-red-500 text-red-500 hover:bg-red-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  formAction?: any;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Spinner = () => (
  <span
    className="animate-spin inline-block w-4 h-4 border-[1px] border-current border-t-transparent text-current rounded-full"
    aria-hidden="true"
  />
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      icon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && "opacity-70 cursor-not-allowed"
        )}
        disabled={loading || props.disabled}
        ref={ref}
        {...props}
      >
        <span className="flex items-center gap-x-2">
          {loading && <Spinner />}
          {!loading && icon}
          {children}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };