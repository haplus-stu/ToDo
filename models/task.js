"use strict";
const loader = require("./sequelize-loader");
const Sequelize = loader.Sequelize;

const Task = loader.database.define(
  "task",
  {
    taskId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },

    taskname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status:{
      type:Sequelize.STRING,
      allowNull:false
    },
    tag:{
      type:Sequelize.ARRAY(Sequelize.STRING)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Task;
