module.exports = (sequelize, Sequelize) => {
    const Relationship = sequelize.define("relationship", {
        first_party: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: 'company', 
            // referencesKey: 'id' 
            references: {
                model: 'company',
                key: 'id'
            }
        },
        second_party: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: 'company', 
            // referencesKey: 'id' ,
            references: {
                model: 'company',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: 'relationship',
        underscored: false,
        indexes: [
            {
                unique: true,
                fields: ['second_party', 'first_party']
            }
        ]
    });

    return Relationship;
};