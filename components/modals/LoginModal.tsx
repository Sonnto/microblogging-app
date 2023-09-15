import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import { useCallback, useState } from "react";

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

  // Function to switch to the registration modal
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    // Close the login modal and open the registration modal
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  // Function to handle form submission (login)
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO: Add login logic here
      // send a POST request to your authentication API endpoint
      // with the user's email and password and handle the response

      // After a successful login, you can set user authentication state and close the modal

      // Also, consider storing authentication tokens securely
      // and handling user state in your application context

      // For now, simulate a successful login for demonstration purposes

      setTimeout(() => {
        // Simulating a successful login after 2 seconds
        loginModal.onClose();
      }, 2000);
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal]);

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
