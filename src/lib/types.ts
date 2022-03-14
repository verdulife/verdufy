export type songType = {
	ref: string;
	thumbnail: string;
	title: string;
	url: string;
}

export type songRefType = {
	ref: string;
	thumbnail: string;
	title: string;
}

export type playlistType = [songRefType];