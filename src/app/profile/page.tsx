"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/userContext";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function page() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser }: any = useUser();
  const [loading, setLoading] = useState(false);
  // console.log(user)
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      setUser({
        ...user,
        username: response.data.data.username,
        email: response.data.data.email,
        isVerified: response.data.data.isVerified,
      });
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching user details");
      toast({
        variant: "destructive",
        title: "Error: Fetching user details failed",
        description: "Please try again.",
      });
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout");
      toast({
        title: "Logout successful",
        description: "You have been logged out.",
      });
      setUser(null);
      router.push("/");
    } catch (error: any) {
      console.error("Error logging out");
      toast({
        variant: "destructive",
        title: "Error: Logout failed",
        description: "Please try again.",
      });
    }
  };

  // useEffect(() => {}, [user]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      {user ? (
        <Card className="min-w-72 md:min-w-96">
          <CardHeader>
            <CardTitle>{user?.username}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={user?.isVerified ? "outline" : "destructive"}>
              {user?.isVerified ? "Verified" : "Not Verified"}
            </Badge>
          </CardContent>
          <CardFooter>
            <Button disabled={loading} onClick={logout}>
              {loading ? (
                <>
                  <LoadingSpinner size={20} /> &nbsp;
                </>
              ) : (
                ""
              )}
              Logout
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button disabled={loading} onClick={getUserDetails}>
          {loading ? (
            <>
              <LoadingSpinner size={20} /> &nbsp;
            </>
          ) : (
            ""
          )}
          Get User Details
        </Button>
      )}
    </div>
  );
}
