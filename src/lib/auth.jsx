import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "./supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil profile user
  const getProfile = async (userId) => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

    if (error) throw error;

    return data;
  };

  // Cek session saat refresh
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (!supabase) {
          setLoading(false);
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const profile = await getProfile(session.user.id);

          setUser({
            ...session.user,
            profile,
            role: profile.role,
            name: profile.name,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        try {
          const profile = await getProfile(session.user.id);

          setUser({
            ...session.user,
            profile,
            role: profile.role,
            name: profile.name,
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const profile = await getProfile(data.user.id);

    const authUser = {
      ...data.user,
      profile,
      role: profile.role,
      name: profile.name,
    };

    setUser(authUser);

    return authUser;
  };

  const register = async ({ name, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;

    // simpan profile baru
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name,
          role: "member",
        },
      ]);

      if (profileError) throw profileError;
    }

    await Swal.fire({
      icon: "success",
      title: "Registrasi Berhasil",
      text: "Akun member berhasil dibuat",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      setUser,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
