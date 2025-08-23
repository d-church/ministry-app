import { CAvatar } from "@coreui/react";
import type { User } from "../../services/UserService";

const UserAvatar = ({
  user,
  size = "md",
  className = "",
}: {
  user: User;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) => {
  const getSizeInPixels = (size: "sm" | "md" | "lg" | "xl") => {
    const sizeMap: Record<"sm" | "md" | "lg" | "xl", number> = {
      sm: 32,
      md: 64,
      lg: 96,
      xl: 128,
    };
    return sizeMap[size];
  };

  const avatarSrc =
    user.photo ||
    getAvatarUrl(`${user.first_name} ${user.last_name}`.trim(), getSizeInPixels(size));

  return <CAvatar src={avatarSrc} size={size} className={className} />;
};

const getAvatarUrl = (name: string, sizeInPx: number = 128) => {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=F59E42&color=fff&size=${sizeInPx}`;
};

export default UserAvatar;
