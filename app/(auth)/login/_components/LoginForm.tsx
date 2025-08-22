"use client";

"use client";

import { toast } from "sonner";
import { Github, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";

export function LoginForm() {
  const [githubPending, startGithubPending] = useTransition();

  async function signInWithGithub() {
    startGithubPending(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Signed in with Github, you will be redirected in a few"
            );
          },
          onError: (error) => {
            toast.error("Internal Server Error");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader className="text-center items-center justify-center">
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription>
          Login with your Github and Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full"
          variant={"link"}
        >
          {githubPending ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              <span>Loading</span>
            </>
          ) : (
            <>
              {" "}
              <Github className="size-4" />
              Sign In With Github
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or Continue With
          </span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="enail">Email</Label>
            <Input type="email" placeholder="m@example.com" />
            <Button>Continue with Email</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
