import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  PlusCircle,
  Pencil,
  Trash2,
  ListTodo,
} from "lucide-react";

const features = [
  {
    icon: PlusCircle,
    title: "Create Tasks",
    description:
      "Quickly add tasks with titles, descriptions, priorities, and due dates.",
  },
  {
    icon: Pencil,
    title: "Edit Anytime",
    description:
      "Update task details, reassign priorities, or shift deadlines on the fly.",
  },
  {
    icon: Trash2,
    title: "Delete Tasks",
    description:
      "Remove completed or irrelevant tasks to keep your workspace clean.",
  },
  {
    icon: CheckCircle2,
    title: "Track Progress",
    description:
      "Mark tasks as done and watch your productivity grow over time.",
  },
];

const stats = [
  { label: "Tasks Created", value: "10,000+" },
  { label: "Tasks Completed", value: "8,500+" },
  { label: "Active Users", value: "1,200+" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero */}
      <section className="mx-auto max-w-screen-xl px-4 py-24 text-center">
        <Badge variant="secondary" className="mb-4">
          <ListTodo className="mr-1 h-3 w-3" />
          Task Manager
        </Badge>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Stay on top of everything <br className="hidden sm:block" />
          that matters
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base">
          TaskFlow helps you create, manage, and track your tasks in one clean
          place. No clutter, no confusion — just focus.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md px-6 py-2 text-md bg-primary text-primary-foreground"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <Separator />

      {/* Stats */}
      <section className="mx-auto max-w-screen-xl px-4 py-14">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardHeader className="pb-1">
                <CardTitle className="text-3xl font-bold">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="mx-auto max-w-screen-xl px-4 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need to stay productive
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Simple tools, powerful results.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader className="pb-2">
                <feature.icon className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="mx-auto max-w-screen-xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to get things done?
        </h2>
        <p className="mt-3 text-muted-foreground text-sm">
          Join thousands of people who use TaskFlow to stay organized every day.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/signup">
            <Button size="lg">
              Start for Free
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}