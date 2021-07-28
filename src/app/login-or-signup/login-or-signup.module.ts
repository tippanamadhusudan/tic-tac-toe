import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginOrSignupComponent } from './login-or-signup.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: LoginOrSignupComponent,
        children: [
            { path: '', component: LoginOrSignupComponent }
        ]
    }
]

@NgModule({
    declarations: [
        LoginOrSignupComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [RouterModule]
})

export class LoginOrSignupModule {}