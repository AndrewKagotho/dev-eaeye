module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    'issue',
    {
      issueId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      updatedAt: false
    }
  )

  return Issue
}
