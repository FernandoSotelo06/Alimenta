import { sequelize } from '../config/db.js'

import CategoriaModel from "./Categoria.js";
import UsuarioModel from "./Usuario.js";
import IngredienteModel from "./Ingrediente.js";
import EtiquetaModel from "./Etiqueta.js";
import RecetaModel from "./Receta.js";
import RecetaIngredienteModel from "./RecetaIngrediente.js";
import RecetaEtiquetaModel from "./RecetaEtiqueta.js";
import ComentarioModel from "./Comentario.js";
import FavoritoModel from "./Favorito.js";
import LikeModel from "./Like.js";
import setupAssociations from "./associations.js";

const models = {
  Categoria: CategoriaModel(sequelize),
  Usuario: UsuarioModel(sequelize),
  Ingrediente: IngredienteModel(sequelize),
  Etiqueta: EtiquetaModel(sequelize),
  Receta: RecetaModel(sequelize),
  RecetaIngrediente: RecetaIngredienteModel(sequelize),
  RecetaEtiqueta: RecetaEtiquetaModel(sequelize),
  Comentario: ComentarioModel(sequelize),
  Favorito: FavoritoModel(sequelize),
  Like: LikeModel(sequelize),
};

setupAssociations(models);

export { sequelize };
export default models;