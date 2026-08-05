export interface Doctor {
    _id?: string;
    userId: string | { _id: string; fullName: string; email: string };
    specialization: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}
