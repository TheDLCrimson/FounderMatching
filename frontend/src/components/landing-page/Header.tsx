import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          className="text-2xl font-bold text-[#35426E] cursor-pointer"
        >
          FounderMatching
        </motion.div>

        {/* Navigation */}
        <div className="space-x-8 text-gray-800 font-cabin hidden md:flex">
          {["Home", "Features", "How It Works", "About", "Contact"].map(
            (item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-lg cursor-pointer transition-colors duration-300 hover:text-blue-500"
              >
                {item}
              </motion.a>
            )
          )}
        </div>
        
         {/* CTA Button */}
        <div className="flex flex-row space-x-4 ml-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:block bg-[#0087C3] text-white px-6 py-2 rounded-lg shadow-lg"
          >
            Sign Up
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:block bg-[#0087C3] text-white px-6 py-2 rounded-lg shadow-lg"
          >
            Sign In
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
