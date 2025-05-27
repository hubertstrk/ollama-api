import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  prompt = '';
  loading = false;

  async sendMessage() {
    if (!this.prompt.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: this.prompt };
    this.messages.push(userMsg);
    
    const promptToSend = this.prompt;
    this.prompt = '';
    this.loading = true;
    
    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'mistral:7b', prompt: promptToSend, stream: false, format: 'json' })
      });
      
      const data = await res.json();
      
      this.messages.push({ role: 'assistant', content: data.response || '[No response]' });
    } catch (e) {
      this.messages.push({ role: 'assistant', content: 'Error: Unable to reach Ollama API.' });
    } finally {
      this.loading = false;
    }
  }
}
