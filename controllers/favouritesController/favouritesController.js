import Favourite from "../../models/Favourites.js";

const controller = {
  getFavourites: async (req, res) => {
    try {
      const user_id = req.user._id;
      const favourites = await Favourite.find({ user_id }).populate("store_id");
      return res.status(200).json({
        success: true,
        favourites,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "Favoritos no encontrados",
      });
    }
  },

  addFavourites: async (req, res, next) => {
    try {
      req.body.user_id = req.user._id;
      req.body.store_id = req.params.shopid;
      const favourites = await Favourite.find({
        store_id: req.params.shopid,
        user_id: req.user._id
      }).populate("store_id");
      if (!favourites.length) {
        await Favourite.create(req.body);
        return res.status(201).json({
          success: true,
          message: "Tienda añadida a favoritos",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "La tienda ya está en favoritos",
        });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteFavourite: async (req, res, next) => {
    try {
      await Favourite.findOneAndDelete({
        store_id: req.params.shopid,
        user_id: req.user._id,
      });
      return res.status(200).json({
        success: true,
        message: "Tienda eliminada de favoritos",
      });
    } catch (error) {
      next(error);
    }
  },

  deleteAll: async (req, res, next) => {
    try {
      await Favourite.deleteMany({ user_id: req.user._id });
      return res.status(200).json({
        success: true,
        message: "Favouritos limpios",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default controller;
