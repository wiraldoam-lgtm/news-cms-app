import { createContext, useContext, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { supabase } from './supabase';

const demoUsers = {
  member: { id: 'demo-member', name: 'Maya Lestari', email: 'member@nusanews.id', role: 'member' },
  journalist: { id: 'demo-journalist', name: 'Raka Pradana', email: 'wartawan@nusanews.id', role: 'journalist' },
  admin: { id: 'demo-admin', name: 'Admin NusaNews', email: 'admin@nusanews.id', role: 'admin' },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password, role = 'member' }) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser({ ...data.user, role: data.user.user_metadata?.role || role });
      return;
    }

    const demoUser = demoUsers[role] || demoUsers.member;
    setUser(demoUser);
    await Swal.fire('Login demo berhasil', `Masuk sebagai ${demoUser.role}.`, 'success');
  };

  const register = async ({ name, email, password }) => {
    if (supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role: 'member' } },
      });
      if (error) throw error;
    }
    await Swal.fire('Registrasi berhasil', 'Akun member siap digunakan.', 'success');
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
