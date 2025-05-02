import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit {
  @Input() isEditMode = false;
  @Output() formSubmitted = new EventEmitter<User>();
  userForm!: FormGroup;
  userId?: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
      telephoneNumber: ['', [Validators.pattern('^[0-9]+$')]]  
    });
  
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      this.isEditMode = params['isEditMode'] === 'true';
      if (this.isEditMode) {
        this.route.params.subscribe((params: { [key: string]: any }) => {
          this.userId = +params['id'];
          if (this.userId) {
            this.loadUser(this.userId);
          }
        });
      }
    });
  }
  loadUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (user: User) => {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          telephoneNumber: user.telephoneNumber
        });
      },
      error: (err: any) => console.error('Error loading user', err)
    });
  }
  
  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const user: User = {
        id: this.userId || 0,
        ...formValue,
        telephoneNumber: formValue.telephoneNumber
          ? Number(formValue.telephoneNumber)
          : undefined
      };
  
      const operation = this.isEditMode
        ? this.userService.updateUser(user)
        : this.userService.addUser(user);
  
      operation.subscribe({
        next: () => this.router.navigate(['/users']),
        error: (err: any) => {
          if (err.status === 409 && err.error.message) {
            alert(err.error.message);
          } else {
            console.error('Error saving user', err);
          }
        }
      });
    }
  }  
}
