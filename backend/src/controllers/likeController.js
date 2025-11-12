import models from '../models/index.js'

export const likeRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const existingLike = await models.Like.findOne({
      where: {
        usuario_id: userId,
        receta_id: recipeId,
      },
    });

    if (existingLike) {
      await existingLike.destroy();
      return res.status(200).json({ liked: false, message: "Like eliminado" });
    } else {
      await models.Like.create({
        usuario_id: userId,
        receta_id: recipeId,
      });
      return res.status(200).json({ liked: true, message: "Like agregado" });
    }
  } catch (error) {
    console.error("Error al dar like:", error);
    return res.status(500).json({ message: "Error al procesar el like", error: error.message });
  }
};
