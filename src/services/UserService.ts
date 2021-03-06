import {Team, User} from "../models";
import bcrypt from 'bcrypt';
import {tokenService} from "./TokenService";
import {UserTokenDto} from "../dtos/UserTokenDto";
import {TokensDto} from "../dtos/TokensDto";
import {UserAttrs} from "../models/user";
import {ApiError} from "../exceptions/apiError";

class UserService {

    async refreshToken (email : string, firstName : string,role : number, userId : number) : Promise<TokensDto> {
        const userTokenDto = new UserTokenDto(email,firstName,role);
        const tokens = tokenService.generateTokens({...userTokenDto});
        // await tokenService.saveToken(userId, tokens.refreshToken);
        return tokens;
    }

    async getAll () : Promise<User[] | null> {
        return await User.findAll();
    };

    async getById (id ?: number) : Promise<User | null> {
        return await User.findByPk(+id);
    };

    async getAllWithTeam () : Promise<User[] | null> {
        return await User.findAll({include: [
                {model: Team, identifier: "teamId", as: 'userTeam'}]});
    };

    async getByIdWithTeam (id ?: number) : Promise<User | null> {
        return await User.findOne({where : {id}, include: [
                {model: Team, identifier: "teamId", as: 'userTeam'}]});
    };


    async update (userId : number,user : User) : Promise<[affectedCount: number]> {
        return await User.update(
            {...user},
            {where: { id: userId }}
        );
    };


    async remove (userId : number) : Promise<number | null> {
        return await User.destroy({where : {id : userId}})
    };

    async signup (userAttrs : UserAttrs) : Promise<{user : User , tokens : TokensDto}> {
        const { password, email, firstName, role } = userAttrs;

        const candidate = await User.findOne({where : { email }})
        if(candidate) throw ApiError.BadRequest(`'User with this email already exists'`)

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await User.create({...userAttrs, password : hashPassword, role : userAttrs.role ?? 1});

        const tokens = await this.refreshToken(email,firstName,role,user.id);
        return {user, tokens};
    };

    async login (email : string, password : string) : Promise<{user : User , tokens : TokensDto}> {
        const candidate = await User.findOne({where : { email }});
        if(!candidate) throw ApiError.BadRequest(`???????????????????????? ?? email ${email} ???? ?????? ????????????`)

        const isPassEqual = await bcrypt.compare(password,candidate.password);
        if(!isPassEqual) throw ApiError.BadRequest(`???????????????? ????????????`);

        const tokens = await this.refreshToken(email,candidate.firstName,candidate.id,candidate.role);

        return {user : candidate, tokens};
    };

    // async logout (refreshToken : string) : Promise<number> {
    //     return await tokenService.removeToken(refreshToken);
    // };

    async refresh(refreshToken : string) {
        if(!refreshToken) throw ApiError.UnauthorizedError();
        const validToken = tokenService.validateRefreshToken(refreshToken);
        const userData = await tokenService.findToken(refreshToken);

        if(!validToken || !userData) throw ApiError.UnauthorizedError();

        const user = await User.findByPk(userData.userId);

        const tokens = await this.refreshToken(user.email,user.firstName,user.id,user.role);

        return {user, tokens};
    }

}
export const userService = new UserService();