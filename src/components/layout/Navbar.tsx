"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(document.cookie.includes("auth-token=demo-token"));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loggedOutRoutes = [
    { name: "Explore", path: "/explore" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const loggedInRoutes = [
    { name: "Explore", path: "/explore" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Items", path: "/items/manage" },
    { name: "Add Item", path: "/items/add" },
    { name: "Profile", path: "/profile" },
  ];

  const navRoutes = isLoggedIn
    ? [{ name: "Explore", path: "/explore" }]
    : loggedOutRoutes;

  const mobileRoutes = isLoggedIn
    ? [
        { name: "Explore", path: "/explore" },
        { name: "Dashboard", path: "/dashboard" },
      ]
    : loggedOutRoutes;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              N
            </div>
            <span className="inline-block font-bold text-xl tracking-tight">Nexus</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {!isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          ) : (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="h-5 w-5" />
              </Button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-popover p-1.5 shadow-xl z-50">
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    Dashboard
                  </Link>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      onClick={() => {
                        document.cookie = "auth-token=; path=/; max-age=0";
                        setDropdownOpen(false);
                        window.location.href = "/";
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center space-x-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    N
                  </div>
                  <span className="inline-block font-bold text-xl tracking-tight">Nexus</span>
                </Link>
                
                <div className="flex flex-col space-y-4">
                  {mobileRoutes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {route.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border flex flex-col gap-4">
                  {!isLoggedIn ? (
                    <>
                      <Button variant="outline" asChild className="w-full justify-center">
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button asChild className="w-full justify-center">
                        <Link href="/register">Sign up</Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="destructive"
                      className="w-full justify-center"
                      onClick={() => {
                        document.cookie = "auth-token=; path=/; max-age=0";
                        window.location.href = "/";
                      }}
                    >
                      Log out
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
