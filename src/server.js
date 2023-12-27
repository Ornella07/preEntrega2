
import express from "express";
import _dirname from "./dirname.js";

import mongoose from "mongoose";
import handlebars, { create } from "express-handlebars";
import { Server, Socket } from 'socket.io';

//Routes
import productRouter from "./routes/product.routes.js";
import viewsRouter from "./routes/views.routes.js";
import cartRouter from "./routes/cart.routes.js";
import messageRouter from "./routes/message.routes.js";
import { createServer } from 'node:http';

const port = 5000;
const app = express();
const server = createServer(app)
const io = new Server(server);


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(express.static('public'))
// app.use('/static', express.static('public'))
app.use(express.static(_dirname + '/public'))


//Rutas
app.use("/api/products", productRouter)
app.use('/messages', messageRouter)
// app.use('/cart', cartRouter);

app.use("/", viewsRouter)

//Handlebars
app.engine('hbs', handlebars.engine(
    {
        extname: ".hbs",
        defaultLayout: "main"
    }
));

app.set("view engine", "hbs")
app.set("views", _dirname + "/views");

// const messagesDao = new messageDao()

const messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    console.log(data);
    messages.push(data);
    io.emit("messages", messages);
  });

 io.on("inicio", (data) => {
    io.emit("messages", messages);
    socket.broadcast.emit("connected", data);
  });

  socket.emit("messages", messages);
});

//Mongoose
mongoose.connect('mongodb+srv://OrneSereno:Sarasa0801@cluster0.fowy4qs.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log("Conectado a DB"))
.catch((err) => console.log(err))

//Iniciar
server.listen(port, () => {
    console.log(`Se Inicio el servidor ${port}`)
});