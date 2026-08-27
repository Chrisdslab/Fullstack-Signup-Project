
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmation.html'
})
export class Confirmation implements OnInit {
  userData: any;
  errorMessage: string = '';

  
  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.http.get<any>(`http://localhost:8080/api/users/${id}`).subscribe({
        next: (data) => {
          this.userData = data;
          
          
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          this.errorMessage = 'Backend connection failed: ' + err.message;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.errorMessage = 'No user ID found in the URL.';
    }
  }
}