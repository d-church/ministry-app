import { useMemo } from "react";
import clsx from "clsx";
import type { User } from "../../../services/UserService";
import "./style.scss";

const UserAvatar = ({
  user,
  size = "md",
  className = "",
}: {
  user: User;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) => {
  const initials = useMemo(() => {
    const fullName = `${user.first_name} ${user.last_name}`;
    const words = fullName.split(' ').filter(word => word.length > 0);

    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`;
    } else if (words.length === 1) {
      return words[0].slice(0, 2);
    }

    return "U";
  }, [user.first_name, user.last_name]);

  return (
    <div className={clsx("user-avatar", size, className)}>
      {user.photo ? (
        <img src={user.photo} alt={`${user.first_name} ${user.last_name}`} />
      ) : (
        initials
      )}
    </div>
  );
};

export default UserAvatar;
