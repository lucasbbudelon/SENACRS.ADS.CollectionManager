import { Collection } from "./collection";
import { UserProfile } from "./user-profile";

export interface Group {
    id: string;
    name: string;
    collection: Collection;
    participants: UserProfile[];
}