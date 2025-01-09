import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Message } from '../../models/message';
import { SharedModule } from '../../utils/shared.component';
import { SnackbarService } from '../../services/snackbar.service';


@Component({
  selector: 'app-cricket',
  imports: [SharedModule],
  templateUrl: './cricket.component.html',
  styleUrl: './cricket.component.css'
})
export class CricketComponent {
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

  private addMessage(content: string | undefined, isUser: boolean) {
    this.messagesArray.push(new Message(content, isUser));
  }

  private callApi(prompt: string) {
    this.loadingChat = true;

    this.apiService.getCricketResponse(prompt).subscribe({
      next: (res) => {
        this.addMessage(res.content, false); 
        this.loadingChat = false;
      },
      error: (err) => {
        console.error("API Error:", err);
        this.snackbarService.openErrorSnackbar("Some Error occurred !!");
        this.loadingChat = false;
      }
    });
  }
}
