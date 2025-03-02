
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


// export const uploadFile = async (file: File): Promise<void> => {
//     const formData = new FormData();
//     formData.append("file", file); // Ensure the key matches backend expectations

//     try {
//         const response = await axiosInstance.post("/files/upload", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data", // Do not manually set boundary
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         throw error;
//     }
// };

export const uploadFile = async (file: Blob | File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file); // ✅ Now expects a real `File` object

    try {
        const response = await axiosInstance.post("/files/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};


