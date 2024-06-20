import { auth } from "@/auth";
import { RouterApp } from "@/config";
import { redirect } from "next/navigation";

export default async function ChechooutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    //redirect(RouterApp.home);
    redirect(`${RouterApp.authLogin}?redirectTo=${RouterApp.checkoutAddress}`);
  }

  return <>{children}</>;
}
