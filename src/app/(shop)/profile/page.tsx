import { auth } from "@/auth";
import { Title } from "@/components";
import { RouterApp } from "@/config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    //redirect(`${RouterApp}?return=/perfil`)
    redirect(RouterApp.home);
  }

  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h3 className="text-3xl mb-10">{ session.user.role}</h3>
    </div>
  );
}
