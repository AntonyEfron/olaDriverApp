import api from '../api';
import type { Invoice } from '../types/driver';

export const getInvoicesByDriver = async (driverId: string): Promise<Invoice[]> => {
    const { data } = await api.get(`/invoices?driver=${driverId}`);
    return data.data;
};
