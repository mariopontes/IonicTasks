import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  authProviders = AuthProvider;
  configs = {
    isSignIn: true,
    action: 'Login',
    actionChange: 'Create Account'
  }

  nameControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  get email(): FormControl {
    return <FormControl>this.authForm.get('email')
  }

  get password(): FormControl {
    return <FormControl>this.authForm.get('password')
  }

  get name(): FormControl {
    return <FormControl>this.authForm.get('name')
  }

  changeAuthAction() {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;

    this.configs.action = isSignIn ? 'Login' : 'Sign Up';
    this.configs.actionChange = isSignIn ? 'Create Account' : 'Already have an Account';

    !isSignIn ? this.authForm.addControl('name', this.nameControl) : this.authForm.removeControl('name');
  }

  async onSubmit(provider: AuthProvider): Promise<any> {
    try {
      const credentials = await this.authService.authenticate({
        isSignIn: this.configs.isSignIn,
        user: this.authForm.value,
        provider
      });
      console.log('Authenticated: ', credentials)
      console.log('Redirecting')
    } catch (e) {
      console.log('Error :', e)
    }
  }
}
