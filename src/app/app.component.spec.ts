import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { ShortNamePipe } from './pipes/shortName.pipe';
import { By } from '@angular/platform-browser';
class mockDataService {
  getUsers(){

  }
}

const mockUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618',
      },
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains',
    },
  },
];

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent,ShortNamePipe],
      providers: [{ provide: DataService, useClass: mockDataService }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  
  it('Should render the same number of tab buttons as that of the number of users received', ()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.users = mockUsers;
    app.dataservice.getUsers = jasmine.createSpy().and.returnValue(of(mockUsers))
    fixture.detectChanges();
    const userButtons = fixture.nativeElement.querySelectorAll('.user-btn');
    expect(userButtons.length).toBe(mockUsers.length)
  })

  it('Should select the first user as the selected user by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.users = mockUsers;
    app.dataservice.getUsers = jasmine.createSpy().and.returnValue(of(mockUsers))
    fixture.detectChanges();
    expect(app.clickedUser).toEqual(app.users[0]);

  });
  it(`Should render posts from another user when clicks on a tab button with a different user's name`, async()=> {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.users = mockUsers;
    app.dataservice.getUsers = jasmine.createSpy().and.returnValue(of(mockUsers))
    fixture.detectChanges();
    const previouslySelectedUser = app.clickedUser;
    const userTabButtons = fixture.nativeElement.querySelectorAll('.user-btn');
    userTabButtons[1].click();
    fixture.whenStable().then(() => {
     expect(app.clickedUser).not.toEqual(previouslySelectedUser)
    });
  })
});
