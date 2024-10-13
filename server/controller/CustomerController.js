class CustomerController {

    index(req, res, next) {
        const sql = `SELECT * FROM Customer`;
        db.query(sql, (err, result) => {
            if (err) return next(err);
            return res.json(result);
        })
    }

    create(req, res, next) {
        const sql = 'INSERT INTO customer (`AVATAR`,`CUSTOMER_NAME`, `CUSTOMER_EMAIL`, `CUSTOMER_PASSWORD`) VALUES (?, ?, ?, ?)';
        const values = [
            req.body.avatar,
            req.body.name,
            req.body.email,
            req.body.password
        ]
        db.query(sql, values, (err, result) => {
            if (err) return next(err);
            return res.json(result);
        })
    }

    update(req, res, next) {

    }

    delete(req, res, next) {

    }


}

export default CustomerController;