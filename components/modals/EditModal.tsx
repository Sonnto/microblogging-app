import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import Modal from "../Modal";
import Input from "../Input";

const EditModal = () => {
  // Fetch the current user's data using a custom hook and store it in 'currentUser'
  const { data: currentUser } = useCurrentUser();

  // Fetch a custom 'mutate' function for updating user data and store it in 'mutateFetchedUser'
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);

  // Get the edit modal state and functions using a custom hook
  const editModal = useEditModal();

  // Define state variables for user information
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  // Populate the state variables with the current user's data when it changes
  useEffect(() => {
    setName(currentUser?.name);
    setUsername(currentUser?.username);
    setBio(currentUser?.bio);
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
  }, [currentUser]);

  // Define a loading state for async operations
  const [isLoading, setIsLoading] = useState(false);

  // Define a function to handle form submission
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // Send a PATCH request to update the user's data
      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      // Trigger a re-fetch of the user's data
      mutateFetchedUser();

      // Show a success toast notification
      toast.success("Updated successfully");

      // Close the edit modal
      editModal.onClose();
    } catch (error) {
      // Show an error toast notification if something goes wrong
      toast.error("Something went wrong");
    } finally {
      // Reset the loading state regardless of success or failure
      setIsLoading(false);
    }
  }, [
    name,
    username,
    bio,
    profileImage,
    coverImage,
    editModal,
    mutateFetchedUser,
  ]);

  // Define the content of the modal body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  // Render the edit modal with its title, action label, content, and event handlers
  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
