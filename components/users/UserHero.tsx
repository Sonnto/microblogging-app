import Image from "next/image";
import useUser from "@/hooks/useUser";
import Avatar from "../Avatar";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  // Fetch user data using the custom 'useUser' hook and the 'userId'.
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      {/* User Hero Section */}
      <div className="bg-neutral-700 h-44 relative">
        {/* Display the user's cover image if available */}
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage} // Set the source of the cover image.
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }} // Apply styles to fit the image within its container.
          />
        )}

        {/* Display the user's avatar */}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />{" "}
          {/* Render the user's avatar */}
        </div>
      </div>
    </div>
  );
};

export default UserHero;
