import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UtilitarioService, ValidadoresService } from 'ngprime-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isChangePassword = false;
  passwordActual = '***********';
  data:any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private utilitarioSvc: UtilitarioService,
    private validadores: ValidadoresService
  ) { 
    this.crearLoginForm();
  }

  ngOnInit(): void {
  }

  crearLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      remember: [false, Validators.required],
      pool: ['default', Validators.required]
    });
  }

  isInvalidField(campo: string): boolean {
    return this.loginForm.get(campo).invalid && this.loginForm.get(campo).touched;
  }

  getErrorMessage(campo: string): string {
    let message;
    if (this.loginForm.get(campo).hasError('required')) {
      message = 'Este campo es obligartorio';
    } else if (this.loginForm.get(campo).hasError('noEsIgual')) {
      message = 'No coinciden las cotraseñas';
    } else if (this.loginForm.get(campo).hasError('existe')) {
      message = 'Este número de documento ya esta registrado';
    } else if (this.loginForm.get(campo).hasError('maxlength')) {
      const maxLength = this.loginForm.get(campo).errors?.maxlength.requiredLength;
      message = `No puede ingresar más de ${maxLength} caracteres`;
    } else if (this.loginForm.get(campo).hasError('minlength')) {
      const minlength = this.loginForm.get(campo).errors?.minlength.requiredLength;
      message = `No puede ingresar menos de ${minlength} caracteres`;
    }
    return message;
  }

  login(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.utilitarioSvc.abrirLoading();
    this.authSvc.login(this.loginForm.value).subscribe((res) => {
      this.passwordActual = this.loginForm.get('password').value;
      this.data= res;
      // console.log(res);
      if (res.cambia_clave) {
        this.data = res;
        this.isChangePassword= true;
        this.utilitarioSvc.cerrarLoading();
      }
      this.router.navigate(['/private/dashboard']);
      this.utilitarioSvc.cerrarLoading();
    }, (err) => {
      // console.log(err);
      this.utilitarioSvc.cerrarLoading();
    });
  }

  closeDialogo(event){
    this.isChangePassword = event;
  }

}
