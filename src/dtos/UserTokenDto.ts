export class UserTokenDto {
    public email : string;
    public firstName : string;
    public role: number;

    constructor(email : string, firstName : string,role: number) {
        this.email = email;
        this.firstName = firstName;
        this.role = role;
    }
}