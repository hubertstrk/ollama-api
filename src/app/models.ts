export interface ChatMessage {
    role: 'user' | 'assistant';
    content: {
        answer: string;
    };
    format: 'markdown' | 'text'
}

export interface ChatResult {
    role: 'user' | 'assistant';

    /**
     * html
     */
    content: string;
}