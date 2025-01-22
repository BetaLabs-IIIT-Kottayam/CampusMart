import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 w-[14rem]">
            <ShoppingBag
              className={`h-8 w-8 ${
                isScrolled ? "text-green-600" : "text-white"
              }`}
            />
            <span
              className={`text-2xl font-bold ${
                isScrolled ? "text-green-600" : "text-white"
              }`}
            >
              campusMart
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {["Home", "About", "How It Works", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className={`font-medium hover:text-green-400 transition-colors ${
                      isScrolled ? "text-gray-700" : "text-white"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex gap-3">
            <a
              href="#"
              className={`bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors ${
                isScrolled ? "shadow-md" : ""
              }`}
            >
              Sign Up
            </a>
            <a
              href="#"
              className={`bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors ${
                isScrolled ? "shadow-md" : ""
              }`}
            >
              Log In
            </a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${isScrolled ? "text-green-600" : "text-white"}`}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {["Home", "About", "How It Works", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block font-medium text-gray-700 hover:text-green-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="block bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 transition-colors text-center"
                >
                  Sign Up
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
