"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-primary">
          ZeenTravel
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-4">

          {/* Button Lihat Video — FULL SECONDARY + NO HOVER */}
          <Button
            className="
              bg-secondary 
              text-white 
              font-medium 
              px-4 py-2 
              rounded-xl 
              shadow-none 
              hover:bg-secondary 
              active:bg-secondary 
              focus:ring-0 
              focus:outline-none 
              transition-none
            "
          >
            Lihat Video
          </Button>

          {/* Button Hubungi Kami — PRIMARY */}
          <Button
            className="
              bg-primary 
              text-white 
              font-medium 
              px-4 py-2 
              rounded-xl 
              hover:bg-primary 
              active:bg-primary 
              shadow-none
            "
          >
            Hubungi Kami
          </Button>
        </div>
      </div>
    </nav>
  );
}
