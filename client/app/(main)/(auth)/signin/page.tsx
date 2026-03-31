import Link from "next/link";
import { Button } from "@/components/ui/button";
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

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

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
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" placeholder="••••••••" />
                        </div>

                        <Button className="w-full" size="default">
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