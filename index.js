"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const server = new server_1.default();
require('dotenv').config();
// Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default({ useTempFiles: true }));
//Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
// Conectar DB
//mongoose.connect('mongodb://localhost:27017/fotosgram', 
//mongoose.connect('mongodb+srv://elabarca:Tele7607832@cluster0-mx812.mongodb.net/photogram?retryWrites=true&w=majority', 
mongoose_1.default.connect(process.env.DB_URL, { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE ');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
/*
//ler localhost de variables y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

server.app.listen(port, host, () => {
  console.log(`Servidor corriendo en puerto ${ port }`);
});
*/ 
