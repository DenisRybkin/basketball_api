import {Request, Response} from "express";

export const getIdFromReq = (req : Request) : number | null => req.query.id ?? req.body.id;
export const getIdFromParams = (req : Request) : number | null => +req.params.id;