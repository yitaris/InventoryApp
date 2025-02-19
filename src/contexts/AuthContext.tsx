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

interface ProductType {
  id: string;
  name: string;
  image_url: string;
  barcode: string;
  miktar: string;
  skt: string;
}

interface AuthContextType {
  session: Session | null;
  user: UserType | null;
  team: UserType[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setTeamShift: (id: string, day: string, newShift: string) => Promise<void>;
  setInventory: (branchId: string, productId: string) => Promise<void>;
  fetchInventory: () => Promise<ProductType[]>;
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

  const setInventory = async (branchId: string, productId: string) => {
    // 1️⃣ Products tablosundan ilgili ürünü çek
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .single();
  
    if (productError || !product) {
      console.error("Ürün bulunamadı:", productError);
      return null;
    }
  
    // 2️⃣ Inventory tablosuna aynı ürünü kaydet
    const { data: newInventory, error: inventoryError } = await supabase
      .from("inventory")
      .insert([
        {
          branch_id: branchId, // Şube ID'si
          product_id: product.id, // Ürün ID'si
        },
      ])
      .select()
      .single();
  
    if (inventoryError) {
      console.error("Stok eklenirken hata oluştu:", inventoryError);
      return null;
    }
  
    console.log("Ürün başarıyla stoğa eklendi:", newInventory);
    return newInventory;
  };
  
  const fetchInventory = async () => {
    if (!user || !user.branch_id) {
      console.error("Kullanıcı veya branch ID bulunamadı!");
      return [];
    }
  
    // 1️⃣ Inventory tablosundan branch_id ile product_id'leri al
    const { data: fetchInventoryData, error: fetchInventoryError } = await supabase
      .from("inventory")
      .select("product_id")
      .eq("branch_id", user.branch_id);
  
    if (fetchInventoryError) {
      console.error("Stok bilgileri alınırken hata oluştu:", fetchInventoryError);
      return [];
    }
  
    // 2️⃣ Eğer hiç ürün yoksa direkt boş dizi döndür
    if (!fetchInventoryData || fetchInventoryData.length === 0) {
      console.log("Bu şubeye ait stokta ürün bulunamadı.");
      return [];
    }
  
    // 3️⃣ product_id'leri bir diziye çevir
    const productIds = fetchInventoryData.map((item) => item.product_id);
  
    if (productIds.length === 0) {
      console.log("Stokta kayıtlı ürün ID'si bulunamadı.");
      return [];
    }
  
    // 4️⃣ Supabase `in` operatörünü kullanarak products tablosundan bu ID'lere sahip ürünleri çek
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);
  
    if (productError) {
      console.error("Ürün bilgileri alınırken hata oluştu:", productError);
      return [];
    }
  
    return productData || [];
  };
  

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
    <AuthContext.Provider value={{ session, user, team, login, logout, setTeamShift, setInventory, fetchInventory }}>
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