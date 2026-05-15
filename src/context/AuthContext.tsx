import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Driver, AuthUser } from '../types/driver';
import { driverLogin, driverRegister, getDriverMe } from '../services/driverService';

interface AuthContextType {
    user: AuthUser | null;
    driver: Driver | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    requestOTP: (email: string) => Promise<void>;
    login: (email: string, phone: string) => Promise<void>;
    signup: (data: { fullName: string; email: string; phone: string }) => Promise<void>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [driver, setDriver] = useState<Driver | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = !!user && !!localStorage.getItem('token');

    // On mount, try to restore session from stored token
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                // Fetch fresh driver profile
                getDriverMe()
                    .then((d) => setDriver(d))
                    .catch(() => {
                        // Token might be expired
                        logout();
                    })
                    .finally(() => setIsLoading(false));
            } catch {
                logout();
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, []);

    const requestOTP = async (email: string) => {
        const { requestOTP: apiRequestOTP } = await import('../services/driverService');
        await apiRequestOTP(email);
    };

    const login = async (email: string, phone: string) => {
        const res = await driverLogin(email, phone);
        // Store tokens
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        setUser(res.user);
        setDriver(res.driver);
    };

    const signup = async (data: { fullName: string; email: string; phone: string }) => {
        await driverRegister(data);
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        setDriver(null);
    }, []);

    const refreshProfile = async () => {
        try {
            const d = await getDriverMe();
            setDriver(d);
        } catch {
            // ignore
        }
    };

    return (
        <AuthContext.Provider value={{ user, driver, isAuthenticated, isLoading, requestOTP, login, signup, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
