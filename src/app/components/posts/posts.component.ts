import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
/**
 * The component that displays the posts of a selcted user
 */
export class PostsComponent implements OnInit {
  /**
   * To hold the selected user's details
   */
  @Input() clickedUser: User;
  /**
   * Hold the clicked post
   */
  public clickedpost!: Post;
  /**
   * To hold the posts loaded status
   */
  isLoaded: boolean = false; 
  /**
   * To hold the loadAll flag
   */
  loadAll: boolean = false;
  /**
   * Holds the list of posts for the selected users
   */
  public posts: Post[]=[]; 

  /**
   * The destroyFlag reference
   */
  private destroyFlag$: Subject<boolean> = new Subject<boolean>();

  /**
   * The constructor
   */
  constructor(public dataService: DataService) {}
  /**
   * ng2 life-cycle hook
   */
  ngOnInit(): void {
    console.log("In init !!!!!")
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { clickedUser } = changes;
    if (
      clickedUser &&
      clickedUser.currentValue &&
      clickedUser.previousValue != clickedUser.currentValue
    ) { 
      this.fetchPost(clickedUser.currentValue);
    }
  }
  /**
   * To fetch posts by user from REST API
   * @param userId
   */
  fetchPost(clickedUser: User) {
    this.loadAll = false;
    this.clickedUser = clickedUser;
    this.isLoaded = false; 
    this.dataService
      .fetchUserPost(this.clickedUser.id)
      .pipe(takeUntil(this.destroyFlag$))
      .subscribe(
        (data) => {
          this.isLoaded = true; 
          this.posts = data;
        },
        (error) => {
          console.log('An error occurred',error);
          this.isLoaded = true;
        }
      );
  }

  /**
   * The callback for the loadAll action
   */
  loadAllPosts() {
    this.loadAll = true;
  }
  /**
   * To fetch comments for the post from REST API
   * @param userId
   */
  fetchComments(clickedPost: Post) {
    this.clickedpost = clickedPost; 
    if(this.clickedpost.expanded != undefined){ 
      this.posts.filter((post: Post) => {
        if (post.id == this.clickedpost.id) {
          post.expanded = !post.expanded
        }
      });
    } 
    else{
      this.isLoaded = false;
      this.dataService
        .fetchComments(this.clickedpost.id)
        .pipe(takeUntil(this.destroyFlag$))
        .subscribe(
          (data) => {
            this.isLoaded = true;
            this.posts.filter((post: Post) => {
              if (post.id == this.clickedpost.id) {
                let postWithComments = post;
                postWithComments.comments = data;
                postWithComments.expanded = true;
                post = postWithComments;
              }
            });
          },
          (error) => {
            console.log(`An error occurred`,error);
            this.isLoaded = true;
          }
        );
      }
    
  }
  /**
    * ng life-cycle hook
    */
   ngOnDestroy() {
    this.destroyFlag$.next(true);
    this.destroyFlag$.unsubscribe();
  }
}
