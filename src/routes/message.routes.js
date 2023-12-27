import { Router } from "express"; 
import MessageDao from "../daos/dbManager/message.dao.js";

const messageRouter = Router();
const messagesDao = new MessageDao();

messageRouter.get('/messages', (req, res) => {
    const messages = messagesDao.getAllMessages();
    res.json(messages);
  });
  
  messageRouter.post('/messages', (req, res) => {
    const message = req.body.message;
    messagesDao.addMessage(message);
    io.emit('chat message', message); // Emitir el mensaje a todos los clientes conectados
    res.sendStatus(200);
  });
  
//? Mostrar el mesanje por pantalla
messageRouter.get('/messages/:id', async(req, res)=>{
    try {
        const message = await messagesDao.getAllMessages(req.params.id);

        if(!message){
            return res.status(404).json({error: 'Mensaje no encontrado'})
        }
        messagesDao.mostrarMensaje(message)
    } catch (error) {  
        console.error('Error en la ruta para mostrar el mensaje',error);
        res.status(500).json({error:'Error interno al servidor'});

    }
})
export default messageRouter;