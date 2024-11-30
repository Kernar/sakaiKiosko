import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevoverComponent } from './revover.component';

describe('RevoverComponent', () => {
  let component: RevoverComponent;
  let fixture: ComponentFixture<RevoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
