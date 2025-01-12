import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "In this page, you can sign up to the TextLoom",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
