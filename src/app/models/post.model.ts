
import { Comment } from '../models/comment.model';
/**
 * The post model
 */
 export interface Post { 
    id: number;
    userId: number;
    title?: String;
    body?: String; 
    comments?:Comment[];
    expanded?:boolean;
}