"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Plus, Pencil, Trash2, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { RectangleStackIcon } from "@heroicons/react/16/solid";

type ActiveAction = "add" | "list" | null;

interface TaskNavbarProps {
    onAddTask?: () => void;
    onUpdateTask?: () => void;
    onDeleteTask?: () => void;
    onListTasks?: () => void;
}

// --- Theme Toggle ---
function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="size-9 rounded-xl" disabled>
                <span className="size-4" />
            </Button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-xl transition-all duration-200 hover:bg-accent"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div className="relative flex items-center justify-center">
                            <Sun
                                className={cn(
                                    "absolute size-[1.1rem] transition-all duration-300",
                                    isDark
                                        ? "rotate-90 scale-0 opacity-0"
                                        : "rotate-0 scale-100 opacity-100"
                                )}
                            />
                            <Moon
                                className={cn(
                                    "absolute size-[1.1rem] transition-all duration-300",
                                    isDark
                                        ? "rotate-0 scale-100 opacity-100"
                                        : "-rotate-90 scale-0 opacity-0"
                                )}
                            />
                        </div>
                    </TooltipTrigger>

                    <TooltipContent side="bottom" className="text-xs">
                        {isDark ? "Switch to light" : "Switch to dark"}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Button>
    );
}

// --- Nav Action Button ---
interface NavActionProps {
    icon: React.ReactNode;
    label: string;
    tooltip: string;
    active?: boolean;
    variant?: "default" | "destructive" | "ghost" | "outline";
    onClick?: () => void;
}

function NavAction({
    icon,
    label,
    tooltip,
    active,
    variant = "ghost",
    onClick,
}: NavActionProps) {
    return (
        <Button
            variant={active ? (variant === "destructive" ? "destructive" : "secondary") : variant}
            size="sm"
            onClick={onClick}
            className={cn(
                "gap-2 rounded-xl px-3 h-9 text-sm font-medium transition-all duration-200",
                active && variant !== "destructive" && "bg-primary text-primary-foreground hover:bg-primary/90",
                variant === "destructive" && active && "bg-destructive text-destructive-foreground"
            )}
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div className="flex items-center gap-2">
                            {icon}
                            <span className="hidden sm:inline">{label}</span>
                        </div>
                    </TooltipTrigger>

                    <TooltipContent side="bottom" className="text-xs sm:hidden">
                        {tooltip}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </Button>
    );
}

// --- Main Navbar ---
export default function UserNavbar({
    onAddTask,
    onListTasks,
}: TaskNavbarProps) {
    const [active, setActive] = React.useState<ActiveAction>("list");

    const handle = (action: ActiveAction, cb?: () => void) => {
        setActive(action);
        cb?.();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6">

                {/* ── Brand ── */}
                <div className="flex items-center gap-2.5 select-none">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md text-primary-background">
                        <RectangleStackIcon className="h-4 w-4" />
                    </div>
                    <span className="text-[15px] font-semibold tracking-tight text-foreground">
                        Task Manager
                    </span>
                </div>

                {/* ── Actions ── */}
                <nav className="flex items-center gap-1" aria-label="Task actions">
                    <NavAction
                        icon={<List className="size-4" />}
                        label="All Tasks"
                        tooltip="View all tasks"
                        active={active === "list"}
                        onClick={() => handle("list", onListTasks)}
                    />

                    <NavAction
                        icon={<Plus className="size-4" />}
                        label="Add Task"
                        tooltip="Add a new task"
                        active={active === "add"}
                        onClick={() => handle("add", onAddTask)}
                    />

                    <Separator orientation="vertical" className="mx-1.5 h-8" />

                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}