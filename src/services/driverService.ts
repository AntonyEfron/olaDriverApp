import api from '../api';
import type { Driver, LoginResponse, RegisterResponse } from '../types/driver';

// ─── Auth Endpoints ─────────────────────────────────────────────────
export const requestOTP = async (email: string) => {
    const { data } = await api.post('/driver-auth/request-otp', { email });
    return data;
};

export const driverLogin = async (email: string, otp: string): Promise<LoginResponse> => {
    const { data } = await api.post('/driver-auth/login', { email, otp });
    return data;
};

export const driverRegister = async (payload: {
    fullName: string;
    email: string;
    phone: string;
}): Promise<RegisterResponse> => {
    const { data } = await api.post('/driver-auth/register', payload);
    return data;
};

// ─── Driver Profile ─────────────────────────────────────────────────

export const getDriverMe = async (): Promise<Driver> => {
    const { data } = await api.get('/driver/me');
    return data.data;
};

export const updateDriverProfile = async (id: string, payload: Partial<Driver>): Promise<Driver> => {
    const { data } = await api.put(`/driver/${id}`, payload);
    return data.data;
};

export const uploadDriverDocument = async (id: string, formData: FormData) => {
    const { data } = await api.post(`/driver/${id}/upload-documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};
