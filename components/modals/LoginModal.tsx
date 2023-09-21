import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react"; // Import the signIn function from next-auth/react
import toast from "react-hot-toast";

import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
  // Custom hooks to manage the state of the login and register modals
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  // State variables to hold user input and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission (login)
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // Use the signIn function to attempt user login with credentials
      await signIn("credentials", {
        email,
        password,
      });

      toast.success("Logged in");

      loginModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

  // Function to toggle between login and registration modals
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  // JSX content for the modal's body (input fields)
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        disabled={isLoading}
      />
    </div>
  );

  // JSX content for the modal's footer (registration link)
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using X?{" "}
        <span
          onClick={onToggle}
          className="text-gray-200 cursor-pointer hover:underline"
        >
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );

  // Render the modal component with the defined content and callbacks
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
