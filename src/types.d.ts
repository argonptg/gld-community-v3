interface SearchData {
	success: boolean;
	data: SearchUserData[];
}

interface SearchUserData {
	id: string;
	pictureUrl: string;
	nowPlaying: string | null;
	displayName: string;
	username: string;
	online: boolean;
	description: string;
}

interface Achievement {
	defaultvalue: number;
	description: string;
	displayName: string;
	hidden: number;
	icon: string;
	icongray: string;
	name: string;
}

interface Game {
	id: number;
	name: string;
	exePath: string;
	imagePath: string;
	favorite: boolean;
	playedTime: string;
	LastPlayed: string;
	iop: string;
	autobackup: boolean;
	autorestore: boolean;
	closekey: number;
	completedachievements: number;
	forceshell: boolean;
	gbid: string;
	lockedachievements: Achievement[];
	unlockedachievements: Achievement[];
}

interface Follower {
	avatar: string;
	collectionId: string;
	collectionName: string;
	created: string;
	currently_playing: string;
	description: string;
	displayName: string;
	emailVisibility: boolean;
	hide_online: boolean;
	hide_playing: boolean;
	id: string;
	is_online: boolean;
	private_games: boolean;
	settings: any | null;
	updated: string;
	username: string;
	verified: boolean;
}

interface FollowersResponse {
	followers: Follower[];
	profiles: string[];
}
