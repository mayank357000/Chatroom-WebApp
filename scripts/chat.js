//dom queries
const chatlist =document.querySelector('.chat-list');
const newChatForm=document.querySelector('.new-chat');
const newNameForm=document.querySelector('.new-name');
const updateMssg=document.querySelector('.update-mssg');
const rooms=document.querySelector('.chat-rooms');

//class instances
const chatUI=new ChatUI(chatlist);

const username=localStorage.username?localStorage.username:"anonymous";
const chatroom=new Chatroom('general',username);


//get new chats to render to dom
chatroom.getChats((data)=>{//sirf ek hi baar call hoga shuru main bs,so listener daal diya add krne ko jisse initally items dal jae
    chatUI.render(data);
});

//adding new chats on input action
newChatForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message=newChatForm.message.value.trim();
    chatroom.addChat(message)//async method
     .then(()=>newChatForm.reset())
     .catch((err)=>console.log(err));
})


newNameForm.addEventListener('submit',e=>{
 e.preventDefault();
 const newName=newNameForm.name.value.trim();
 chatroom.updateName(newName);
 newNameForm.reset();
 updateMssg.innerText=`Your name has been updated to ${newName}`;
 setTimeout(()=>updateMssg.innerHTML='',3000);
})

rooms.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON')//event delegation
    {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    //lsitener band and change and then ye callback called
    chatroom.getChats(chat=>chatUI.render(chat));
    }
})
