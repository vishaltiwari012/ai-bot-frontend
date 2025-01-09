import { Component, inject } from '@angular/core';
import { SharedModule } from '../../utils/shared.component';
import { ApiService } from '../../services/api.service';
import { Message } from '../../models/message';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-chat',
  imports: [SharedModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  snackbarService: SnackbarService = inject(SnackbarService);
  apiService = inject(ApiService);

  inputTextPrompt: string = '';
  messagesArray: Message[] = [];
  loadingChat: boolean = false;

  
  onAsk(event?: Event) {
    if (event) {
      event.preventDefault(); 
    }

    if (this.isInputEmpty()) {
      this.snackbarService.openErrorSnackbar("Please enter a prompt!");
      return;
    }

    this.addMessage(this.inputTextPrompt, true); 
    this.callApi(this.inputTextPrompt.trim());
    this.inputTextPrompt = ''; 
  }

  private isInputEmpty(): boolean {
    return this.inputTextPrompt.trim() === '';
  }

  private addMessage(content: string, isUser: boolean) {
    this.messagesArray.push(new Message(content, isUser));
  }

  private callApi(prompt: string) {
    this.loadingChat = true;

    this.apiService.getRandomResponse(prompt).subscribe({
      next: (response) => {
        this.addMessage(response, false); 
        this.loadingChat = false;
      },
      error: (error) => {
        console.error('API Error:', error);
        this.snackbarService.openErrorSnackbar("Some Error occurred !!");
        this.loadingChat = false;
      }
    });
  }
}
