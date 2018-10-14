import { FormGroup, FormControl } from '@angular/forms';

export class LoginForm extends FormGroup {
    constructor() {
        super({
            username: new FormControl(''),
            password: new FormControl('')
        });
    }
}
