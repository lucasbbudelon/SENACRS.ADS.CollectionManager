import { UserProfile, Group, MatchItem } from "./index";

export interface Match {
    userProfile: UserProfile;
    group: Group;
    itemsNeed: MatchItem[];
    itemsChange: MatchItem[];
}