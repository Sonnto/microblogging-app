import useUser from "@/hooks/useUser"; // Import the custom hook for fetching user data.
import { useCallback } from "react";
import { useRouter } from "next/router"; // Import the router hook for navigation.
import Image from "next/image";

// Define the AvatarProps interface to specify the prop types.
interface AvatarProps {
  userId: string; // User ID for fetching user data.
  isLarge?: boolean; // Optional prop to control the size of the avatar.
  hasBorder?: boolean; // Optional prop to add a border to the avatar.
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  // Fetch user data using the useUser custom hook and assign it to the 'fetchedUser' variable.
  const { data: fetchedUser } = useUser(userId);

  // Access the router object to enable navigation.
  const router = useRouter();

  // Define an onClick handler to navigate to the user's profile page when clicked.
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation(); // Prevent the event from propagating further.

      const url = `/users/${userId}`; // Generate the profile URL.

      router.push(url); // Navigate to the user's profile page.
    },
    [router, userId]
  );

  // Render the avatar component.
  return (
    <div
      className={`
        ${
          hasBorder ? "border-4 border-black" : ""
        } // Add a border if 'hasBorder' prop is true.
        ${
          isLarge ? "w-32" : "w-12"
        } // Set the width based on the 'isLarge' prop.
        ${
          isLarge ? "h-32" : "h-12"
        } // Set the height based on the 'isLarge' prop.
        rounded-full hover:opacity-90 transition cursor-pointer relative
      `}
    >
      {/* Display the user's profile image. */}
      <Image
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
        onClick={onClick} // Attach the onClick handler.
        src={fetchedUser?.profileImage || `/images/placeholder.png`} // Use the profile image URL or a placeholder if not available.
      />
    </div>
  );
};

export default Avatar;
