const db = require("../models");
const Record = db.records;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    //Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content canot be empty!",
            // echo: `${JSON.stringify(req.body)}`
        });
        return;
    }

    // Create a record
    const record = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // save Record in the database
    Record.create(record)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Record."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Record.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occourred while retriving record"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Record.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retriving with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Record.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "DB was updated successfully."  // 
            });
        } else {
            res.send({
                message: `Cannot update with id=${id}. Maybe its not found or req.body is empty`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Record.destroy({
        where: { id:id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Record was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete with id=${id}. Maybe it wasnt found`
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Record.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Objects deleted successfully`})
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error removeing all occourred"
        });
    });
};

exports.findAllPublished = (req, res) => {
    Record.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occourred retriving all published"
            });
        });
};