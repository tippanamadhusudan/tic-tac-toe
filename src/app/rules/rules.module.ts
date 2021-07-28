import { NgModule } from '@angular/core';
import { RulesComponent } from './rules.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RulesComponent,
        children: [
            { path: '', component: RulesComponent }
        ]
    }
]

@NgModule({
    declarations: [
        RulesComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class RulesModule {}