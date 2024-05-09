"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";

export default function page() {
  const [token, setToken] = useState("");
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyemail", { token });
      // console.log("Email verified", response.data);
      setVerified(true);
      setError(false);
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error: any) {
      console.error("Email verification failed");
      setError(true);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken: string = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // useEffect(() => {
  //   setError(false)
  //   if (token.length > 0) {
  //     verifyEmail()
  //   }
  // }, [token])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4">
      {!verified && !error && (
        <Card className="min-w-72 md:min-w-96">
          <CardHeader>
            <CardTitle>Verify your Email</CardTitle>
            <CardDescription>
              verify your email by clicking on the button
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button disabled={loading} onClick={verifyEmail}>
              {loading ? (
                <>
                  <LoadingSpinner size={20} /> &nbsp;
                </>
              ) : (
                ""
              )}
              Verify Email
            </Button>
          </CardFooter>
        </Card>
      )}
      {verified && (
        <Card className="min-w-72 md:min-w-96">
          <CardHeader>
            <CardTitle>Email verified Successfully</CardTitle>
          </CardHeader>
          <CardFooter>
            <LoadingSpinner /> &nbsp; Redirecting to Dashboard...
          </CardFooter>
        </Card>
      )}
      {error && (
        <Card className="min-w-72 md:min-w-96">
          <CardHeader>
            <CardTitle>Email verification failed</CardTitle>
          </CardHeader>
          <CardFooter>Please try again later</CardFooter>
        </Card>
      )}
    </div>
  );
}
