import axiosInstance from './axiosInstance';
import { AxiosProgressEvent } from 'axios';

export interface File {
    _id: string | null;
    file_name: string | null;
    key: string;
    url: string;
    size: number;
    size_formatted: string;
    mime_type: string;
    created_at: string;
}

export interface FileResponse {
    files: File[];
}

export const fetchFiles = async (): Promise<File[]> => {
    const response = await axiosInstance.get<FileResponse>('/files');
    return response.data.files;
};

export const uploadFile = async (files: Blob[] | File[], onProgress?: (progress: number) => void): Promise<void> => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("file", file as Blob); // Ensure your backend expects "file" (not "files" unless specified)
    });

    try {
        const response = await axiosInstance.post("/files/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
                );
                if (onProgress) {
                    onProgress(percentCompleted); // Call progress callback
                }
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading files:", error);
        throw error;
    }
};
