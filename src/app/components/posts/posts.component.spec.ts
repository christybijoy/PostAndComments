import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { PostsComponent } from './posts.component';
import { DataService } from '../../services/data.service';
import { ShortNamePipe } from '../../pipes/shortName.pipe';
import { Post } from 'src/app/models/post.model';
import { Comment } from 'src/app/models/comment.model';
import { Component, SimpleChange, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';

class mockDataService {
  fetchUserPost(): Observable<Post[]> {
    return of(mockPost);
  }
  fetchComments(): Observable<Comment[]> {
    return of(mockComments);
  }
}

@Component({
  template: '<posts #posts [clickedUser]="user"></posts>',
})
class TestWrapperComponent {
  user: User;
  @ViewChild('posts') posts: any;
}

const mockPost: Post[] = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
];

const mockComments: Comment[] = [
  {
    postId: 21,
    id: 101,
    name: 'perspiciatis magnam ut eum autem similique explicabo expedita',
    email: 'Lura@rod.tv',
    body: 'ut aut maxime officia sed aliquam et magni autem\nveniam repudiandae nostrum odio enim eum optio aut\nomnis illo quasi quibusdam inventore explicabo\nreprehenderit dolor saepe possimus molestiae',
  },
  {
    postId: 21,
    id: 102,
    name: 'officia ullam ut neque earum ipsa et fuga',
    email: 'Lottie.Zieme@ruben.us',
    body: 'aut dolorem quos ut non\naliquam unde iure minima quod ullam qui\nfugiat molestiae tempora voluptate vel labore\nsaepe animi et vitae numquam ipsa',
  },
];

const mockSelectedUser = {
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
};

const mockSelectedUser1 = {
  id: 2,
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
};

describe('PostsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ShortNamePipe, TestWrapperComponent, PostsComponent],
      providers: [{ provide: DataService, useClass: mockDataService }],
    }).compileComponents();
  });

  it('should create the post component', () => {
    const fixture = TestBed.createComponent(PostsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should render the posts when selects a user', () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);
    const testWrapperComponent = fixture.componentInstance;
    testWrapperComponent.user = mockSelectedUser;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const postsDiv = fixture.nativeElement.querySelectorAll('.posts');
      expect(postsDiv.length).toBe(3);
    });
  });
  it('Should render the comments when expanding a post', () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);
    const testWrapperComponent = fixture.componentInstance;
    testWrapperComponent.user = mockSelectedUser;
    fixture.detectChanges();
    const loadCommentButton = fixture.nativeElement.querySelector(
      '.loadComment.collapsed'
    );
    loadCommentButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const commentsDiv = fixture.nativeElement.querySelectorAll('.comments');
      expect(commentsDiv.length).toBeGreaterThan(0);
    });
  });

  it('Should hide the comments when collapsing an expanded post', async () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);
    const testWrapperComponent = fixture.componentInstance;
    testWrapperComponent.user = mockSelectedUser;
    fixture.detectChanges();
    const loadCommentButton = fixture.nativeElement.querySelector(
      '.loadComment.collapsed'
    );
    loadCommentButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const commentsDiv = fixture.nativeElement.querySelectorAll('.comments');
      expect(commentsDiv.length).toBeGreaterThan(0);
      const hideCommentsButton = fixture.nativeElement.querySelector(
        '.loadComment.expanded'
      );
      hideCommentsButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const commentsDivAfterCollapse = fixture.nativeElement.querySelectorAll(
          '.loadComment.expanded'
        );
        expect(commentsDivAfterCollapse.length).toBe(0);
      });
    });
  });

  it('Should display "Load all" button when more than 3 post for a user', async () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);
    const testWrapperComponent = fixture.componentInstance;
    testWrapperComponent.user = mockSelectedUser;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const postsDiv = fixture.nativeElement.querySelectorAll('.load-all-btn');
      expect(postsDiv.length).toBe(1);
    });
  });  
});
