
import axiosInstance from './axiosInstance';

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
