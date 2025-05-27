import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatComponent} from './chat.component';
import {ChatMessage, ChatResult} from "./models";
import {marked} from 'marked';
import {markedHighlight} from 'marked-highlight';
import hljs from 'highlight.js';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ChatComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  messages: ChatResult[] = [];

  ngOnInit() {
    marked.use(markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, {language: lang}).value;
        }
        return hljs.highlightAuto(code).value;
      }
    }));
  }

  onMessageChange(message: ChatMessage) {
    const content = message.format === 'markdown'
      ? marked(message.content.answer) as string
      : `<div>${message.content.answer}</div>`;

    this.messages.push({
      role: message.role,
      content
    });
  }
}
