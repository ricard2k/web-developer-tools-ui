import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtoaComponent } from './btoa.component';

describe('BtoaComponent', () => {
  let component: BtoaComponent;
  let fixture: ComponentFixture<BtoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
