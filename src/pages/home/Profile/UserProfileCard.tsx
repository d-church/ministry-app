import { FaRegEnvelope } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import AccountStore from "../../../store/AccountStore";
import { UserAvatar } from "../../../components/common";

const UserProfileCard = observer(() => {
  const { t } = useTranslation("pages/profile");

  return (
    <div className="flex-1 flex flex-col items-center md:items-start bg-white rounded-xl shadow p-6 border border-gray-100">
      <UserAvatar user={AccountStore.data} size="xl" className="mb-3 shadow" />
      <h4 className="mb-1 text-xl font-bold text-gray-900">
        {`${AccountStore.data.first_name} ${AccountStore.data.last_name}`.trim()}
      </h4>
      <div className="mb-2 text-gray-500 flex items-center gap-1">
        <FaRegEnvelope className="text-base" />
        <span className="text-sm">{AccountStore.data.email}</span>
      </div>
      <span className="inline-block mb-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
        {t(`ministries.names.${AccountStore.data.role}`)}
      </span>
      <p className="mt-2 text-gray-700 text-sm text-center md:text-left">Граю волейбол ногою...</p>
    </div>
  );
});

export default UserProfileCard;
