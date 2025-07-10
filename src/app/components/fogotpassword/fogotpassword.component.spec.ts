import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotpasswordComponent } from './fogotpassword.component';

describe('FogotpasswordComponent', () => {
  let component: FogotpasswordComponent;
  let fixture: ComponentFixture<FogotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FogotpasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FogotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
