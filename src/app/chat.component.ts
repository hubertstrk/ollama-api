import {Component, EventEmitter, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatMessage} from "./models";

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

    async sendMessage() {
        if (!this.prompt.trim()) return;

        const userMsg = {role: 'user', content: this.prompt};
        this.messageChange.emit(userMsg);

        this.loading = true;

        try {
            const res = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({model: 'mistral:7b', prompt: this.prompt, stream: false, format: 'json'})
            });

            const data = await res.json();

            this.messageChange.emit({role: 'assistant', content: data.response || '[No response]'});
        } catch (e) {
            this.messageChange.emit({role: 'assistant', content: 'Error: Unable to reach Ollama API.'});
        } finally {
            this.prompt = '';
            this.loading = false;
        }
    }
}
