import bcrypt from 'bcrypt-nodejs'

export default (sequelize, dataType) => {
    let user = sequelize.define('user', {
        id: {
            type: dataType.BIGINT(12),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '用户编号'
        },
        name: {
            type: dataType.STRING,
            allowNull: false,
            comment: '名字'
        },
        email: {
            type: dataType.STRING,
            allowNull: false,
            comment: '邮箱'
        },
        password: {
            type: dataType.STRING,
            allowNull: false,
            comment: '密码'
        },
        nick: {
            type: dataType.STRING,
            allowNull: false,
            comment: '昵称'
        },
        motto: {
            type: dataType.STRING,
            allowNull: true,
            comment: '座右铭'
        },
        avatar: {
            type: dataType.STRING,
            allowNull: true,
            comment: '头像'
        },
        score: {
            type: dataType.BIGINT(12),
            allowNull: true,
            defaultValue: 2000,
            comment: '积分'
        },
        createTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: '创建时间'
        },
        lastUpdateTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: '上一次修改信息时间'
        },
        lastLoginTime: {
            type: dataType.DATE,
            allowNull: false,
            defaultValue: dataType.NOW,
            comment: '上一次登录时间'
        },
        lastLoginIp: {
            type: dataType.STRING,
            allowNull: false,
            comment: '上一次登录ip'
        }
    }, {
        instanceMethods: {
            checkPassword(password) {
                return bcrypt.compareSync(password, this.password)
            }
        },
        setterMethods: {
            password(password) {
                password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                this.setDataValue('password', password);
            }
        },
        classMethods: {
            associate: function(models) {
                user.hasMany(models.topic);
                user.hasMany(models.comment);
            }
        }
    })
    return user
}
