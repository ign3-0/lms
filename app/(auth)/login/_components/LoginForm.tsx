"use client";

import { toast } from "sonner";
import { Github, Loader2, Loader2Icon, Send } from "lucide-react";

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
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [githubPending, startGithubPending] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();

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

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email Sent");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Error Sending Email");
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
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="m@example.com"
              required
            />
            <Button onClick={signInWithEmail} disabled={emailPending}>
              {emailPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span className="">Continue with Email</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
