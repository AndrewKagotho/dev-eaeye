module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'member',
    {
      nationalId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      updatedAt: false
    }
  )

  return Member
}
