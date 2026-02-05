import clsx from "clsx";

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size,
  centered = false,
  fullHeight = false,
  className,
}) => (
  <div
    className={clsx(
      {
        "flex items-center justify-center": centered,
        "min-h-screen": fullHeight,
        "pt-3 text-center": !centered && !fullHeight,
      },
      className,
    )}
  >
    <div
      className={clsx(
        "inline-block animate-spin rounded-full border-solid border-current border-t-transparent text-blue-500",
        size === "sm" ? "h-4 w-4 border-2" : "h-8 w-8 border-4",
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

interface LoadingSpinnerProps {
  size?: "sm";
  color?: string;
  variant?: string;
  centered?: boolean;
  fullHeight?: boolean;
  className?: string;
}

export default LoadingSpinner;
