"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth";

export default function RequireAdmin({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isAdmin()) {
      setAllowed(true);
    } else {
      router.replace("/admin");
    }
  }, [router]);

  if (!allowed) return null;
  return children;
}
