import { CSpinner } from "@coreui/react";
import cn from "clsx";

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  color = "primary",
  variant = "grow",
  centered = false,
  fullHeight = false,
  className,
}) => (
  <div
    className={cn(
      {
        "d-flex align-items-center justify-content-center": centered,
        "min-vh-100": fullHeight,
        "pt-3 text-center": !centered && !fullHeight,
      },
      className,
    )}
  >
    <CSpinner color={color} variant={variant} size={size} />
  </div>
);

interface LoadingSpinnerProps {
  size?: "sm";
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  variant?: "border" | "grow";
  centered?: boolean;
  fullHeight?: boolean;
  className?: string;
}

export default LoadingSpinner;
