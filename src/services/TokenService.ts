import {Request} from 'express';
import {UserToken} from "../models";
import {TokensDto} from "../dtos/TokensDto";
import jwt from "jsonwebtoken";
import {UserTokenDto} from "../dtos/UserTokenDto";
import {config} from "../config";


class TokenService{

    getToken (req: Request): string | null {
        return  req.get('Authorization')?.split(' ')[1];
    }

    generateTokens (payload: UserTokenDto, expiresIn : string = '24h') : TokensDto  {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn});
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn : '30d'});
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
        try {
            return jwt.verify(token, config.JWT_ACCESS_SECRET)
        } catch (e) {
            return null;
        }
    };

    validateRefreshToken(token : string) : string | jwt.JwtPayload | null {
        try {
            return jwt.verify(token, config.JWT_REFRESH_SECRET)
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