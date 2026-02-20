import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../services/api-service/api-service';
import { Playlist } from '../../services/playlist/playlist';
import { Search as SearchIcon } from 'lucide';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',

})
export class SearchComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly playlist = inject(Playlist);
  readonly searchIcon = SearchIcon;

  videos = signal<any[]>([]);
  selectedVideo = signal<any>(null);


  ngOnInit(): void {
    this.apiService.getVideos().subscribe({
      next: (res) => {
        this.videos.set(res.items);
        this.playlist.allVideos.set(res.items);
      },
      error: (err) => console.error('Erreur API :', err)
    });
  }

  selectVideo(video: any): void {
    this.selectedVideo.set(video);
  }

  closeVideo(): void {
    this.selectedVideo.set(null);
  }

  getEmbedUrl(videoId: string): SafeResourceUrl {
    const videos = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1`
    );
    return videos
  }

  favoriteVideo() {
    return this.playlist.favoriteVideoIds()
  }

  toggleFavoriteVideo(video: any){
    this.playlist.toggleFavoriteVideo(video)
  }
}