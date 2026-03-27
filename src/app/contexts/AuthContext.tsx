import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, mobile: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - check against stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check for admin credentials
    if (email === 'admin@giftshop.com' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@giftshop.com',
        mobile: '9999999999',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }

    const foundUser = users.find((u: any) => 
      (u.email === email || u.mobile === email) && u.password === password
    );

    if (foundUser) {
      const loggedInUser: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        mobile: foundUser.mobile,
        role: 'user'
      };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return true;
    }

    return false;
  };

  const register = async (name: string, email: string, mobile: string, password: string): Promise<boolean> => {
    // Mock registration
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email || u.mobile === mobile);
    if (existingUser) {
      return false;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      mobile,
      password,
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const loggedInUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      role: 'user'
    };
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
