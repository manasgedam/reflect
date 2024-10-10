"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditFormIndex() {
    const router = useRouter();

    useEffect(() => {
        router.push("/edit-form/0");
    }, [router]);

    return null;
}