import { fetchFiles, uploadFile } from "../api/filesAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFiles = () => {
    return useQuery({
        queryKey: ["files"],
        queryFn: fetchFiles,
    });
};
// export const useFiles = () => {
//     return useQuery<UploadedFile[]>({
//       queryKey: ["files"],
//       queryFn: fetchFiles,
//       initialData: [], 
//     });
//   };
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
// export const useUploadFile = () => {
//     const queryClient = useQueryClient();
  
//     return useMutation<UploadedFile, Error, File>({
//       mutationFn: uploadFile,
//       onSuccess: (uploadedFile) => {
//         console.log("Uploaded file:", uploadedFile); // ✅ Log the newly uploaded file
//         queryClient.invalidateQueries({ queryKey: ["files"] });
//       },
//     });
//   };
  
  
