const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["'self'",'https://plannic-back.herokuapp.com', 'https://plannic.herokuapp.com', 'https://api.telegram.org', 'https://fonts.googleapis.com/', 'https://fonts.gstatic.com', 'https://securepubads.g.doubleclick.net/'],
        "img-src": ["'self'", 'https://plannic.herokuapp.com', 'https://api.telegram.org', '*.googleapis.com', "data:" ],
        "script-src": ["'self'", 'https://plannic.herokuapp.com', 'https://api.telegram.org', 'https://cdnjs.cloudflare.com'],
        "style-src": ["'unsafe-inline'", "'self'", "https://fonts.googleapis.com", 'https://cdnjs.cloudflare.com']
    }
}));

app.use((_, res, next) => {
    res.setHeader(
      "Permissions-Policy",
      'geolocation=(self)'
    );
    next();
});

app.use(express.static(`${__dirname}/dist/plannic`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/plannic/index.html`));
});

const PORT = process.env.PORT || 4200;
	app.listen(PORT, function () {
 	});
