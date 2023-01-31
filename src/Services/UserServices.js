import GenericService from "./GenericService";
class UserServices extends GenericService {
  constructor() {
    super();
  }
   
  getUserById = (id)=> this.get(`/user/${id}`);
}
let userServices = new UserServices();
export default userServices;
