const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "default-src": ["'self'",'https://plannic-backend.herokuapp.com', 'https://fonts.googleapis.com/', 'https://fonts.gstatic.com'],
        "img-src": ["'self'", '*.googleapis.com', "data:" ],
        "script-src": ["'self'"],
        "style-src": ["'unsafe-inline'", "'self'", "https://fonts.googleapis.com"]
    }
}));

app.use((_, res, next) => {
    res.setHeader(
      "Permissions-Policy"
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