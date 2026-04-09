class BaseService {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model.create(data);
  }

  findById(id) {
    return this.model.findById(id);
  }

  findAll(filter = {}) {
    return this.model.find(filter);
  }

  update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseService;