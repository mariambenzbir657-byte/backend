const Service = require("../models/Service");

// Add service
exports.ajouterService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("idBabySitter");
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by babysitter
exports.getServicesByBabySitter = async (req, res) => {
  try {
    const services = await Service.find({ idBabySitter: req.params.id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
