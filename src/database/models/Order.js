const { DataTypes } = require("sequelize");
const { DB } = require("../connect");


class OrderModel {
  constructor() {
    this.db = DB.connection;
    console.log("This is Order")
    this.schema = this.db.define(
      "Orders",
      {
        orderID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userID: {
          type: DataTypes.UUID,
          references: {
            model: 'Users',
            key: "id",
          },
        },
        orderDate: {
          type: DataTypes.DATE,
        },
        totalAmount: {
          type: DataTypes.DECIMAL(10, 2),
        },
        orderStatus: {
          type: DataTypes.ENUM(
            "Initiated",
            "Completed",
            "Failed",
            "Verified",
            "Cancelled"
          ),
        },
        paymentMethod: {
          type: DataTypes.STRING(50),
        },
        paymentAmount: {
          type: DataTypes.DECIMAL(10, 2),
        },
        transactionDate: {
          type: DataTypes.DATE,
        },
        transactionID: {
          type: DataTypes.STRING(50), 
        },
        transactionHash: {
          type: DataTypes.STRING(255), 
        },
        isTransactionVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false, 
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: this.db.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: this.db.literal(
            "CURRENT_TIMESTAMP"
          ),
        },
      },
      {
        hooks: {
          beforeUpdate: (instance) => {
            instance.updatedAt = new Date(); 
          },
        },
      },
    );
  }
}

module.exports = OrderModel;
