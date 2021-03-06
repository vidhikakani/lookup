import bcrypt from "bcrypt";

const user = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [5, 42],
            },
        },
        role: {
            type: DataTypes.STRING,
        },
    });

    User.findByLogin = async (email) => {
        let user = await User.findOne({
            where: { email },
        });

        return user;
    };

    User.beforeCreate(async (user) => {
        user.password = await user.generatePasswordHash();
    });

    User.prototype.generatePasswordHash = async function () {
        const saltRounds = 10;
        return await bcrypt.hash(this.password, saltRounds);
    };

    User.prototype.validatePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    return User;
};

export default user;
