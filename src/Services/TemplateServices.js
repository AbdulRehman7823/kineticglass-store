import GenericService from "./GenericService";
import axios from "axios";
class TemplateServices extends GenericService {
  constructor() {
    super();
  }

  getAllUserTemplates = (id) => this.get(`site/${id}`);
  updateTemplate = (id, data) => this.put(`site/${id}`, data);
  deleteTemplate = (id) => this.delete(`site/${id}`);
  getAllTemplates = ()=> this.get("site/");
  getTemplateById = (id) => this.get(`site/template/${id}`);
}
let templateServices = new TemplateServices();
export default templateServices;
