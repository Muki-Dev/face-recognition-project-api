const clarifai = require('clarifai');


 // You must add your own key from clarifai
const app = new Clarifai.App({
 apiKey: '5cfce8461b8549f3a6f9c8817ea6b5f1'
});

 const  handleApiCall = (req,res) => {
	 app.models.predict('face-detection',req.body.input)
	 .then(data => {
	 	res.json(data)
	 })
	 .catch(err => res.status(400).json('Unable to work with API'))
 }

const imageHandler = (req,res,db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries)
	})
	.catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	imageHandler,
	handleApiCall
};