import api from '../api';
import type { Vehicle } from '../types/driver';

export const getVehicleById = async (id: string): Promise<Vehicle> => {
    const { data } = await api.get(`/vehicle/${id}`);
    return data.data;
};
