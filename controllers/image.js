const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b80d1c2ed23944e58a8ad8aeb3a5162f'
});

const handleApiCall = (req, res) => {
	  app.models
	  	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input, {language: 'zh'})
	  	.then(data => {
	  		res.json(data);
	  	})
	  	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db	) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};