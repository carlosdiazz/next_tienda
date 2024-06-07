import { RouterApp } from "@/config";
import { redirect } from "next/navigation";

export default function AurhPage() {
  return (
    redirect(RouterApp.authLogin)
  );
}