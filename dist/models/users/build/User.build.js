"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserBuilder {
    constructor() {
        this.user = {};
    }
    withUsername(username) {
        this.user.username = username;
        return this;
    }
    withEmail(email) {
        this.user.email = email;
        return this;
    }
    withPassword(password) {
        this.user.password = password;
        return this;
    }
    withName(name) {
        this.user.name = name;
        return this;
    }
    withLastName(lastName) {
        this.user.lastname = lastName;
        return this;
    }
    withRole(role) {
        this.user.role = role;
        return this;
    }
    withAvatar(avatar) {
        this.user.avatar = avatar;
        return this;
    }
    withAddress(address) {
        this.user.address = address;
        return this;
    }
    withPhone(phone) {
        this.user.phone = phone;
        return this;
    }
    withCountry(country) {
        this.user.country = country;
        return this;
    }
    withCity(city) {
        this.user.city = city;
        return this;
    }
    build() {
        return this.user;
    }
}
exports.default = UserBuilder;
