const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');

	// create application/json parser
app.use(bodyParser.json());

	// method-override
const methodOverride = require('method-override')
	// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// HẾT method-override

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Hết Body Parser

// Flash
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser('kim-quang'));
app.use(session({ cookie: { maxAge: 50000 }}));
app.use(flash());
// Hết Flash

require('dotenv').config();
const port = process.env.port;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// Route Client
const routeClient = require('./routes/client/index.route');
routeClient.index(app);
// HẾT Route Client

// Route Admin
const routeAdmin = require('./routes/admin/index.route');
routeAdmin.index(app);
// HẾT Route Admin

// Nhúng file tĩnh
app.use(express.static(`${__dirname}/public`))

// App Locals Variable
app.locals.admin = process.env.admin

// Database Connect
const database = require('./config/database')
database.connect()

// TinyMCE
const path = require('path');
	/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// HẾT TinyMCE

app.listen(port, () => {
	console.log(`Đang lắng nghe cổng ${port}`);
});