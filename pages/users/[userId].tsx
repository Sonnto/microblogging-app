import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query; // Get the 'userId' from the URL query parameters.

  // Fetch user data using the custom 'useUser' hook and the 'userId'.
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  console.log(`Fetched User's name is: ${fetchedUser?.name}`);

  // If data is loading or fetchedUser is not available, show a loading spinner.
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="white" size={80} />
      </div>
    );
  }

  // If data is loaded, display the user's header, hero, and bio components.
  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />{" "}
      {/* Display a header with a back arrow and the user's name. */}
      <UserHero userId={userId as string} />{" "}
      {/* Display a user hero component. */}
      <UserBio userId={userId as string} />{" "}
      {/* Display a user bio component. */}
    </>
  );
};

export default UserView;
