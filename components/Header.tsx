"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>

        <Link href="/signup">Sign In</Link>
      </Menu>
    </div>
  );
}

// Ye sirf logged in users ke liye hoga

{
  /* <Link href="/profile">Profile</Link> */
}
{
  /* <MenuItem setActive={setActive} active={active} item="Profile">
  <div className="flex flex-col space-y-4 text-sm">
    <HoveredLink href="/my-profile">My Profile</HoveredLink>
    <HoveredLink href="/project-invested">Project Invested</HoveredLink>
  </div>
</MenuItem> */
}
