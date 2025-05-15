"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/core/auth/AuthContext";
import { useEffect } from "react";

export const AlreadyLogged = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace("/notes");
        }
    }, [user, router])
    return null;
}