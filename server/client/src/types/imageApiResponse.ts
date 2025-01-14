export interface Image {
    _id: string;
    caption: string;
    description: string;
    url: string;
    publicId: string;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    __v: number;
}

export interface ImageApiResponse {
    success: boolean;
    currentPage: number;
    totalImages: number;
    totalPages: number;
    images: Image[];
    user: User;
}
