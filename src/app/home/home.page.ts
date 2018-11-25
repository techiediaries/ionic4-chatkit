import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChatService } from '../chat.service';

import { User } from '../user';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  userId: string = '';
  userList: any = [];
    


  constructor(private chatService: ChatService, private route: ActivatedRoute){
    
  }
  ngOnInit(){
      this.userId = this.route.snapshot.params.id;
      console.log("route user id", this.userId);
      this.chatService.connectToChatkit(this.userId);
      this.chatService.getUsers().subscribe((users)=>{
        this.userList = users;
        console.log(this.userList);
      });
      
  }

  //online, offline, unknown
  isOnline(user){
    //console.log(user.presence.state);
    
    return this.chatService.isUserOnline(user);
  }
}
