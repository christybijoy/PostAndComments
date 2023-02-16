import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Digital Assignment – Posts & Comments'`, () => { 
    const title=fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toEqual('Digital Assignment – Posts & Comments');
  });
  it(`Should have a subtitle 'Please select a user to find the comments'`, ()=> {
    const title=fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toEqual('Please select a user to find the comments');
  })

});
