export class UserTokenDto {
    public email : string;
    public firstName : string;

    constructor(email : string, firstName : string) {
        this.email = email;
        this.firstName = firstName;

    }
}