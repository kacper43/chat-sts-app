import { MessageType } from './enums/messageTypeEnum.model';
export interface Message {
    username: string,
    message: string,
    type?: MessageType
}