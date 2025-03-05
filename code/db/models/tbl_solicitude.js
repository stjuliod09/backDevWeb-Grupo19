const { DataTypes } = require("sequelize");

module.exports = model;
function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  };

  const options = {
    timestamps: false,
  };

  const _model = sequelize.define("tbl_solicitude", attributes, options);

  _model.associate = function (models) {
    _model.belongsTo(models.tbl_cats, {
      as: "cat",
      foreignKey: { name: "cat_id", allowNull: false },
    });
  };

  return _model;
}
