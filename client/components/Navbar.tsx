"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" },
];

export function Navbar() {
    return (
        <header className="border-b bg-background">
            <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-4 px-4">

                {/* Brand / Logo */}
                <Link href="/" className="text-foreground font-semibold text-base tracking-tight">
                    MyApp
                </Link>

                <Separator orientation="vertical" className="h-5" />

                {/* Nav Links */}
                <nav className="flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Button key={link.href} variant="ghost" size="sm">
                            <Link href={link.href}>{link.label}</Link>
                        </Button>
                    ))}
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right side: Theme Toggle + Auth Buttons */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <Separator orientation="vertical" className="h-5" />

                    <Button variant="ghost" size="sm">
                        <Link href="/signin">Sign In</Link>
                    </Button>

                    <Button variant="default" size="sm">
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>

            </div>
        </header>
    );
}