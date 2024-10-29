require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http'); // SOKET IO
const server = http.createServer(app); // SOKET IO
const { Server } = require("socket.io"); // SOKET IO
const io = new Server(server); // SOKET IO
global.io = io // SOKET IO
const path = require('path'); // TinyMCE
const bodyParser = require('body-parser'); // Body Parser
const methodOverride = require('method-override') // method-override
const flash = require('express-flash') // Flash
const cookieParser = require('cookie-parser') // Flash
const session = require('express-session') // Flash
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour  // Flash
const port = process.env.port || 3000;
const routeClient = require('./routes/client/index.route'); // Route Client
const routeAdmin = require('./routes/admin/index.route');// Route Admin
const database = require('./config/database') // Database Connect

app.use(bodyParser.json()); // create application/json parser
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
})) // Hết Body Parser
app.use(cookieParser('kim-quang')); // Flash
app.use(session({
	cookie: {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
		expires: expiryDate
	}
})); // Flash

app.use(flash()); // Flash
// Hết Flash

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'request.json')
// process.env.GOOGLE_APPLICATION_CREDENTIALS = 'https://res.cloudinary.com/djp6njpi7/raw/upload/v1729683793/request_bozlxi.json'
// console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

routeClient.index(app);
routeAdmin.index(app);

app.use(express.static(`${__dirname}/public`))// Nhúng file tĩnh

app.locals.admin = process.env.admin // App Locals Variable

database.connect()

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// HẾT TinyMCE



// Xử lý 404 - đặt ở cuối cùng
app.use((req, res) => {
	res.status(404).render("client/pages/error/404.pug")
});

// Xử lý 500 - đặt ở cuối cùng
app.use((req, res) => {
	res.status(500).render("client/pages/error/500.pug")
});

server.listen(port, () => {
	console.log(`Đang lắng nghe cổng ${port}`);
});