export const StarCircleIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
    width={size}
    height={size}
    className={className}
  >
    <circle cx="200" cy="200" r="180" fill="transparent" />
    <g transform="translate(200, 200) rotate(7)">
      <line x1="0" y1="0" x2="0" y2="-100" stroke="white" strokeWidth="45" />
      <line x1="0" y1="0" x2="95" y2="-31" stroke="white" strokeWidth="45" />
      <line x1="0" y1="0" x2="58" y2="81" stroke="white" strokeWidth="45" />
      <line x1="0" y1="0" x2="-58" y2="81" stroke="white" strokeWidth="45" />
      <line x1="0" y1="0" x2="-95" y2="-31" stroke="white" strokeWidth="45" />
    </g>
  </svg>
);

export const TriangleUp = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M12 7 L4 17 L20 17 Z" fill="#202020" />
  </svg>
);

export const TriangleDown = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path d="M12 17 L4 7 L20 7 Z" fill="#202020" />
  </svg>
);
