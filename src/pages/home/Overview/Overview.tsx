import { useState } from "react";
import { CBadge, CAvatar } from "@coreui/react";
import {
  FaRegEnvelope,
  FaUsers,
  FaBell,
  FaCalendar,
  FaPeopleGroup,
  FaNewspaper,
} from "react-icons/fa6";

const userProfile = {
  name: "Олена Коваленко",
  email: "worship@d.church",
  role: "Прославлення",
  about:
    "Керує командою прославлення, організовує репетиції та концерти. Любить співати та навчати інших.",
  avatar: "https://ui-avatars.com/api/?name=Олена+Коваленко&background=F59E42&color=fff&size=128",
};

const userMinistries = [
  { id: 1, name: "Прославлення", status: "active" },
  { id: 2, name: "Молитовна група", status: "pending" },
];

const friends = [
  {
    id: 1,
    name: "Іван Петренко",
    avatar: "https://ui-avatars.com/api/?name=Іван+Петренко&background=0D8ABC&color=fff&size=64",
  },
  {
    id: 2,
    name: "Марія Іваненко",
    avatar: "https://ui-avatars.com/api/?name=Марія+Іваненко&background=F59E42&color=fff&size=64",
  },
  {
    id: 3,
    name: "Андрій Мельник",
    avatar: "https://ui-avatars.com/api/?name=Андрій+Мельник&background=4ADE80&color=fff&size=64",
  },
];

const events = [
  { id: 1, title: "Репетиція прославлення", date: "2024-07-10", place: "Церква, головний зал" },
  { id: 2, title: "Молитовне зібрання", date: "2024-07-12", place: "Мала зала" },
];

const news = [
  { id: 1, title: "Запуск нового дитячого табору", date: "2024-06-20" },
  { id: 2, title: "Збір коштів на ремонт", date: "2024-06-15" },
];

const Overview = () => {
  const [notifications, setNotifications] = useState([{ id: 1, ministry: "Молитовна група" }]);

  const handleAccept = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // Тут можна додати логіку додавання служіння до userMinistries
  };

  const handleDecline = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <CBadge color="success" className="text-xs px-2 py-1">
        Активний
      </CBadge>
    ) : (
      <CBadge color="warning" className="text-xs px-2 py-1">
        Очікує підтвердження
      </CBadge>
    );
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Сповіщення */}
      {notifications.length > 0 && (
        <div className="mb-6">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 shadow-sm mb-2"
            >
              <div className="flex items-center gap-2">
                <FaBell className="text-blue-400 text-lg" />
                <span className="text-blue-900 font-medium">
                  Вас запросили в "{notif.ministry}"
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded transition"
                  onClick={() => handleAccept(notif.id)}
                >
                  Прийняти
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold px-3 py-1 rounded transition border border-gray-300"
                  onClick={() => handleDecline(notif.id)}
                >
                  Відхилити
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Профіль та служіння */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 flex flex-col items-center md:items-start bg-white rounded-xl shadow p-6 border border-gray-100">
          <CAvatar src={userProfile.avatar} size="xl" className="mb-3 shadow" />
          <h4 className="mb-1 text-xl font-bold text-gray-900">{userProfile.name}</h4>
          <div className="mb-2 text-gray-500 flex items-center gap-1">
            <FaRegEnvelope className="text-base" />
            <span className="text-sm">{userProfile.email}</span>
          </div>
          <span className="inline-block mb-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
            {userProfile.role}
          </span>
          <p className="mt-2 text-gray-700 text-sm text-center md:text-left">{userProfile.about}</p>
        </div>
        <div className="flex-[2]">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-4">
              <FaUsers className="text-gray-400 text-lg" />
              <span className="font-semibold text-gray-800 text-lg">Мої служіння</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userMinistries.map((ministry) => (
                <div
                  key={ministry.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col gap-2 shadow-sm"
                >
                  <span className="font-medium text-gray-700">{ministry.name}</span>
                  {getStatusBadge(ministry.status)}
                </div>
              ))}
              {userMinistries.length === 0 && (
                <div className="text-gray-400">Ви ще не приєдналися до жодного служіння.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Мої події */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
        <div className="flex items-center gap-2 mb-4">
                          <FaCalendar className="text-gray-400 text-lg" />
          <span className="font-semibold text-gray-800 text-lg">Мої події</span>
        </div>
        <ul className="divide-y divide-gray-100">
          {events.map((event) => (
            <li
              key={event.id}
              className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <span className="font-medium text-gray-700">{event.title}</span>
                <span className="ml-2 text-xs text-gray-400">{event.place}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 sm:mt-0">{event.date}</span>
            </li>
          ))}
          {events.length === 0 && <li className="text-gray-400">Немає запланованих подій.</li>}
        </ul>
      </div>

      {/* Мої друзі */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100 mb-8">
        <div className="flex items-center gap-2 mb-4">
                          <FaPeopleGroup className="text-gray-400 text-lg" />
          <span className="font-semibold text-gray-800 text-lg">Мої друзі</span>
        </div>
        <div className="flex gap-4 flex-wrap">
          {friends.map((friend) => (
            <div key={friend.id} className="flex flex-col items-center">
              <CAvatar src={friend.avatar} size="lg" className="mb-1 shadow" />
              <span className="text-xs text-gray-700 font-medium">{friend.name}</span>
            </div>
          ))}
          {friends.length === 0 && <div className="text-gray-400">У вас ще немає друзів.</div>}
        </div>
      </div>

      {/* Останні новини церкви */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <FaNewspaper className="text-gray-400 text-lg" />
          <span className="font-semibold text-gray-800 text-lg">Останні новини церкви</span>
        </div>
        <ul className="divide-y divide-gray-100">
          {news.map((item) => (
            <li key={item.id} className="py-2 flex items-center justify-between">
              <span className="text-gray-700 font-medium">{item.title}</span>
              <span className="text-xs text-gray-500">{item.date}</span>
            </li>
          ))}
          {news.length === 0 && <li className="text-gray-400">Новин поки немає.</li>}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
