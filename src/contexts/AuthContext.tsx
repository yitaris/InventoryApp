import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { Session } from '@supabase/supabase-js';

interface UserType {
  id: string;
  branch_id: string;
  name: string;
  title: string;
  avatar_url: string;
  break: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: UserType | null;
  team: UserType[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setTeamShift: (id: string, day: string, newShift: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(
    () => JSON.parse(localStorage.getItem("user") || "null")
  );
  const [team, setTeam] = useState<UserType[]>([]);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session?.user) {
        fetchUser(data.session.user.id);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session?.user) {
        fetchUser(session.user.id);
      } else {
        setUser(null);
        setTeam([]);
        localStorage.removeItem("user");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchUser = async (id: string) => {
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id.trim())
      .single();
    
    if (error) {
      console.error('Error fetching user details:', error);
      return;
    }

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    fetchTeam(userData.branch_id);
  };

  const fetchTeam = async (branchId: string) => {
    const { data: teamData, error } = await supabase
      .from("users")
      .select('*')
      .eq('branch_id', branchId);
    
    if (error) {
      console.error('Error fetching branch details:', error);
      return;
    }

    setTeam(teamData || []);
  };

  const setTeamShift = async (id: string, day: string, newShift: string) => {
    const { data: teamShiftData, error: teamShiftError } = await supabase
    .from("shifts")
    .update({shift: newShift})
    .eq("user_id", id)
    .eq("day", day);

    if (teamShiftError) {
      console.error("Vardiya güncellenirken hata oluştu:", teamShiftError.message);
    } else {
      console.log("Vardiya güncellendi:", teamShiftData);
    }
  }

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setTeam([]);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ session, user, team, login, logout, setTeamShift }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};