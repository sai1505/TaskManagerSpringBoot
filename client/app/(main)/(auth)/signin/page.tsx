"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RectangleStackIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";

export default function SignInPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const ThemeToaster = () => {
        const { theme } = useTheme();
        const invertedTheme = theme === "dark" ? "light" : "dark";

        return (
            <Toaster
                position="top-center"
                theme={invertedTheme as "dark" | "light"}
            />
        );
    }

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.status === 200) {
                const token = data?.data?.token;

                // store token
                localStorage.setItem("token", token);

                toast.success("Login successful");

                // redirect
                setTimeout(() => {
                    router.push("/dashboard"); // change if needed
                }, 1200);

            } else {
                toast.error(data?.message || "Invalid credentials");
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                <ThemeToaster />

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-6 me-5">
                    <RectangleStackIcon className="h-4 w-4" />
                    <span className="text-lg font-semibold text-foreground">Task Manager</span>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                        <CardDescription>
                            Sign in to continue managing your tasks
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {/* Email */}
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" onChange={handleChange} />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" placeholder="••••••••" onChange={handleChange} />
                        </div>

                        <Button className="w-full" size="default" onClick={handleSubmit}>
                            Sign In
                        </Button>

                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Separator />
                        <p className="text-sm text-muted-foreground text-center">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-foreground font-medium underline underline-offset-4 hover:text-primary"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

            </div>
        </main>
    );
}