"use client";
import { clientAuth } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}>({
  user: null,
  loading: true,
  isAdmin: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(clientAuth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const isAdmin = tokenResult.claims.admin as boolean;
        setIsAdmin(isAdmin);
      }
      if (user && pathname === "/login") {
        router.push("/app");
      }
      if (!user && pathname.startsWith("/app")) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
