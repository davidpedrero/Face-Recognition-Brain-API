const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'df90a08a0f8146a885c07b428e06742a'
});

const handleAPICall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input
    )
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const hangleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'))

}

module.exports = {
    hangleImage: hangleImage, 
    handleAPICall: handleAPICall
}