import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { FaDoorOpen } from "react-icons/fa6";

import AccountStore from "src/store/AccountStore";
import { UserAvatar } from "src/components/common";
import LanguageSwitcher from "../LanguageSwitcher";
import config from "./config";
import SidebarNav from "./SidebarNav";

const Sidebar = observer(() => {
  const { t } = useTranslation("common");
  const user = AccountStore.data;

  return (
    <aside className="w-[279px] bg-gray-50 border-r border-gray-200 flex flex-col h-screen flex-shrink-0">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="md" />
          <div className="min-w-0 mt-3 ml-3">
            <p className="text-sm font-semibold text-gray-900 truncate mb-0">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => AccountStore.logout()}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          aria-label={t("header.logout")}
        >
          <FaDoorOpen className="w-5 h-5" />
        </button>
      </div>

      <SidebarNav items={config} />

      <div className="p-4 border-t border-gray-200">
        <LanguageSwitcher />
      </div>
    </aside>
  );
});

export default Sidebar;
