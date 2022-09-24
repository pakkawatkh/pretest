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