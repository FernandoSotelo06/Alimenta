export default function setupAssociations(models) {
  const {
    Categoria,
    Usuario,
    Ingrediente,
    Etiqueta,
    Receta,
    RecetaIngrediente,
    RecetaEtiqueta,
    Comentario,
    Favorito,
    Like,
  } = models;

  // Categoría - Ingrediente (1:N)
  Categoria.hasMany(Ingrediente, {
    foreignKey: "categoria_id",
    as: "ingredientes",
  });
  Ingrediente.belongsTo(Categoria, {
    foreignKey: "categoria_id",
    as: "categoria",
  });

  // Usuario - Receta (1:N)
  Usuario.hasMany(Receta, {
    foreignKey: "usuario_id",
    as: "recetas",
  });
  Receta.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario",
  });

  // Usuario - Comentario (1:N)
  Usuario.hasMany(Comentario, {
    foreignKey: "usuario_id",
    as: "comentarios",
  });
  Comentario.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario",
  });

  // Receta - Ingrediente (M:N)
  Receta.belongsToMany(Ingrediente, {
    through: RecetaIngrediente,
    foreignKey: "receta_id",
    otherKey: "ingrediente_id",
    as: "ingredientes",
  });
  Ingrediente.belongsToMany(Receta, {
    through: RecetaIngrediente,
    foreignKey: "ingrediente_id",
    otherKey: "receta_id",
    as: "recetas",
  });

  Receta.hasMany(RecetaIngrediente, {
    foreignKey: "receta_id",
    as: "receta_ingredientes",
  });
  RecetaIngrediente.belongsTo(Receta, {
    foreignKey: "receta_id",
    as: "receta",
  });
  Ingrediente.hasMany(RecetaIngrediente, {
    foreignKey: "ingrediente_id",
    as: "receta_ingredientes",
  });
  RecetaIngrediente.belongsTo(Ingrediente, {
    foreignKey: "ingrediente_id",
    as: "ingrediente",
  });

  // Receta - Etiqueta (M:N)
  Receta.belongsToMany(Etiqueta, {
    through: RecetaEtiqueta,
    foreignKey: "receta_id",
    otherKey: "etiqueta_id",
    as: "etiquetas",
  });
  Etiqueta.belongsToMany(Receta, {
    through: RecetaEtiqueta,
    foreignKey: "etiqueta_id",
    otherKey: "receta_id",
    as: "recetas",
  });

  Receta.hasMany(RecetaEtiqueta, {
    foreignKey: "receta_id",
    as: "receta_etiquetas",
  });
  RecetaEtiqueta.belongsTo(Receta, {
    foreignKey: "receta_id",
    as: "receta",
  });
  Etiqueta.hasMany(RecetaEtiqueta, {
    foreignKey: "etiqueta_id",
    as: "receta_etiquetas",
  });
  RecetaEtiqueta.belongsTo(Etiqueta, {
    foreignKey: "etiqueta_id",
    as: "etiqueta",
  });

  // Receta - Comentario (1:N)
  Receta.hasMany(Comentario, {
    foreignKey: "receta_id",
    as: "comentarios",
  });
  Comentario.belongsTo(Receta, {
    foreignKey: "receta_id",
    as: "receta",
  });

  // Comentario - Comentario (Auto-relación)
  Comentario.hasMany(Comentario, {
    foreignKey: "padre_comentario_id",
    as: "respuestas",
  });
  Comentario.belongsTo(Comentario, {
    foreignKey: "padre_comentario_id",
    as: "comentario_padre",
  });

  // Usuario - Receta (Favoritos M:N)
  Usuario.belongsToMany(Receta, {
    through: Favorito,
    foreignKey: "usuario_id",
    otherKey: "receta_id",
    as: "recetas_favoritas",
  });
  Receta.belongsToMany(Usuario, {
    through: Favorito,
    foreignKey: "receta_id",
    otherKey: "usuario_id",
    as: "usuarios_favoritos",
  });

  Usuario.hasMany(Favorito, {
    foreignKey: "usuario_id",
    as: "favoritos",
  });
  Favorito.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario",
  });
  Receta.hasMany(Favorito, {
    foreignKey: "receta_id",
    as: "favoritos",
  });
  Favorito.belongsTo(Receta, {
    foreignKey: "receta_id",
    as: "receta",
  });

  // Usuario - Receta (Likes M:N)
  Usuario.belongsToMany(Receta, {
    through: Like,
    foreignKey: "usuario_id",
    otherKey: "receta_id",
    as: "recetas_con_like",
  });
  Receta.belongsToMany(Usuario, {
    through: Like,
    foreignKey: "receta_id",
    otherKey: "usuario_id",
    as: "usuarios_con_like",
  });

  Usuario.hasMany(Like, {
    foreignKey: "usuario_id",
    as: "likes",
  });
  Like.belongsTo(Usuario, {
    foreignKey: "usuario_id",
    as: "usuario",
  });
  Receta.hasMany(Like, {
    foreignKey: "receta_id",
    as: "likes",
  });
  Like.belongsTo(Receta, {
    foreignKey: "receta_id",
    as: "receta",
  });
}