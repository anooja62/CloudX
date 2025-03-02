import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin, UserLoginRequest, UserLoginResponse } from "../api/loginApi";

export const useLoginUser = () => {
    const queryClient = useQueryClient();

    return useMutation<UserLoginResponse, Error, UserLoginRequest>({
        mutationFn: (userData) => userLogin(userData),
        onSuccess: (data) => {
            localStorage.setItem("token", data.user.token); 
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });
};
