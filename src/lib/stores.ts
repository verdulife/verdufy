import { browser } from '$app/env';
import { writable } from 'svelte/store';

let defaultCurrentSong = 0;

export const CurrentSong = writable(defaultCurrentSong);

export const PlaylistStore = writable(
	(browser && JSON.parse(localStorage.getItem('PlaylistStore'))) || []
);

PlaylistStore.subscribe((val) => browser && (localStorage.PlaylistStore = JSON.stringify(val)));

