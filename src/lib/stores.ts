import { browser } from '$app/env';
import { writable } from 'svelte/store';

let defaultCurrentSong = 0;
let defaultCurrentPlaylist = "queue";

export const CurrentSong = writable(defaultCurrentSong);
export const CurrentPlaylist = writable(defaultCurrentPlaylist);
export const fetching = writable(false);
export const paused = writable(true);

export const PlaylistStore = writable(
	(browser && JSON.parse(localStorage.getItem('PlaylistStore'))) || { queue: [] }
);

export const LastSearchStore = writable(
	(browser && JSON.parse(localStorage.getItem('LastSearchStore'))) || []
);

PlaylistStore.subscribe((val) => browser && (localStorage.PlaylistStore = JSON.stringify(val)));
LastSearchStore.subscribe((val) => browser && (localStorage.LastSearchStore = JSON.stringify(val)));

