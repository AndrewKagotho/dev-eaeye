module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'book',
    {
      isbn: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      fee: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  )

  return Book
}
