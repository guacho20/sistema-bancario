import { Usuario } from 'ngprime-core/lib/clases/usuario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UtilitarioService } from 'ngprime-core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: []
})
export class ProfileComponent implements OnInit {

  usuario = [];
  avatars = [
    { label: '128_1', value: 'assets/avatar/128_1.png' },
    { label: '128_2', value: 'assets/avatar/128_2.png' },
    { label: '128_3', value: 'assets/avatar/128_3.png' },
    { label: '128_4', value: 'assets/avatar/128_4.png' },
    { label: '128_5', value: 'assets/avatar/128_5.png' },
    { label: '128_6', value: 'assets/avatar/128_6.png' },
    { label: '128_7', value: 'assets/avatar/128_7.png' },
    { label: '128_8', value: 'assets/avatar/128_8.png' },
    { label: '128_9', value: 'assets/avatar/128_9.png' },
    { label: '128_10', value: 'assets/avatar/128_10.png' },
    { label: '128_11', value: 'assets/avatar/128_11.png' },
    { label: '128_12', value: 'assets/avatar/128_12.png' },
    { label: '128_13', value: 'assets/avatar/128_13.png' },
    { label: '128_14', value: 'assets/avatar/128_14.png' },
    { label: '128_15', value: 'assets/avatar/128_15.png' },
  ];

  profilForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private utilitarioSvc: UtilitarioService) {
    this.createprofilForm();
    this.usuario = authSvc.getUserData();
    // this.usuario.fecha_caduc_segusu
    this.profilForm.setValue(this.usuario);
  }

  ngOnInit(): void {
    this.profilForm.get('username').disable();
    this.profilForm.get('perfil').disable();
    this.profilForm.get('fecha_caduc_segusu').disable();
    this.profilForm.get('fecha_reg_segusu').disable();
  }

  createprofilForm(): void {
    this.profilForm = this.fb.group({
      ide_segusu: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      username: ['', Validators.required],
      perfil: ['', Validators.required],
      foto: ['', ''],
      fecha_caduc_segusu: ['', Validators.required],
      fecha_reg_segusu: ['', Validators.required],
      correo_segusu: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  isInvalidField(campo: string): boolean {
    return this.profilForm.get(campo).invalid && this.profilForm.get(campo).touched;
  }

  getErrorMessage(campo: string): string {
    let message;
    if (this.profilForm.get(campo).hasError('required')) {
      message = 'Este campo es obligartorio';
    } else if (this.profilForm.get(campo).hasError('noEsIgual')) {
      message = 'No coinciden las cotraseñas';
    } else if (this.profilForm.get(campo).hasError('existe')) {
      message = 'Este número de documento ya esta registrado';
    } else if (this.profilForm.get(campo).hasError('maxlength')) {
      const maxLength = this.profilForm.get(campo).errors?.maxlength.requiredLength;
      message = `No puede ingresar más de ${maxLength} caracteres`;
    } else if (this.profilForm.get(campo).hasError('minlength')) {
      const minlength = this.profilForm.get(campo).errors?.minlength.requiredLength;
      message = `No puede ingresar menos de ${minlength} caracteres`;
    } else if (this.profilForm.get(campo).hasError('pattern')) {
      message = 'Ingrese un correo electrónico válido';
    }
    return message;
  }
  savePassword(): void {
    if (this.profilForm.invalid) {
      Object.values(this.profilForm.controls).forEach(control => {
        control.markAsTouched();
      });
      // console.log(this.profilForm);
      return;
    }
    this.utilitarioSvc.abrirLoading();
    const sql = `update seg_usuario set nombre_segusu=$1, correo_segusu=$2 where ide_segusu=$3`;
    this.utilitarioSvc.updateGenerico(sql, [this.profilForm.get('nombre').value, this.profilForm.get('correo_segusu').value, this.profilForm.get('ide_segusu').value])
      .subscribe(res => {
        /*this.authSvc.usuario = new Usuario(
          this.profilForm.get('nombre').value,
          this.profilForm.get('username').value,
          this.profilForm.get('perfil').value,
          this.profilForm.get('foto').value,
          this.profilForm.get('ide_segusu').value
        )*/
        this.utilitarioSvc.agregarMensajeExito('Se acutalizo correctamente');
        this.utilitarioSvc.cerrarLoading();
      }, (err) => {
        this.utilitarioSvc.cerrarLoading();
      })

  }

  actualizarFoto(event) {
    this.usuario['foto'] = event;
  }

}
