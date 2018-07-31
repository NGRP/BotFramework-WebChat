import { Chat, ChatProps } from './Chat'

export interface IMessage {
  conversationId: string,
  from: string,
  text: string,
  attachments?: any[],
  date?: string,
}

export class SuperChat extends Chat {

  constructor(props: ChatProps) {
    super(props)
    
    const history = this.buildHistory(props.messages)
    this.injectMessages(history)

  }

  buildHistory(messages : IMessage[]) {

    return messages.map((message, messageIndex) => ({
      type: "message",
      text: message.text,
      from: {
        id: message.from
      },
      attachments: message.attachments,
      timestamp: message.date,
      id: `${message.conversationId}|${messageIndex}`,
    }))
  }

  injectMessages(messages: any[]) {
    messages.forEach(activity => {
      this.store.dispatch({
        type: 'Receive_Message',
        activity
      })
    })
  }
}