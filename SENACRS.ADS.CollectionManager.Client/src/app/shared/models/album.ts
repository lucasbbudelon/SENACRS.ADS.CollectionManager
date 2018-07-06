import { Collection } from "./collection";
import { UserProfile } from "./user-profile";
import { CollectionItem } from "./collection-item";

export interface Album {
    id: string;
    collection: Collection;
    userProfile: UserProfile;
    items: CollectionItem[];
    singleItems: CollectionItem[];
    repeatItems: CollectionItem[];
    rareItems: CollectionItem[];
    missingItems: CollectionItem[];
    totalItems: number;
}