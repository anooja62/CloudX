import { fetchFiles, uploadFile } from "../api/filesAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFiles = () => {
    return useQuery({
        queryKey: ["files"],
        queryFn: fetchFiles,
    });
};

export const useUploadFile = () => {
    const queryClient = useQueryClient(); // To refresh the file list after upload

    return useMutation({
        mutationFn: uploadFile,
        onSuccess: () => {
            // Corrected query invalidation
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
    });
};
