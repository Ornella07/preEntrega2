import { messageModel } from "../../models/message.model.js";

class MessageDao{
    constructor(){
        this.messages = [];
    }
    getAllMessages(){
        return this.messages;
    }
    addMessage(){
        this.messages.push(message);
    }
    mostrarMensaje(message){
        console.log(message)
    }
}

export default MessageDao;