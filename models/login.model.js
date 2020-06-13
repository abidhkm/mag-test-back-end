module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define("login", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            // references: 'user', // <<< Note, its table's name, not object name
            // referencesKey: 'id' // <<< 
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'login',
        underscored: false
    });

    return Login;
};