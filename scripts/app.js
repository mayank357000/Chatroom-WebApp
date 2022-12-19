//agr koi collection nhi database main aur ham usko firebase se 
//access kr rhe hai then firebase new collection bnakr apna documnet 
//bnaya hua uske andr daal dega
//so chatroom collection explciitly chaho toh banao site se else
//bina uske bhi chlega


// AGAR KOI COLLECTION NHI HOGI TOH FIREBASE BANA DEGA
//SO AGAR CHATS BADH JAE BOHT THEN COLLECTION HI DELETE KR DENA
//CAN TEST THE APPS ON SINGLE COMPUTER BY 
//CREATING TWO INCOGNITO TABS
//JISSE LOCALSTORAGE EMPTY RAHEGA and no username previous wala and we talk as 2 diff systems
//ALSO REMEMBER TO USE HTTPS IN ALL API LINKS TO POST ON GITHUB PAGES

//add a new document
//setting a real time listener for new chats and update dom
//updating the username
//upsating the room

class Chatroom{
    constructor(room,username){
        this.room=room;
        this.username=username;
        this.chats=db.collection('chats');
        this.unsub;
    }
    async addChat(message){
     //form a new chat
     const now=new Date();
     const chat={
        message:message,
        username:this.username,
        room:this.room,
        created_at:firebase.firestore.Timestamp.fromDate(now)
     };
     //save the chat document in collection
     const response=await this.chats.add(chat);
     return response;//koi khaas reason nhi to return this
    }

    //first time ye listerner add krne pe jo bhi pade wo add and badme jo change htne wo add
    getChats(callback){//room change krne pr listener new room pr lgane ke liye function
        this.unsub=this.chats 
            .where('room','==',this.room)//filter to get bs room ka data
            .orderBy('created_at')//ordering by time,first time mai wo bolega console error ko click krke index banao,bna dena
            .onSnapshot(snapshot=>{//jab bhi collection change ho
                snapshot.docChanges().forEach(change => {
                  if(change.type==='added')
                  {
                    //update the ui
                   callback(change.doc.data()) ;//kuch krna data ke saath
                  }           
                });
            })
    }//ye bs listener to new room chager function hai jo unsub krne mai bhi madad krega

    updateName(username)
    {
        this.username=username;
        localStorage.setItem('username',username);
    }
    updateRoom(room)
    {
        this.room=room;
        console.log('room changed');
        //now close listener to old room
        if(this.unsub)//null then false
        this.unsub();
    }
}


// console.log(chatroom);


// setTimeout(()=>{//check krne ke liye likha ye
//   chatroom.updateRoom('gaming');
//   chatroom.updateName('Yoshi');
//   chatroom.getChats((data)=>{
//     console.log(data);
//   })
//   chatroom.addChat('hello');//ye naya add kiya room mai so listener add a chat to console
// },3000);