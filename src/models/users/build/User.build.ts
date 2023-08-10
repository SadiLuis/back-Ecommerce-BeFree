import IUser from "../interfaces/User.interfaces";

const enum Role {
   ADMIN = "admin",
   USER = "user",
}
class UserBuilder {
   private user: IUser = {} as IUser;

   constructor() {}
   withUsername(username: string): UserBuilder {
      this.user.username = username;
      return this;
   }
   withEmail(email: string): UserBuilder {
      this.user.email = email;
      return this;
   }

   withPassword(password: string): UserBuilder {
      this.user.password = password;
      return this;
   }

   withName(name: string): UserBuilder {
      this.user.name = name;
      return this;
   }

   withLastName(lastName: string): UserBuilder {
      this.user.lastname = lastName;
      return this;
   }

   withRole(role: Role): UserBuilder {
      this.user.role = role;
      return this;
   }
   withAvatar(avatar: string): UserBuilder {
      this.user.avatar = avatar;
      return this;
   }

   withAddress(address: string): UserBuilder {
      this.user.address = address;
      return this;
   }

   withPhone(phone: string): UserBuilder {
      this.user.phone = phone;
      return this;
   }

   withCountry(country: string): UserBuilder {
      this.user.country = country;
      return this;
   }

   withCity(city: string): UserBuilder {
      this.user.city = city;
      return this;
   }

   build(): IUser {
      return this.user;
   }
}

export default UserBuilder;
