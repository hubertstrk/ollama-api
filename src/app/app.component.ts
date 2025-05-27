import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {ChatMessage} from "./models";

@Component({
    selector: 'app-root',
    imports: [CommonModule, ChatComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {
    messages: ChatMessage[] = [];

    onMessageChange(message: ChatMessage) {
        this.messages.push(message);
    }
}
