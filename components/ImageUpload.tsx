import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";

// Define a TypeScript interface to specify the props that the ImageUpload component expects.
interface DropzoneProps {
  // Function to handle changes when an image is uploaded.
  onChange: (base64: string) => void;
  // Label to display when no image is uploaded.
  label: string;
  // Optional initial value for the uploaded image.
  value?: string;
  // Flag to disable the image upload functionality.
  disabled?: boolean;
}

// Create a React functional component called ImageUpload that receives props as parameters.
const ImageUpload: React.FC<DropzoneProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  // Initialize the 'base64' state variable with the provided value (if any).
  const [base64, setBase64] = useState(value);

  // Create a memoized 'handleChange' function that invokes the 'onChange' callback.
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  // Create a memoized 'handleDrop' function that handles the uploaded image.
  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      // When the image file is loaded, update 'base64' and trigger 'handleChange'.
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      // Read the selected file as a data URL.
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  // Set up the configuration for the 'useDropzone' hook.
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1, // Allow only one file to be uploaded.
    onDrop: handleDrop, // Specify the function to handle the dropped file.
    disabled, // Determine whether the image upload is disabled.
    accept: {
      "image/jpeg": [],
      "image/png": [],
    }, // Accept only JPEG and PNG image files.
  });

  return (
    <div
      // Spread the 'getRootProps' onto a div element to handle drag-and-drop behavior.
      {...getRootProps({
        className:
          "w-full p-4 text-neutral-400 text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      {/* Bind the 'getInputProps' to an input element to enable file selection. */}
      <input {...getInputProps()} />

      {base64 ? (
        // If an image is uploaded, display the uploaded image using the 'Image' component.
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        // If no image is uploaded, display the provided 'label'.
        <p className="text-neutral-400">{label}</p>
      )}
    </div>
  );
};

// Export the ImageUpload component as the default export.
export default ImageUpload;
