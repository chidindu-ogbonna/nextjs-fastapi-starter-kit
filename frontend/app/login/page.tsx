"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  IconBrandGoogleFilled,
  IconMail,
  IconEye,
  IconEyeOff,
  IconArrowLeft
} from "@tabler/icons-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { clientAuth } from "@/lib/firebase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/errors";
import Link from "next/link";
import { LogoWord } from "@/components/icons";

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState<"login" | "register" | "forgotPassword">(
    "login"
  );
  const [loading, setLoading] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const toggleAction = (newAction: "login" | "register" | "forgotPassword") => {
    setIsLoadingState(true);
    setTimeout(() => {
      setAction(newAction);
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setIsLoadingState(false);
    }, 300);
  };

  const continueWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      if (action === "register") {
        await createUserWithEmailAndPassword(clientAuth, email, password);
      } else {
        await signInWithEmailAndPassword(clientAuth, email, password);
      }
      router.push("/app");
    } catch (error: any) {
      toast.toast({
        description: getFirebaseAuthErrorMessage(error?.code),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(clientAuth, provider);
      router.push("/app");
    } catch (error: any) {
      toast.toast({
        description: getFirebaseAuthErrorMessage(error?.code),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.toast({
        description: "Please enter your email address.",
        variant: "warning"
      });
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(clientAuth, email);
      toast.toast({
        description: "Password reset email sent. Please check your inbox.",
        variant: "default"
      });
    } catch (error: any) {
      toast.toast({
        description: getFirebaseAuthErrorMessage(error?.code),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 md:items-center">
      <header className="absolute top-0 left-0 p-8">
        <Link href="/">
          <LogoWord />
        </Link>
      </header>

      <Card
        className={`border-0 w-full max-w-sm shadow-none transition-opacity duration-300 ${isLoadingState ? "opacity-0" : "opacity-100"}`}
      >
        <CardHeader className="py-10 text-center">
          <CardTitle className="text-2xl">
            {action === "login"
              ? "Login"
              : action === "register"
                ? "Create Account"
                : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {action === "forgotPassword"
              ? "Enter your email to reset your password"
              : "Automated content creation for your brand"}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-4">
          {action !== "forgotPassword" && (
            <>
              <div className="w-full mb-4">
                <Button
                  className="w-full"
                  variant="primary:outline"
                  onClick={continueWithGoogle}
                  type="button"
                  loading={loading}
                >
                  <IconBrandGoogleFilled className="w-4 h-4 mr-2" />
                  <span>
                    {action === "login" ? "Login" : "Sign up"} with Google
                  </span>
                </Button>
              </div>
              <div className="relative w-full py-4 text-center">
                <hr className="w-full border-t border-input" />
                <span className="absolute px-2 text-sm transform -translate-x-1/2 -translate-y-1/2 bg-background top-1/2 left-1/2 text-muted-foreground">
                  or
                </span>
              </div>
            </>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (action === "forgotPassword") {
                handleForgotPassword();
              } else {
                continueWithEmail(email, password);
              }
            }}
            className="flex flex-col w-full gap-4"
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {action !== "forgotPassword" && (
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IconEyeOff className="w-4 h-4" />
                  ) : (
                    <IconEye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            )}
            <Button className="w-full" type="submit" loading={loading}>
              {action === "forgotPassword" ? (
                <>
                  <IconMail className="w-4 h-4 mr-2" />
                  <span>Reset Password</span>
                </>
              ) : (
                <>
                  <IconMail className="w-4 h-4 mr-2" />
                  <span>
                    {action === "login" ? "Login" : "Sign up"} with Email
                  </span>
                </>
              )}
            </Button>
          </form>

          <div className="flex flex-col">
            {action === "login" && (
              <Button
                variant="link"
                onClick={() => toggleAction("forgotPassword")}
                className="text-sm text-link hover:text-link-hover"
              >
                Forgot Password?
              </Button>
            )}

            {action === "forgotPassword" && (
              <Button
                variant="link"
                onClick={() => toggleAction("login")}
                className="text-sm text-link hover:text-link-hover"
              >
                <IconArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            )}

            {action !== "forgotPassword" && (
              <Button
                variant="link"
                onClick={() =>
                  toggleAction(action === "login" ? "register" : "login")
                }
                className="text-sm text-link hover:text-link-hover"
              >
                {action === "login"
                  ? "Don't have an account? Create one"
                  : "Already have an account? Sign in"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
