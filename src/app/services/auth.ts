import { computed, Injectable, signal } from '@angular/core';

export interface UserInterface {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<Partial<UserInterface> | null>(null);

  // public isAuthenticated = computed(() => this.currentUserSignal() !== null);

  // public currentUser = computed(() => this.currentUserSignal())

  private getStoredUsers(): UserInterface[] {
    const stored = localStorage.getItem('users')
    return stored ? JSON.parse(stored) : []
  }

  register(userData: UserInterface): boolean {
    const users = this.getStoredUsers()
    users.push(
      {
        username: userData.username,
        email: userData.email,
        password: userData.password
      }
    )
    localStorage.setItem("users", JSON.stringify(users));
    return true
  }
  
  
}
