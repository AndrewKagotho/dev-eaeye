module.exports = (sequelize, DataTypes) => {
  const Return = sequelize.define(
    'return',
    {
      returnId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      issueId: DataTypes.INTEGER,
      issuedDate: DataTypes.DATE,
      bookIsbn: DataTypes.INTEGER,
      memberNationalId: DataTypes.INTEGER,
      pay: DataTypes.INTEGER
    },
    {
      createdAt: 'returnDate',
      updatedAt: false
    }
  )

  return Return
}
