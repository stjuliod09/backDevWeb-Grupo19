const { DataTypes } = require("sequelize");

module.exports = model;
function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    urlImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_gato: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const _model = sequelize.define("tbl_cat_images", attributes, {});

  _model.associate = function (models) {
    _model.belongsTo(models.tbl_cats, {
      as: "cat",
      foreignKey: { name: "id_gato", allowNull: false },
    });
  };

  return _model;
}
