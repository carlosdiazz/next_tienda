"use server";
import { signIn } from "@/auth";
import { sleep } from "@/utils";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await sleep(2);
    const success = await signIn("credentials", formData);
    console.log({ prevState, success });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
