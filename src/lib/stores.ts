import { browser } from '$app/env';
import { writable } from 'svelte/store';

let defaultCurrentSong = 0;

export const CurrentSong = writable(defaultCurrentSong);

export const PlaylistStore = writable(
	(browser && JSON.parse(localStorage.getItem('PlaylistStore'))) || []
);

export const LastSearchStore = writable(
	(browser && JSON.parse(localStorage.getItem('LastSearchStore'))) || []
);

PlaylistStore.subscribe((val) => browser && (localStorage.PlaylistStore = JSON.stringify(val)));
LastSearchStore.subscribe((val) => browser && (localStorage.LastSearchStore = JSON.stringify(val)));

