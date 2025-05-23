import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row items-center justify-between space-x-4 py-4 px-6 md:px-10">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold cursor-pointer"
        >
          <span className="text-[#C83538]">Found</span>
          <span className="text-[#2E548A]">erMatching</span>
        </motion.div>

        {/* Navigation */}
        <div className="space-x-8 text-gray-800 font-cabin hidden md:flex">
          {["Home", "Features", "How It Works", "About", "Contact"].map(
            (item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-lg cursor-pointer transition-colors duration-300 hover:text-[#0087C3]"
              >
                {item}
              </motion.a>
            )
          )}
        </div>

        {/* Button */}
        <div className="flex flex-row space-x-4 ml-auto">
          <Button
            size="sm"
            variant="outline"
            className="hidden md:block px-6 py-2 rounded-lg shadow-lg"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            Sign In
          </Button>
          <Button
            size="sm"
            variant="default"
            className=" bg-[#2E548A] hidden md:block px-6 py-2 rounded-lg shadow-lg hover:bg-[#2E548A]/90"
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
