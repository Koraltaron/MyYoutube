import { computed, Injectable, signal } from '@angular/core';

export interface UserInterface {
  username: string;
  email?: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<Partial<UserInterface> | null>(null);

  public isAuthenticated = computed(() => this.currentUserSignal() !== null);

  public currentUser = computed(() => this.currentUserSignal())

  private getStoredUsers(): UserInterface[] {
    const stored = localStorage.getItem('users')
    return stored ? JSON.parse(stored) : []
  }

  logout() {
    this.currentUserSignal.set(null);
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
  
  checkUser(user: UserInterface): boolean {
    const storedUser = localStorage.getItem('users');
    if(!storedUser) {
      return false
    }

    const parsedUser: UserInterface[] = JSON.parse(storedUser);
    console.log(parsedUser)

    const isUserValid = parsedUser.find(el => 
      el.username === user.username &&
      el.password === user.password
    );

    if(isUserValid) {
      this.currentUserSignal.set(isUserValid);
      return true;
    }
    return false
  }
}
