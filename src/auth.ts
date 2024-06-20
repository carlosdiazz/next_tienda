import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { authConfig } from "./auth.config";
import prisma from "./lib/prisma";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        //console.log({ email, password });

        //Buscar el Correo
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user) return null;

        //Comaprar las contrasena
        if (!bcryptjs.compareSync(password, user.password)) return null;

        console.log("llego acaaaa");
        //Regresar el usuario sin el password
        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
});
