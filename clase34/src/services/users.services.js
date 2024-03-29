import { userModel } from "../persistencia/mongoDB/models/user.model.js";

class UsersService {
  constructor(model) {
    this.model = model;
  }

  createUser = async (obj) => {
    const newUser = await this.model.create(obj);
    return newUser;
  };

  getUserByEmail = async (userEmail) => {
    const user = await this.model.findOne({ email: userEmail });
    return user;
  };
}
const usersServices = new UsersService(userModel);

export default usersServices;
