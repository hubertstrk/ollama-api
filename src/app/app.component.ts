import { Component } from '@angular/core';
import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-root',
  imports: [ChatComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'ollama-api';
}
