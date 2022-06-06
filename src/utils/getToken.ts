import { Request } from 'express';
export const getToken =  (req: Request): string | null => req.headers.authorization?.split(' ')[1];