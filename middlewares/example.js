let exampleMWare = (req, res, next) => {
    req.user = {"fname" : "Ranvijay", "lname": "rana"};
    next();
}

module.exports = {
    exampleMWare: exampleMWare
}