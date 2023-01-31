import GenericService from "./GenericService";
class ContributionService extends GenericService {
  constructor() {
    super();
  }

  addContribution = (id, data) => this.post(`contribution/${id}`, data);
  getAllUserContributions = (id) => this.get(`contribution/${id}`);
  updateContribution = (id, data) => this.put(`contribution/${id}`, data);
  deleteContribution = (id) => this.delete(`contribution/${id}`);
  getAllContributions = ()=> this.get("contribution/");
}
let contributionServices = new ContributionService();
export default contributionServices;
