import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Output() messageChange = new EventEmitter();

  prompt = '';
  loading = false;

  instructions: string = 'Always return the result in nice looking markdown including headers, list, tables, pre, code.';

  async sendMessage() {
    if (!this.prompt.trim()) return;

    this.messageChange.emit({role: 'user', content: {answer: this.prompt}, format: 'text'});

    this.loading = true;

    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          model: 'mistral:7b',
          prompt: `${this.prompt}\n\n${this.instructions}`,
          stream: false
        })
      });

      const data = await res.json();

      this.messageChange.emit({
        role: 'assistant',
        content: {answer: data.response || '[No response]'},
        format: 'markdown'
      });
    } catch (e) {
      this.messageChange.emit({
        role: 'assistant',
        content: {answer: 'Error: Unable to reach Ollama API.'},
        format: 'text'
      });
    } finally {
      this.prompt = '';
      this.loading = false;
    }
  }
}
