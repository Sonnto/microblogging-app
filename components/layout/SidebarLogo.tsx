import { useRouter } from "next/router";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-gray-300 hover:bg-opacity-10 cursor-pointer transition"
    >
      <div className="text-3xl text-gray-300">𝕏</div>
    </div>
  );
};

export default SidebarLogo;
