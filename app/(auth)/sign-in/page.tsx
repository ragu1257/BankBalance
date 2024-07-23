import AuthForm from "@/components/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const loggedIn = await getLoggedInUser();
  if (loggedIn) redirect("/")
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="Sign In" />
    </section>
  );
}
export default SignInPage