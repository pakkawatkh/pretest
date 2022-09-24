export class UserModel {
    userId?: number;
    userName?: string;
    email?: string;
    nickName?: string;
    password?: string;
}
export interface LoginResponse{
    token: string;
}

export interface User extends UserModel {

}