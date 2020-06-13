module.exports = (sequelize, Sequelize) => {
    const UserCompany = sequelize.define("user_company", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: 'user',
            // referencesKey: 'id',
            references: {
                model: 'user',
                key: 'id'
            }
        },
        company_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: 'company',
            // referencesKey: 'id',
            references: {
                model: 'company',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    },
        {
            timestamps: false,
            tableName: 'user_company',
            underscored: false,
            indexes: [
                {
                    unique: true,
                    fields: ['user_id', 'company_id']
                }
            ]
        }
    );

    return UserCompany;
};