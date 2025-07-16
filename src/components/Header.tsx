import Link from "next/link";
import { SearchIcon, UploadIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="p-4 md:p-6 text-white bg-[#131313]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          V-Platform
        </Link>
        <div className="hidden md:flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#2a2a2a] text-white border border-gray-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/upload" className="hidden md:flex items-center gap-2 hover:text-gray-300">
            <UploadIcon />
            Upload
          </Link>
          <Link href="/auth" className="hover:text-gray-300">
            Login
          </Link>
          <Link
            href="/auth"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
