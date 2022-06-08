export class LocationDto {
    public name : string;
    public capacity : number;
    public address : string;
    public contact : string;

    constructor(name : string,capacity : number, address : string,contact : string) {
        this.name = name;
        this.capacity = capacity;
        this.address = address;
        this.contact = contact;
    }
}