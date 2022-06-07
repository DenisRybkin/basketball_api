export class TournamentDto {
    public name : string;
    public address : string;
    public userId : number;

    constructor(name : string, address : string,userId : number) {
        this.name = name;
        this.address = address;
        this.userId = userId;

    }
}