import api from '../api';

export interface AccidentReport {
    _id: string;
    vehicleNumber: string;
    branch: { _id: string; name: string; city?: string } | string;
    alternativeMobile: string;
    alternativeEmail?: string;
    accidentLocation: string;
    accidentDate: string;
    description: string;
    images: string[];
    status: 'SUBMITTED' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED';
    reviewNotes?: string;
    driverName?: string;
    createdAt: string;
}

export interface SubmitAccidentReportPayload {
    vehicleNumber: string;
    branch: string;
    alternativeMobile: string;
    alternativeEmail?: string;
    accidentLocation: string;
    accidentDate: string;
    description: string;
    images: File[];
}

// Driver: Submit accident report with images
export const submitAccidentReport = async (payload: SubmitAccidentReportPayload): Promise<AccidentReport> => {
    const formData = new FormData();
    formData.append('vehicleNumber', payload.vehicleNumber);
    formData.append('branch', payload.branch);
    formData.append('alternativeMobile', payload.alternativeMobile);
    if (payload.alternativeEmail) formData.append('alternativeEmail', payload.alternativeEmail);
    formData.append('accidentLocation', payload.accidentLocation);
    formData.append('accidentDate', payload.accidentDate);
    formData.append('description', payload.description);
    payload.images.forEach(img => formData.append('images', img));

    const { data } = await api.post('/api/accident-reports/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
};

// Driver: Get own accident reports
export const getMyAccidentReports = async (): Promise<AccidentReport[]> => {
    const { data } = await api.get('/api/accident-reports/my-reports');
    return data.data || [];
};
