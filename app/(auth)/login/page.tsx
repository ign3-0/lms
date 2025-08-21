import { Github } from "lucide-react";

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

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center items-center justify-center">
        <CardTitle className="text-xl">Welcome Back</CardTitle>
        <CardDescription>
          Login with your Github and Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button className="w-full" variant={"link"}>
          <Github className="size-4" />
          Sign In With Github
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
