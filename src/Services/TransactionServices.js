import GenericService from "./GenericService";
class TransactionServices extends GenericService {
  constructor() {
    super();
  }
   
  getAllTransactions = (id)=> this.get(`/transactions/${id}`);
}
let transactionServices = new TransactionServices();
export default transactionServices;
