const hooks = require('./hooks');
const { Model } = require('sequelize');

class Revision extends Model {
  static fields(DataTypes) {
    const { DATE, ENUM, JSON } = DataTypes;
    return {
      entity: {
        type: ENUM,
        values: ['ACTIVITY', 'COURSE', 'TEACHING_ELEMENT'],
        allowNull: false
      },
      operation: {
        type: ENUM,
        values: ['CREATE', 'UPDATE', 'REMOVE'],
        allowNull: false
      },
      state: {
        type: JSON,
        allowNull: true,
        validate: { notEmpty: true }
      },
      createdAt: {
        type: DATE,
        field: 'created_at'
      },
      updatedAt: {
        type: DATE,
        field: 'updated_at'
      }
    };
  }

  static associate({ Course, User }) {
    Revision.belongsTo(Course, {
      foreignKey: { name: 'courseId', field: 'course_id' }
    });
    Revision.belongsTo(User, {
      foreignKey: { name: 'userId', field: 'user_id' }
    });
  }

  static hooks(models) {
    hooks.add(Revision, models);
  }

  static options() {
    return { freezeTableName: true };
  }
}

module.exports = Revision;
