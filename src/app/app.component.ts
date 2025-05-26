import { Component } from '@angular/core';
import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-root',
  imports: [ChatComponent],
  template: `
    <div class="h-screen w-full flex flex-col">
      <header class="bg-blue-700 text-white p-4 text-xl font-bold shadow">Ollama Chat</header>
      <main class="flex-1">
        <app-chat />
      </main>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'ollama-api';
}
