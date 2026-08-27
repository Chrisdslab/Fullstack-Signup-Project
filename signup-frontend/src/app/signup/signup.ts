import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html'
})
export class Signup {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      
      phone: ['', [Validators.required, Validators.pattern('^(?:\\+[1-9]\\d{12}|[1-9]\\d{9})$')]],
    
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@#$&!]).{6,}$')]],
      repeatPassword: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(4)]]
    }, { validators: this.passwordMatchValidator });
  }

 
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      
      
      this.http.post<any>('http://localhost:8080/api/auth/signup', this.signupForm.value)
        .subscribe({
          next: (response) => {
           
            this.router.navigate(['/confirmation', response.id]);
          },
          error: (err) => {
            alert('Error: ' + (err.error || 'Signup failed'));
          }
        });
    } else {
      alert('Please fill out the form correctly based on the validation rules.');
    }
  }
}