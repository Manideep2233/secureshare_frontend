import {post_comment } from "./post_comment";
export interface post_list {
postId:string;
message?:string;
fileName?:string;
fileSize?:number;
createdBy?:string;
postedTime?:string;
comments?:post_comment[];
}
