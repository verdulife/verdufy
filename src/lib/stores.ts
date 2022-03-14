import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { songType } from '$lib/types';

let defaultCurrentSong: songType = {
	ref: "",
	thumbnail: '/mobile.png',
	title: "",
	url: "",
}

export const CurrentSong = writable(defaultCurrentSong);

export const PlaylistStore = writable(
	(browser && JSON.parse(localStorage.getItem('PlaylistStore'))) || []
);

PlaylistStore.subscribe((val) => browser && (localStorage.PlaylistStore = JSON.stringify(val)));

