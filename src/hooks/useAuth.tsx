import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from "react";
import Cookies from "js-cookie";

// ----------------------
// Type Definitions
// ----------------------
interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
  userType: "jobseeker" | "employer";
  profileComplete: boolean;
}

interface AsyncState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  loginState: AsyncState;
  registerState: AsyncState;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    userType: "jobseeker" | "employer",
    profileComplete: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<AuthUser>) => Promise<void>;
  signInWithGoogle?: () => Promise<void>; // Optional for future expansion
  createUpdateJSProfile: (data: any, id: string) => Promise<void>;
  createJSState: {
    loading: boolean,
    error: null | string,
    success: null | boolean,
  };
  getJSProfile: (id: string) => Promise<void>;
  getJSState: {
    loading: boolean,
    error: null | string,
    success: boolean | null,
    data: null | any
  }

}

// ----------------------
// Context Initialization
// ----------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = "https://yocaco-backend.onrender.com/api/";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [loginState, setLoginState] = useState<AsyncState>({
    loading: false,
    error: null,
    success: false,
  });

  const [registerState, setRegisterState] = useState<AsyncState>({
    loading: false,
    error: null,
    success: false,
  });
  const [createJSState, setCreateJSState] = useState<AsyncState>({
    loading: false,
    error: null,
    success: false,
  });

  const [getJSState, setGetJSState] = useState({
    loading: false,
    error: null,
    success: false,
    data: null
  });
  // ----------------------
  // Load User from Cookie
  // ----------------------
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        Cookies.remove("user"); // Invalid cookie cleanup
      }
    }
    setLoading(false);
  }, []);

  // ----------------------
  // Login Function
  // ----------------------
  const login = async (email: string, password: string) => {
    setLoginState({ loading: true, error: null, success: false });

    try {
      const response = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid email or password");

      const data = await response.json();
      Cookies.set("user", JSON.stringify(data.user));
      setUser(data.user);

      setLoginState({ loading: false, error: null, success: true });
    } catch (error: any) {
      setLoginState({
        loading: false,
        error: error.message || "Failed to login",
        success: false,
      });
    }
  };

  // ----------------------
  // Register Function
  // ----------------------
  const register = async (
    name: string,
    email: string,
    password: string,
    userType: "jobseeker" | "employer",
    profileComplete: boolean
  ) => {
    setRegisterState({ loading: true, error: null, success: false });

    try {
      const response = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, userType, profileComplete }),
      });

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      Cookies.set("user", JSON.stringify(data.user));
      setUser(data.user);

      setRegisterState({ loading: false, error: null, success: true });
    } catch (error: any) {
      setRegisterState({
        loading: false,
        error: error.message || "Failed to register",
        success: false,
      });
    }
  };

  // ----------------------
  // Update Profile
  // ----------------------
  const updateUserProfile = async (updates: Partial<AuthUser>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    Cookies.set("user", JSON.stringify(updatedUser));
  };
  /// job seacker profile
  const createUpdateJSProfile = useCallback(async (data: any, id: string) => {
    setCreateJSState({
      loading: true,
      error: null,
      success: null
    })
    console.log('///////////////////////////////////',data)
    try {
      const response = await fetch(`${BASE_URL}auth/create-jobseeker-profile/${id}`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }
      )
      if (!response.ok) {
        throw Error('Failed to fetch data')
      }
      setCreateJSState({
        loading: false,
        error: null,
        success: true
      })
      const userData = Cookies.get('user')
      setUser({...JSON.parse(userData), profileComplete: true})
    } catch (er) {
      console.log(er)
      setCreateJSState({
        loading: false,
        error: er.message,
        success: false
      })
    }
  }, [])

  // get JS Profile

  const getJSProfile = useCallback(async (id: string) => {
    setGetJSState({
      loading: true,
      error: null,
      success: false,
      data: null
    })
    try {
      const response = await fetch(`${BASE_URL}auth/jobseeker-profile/${id}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        throw Error('error fetching pro')
      }
      const data = await response.json()
      console.log('///////////////////////////////', data)
      setGetJSState({
        loading: false,
        error: null,
        success: data.success,
        data: data.data
      })


    } catch (er) {
      setGetJSState({
        loading: false,
        error: er.message,
        success: false,
        data: null
      })
    }
  }, [])
  // ----------------------
  // Logout Function
  // ----------------------
  const logout = async () => {
    try {
      Cookies.remove("user");
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };


  // fetch data

  // ----------------------
  // Context Value
  // ----------------------
  const value: AuthContextType = {
    user,
    loading,
    loginState,
    registerState,
    login,
    register,
    logout,
    updateUserProfile,
    createUpdateJSProfile,
    createJSState,
    getJSProfile,
    getJSState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ----------------------
// Custom Hook
// ----------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
