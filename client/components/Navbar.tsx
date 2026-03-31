"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RectangleStackIcon } from "@heroicons/react/16/solid";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
    return (
        <header className="border-b bg-background">
            <div className="mx-auto flex h-14 max-w-screen-xl items-center gap-4 px-4">

                <Link
                    href="/"
                    className="flex items-center gap-2 text-foreground font-semibold text-base tracking-tight"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-md text-primary-background">
                        <RectangleStackIcon className="h-4 w-4" />
                    </div>

                    <span className="transition-colors hover:text-primary">
                        Task Manager
                    </span>
                </Link>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right side: Theme Toggle + Auth Buttons */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <Separator orientation="vertical" className="h-8" />

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