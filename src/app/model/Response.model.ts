export interface okResponse {
   message: string;
}
export interface  errorResponse {
    error: {
        message: string;
        status: number;
        timestamp: Date;
    },
    status: number;
}

export interface IChatResponse{

}
export interface IChatMessage{
    message?: string;
    from?: string;
    created?: Date;

}