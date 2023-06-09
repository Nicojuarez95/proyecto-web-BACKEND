import Shop from '../../models/Shop.js'

const controller = {
    update: async (req,res,next) => {
        try{
            let shop = await Shop.findOneAndUpdate(
                { user_id: req.user._id },
                req.body,
                { new: true }
            )
            if(shop){
                return res.status(200).json({
                    message: "Tienda actualizada",
                    success: true,
                    shop
                })
            }
            return res.status(404).json({
                success: false,
                message: 'Tienda no encontrada'
            })
        }catch(err){
            next(err)
        }
    }
}

export default controller