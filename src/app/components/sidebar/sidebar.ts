import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth';
import { Playlist } from '../../services/playlist/playlist';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly authService = inject(AuthService)
  private readonly playlistService = inject(Playlist)

  currentUser = this.authService.currentUser;

  favoritedVideo() {
    return this.playlistService.getFavoriteVideos();
  }
}
