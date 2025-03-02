import { useQuery } from "@tanstack/react-query";
import {fetchFiles} from "../api/filesAPI";


export const useFiles = () => {
    return useQuery({
        queryKey: ["files"],
        queryFn: fetchFiles,
    });
};