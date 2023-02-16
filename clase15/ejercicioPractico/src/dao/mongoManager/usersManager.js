import { userModel } from "../models/users.model.js";

export default class UsersManager{
    async getAllUsers(){
        try {
            const userDB = await userModel.find()
            return userDB
        } catch (error) {
            
        }
    }
    async createUsers(){
        try {
            const userDB = await userModel.create()
            return userDB
        } catch (error) {
            
        }
    }
}