import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGadgetDialogComponent } from './create-gadget-dialog.component';

describe('CreateGadgetDialogComponent', () => {
  let component: CreateGadgetDialogComponent;
  let fixture: ComponentFixture<CreateGadgetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGadgetDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGadgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
