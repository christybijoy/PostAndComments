/**
 * The comment model
 */
 export interface Comment {
    id?: number;
    postId: number;
    name?: String;
    email?: String; 
    body?: String;
} 