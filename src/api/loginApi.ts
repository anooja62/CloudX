import axiosInstance from "./axiosInstance"

export interface UserLoginRequest {
    email: string;
    username:string;
    image:string;
    sso_id:string;
}

export interface UserLoginResponse {
    message: string;
    user: {
        _id: string;
        sso_id: string;
        username: string;
        email: string;
        image: string;
        bucketName: string;
        created_at: string;
        updated_at: string;
        token: string;
    };
}


export const userLogin = async (userData: UserLoginRequest): Promise<UserLoginResponse> => {
    const response = await axiosInstance.post<UserLoginResponse>("/users/login", userData);
    return response.data;
};
