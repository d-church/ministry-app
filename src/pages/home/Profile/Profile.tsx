import UserProfileCard from "./UserProfileCard";
import MinistriesCard from "./MinistriesCard";

const Profile = () => {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <UserProfileCard />
        <MinistriesCard />
      </div>
    </div>
  );
};

export default Profile;
