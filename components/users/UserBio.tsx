import { format } from "date-fns";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useMemo } from "react";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  // Fetch current user data using the custom 'useCurrentUser' hook.
  const { data: currentUser } = useCurrentUser();

  // Fetch user data for the specified 'userId' using the custom 'useUser' hook.
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();

  // Calculate the 'createdAt' date in a formatted manner using 'useMemo'.
  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {/* Conditionally render "Edit Profile" button for the current user or "Follow" button for others */}
        {currentUser?.id === userId ? (
          <Button secondary label="Edit Profile" onClick={editModal.onOpen} />
        ) : (
          <Button secondary label="Follow" onClick={() => {}} />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          {/* Display the user's name */}
          <p className="text-gray-200 text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          {/* Display the user's username */}
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          {/* Display the user's bio */}
          <p className="text-gray-200">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            {/* Display the user's join date */}
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            {/* Display the number of users followed by the current user */}
            <p className="text-gray-200">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            {/* Display the number of followers for the user */}
            <p className="text-gray-200">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
