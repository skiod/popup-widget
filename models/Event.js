module.exports = (sequelize, DataTypes) => {
  
  const Event = sequelize.define('event', {
      uuid : DataTypes.STRING,
      event : DataTypes.STRING,
      },{underscored: true}
    );
  return Event
}