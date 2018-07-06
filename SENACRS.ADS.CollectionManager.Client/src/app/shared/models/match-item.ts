import { Collection, CollectionItem, UserProfile } from "./index";

export interface MatchItem {
    collection: Collection;
    collectionItem: CollectionItem;
    userProfileNeed: UserProfile; 
    userProfileChange: UserProfile; 
}