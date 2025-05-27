export interface ChatMessage {
    role: 'user' | 'assistant';
    content: {
        answer: string;
    };
}