import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    public translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => this.users = users,
      error: (err: any) => console.error('Error loading users', err)
    });
  }

  deleteUser(id: number): void {
    if (confirm(this.translationService.t('deleteConfirm'))) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.users = this.users.filter(u => u.id !== id),
        error: (err: any) => console.error('Error deleting user', err)
      });
    }
  }

  filteredUsers(): User[] {
    if (!this.searchTerm.trim()) return this.users;

    const term = this.searchTerm.toLowerCase();

    return this.users.filter(user =>
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }
}
