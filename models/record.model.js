module.exports = (sequelize, Sequelize) => {
    const Record = sequelize.define("record", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Record;
}