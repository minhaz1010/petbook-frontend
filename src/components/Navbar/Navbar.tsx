"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  BookOpen,
  PenTool,
  User,
  LogIn,
  LogOut,
  DollarSign,
  Shield,
  Store,
} from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import petImage from "../../../public/pet-dress.png";
import Image from "next/image";
import { oswald } from "@/config/font";
import { getSessionMetadata } from "@/services/user/user.services";
import Loading from "../Shared/Loading";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  className = "",
  icon,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? "text-green-500" : "text-gray-300"
        } hover:text-green-600 transition-all duration-300 relative group flex items-center`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-300 group-hover:w-full transition-all duration-300" />
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await getSessionMetadata();
        setRole(role as string);
      } catch (error) {
        console.error("Error fetching session metadata:", error);
      }
    };

    fetchRole();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) {
    return <Loading />
  }


  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={` overflow-x-hidden sticky top-0 z-50 transition-all ${oswald.className} duration-300 ${isScrolled ? 'bg-black/35 backdrop-blur-xl' : 'bg-transparent'
      }`} >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="overflow-hidden rounded-full">
                <Image
                  src={petImage}
                  alt="PetBook Logo"
                  className="size-10 rounded-full transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-3xl text-gray-200 transform group-hover:scale-105 transition-transform duration-300">
                PetBook
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center md:space-x-8">
            <NavLink
              href="/"
              className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
              icon={<Home size={20} />}
            >
              Home
            </NavLink>
            <NavLink
              href="/story"
              className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
              icon={<BookOpen size={20} />}
            >
              Story
            </NavLink>
            <NavLink
              href="/tips"
              className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
              icon={<BookOpen size={20} />}
            >
              Tips
            </NavLink>
            <NavLink
              href="/about"
              className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
              icon={<Store size={20} />}
            >
              About
            </NavLink>
            <NavLink
              href="/write"
              className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
              icon={<PenTool size={20} />}
            >
              Write
            </NavLink>
            {/* New Pricing Link */}
            <NavLink
              href="/pricing"
              className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
              icon={<DollarSign size={20} />}
            >
              Pricing
            </NavLink>
            {role === "ADMIN" && (
              <NavLink
                href="/admin/all-posts"
                className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
                icon={<Shield size={20} />}
              >
                Admin
              </NavLink>
            )}
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  href="/profile"
                  className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
                  icon={<User size={20} />}
                >
                  Profile
                </NavLink>
                <div className="transform hover:scale-110 transition-transform duration-200">
                  <UserButton />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink
                  href="/sign-up"
                  className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
                  icon={<LogOut size={20} />}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  href="/sign-in"
                  className="text-xl transform hover:-translate-y-0.5 transition-transform duration-200"
                  icon={<LogIn size={20} />}
                >
                  Sign In
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none transform hover:scale-110 transition-transform duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X
                  size={24}
                  className="transform rotate-0 transition-transform duration-300"
                />
              ) : (
                <Menu
                  size={24}
                  className="transform rotate-0 transition-transform duration-300"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden transform transition-all  duration-300 ease-in-out ${isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none h-16"
          }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3  shadow-lg rounded-b-lg">
          <NavLink
            href="/"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            icon={<Home size={20} />}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            href="/story"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            icon={<BookOpen size={20} />}
            onClick={closeMenu}
          >
            Story
          </NavLink>
          <NavLink
            href="/tips"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            icon={<BookOpen size={20} />}
            onClick={closeMenu}
          >
            Tips
          </NavLink>
          <NavLink
            href="/about"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            icon={<Store size={20} />}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            href="/write"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            icon={<BookOpen size={20} />}
            onClick={closeMenu}
          >
            write
          </NavLink>

          <NavLink
            href="/pricing"
            className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
            icon={<DollarSign size={20} />}
            onClick={closeMenu}
          >
            Pricing
          </NavLink>
          {role === "ADMIN" && (
            <NavLink
              href="/admin/all-posts"
              className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
              icon={<Shield size={20} />}
              onClick={closeMenu}
            >
              Admin
            </NavLink>
          )}
          {isSignedIn ? (
            <div className="space-y-1">
              <NavLink
                href="/profile"
                className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
                icon={<User size={20} />}
                onClick={closeMenu}
              >
                Profile
              </NavLink>
              <div className="px-3 py-2 transform hover:scale-105 transition-transform duration-200">
                <UserButton />
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <NavLink
                href="/sign-in"
                className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
                icon={<LogIn size={20} />}
                onClick={closeMenu}
              >
                Sign In
              </NavLink>
              <NavLink
                href="/sign-up"
                className="block px-3 py-2 rounded-md text-xl font-medium transform hover:translate-x-2 transition-transform duration-200"
                icon={<LogOut size={20} />}
                onClick={closeMenu}
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
