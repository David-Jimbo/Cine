'use strict';
module.exports = (sequelize, DataTypes) => {
  const persona = sequelize.define('persona', {
    cedula: DataTypes.STRING,
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    fecha_nac: DataTypes.DATEONLY,
    external_id: DataTypes.UUID,
    correo: DataTypes.STRING,
    clave: DataTypes.STRING
  }, {});
  persona.associate = function(models) {
    // associations can be defined here
  };
  return persona;
};