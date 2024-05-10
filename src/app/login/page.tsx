"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bg from "@/images/bg.jpg";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useUser } from "@/app/context/userContext";

export default function page() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const endUser: any = useUser();

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast({
        title: "Login Successful",
        description: "Redirecting you to your dashboard.",
      });
      router.push("/");
      const response = await axios.get("/api/users/me");
      // console.log(response.data.data.isVerified);
      endUser.setUser({
        ...endUser.user,
        username: response.data.data.username,
        email: response.data.data.email,
        isVerified: response.data.data.isVerified,
      });
    } catch (error: any) {
      console.error("Login failed");
      toast({
        variant: "destructive",
        title: "Error: Login failed",
        description: "Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6" id="login">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to sign in into your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={onLogin}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size={20} /> &nbsp;
                </>
              ) : (
                ""
              )}
              Log In
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup#signup" className="underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={bg}
          alt="Image"
          // width="1920"
          // height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
