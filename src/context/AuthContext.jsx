import { createContext, useState, useContext, useEffect } from "react";
// Import data awal dari users.json
import initialUsers from "../data/users.json"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUsers, setDbUsers] = useState([]);

  // 1. Inisialisasi Database di LocalStorage
  useEffect(() => {
    const savedDb = localStorage.getItem("app_users");
    if (savedDb) {
      setDbUsers(JSON.parse(savedDb));
    } else {
      // Jika belum ada di localStorage, pakai data dari users.json
      setDbUsers(initialUsers);
      localStorage.setItem("app_users", JSON.stringify(initialUsers));
    }

    // Cek session login aktif
    const activeUser = localStorage.getItem("user_session");
    if (activeUser) setUser(JSON.parse(activeUser));
  }, []);

  // 2. Login dengan mencocokkan data di "Database" LocalStorage
  const login = (username, password) => {
    const foundUser = dbUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user_session", JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    } else {
      return { success: false, message: "Username atau Password salah!" };
    }
  };

  // 3. Register: Tambah user baru ke "Database" LocalStorage
  const register = (userData) => {
    const newUser = { 
      id: Date.now(), 
      ...userData, 
      role: 'user' 
    };
    
    const updatedDb = [...dbUsers, newUser];
    setDbUsers(updatedDb);
    localStorage.setItem("app_users", JSON.stringify(updatedDb));
    
    // Langsung login setelah daftar
    setUser(newUser);
    localStorage.setItem("user_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_session");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, dbUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);