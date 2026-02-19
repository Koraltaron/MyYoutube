import { Component, inject, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../services/api-service/api-service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  private readonly apiService = inject(ApiService);
  private readonly sanitizer = inject(DomSanitizer);

  videos = signal<any[]>([]);
  selectedVideo = signal<any>(null);
  favoriteVideo= signal<Set<string>>(new Set());

  ngOnInit(): void {
    this.apiService.getVideos().subscribe({
      next: (res) => this.videos.set(res.items),
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
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1`
    );
  }

  toggleFavoriteVideo(videoId: string) {
    const current = new Set(this.favoriteVideo());

    if(current.has(videoId)) {
      current.delete(videoId)
    } else {
      current.add(videoId)
    }

    this.favoriteVideo.set(current)
  }
}