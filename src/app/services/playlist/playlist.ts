import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Playlist {

  readonly favoriteVideoIds= signal<Set<string>>(new Set());

  constructor() {
    this.loadFromLocalStorage();
  }

  readonly allVideos = signal<any[]>([]);

  toggleFavoriteVideo(video: any) {
    console.log(video)
    const id = video.id?.videoId ?? video.id;

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

  getFavoriteVideos(): any[] {
    const favoriteIds = this.favoriteVideoIds();
    return this.allVideos().filter(v => favoriteIds.has(v.id));
  }

  getFavoriteVideosFromList(allVideos: any[]) {
    const favIds = this.favoriteVideoIds();
    return allVideos.filter(v => favIds.has(v.id));
  }
  
}
