class MessageModel{
    title:string;
    question:string;
    messageId?:number;
    userEmail?:string;
    adminEmail?:string;
    response?:string;
    closed?:string;

    constructor(title:string,question:string){
this.title=title;
this.question=question;
    }
}
export default MessageModel;