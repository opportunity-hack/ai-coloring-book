"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isStaffAdmin } from "@/lib/auth";

export default function RequireAdmin({ children }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (isStaffAdmin()) {
      setAllowed(true);
    } else {
      router.replace("/admin");
    }
  }, [router]);

  if (!allowed) return null;
  return children;
}
