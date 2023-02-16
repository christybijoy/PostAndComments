import { Component } from '@angular/core'; 
import { User } from './models/user.model'; 
import { DataService } from './services/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Holds the users list
   */
   public users: User[] = [];
   /**
    * Holds the component data loaded status
    */
   public isLoaded: Boolean = false;

   /**
    * Hold the clicked user 
    */
   public clickedUser!: User; 

   /**
    * The destroyFlag reference
    */
   private destroyFlag$: Subject<boolean> = new Subject<boolean>();
 
   /**
    * Initializes an instance and injects dependencies
    * @param dataservice The service reference
    */
   constructor(public dataservice: DataService) { }
   /**
    * ng life-cycle hook
    */
   ngOnInit() { 
     this.fetchUsers(); 
   }
   /**
    * Sets the user param to propagate to child
    * @param user 
    */
   setUser(user:User){
     this.clickedUser = user;
   }
   /**
    * To fetch the users from the REST API
    */
   public fetchUsers() {
     this.isLoaded =false;
     this.dataservice.getUsers().pipe(takeUntil(this.destroyFlag$))
       .subscribe(users => { 
         this.isLoaded = true;  
         this.users = users
         this.clickedUser = this.users[0]; 
       }, error => {
         console.log('An error occurred');
         this.isLoaded = true;
       })
   }
  
   
   /**
    * ng life-cycle hook
    */
   ngOnDestroy() {
     this.destroyFlag$.next(true);
     this.destroyFlag$.unsubscribe();
   }
}
