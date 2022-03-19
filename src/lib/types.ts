type songRefType = {
	ref: string;
	thumbnail: string;
	title: string;
}

export type playlistType = [songRefType];

export type songType = {
	ref: string;
	thumbnail: string;
	title: string;
	url: string;
	length: number;
}