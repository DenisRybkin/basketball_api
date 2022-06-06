import {Request} from 'express';
import {UserToken} from "../models";
import {TokensDto} from "../dtos/TokensDto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {UserTokenDto} from "../dtos/UserTokenDto";


class TokenService{


    getToken (req: Request): string | null {
        return  req.get('Authorization')?.split(' ')[1];
    }

    generateTokens (payload: UserTokenDto, expiresIn : string = '24h') : TokensDto  {
        dotenv.config();
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn : '30d'});
        return {
            accessToken,
            refreshToken
        }
    };

    async saveToken (userId : number, refreshToken : string) : Promise<UserToken> {
        const tokenData = await UserToken.findOne({ where: { userId : +userId } });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await UserToken.create({userId, refreshToken});
    }

    validateAccessToken(token : string) : string | jwt.JwtPayload | null {
        dotenv.config();
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null;
        }
    };

    validateRefreshToken(token : string) : string | jwt.JwtPayload | null {
        dotenv.config();
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null;
        }
    };

    async removeToken (refreshToken : string) : Promise<number> {
        return await UserToken.destroy({where : {refreshToken}});
    }

    async findToken(refreshToken : string) {
        return await UserToken.findOne({ where : {refreshToken}});
    }
}

export const tokenService = new TokenService();