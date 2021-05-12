exports.getPing = (req, res) => {
    return res.status(200).send({ message: 'pong' })
}

