"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserManager_1 = __importDefault(require("../models/users/manager/UserManager"));
const Users_service_1 = __importDefault(require("../services/Users.service"));
const User_build_1 = __importDefault(require("../models/users/build/User.build"));
class AuthControllers {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, name, confirPassword } = req.body;
            if (!email || !username || !password || !name) {
                return res
                    .status(400)
                    .json({ message: "Please, send all the fields" });
            }
            if (password !== confirPassword) {
                return res.status(400).json({ message: "The passwords do not match" });
            }
            //   const newUser: UserDTO = {
            //     email,
            //     username,
            //     password,
            //     name,
            //     address:'',
            //     avatar:'',
            //     phone:'',
            //     city:'',
            //     country:'',
            //     lastname:''
            //   }
            const newUser = this.userBuilder
                .withEmail(email)
                .withName(name)
                .withPassword(password)
                .withUsername(username)
                .build();
            try {
                const user = yield this.userService.createService(newUser);
                if ("status" in user) {
                    return res
                        .status(user["status"])
                        .json({ message: user["message"] });
                }
                return res.status(201).json(user);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ error: error });
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "Please, send all the fields" });
            }
            try {
                const userLogin = yield this.userService.loginService(email, password);
                if ("status" in userLogin) {
                    return res
                        .status(userLogin["status"])
                        .json({ message: userLogin["message"] });
                }
                return res.status(200).json({ token: userLogin.token });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error });
            }
        });
        this.userManager = UserManager_1.default.getInstance();
        this.userService = Users_service_1.default.getInstance();
        this.userBuilder = new User_build_1.default();
    }
    // registerAdmin = async (req: Request, res: Response) => {
    //    try {
    //       const { email, password, username, confirPassword } = req.body;
    //       if (!email || !password || !username)
    //          return res.status(400).json({ msg: "Please, send all the fields" });
    //       if (password !== confirPassword)
    //          return res.status(400).json({ msg: "The passwords do not match" });
    //       const admin = await this.userManager.createAdmin(
    //          email,
    //          password,
    //          username
    //       );
    //       return res.status(201).json(admin);
    //    } catch (error) {
    //       return res.status(500).json({ error: messageError(error) });
    //    }
    // };
    // updateCredentials = async (req: Request, res: Response) => {
    //    try {
    //       const user = await this.userManager.getById(req.params.id);
    //       if (!user) {
    //          return res.status(404).json({ msg: "The user does not exist" });
    //       }
    //       const updatedUser = await this.userManager.update(
    //          req.params.id,
    //          req.body
    //       );
    //       return res.status(200).json(updatedUser);
    //    } catch (error) {
    //       return res.status(500).json({ error: messageError(error) });
    //    }
    // };
    static getInstance() {
        if (!AuthControllers.instance) {
            AuthControllers.instance = new AuthControllers();
        }
        return AuthControllers.instance;
    }
}
exports.default = AuthControllers;
