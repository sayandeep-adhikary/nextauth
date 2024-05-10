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
      localStorage.removeItem("user");
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
    <div className="h-screen">
      <div className="w-full container mx-auto p-6">
        <div className="w-full flex items-center justify-between">
          <Link
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="/"
          >
            <svg
              className="svg-icon"
              style={{
                width: "1em",
                height: "1em",
                verticalAlign: "middle",
                fill: "currentColor",
                overflow: "hidden",
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M186.2 214.5c-10.4 3.7-18.8 15.7-18.8 26.7v375.5c0 11 4.2 28 9.3 37.7 0 0 30.4 57.5 117.3 144.5 97.4 97.4 199.6 124.2 199.6 124.2 10.6 2.8 27.8 2 38.1-1.8 0 0 122.6-44.7 200.9-123 73.5-73.5 113.7-144 113.7-144 5.4-9.6 9.9-26.4 9.9-37.4l0.3-376.5c0-11-8.5-23-18.8-26.7L531.3 104.9c-10.4-3.7-27.3-3.7-37.7 0L186.2 214.5z m615.4 379.4c0 11-4.3 27.9-9.7 37.5 0 0-36.8 66.8-100.1 130.1C617.5 835.8 531.3 867 531.3 867c-10.3 3.8-27.5 4.4-38.1 1.5 0 0-71.4-19.7-160.7-109-63.3-63.3-100.3-129.3-100.3-129.3-5.4-9.6-9.8-26.4-9.8-37.4v-314c0-11 8.5-23 18.9-26.6l252.3-87.8c10.4-3.6 27.4-3.6 37.8 0l251.3 87.2c10.4 3.6 18.9 15.6 18.9 26.6v315.7z"
                fill="#2680F0"
              />
              <path
                d="M325.2 528c-8.1-7.4-8.8-20.1-1.4-28.3l10.1-11.1c7.4-8.1 20.1-8.7 28.2-1.3l93.8 85.4c8.1 7.4 20.8 6.8 28.2-1.3l176.2-194c7.4-8.1 20.1-8.8 28.3-1.4l11.1 10.1c8.1 7.4 8.8 20.1 1.4 28.3l-213 234.7c-7.4 8.1-20.1 8.8-28.2 1.4L325.2 528z"
                fill="#2680F0"
              />
            </svg>{" "}
            NextAuth
          </Link>
          <div className="flex w-1/2 justify-end content-center">
            <Link
              className="inline-block text-blue-300 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
              data-tippy-content="@twitter_handle"
              href="https://www.linkedin.com/in/sayandeep-adhikary/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </Link>
            <Link
              className="inline-block text-blue-300 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 "
              data-tippy-content="#facebook_id"
              href="https://github.com/sayandeep-adhikary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    <div className="flex flex-col min-h-96 items-center justify-center px-4">
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
    </div>
  );
}
