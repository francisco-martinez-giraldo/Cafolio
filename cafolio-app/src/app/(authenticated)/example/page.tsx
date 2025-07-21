"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoffeeExample } from "@/components/examples/CoffeeExample";
import { DictionaryExample } from "@/components/examples/DictionaryExample";
import { SkeletonCard } from "@/components/ui/skeletonCard";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email });
    router.push("/home");
  };

  return <SkeletonCard />;
}
