import { UserProfile, Group, MessageType } from './index';

export interface Message {
    from: UserProfile;
    content: any;
    type: MessageType;
    to?: UserProfile;
    group?: Group;
}
