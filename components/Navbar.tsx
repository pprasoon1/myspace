"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "/blogs", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#101a14]/90 to-[#1a232a]/90 backdrop-blur-xl border-b border-green-700/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-extrabold text-green-400 tracking-tight flex items-center gap-2">
          {/* Optionally add a logo icon here */}
          Pranay
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-2 items-center">
          {navLinks.map(({ href, label }) => {
            const isActive = (pathname === href) || (href.startsWith("#") && typeof window !== "undefined" && window.location.hash === href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-md text-lg font-medium transition-colors duration-200
                  ${isActive ? "text-green-400" : "text-gray-200 hover:text-green-300"}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400`}
              >
                <span>{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 -bottom-1 h-1 rounded bg-green-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          {/* CTA Button */}
          <Link
            href="#contact"
            className="ml-2 px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full font-semibold shadow hover:scale-105 transition"
          >
            Hire Me
          </Link>
          {/* Auth */}
          {user ? (
            <>
              <span className="text-gray-200 text-sm ml-3">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="text-sm text-red-400 hover:underline ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm text-green-400 hover:underline ml-3"
            >
              Login
            </Link>
          )}
        </nav>
        {/* Hamburger */}
        <button
          className="md:hidden text-green-400 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#181e1a]/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center space-y-8"
          >
            <button
              className="absolute top-6 right-8 text-green-400 text-3xl"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-2xl font-bold text-green-200 hover:text-green-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full font-semibold shadow hover:scale-105 transition"
              onClick={() => setMenuOpen(false)}
            >
              Hire Me
            </Link>
            {user ? (
              <>
                <span className="text-green-300 text-lg">Hi, {user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-lg text-red-400 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="text-lg text-green-400 hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
