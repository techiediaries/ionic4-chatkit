import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import {Content} from "@ionic/angular";
import { AuthService } from '../auth.service';
import { ChatService } from '../chat.service';
//import { User } from '../user';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  //@ViewChild('messageInput') messageInput: ElementRef;
  //@ViewChild('scrollArea') content: Content;

  //user:any;
  messageList: any[] = [ ];
  chatMessage: string ="";

  //userIsTyping: boolean = true;

  constructor(private router: Router, private chatService: ChatService) { }

  /*closeChat(){
    this.router.navigateByUrl('home');
  }*/

  ngOnInit() {
    //this.user = this.chatService.getCurrentUser();
    //console.log(this.user);
    this.chatService.getMessages().subscribe(messages =>{
      console.log(messages);
      this.messageList = messages;
      //this.scrollToBottom();
      //this.isSomeoneTyping();
    });
  }
  /*scrollToBottom() {
    if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
  }*/
  sendMessage(){
    //console.log("message", this.chatMessage);
    this.chatService.sendMessage({text:this.chatMessage}).then(()=>{
      this.chatMessage = "";
    });
    
    //this.scrollToBottom();
  }
  /*onFocus(){
    this.chatService.sendTypingEvent();
    this.scrollToBottom();

  }*/

  /*isSomeoneTyping(){
    this.chatService.isSomeoneTyping().subscribe(result =>{
      if(result) {
        console.log('someone is typing!!');
        this.userIsTyping = true;
      }
      else
      {
        this.userIsTyping = false;
      }
    });
  }*/

}
