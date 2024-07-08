import { auth } from "@/auth";
import { RouterApp } from "@/config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
 children
}: {
 children: React.ReactNode;
  }) {
  const session = await auth()
  
  if (session?.user.role !== 'admin') {
    redirect(RouterApp.authLogin)
  }


  return (
    <>
      {children}
    </>
  );
}