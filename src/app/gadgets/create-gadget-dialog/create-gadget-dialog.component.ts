import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../utils/api.service';
import { API } from '../../constants/api';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-gadget-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './create-gadget-dialog.component.html',
})
export class CreateGadgetDialogComponent {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<CreateGadgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      category: ['mobile', Validators.required],
    });

    if (data) {
      this.isEditMode = true;
      this.form.patchValue(data);
    }
  }

  save() {
    if (this.form.invalid) return;

    const payload = this.form.value;
    const request = this.isEditMode
      ? this.api.put(`${API.GADGETS}/${this.data.id}`, payload)
      : this.api.post(API.GADGETS, payload);

    request.subscribe(() => this.dialogRef.close(true));
  }

  close() {
    this.dialogRef.close();
  }
}
