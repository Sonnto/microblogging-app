import { useRouter } from "next/router";
import { BsPencilSquare } from "react-icons/bs";

const SidebarPostButton = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-venter justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <BsPencilSquare size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-4 rounded-full bg-sky-500 hover:bg-opacity-90 transition">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Create Post
        </p>
      </div>
    </div>
  );
};

export default SidebarPostButton;
