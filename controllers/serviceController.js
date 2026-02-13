const Service = require("../models/Service");

// ➕ Ajouter service (BabySitter seulement)
exports.ajouterService = async (req, res) => {
  try {
    const service = new Service({
      ...req.body,
      idBabySitter: req.user.id // lien avec le babysitter connecté
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 📄 Get all services (public)
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("idBabySitter", "nom email");
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Get services by babysitter (public)
exports.getServicesByBabySitter = async (req, res) => {
  try {
    const services = await Service.find({ idBabySitter: req.params.id }).populate("idBabySitter");
    res.json(services);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};


// ✏️ Update service (owner ou admin)
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Ownership check
    if (req.user.role !== "Admin" && service.idBabySitter.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    Object.assign(service, req.body);
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ❌ Delete service (owner ou admin)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Ownership check
    if (req.user.role !== "Admin" && service.idBabySitter.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
