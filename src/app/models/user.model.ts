/**
 * The User model
 */
export interface User {
    id: number;
    name?: String;
    email?: String;
    address?: Address;
    company?: Company;
    phone?: String;
    username?: String;
    website?:String;
}
/**
 * The Address model
 */
export interface Address {
    street?: String;
    suite?: String;
    city?: String;
    zipcode?: String;
    geo?: Geo;
}
/**
 * The Company model
 */
export interface Company {
    name: String;
    catchPhrase: String;
    bs: String;
}
/**
 * The Geo model
 */
export interface Geo {
    lat: String;
    lng: String;
}