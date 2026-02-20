import { Injectable, signal } from '@angular/core';
import { InterfaceVideo } from '../../interfaces/interfaceVideo';

@Injectable({
  providedIn: 'root',
})
export class Playlist {

  readonly favoriteVideoIds= signal<Set<string>>(new Set());

  constructor() {
    this.loadFromLocalStorage();
  }

  readonly allVideos = signal<InterfaceVideo[]>([]);

  toggleFavoriteVideo(video: InterfaceVideo) {
    console.log(video)
    const id = video.id;

    const current = new Set(this.favoriteVideoIds());


    if(current.has(id)) {
      current.delete(id)
    } else {
      current.add(id)
    }

    this.favoriteVideoIds.set(current);
    this.saveToLocalStorage(current);
  }

  saveToLocalStorage(favorites: Set<string>){
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }

  loadFromLocalStorage(){
    const stored = localStorage.getItem('favorites');
    if(stored) {
      this.favoriteVideoIds.set(new Set(JSON.parse(stored)));
    }
  }

  getFavoriteVideos(): InterfaceVideo[] {
    const favoriteIds = this.favoriteVideoIds();
    return this.allVideos().filter(v => favoriteIds.has(v.id));
  }

  getFavoriteVideosFromList(allVideos: InterfaceVideo[]) {
    const favIds = this.favoriteVideoIds();
    return allVideos.filter(v => favIds.has(v.id));
  }
  
}
