import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMenubarComponent } from './market-menubar.component';

describe('MarketMenubarComponent', () => {
  let component: MarketMenubarComponent;
  let fixture: ComponentFixture<MarketMenubarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketMenubarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
