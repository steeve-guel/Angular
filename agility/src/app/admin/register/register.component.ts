import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!:FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.registerForm = this.fb.group({
      username:['',Validators.required],
      nom:[''],
      prenom:['',],
      password:['',Validators.required],
      role:['',Validators.required]
    });
  }

  handleSubmit(){
      console.log(this.registerForm.value)
  }
}
