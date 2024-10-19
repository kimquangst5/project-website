require('dotenv').config();
const express = require('express');
const app = express();

// SOKET IO
const http = require('http');
const server = http.createServer(app);
const {
	Server
} = require("socket.io");
const io = new Server(server);
global.io = io
// HẾT SOCKET IO

const path = require('path'); // TinyMCE
const bodyParser = require('body-parser'); // Body Parser
const methodOverride = require('method-override') // method-override

app.use(bodyParser.json()); // create application/json parser
app.use(methodOverride('_method')) // override with POST having ?_method=DELETE

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))
// Hết Body Parser

// Flash
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser('kim-quang'));
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
	cookie: {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
		expires: expiryDate
	}
}));

app.use(flash());
// Hết Flash

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

// ReCapCha
// process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'json', 'kim-quang.json');
// process.env.GOOGLE_APPLICATION_CREDENTIALS = `${__dirname}/serviceAccountKeyKimQuang.json`

// const admin = require('firebase-admin');

// Kiểm tra xem Firebase đã được khởi tạo chưa
// console.log(admin.apps.length)

// if (!admin.apps.length) {
// 	const serviceAccount = require('./json/kim-quang.json');
// 	admin.initializeApp({
// 		credential: admin.credential.cert(serviceAccount),
// 		storageBucket: 'project-backend-quangtk2005.appspot.com' // Thay 'your-project-id' bằng project ID của bạn
// 	});
// }


// const axios = require('axios');
// const fs = require('fs'); // Thêm dòng này để sử dụng fs


// const bucket = admin.storage().bucket();

// const getURL = async () => {
// 	const getFilePublicUrl = async () => {
// 		const file = bucket.file('json/kim-quang.json');
// 		const [url] = await file.getSignedUrl({
// 			action: 'read',
// 			expires: Date.now() + 24 * 60 * 60 * 1000, // Link sẽ hết hạn sau 24 giờ
// 		});
// 		return url;
// 	}
// 	const url = await getFilePublicUrl();


	
// 	const filePath = path.join(__dirname, 'serviceAccountKeyKimQuang.json');
// 	if (fs.existsSync(filePath)) {
// 		process.env.GOOGLE_APPLICATION_CREDENTIALS = filePath
// 		const reCapcha = require("./utils/reCapcha.util")
// 		reCapcha();
// 	} else {
// 		console.log("ok")
// 		const downloadServiceAccountFile = async () => {
// 			console.log(url)
// 			const response = await axios.get(url, {
// 				responseType: 'stream'
// 			});
// 			console.log(url)
// 			const writer = fs.createWriteStream(filePath);
// 			response.data.pipe(writer);
	
// 			return new Promise((resolve, reject) => {
// 				writer.on('finish', () => resolve(filePath));
// 				writer.on('error', reject);
// 			});
// 		};
// 		downloadServiceAccountFile();
// 	}
// }
// getURL();

// App Locals Variable
app.locals.admin = process.env.admin

// Database Connect
const database = require('./config/database')
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