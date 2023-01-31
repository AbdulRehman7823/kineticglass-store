import GenericService from "./GenericService";
class PaymentServices extends GenericService {
  constructor() {
    super();
  }
   
  doPayment = (data)=> this.post(`/stripe/payment`,data);
  withdraw = (accountId)=> this.post(`/stripe/withdraw/${accountId}`)
  managePayout = (id) =>this.post(`/stripe/managePayout/${id}`);
}
let paymentServices = new PaymentServices();
export default paymentServices;
