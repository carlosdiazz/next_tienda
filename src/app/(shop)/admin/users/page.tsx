export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginatedUsers} from "@/actions";
import { Title } from "@/components";
import { RouterApp } from "@/config";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function UsersAdminPages() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect(`${RouterApp.authLogin}`);
  }

  return (
    <>
      <Title title="Mantenimeinto de Usuarios" />

      <div className="mb-10">
      <UsersTable  users={users}/>
      </div>
    </>
  );
}
