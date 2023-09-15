import useUsers from "@/hooks/useUsers"; // Import the custom hook for fetching user data.
import Avatar from "../Avatar"; // Import the Avatar component for displaying user avatars.

const FollowBar = () => {
  // Fetch user data using the useUsers custom hook and assign it to the 'users' variable.
  const { data: users = [] } = useUsers();

  // If there are no users to display, return null to render nothing.
  if (users.length === 0) {
    return null;
  }

  // Render a section for displaying user suggestions to follow.
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-gray-200 text-xl font-semibold">Who to Follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {/* Map through the 'users' array and render user suggestions. */}
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              {/* Display the user's avatar using the Avatar component. */}
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                {/* Display the user's name. */}
                <p className="text-gray-200 font-semi-bold text-sm">
                  {user.name}
                </p>
                {/* Display the user's username. */}
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
