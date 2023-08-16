import { useRouter } from "next/router";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-10 cursor-pointer transition"
    >
      <p className="text-3xl text-gray-300">𝕏</p>
    </div>
  );
};

export default SidebarLogo;
