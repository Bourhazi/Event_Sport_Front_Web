import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/Authentification/authentification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent implements OnInit{
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthentificationService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
  if (this.loginForm.valid) {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status === 'success') {
          const role = response.role;

          // Stocker les informations de l'utilisateur
          localStorage.setItem('user', JSON.stringify(response));

          // Redirection basée sur le rôle
          if (role === 'Organisateur') {
            this.router.navigate(['/home']);  // Admin vers home
          } else {
            this.router.navigate(['/participant-evenements']);
          }
        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur de connexion. Veuillez vérifier vos identifiants.';
        console.error('Erreur de connexion', err);
      }
    });
  } else {
    this.errorMessage = 'Veuillez remplir tous les champs correctement.';
  }
}
}
