// ─── Driver Types ───────────────────────────────────────────────────

export interface PersonalInfo {
    fullName: string;
    dateOfBirth?: string;
    nationality?: string;
    email: string;
    phone: string;
    licenseNumber?: string;
    whatsappNumber?: string;
    photograph?: string;
}

export interface IdentityDocs {
    idType?: 'National ID' | 'Passport';
    idNumber?: string;
    idFrontImage?: string;
    idBackImage?: string;
}

export interface DrivingLicense {
    licenseNumber?: string;
    licenseCountry?: string;
    categories?: string[];
    frontImage?: string;
    backImage?: string;
    expiryDate?: string;
    verificationStatus?: 'PENDING' | 'VERIFIED' | 'FAILED';
    verifiedBy?: string;
    verifiedDate?: string;
}

export interface BackgroundCheck {
    document?: string;
    issuedDate?: string;
    status?: 'NOT PROVIDED' | 'UPLOADED' | 'CLEARED';
}

export interface AddressProof {
    document?: string;
    documentDate?: string;
}

export interface EmergencyContact {
    name?: string;
    relationship?: string;
    phone?: string;
}

export interface BankDetails {
    bankName?: string;
    accountNumber?: string;
    branchCode?: string;
    accountHolder?: string;
}

export interface MedicalFitness {
    certificate?: string;
    expiryDate?: string;
    isRequired?: boolean;
}

export interface CreditCheck {
    consentForm?: string;
    score?: number;
    rating?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'VERY POOR' | 'FRAUD';
    decision?: 'AUTO_APPROVED' | 'MANUAL_REVIEW' | 'DECLINED';
    reportS3Key?: string;
    checkedDate?: string;
    reviewNotes?: string;
}

export interface Contract {
    generatedS3Key?: string;
    signedS3Key?: string;
    issuedDate?: string;
    signedDate?: string;
}

export interface SafetyEvents {
    braking: number;
    speeding: number;
    acceleration: number;
}

export interface Performance {
    avgSpeed: number;
    totalDistance: number;
    drivingScore: number;
    fuelEfficiency: number;
    safetyEvents: SafetyEvents;
    lastUpdated?: string;
}

export interface Payment {
    amount: number;
    paidAt: string;
    paymentMethod: string;
    transactionId?: string;
    note?: string;
}

export interface RentTracking {
    weekNumber: number;
    weekLabel: string;
    dueDate: string;
    amount: number;
    carryOver: number;
    totalDue: number;
    amountPaid: number;
    balance: number;
    status: 'PAID' | 'PARTIAL' | 'PENDING';
    paidAt?: string;
    payments: Payment[];
}

export interface StatusHistoryEntry {
    status: string;
    changedBy?: string;
    changedByRole?: string;
    timestamp: string;
    notes?: string;
}

export interface Branch {
    _id: string;
    name: string;
    location?: string;
}

export type DriverStatus =
    | 'DRAFT'
    | 'PENDING REVIEW'
    | 'VERIFICATION'
    | 'CREDIT CHECK'
    | 'MANAGER REVIEW'
    | 'APPROVED'
    | 'CONTRACT PENDING'
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'REJECTED';

export interface Driver {
    _id: string;
    status: DriverStatus;
    personalInfo: PersonalInfo;
    identityDocs?: IdentityDocs;
    drivingLicense?: DrivingLicense;
    backgroundCheck?: BackgroundCheck;
    addressProof?: AddressProof;
    emergencyContact?: EmergencyContact;
    bankDetails?: BankDetails;
    medicalFitness?: MedicalFitness;
    creditCheck?: CreditCheck;
    contract?: Contract;
    branch: string | Branch;
    currentVehicle?: string | Vehicle;
    performance?: Performance;
    rentTracking?: RentTracking[];
    statusHistory?: StatusHistoryEntry[];
    approvedBy?: { id: string; name: string; role: string };
    createdAt: string;
    updatedAt: string;
}

// ─── Vehicle Types ──────────────────────────────────────────────────

export interface VehicleBasicDetails {
    make?: string;
    model?: string;
    year?: number;
    category?: string;
    fuelType?: string;
    transmission?: string;
    engineCapacity?: number;
    colour?: string;
    fleetNumber?: string;
    seats?: number;
    vin?: string;
    engineNumber?: string;
    bodyType?: string;
    odometer?: number;
    gpsSerialNumber?: string;
    weeklyRent?: number;
    leaseDurationWeeks?: number;
}

export interface VehicleLegalDocs {
    registrationCertificate?: string;
    registrationNumber?: string;
    registrationExpiry?: string;
    roadTaxExpiry?: string;
    roadworthinessExpiry?: string;
}

export interface VehicleInsuranceDetails {
    insuranceNumber?: string;
    fromDate?: string;
    toDate?: string;
    certificate?: string;
    provider?: string;
    policyType?: string;
    coverageType?: string;
}

export interface VehicleMaintenanceDetails {
    type?: string;
    estimatedCompletionDate?: string;
    maintenanceThresholdKm?: number;
    lastMaintenanceOdometer?: number;
}

export interface Vehicle {
    _id: string;
    status: string;
    basicDetails: VehicleBasicDetails;
    legalDocs?: VehicleLegalDocs;
    insuranceDetails?: VehicleInsuranceDetails;
    maintenanceDetails?: VehicleMaintenanceDetails;
    gpsConfiguration?: {
        isActivated: boolean;
        geofenceZone?: string;
        speedLimitThreshold?: number;
    };
    purchaseDetails?: {
        purchaseReceipt?: string;
        branch?: string | Branch;
    };
    createdAt: string;
    updatedAt: string;
}

// ─── Invoice Types ──────────────────────────────────────────────────

export interface Invoice {
    _id: string;
    driver: string;
    vehicle?: string;
    weekNumber: number;
    weekLabel?: string;
    invoiceNumber?: string;
    baseAmount: number;
    carryOverAmount: number;
    totalAmountDue: number;
    amountPaid: number;
    balance: number;
    status: 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE';
    dueDate: string;
    payments?: Payment[];
    createdAt: string;
}

// ─── Auth Types ─────────────────────────────────────────────────────

export interface AuthUser extends Driver {
    // AuthUser is now just a Driver object for the mobile app
}

export interface LoginResponse {
    success: boolean;
    message: string;
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
    driver: Driver | null;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data?: {
        driverId: string;
        email: string;
    };
}
