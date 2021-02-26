const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(`${__dirname}/dist/plannic`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/plannic/index.html`));
});

const PORT = process.env.PORT || 4200;
	app.listen(PORT, function () {
 	});