import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, UtilitarioService, ValidadoresService, Usuario } from 'ngprime-core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input() actualPassword = '********';
  @Input() display = false;
  @Input() datos: any;
  @Output() close = new EventEmitter<boolean>();
  passwordForm: FormGroup;

  pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?![-_*?!@#$/(){}=.,;:]).{8,16}";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validadores: ValidadoresService,
    private utilitarioSvc: UtilitarioService,
    private authSvc: AuthService) {
    this.crearPasswordForm();
  }

  ngOnInit(): void {
    this.passwordForm.get('currentPass').disable;
  }

  crearPasswordForm() {
    this.passwordForm = this.fb.group({
      currentPass: ['******', Validators.required],
      newPass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.pattern)]],
      confirmPass: ['', Validators.required],
      ide_usua: ['', '']
    }, { validators: this.validadores.passwordsIguales('newPass', 'confirmPass') });
  }

  /** VALIDACION DE LOS CAMPOS */
  getErrorMessage(campo: string) {
    let message;
    if (this.passwordForm.get(campo).hasError('required')) {
      message = 'Este campo es obligartorio';
    } else if (this.passwordForm.get(campo).hasError('noEsIgual')) {
      message = 'No coinciden las cotraseñas';
    } else if (this.passwordForm.get(campo).hasError('existe')) {
      message = 'Este número de documento ya esta registrado';
    } else if (this.passwordForm.get(campo).hasError('maxlength')) {
      const maxLength = this.passwordForm.get(campo).errors?.maxlength.requiredLength;
      message = `No puede ingresar más de ${maxLength} caracteres`;
    } else if (this.passwordForm.get(campo).hasError('pattern')) {
      message = 'La contraseña debe cumplir con la regla establecida en la parte derecha';
    }
    return message;
  }

  isInvalidField(campo: string): boolean {
    return this.passwordForm.get(campo).invalid && this.passwordForm.get(campo).touched;
  }

  savePassword() {
    if (this.passwordForm.invalid) {
      Object.values(this.passwordForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // console.log(this.passwordForm);
      return;
    }
    this.utilitarioSvc.abrirLoading();
    const body = {
      contrasenaActual: this.actualPassword,
      nuevaContrasena: this.passwordForm.get('newPass').value,
      uid_usuario: this.datos.ide_segusu
    }
    this.authSvc.changePassword(body).subscribe(res => {
      this.authSvc.guardarLocalStorage(this.datos);
      const { ide_segusu, nombre_segper, nombre_segusu, foto_segusu, username_segusu } = this.datos.datos;
      this.authSvc.usuario = new Usuario(nombre_segusu, username_segusu, nombre_segper, foto_segusu, ide_segusu);
      this.router.navigate(['/private/dashboard']);
      this.passwordForm.reset();
      this.utilitarioSvc.cerrarLoading();
    }, (err => { this.utilitarioSvc.cerrarLoading(); }));
    // console.log('datos', this.datos, body);
  }

  closeModalPassword() {
    this.display = false;
    this.close.emit(false);
    this.passwordForm.reset();
  }

}
