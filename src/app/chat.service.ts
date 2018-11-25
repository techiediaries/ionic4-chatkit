import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  AUTH_URL = 'http://localhost:3000/token';
  //TEST_URL = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8974881e-3870-47b4-9053-14dad6c0e314/token';
  INSTANCE_LOCATOR = 'v1:us1:8974881e-3870-47b4-9053-14dad6c0e314';
  GENERAL_ROOM_ID = '19374915';
  GENERAL_ROOM_INDEX = 0;

  chatManager: ChatManager;
  currentUser;

  messages = [];
  typingUsers = [];

  usersSubject = new BehaviorSubject([]);
  messagesSubject = new BehaviorSubject([]);
  typingSubject = new BehaviorSubject(false);
  /*userJoinedSubject = new BehaviorSubject({});
  userLeftSubject = new BehaviorSubject({});*/

  

  

  constructor() { 

  }

  async connectToChatkit(userId: string){
    this.chatManager = new ChatManager({
      instanceLocator: this.INSTANCE_LOCATOR,
      userId: userId,
      tokenProvider: new TokenProvider({ url: this.AUTH_URL})
    })
    this.currentUser = await this.chatManager.connect();
    await this.currentUser.subscribeToRoom({
      roomId: this.GENERAL_ROOM_ID,
      hooks: {
        onMessage: message => {
          console.log(`Received new message ${message.text}`);
          this.messages.push(message);
          this.messagesSubject.next(this.messages);
        },
        onUserStartedTyping: user => {
          console.log("started typing", user);
          this.typingUsers.push(user);
          this.typingSubject.next(true);
        },
        onUserStoppedTyping: user => {
          
          this.typingUsers.pop();
          if(this.typingUsers.length === 0){
            this.typingSubject.next(false);
          }
          
        }

      },
      messageLimit: 20
    });

    const users = this.currentUser.rooms[this.GENERAL_ROOM_INDEX].users;
    this.usersSubject.next(users);
  }
  getUsers(){
    return this.usersSubject;
  }
  
  getMessages(){
    return this.messagesSubject;
  }
  isSomeoneTyping(){
    return this.typingSubject;
  }
    
  sendMessage(message){
    return this.currentUser.sendMessage({
      text: message.text,
      roomId: message.roomId || this.GENERAL_ROOM_ID
    })
    /*.then(messageId => {
      console.log(`Added message`)
    })
    .catch(err => {
      console.log(`Error adding message`)
    })*/    
  }
  sendTypingEvent(roomId = this.GENERAL_ROOM_ID){
    this.currentUser.isTypingIn({ roomId: roomId })
    .then(() => {
      console.log('Success!')
    })
    .catch(err => {
      console.log(`Error sending typing indicator: ${err}`)
    })
  }

  isUserOnline(user): boolean {
    return user.presence.state == 'online';
  }
  getCurrentUser(){
    return this.currentUser;
  }

  /*onUserJoined(){
    return this.userJoinedSubject;
  }
  onUserLeft(){
    return this.userLeftSubject;
  }*/
  /*cancelSubscription(roomId = this.GENERAL_ROOM_ID){
    this.currentUser.roomSubscriptions[roomId].cancel();
  }*/  
  
}
