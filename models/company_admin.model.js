module.exports = (sequelize, Sequelize) => {
    const CompanyAdmin = sequelize.define("company_admin", {
        company_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            // references: 'company', 
            // referencesKey: 'id' 
            references: {
                model: 'company',
                key: 'id'
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: 'user', 
            // referencesKey: 'id' ,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    }, {
        timestamps: false,
        tableName: 'company_admin',
        underscored: false
    });

    return CompanyAdmin;
};