import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  description: "In this page, you can sign in to the TextLoom",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
