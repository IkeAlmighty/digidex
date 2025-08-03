import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuContent = useRef();

  useEffect(() => {
    if (isOpen) {
      menuContent.current.style.display = "inherit";
    } else {
      setTimeout(() => {
        menuContent.current.style.display = "none";
      }, 300);
    }
  }, [isOpen]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl p-2 focus:outline-none lg:hidden"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Content */}
        <div
          className={`absolute top-full right-0 mt-2 border bg-white shadow-md rounded p-4 w-70 z-50 text-xl transition-all duration-300 ease-in-out ${
            isOpen ? `translate-x-2` : `translate-x-80`
          } lg:hidden`}
          ref={menuContent}
        >
          {children}
        </div>

        {/* Inline Menu for large screens */}
        <div className="hidden lg:flex gap-4">{children}</div>
      </div>
    </div>
  );
}
