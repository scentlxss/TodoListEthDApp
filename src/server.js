const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname,'app'))); // express.static('app'));


app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname,'app/index.html'));
});

app.get('*', (req,res) => {
	res.status(404);
	res.send('404 NOT FOUND');
});

app.listen(PORT, () => {
	console.log(`directory ${__dirname}`);
	console.log(`Listening on port ${PORT}`); 
});
