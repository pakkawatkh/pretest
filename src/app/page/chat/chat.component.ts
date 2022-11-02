import { IChatMessage } from './../../model/Response.model';
import { environment } from 'src/environments/environment';
import { ApiService } from './../../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private stompClient: any;
  private CHANNEL = '/topic/chat';
  // private ENPOINT = 'http://localhost:8080/socket';

  message: IChatMessage[] = [];

  isConnected = false;

  constructor(private api: ApiService) { }

  chatFormGroup: FormGroup = new FormGroup(
    {
      message: new FormControl('', Validators.required),
    }
  );

  ngOnInit(): void {
    this.connectWebsocket();
  }

  private connectWebsocket() {
    let ws = new SockJS(environment.apiUrl + '/socket');
    this.stompClient = Stomp.over(ws);

    let that = this;
    this.stompClient.connect({}, () => {
      that.isConnected = true;
      that.subscribeToGlobalChat();
    })
  }

  private subscribeToGlobalChat() {
    let that = this;
    this.stompClient.subscribe(this.CHANNEL, (message: any) => {

      this.message.push(JSON.parse(message.body) as IChatMessage);

    });
  }

  onSubmit() {
    let ms = this.chatFormGroup.value.message

    // this.stompClient.send(this.CHANNEL, {}, ms);
    this.api.post('/chat/message', { message: ms }).subscribe({
      next: (res) => {
        this.chatFormGroup.patchValue({ message: '' });
      },
      error: (err) => {
        console.error(err);
      }

    })
  }

}
