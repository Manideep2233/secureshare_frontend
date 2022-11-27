import { Injectable, Optional, Inject } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent, HttpParameterCodec
} from '@angular/common/http';
import { CustomHttpParameterCodec } from './encoder';
import { Observable } from 'rxjs';
import { Login } from '../Models/login.model';
import { baseResponse } from '../Models/baseResponse';
import { Configuration } from './configuration';
import { BASE_PATH, COLLECTION_FORMATS } from './variables';
import { ResponseObject } from '../Models/responseObject';
import { Register } from '../Models/register';
import { UpdateUser } from '../Models/updateUser';
import { UpdateLimit } from '../Models/updateLimit';
import { InlineObject } from '../Models/inlineObject';
import { CreateGroup } from '../Models/createGroup';
import { GroupDescription } from '../Models/groupDescription';
import { UserGroup } from '../Models/userGroup';
import {Comment } from '../Models/comment';
import { ChangePassword } from '../Models/changePassword';
import { UploadRequest } from '../Models/uploadRequest';
// const baseUrl="https://survey-heroku-demo.herokuapp.com";
const baseUrl = "https://secureshare1.herokuapp.com/"
@Injectable({
    providedIn: 'root'
})
export class DefaultService {
    data: any;
    jwttoken=''
    // login(item:Login){
    //   return this.http.post<any>("http://localhost:8080/user/login",item);
    // }
    // getQuestions():Observable<Questions[]>{
    //   return this.http.get<Questions[]>("https://survey-heroku-demo.herokuapp.com/getAllQuestions");
    // }
    // getauth(item:Login){
    //   return this.http.post("https://survey-heroku-demo.herokuapp.com/loginAdmin",item);
    // }
    // saveFeed(item:SaveFeedback){
    //     return this.http.post<any>("https://survey-heroku-demo.herokuapp.com/saveFeedback",item);
    // }

    protected basePath = 'https://secureshare1.herokuapp.com';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                    throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    saveAuthData(token: string) {
        localStorage.setItem('token', token);
    }
    saveRoleData(role: string) {
        localStorage.setItem('role', role);
    }

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public acceptRequest(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public acceptRequest(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public acceptRequest(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public acceptRequest(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling acceptRequest.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/user/req-accept/${encodeURIComponent(String(id))}`,
             null,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public deleteUser(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public deleteUser(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public deleteUser(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public deleteUser(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling deleteUser.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.delete<ResponseObject>(`${this.configuration.basePath}/user/delete/${encodeURIComponent(String(id))}`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param login 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public login(login: Login, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public login(login: Login, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public login(login: Login, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public login(login: Login, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (login === null || login === undefined) {
             throw new Error('Required parameter login was null or undefined when calling login.');
         }
 
         let headers = this.defaultHeaders;
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.post<ResponseObject>(`${this.configuration.basePath}/user/login`,
             login,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public rejectRequest(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public rejectRequest(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public rejectRequest(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public rejectRequest(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling rejectRequest.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/user/req-delete/${encodeURIComponent(String(id))}`,
             null,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param register 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public save(register: Register, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public save(register: Register, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public save(register: Register, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public save(register: Register, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (register === null || register === undefined) {
             throw new Error('Required parameter register was null or undefined when calling save.');
         }
 
        let headers=this.defaultHeaders;
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.post<ResponseObject>(`${this.configuration.basePath}/user/register`,
             register,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param updateLimit 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public updateLimit(updateLimit: UpdateLimit, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public updateLimit(updateLimit: UpdateLimit, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public updateLimit(updateLimit: UpdateLimit, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public updateLimit(updateLimit: UpdateLimit, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (updateLimit === null || updateLimit === undefined) {
             throw new Error('Required parameter updateLimit was null or undefined when calling updateLimit.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/user/update-limit`,
             updateLimit,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
      /**
     * @param changePassword 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updatePassword(changePassword: ChangePassword, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
    public updatePassword(changePassword: ChangePassword, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
    public updatePassword(changePassword: ChangePassword, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
    public updatePassword(changePassword: ChangePassword, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (changePassword === null || changePassword === undefined) {
            throw new Error('Required parameter changePassword was null or undefined when calling updatePassword.');
        }

        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/user/update-password`,
            changePassword,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }


    /**
     * @param updateUser 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public updateProfile(updateUser: UpdateUser, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public updateProfile(updateUser: UpdateUser, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public updateProfile(updateUser: UpdateUser, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public updateProfile(updateUser: UpdateUser, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (updateUser === null || updateUser === undefined) {
             throw new Error('Required parameter updateUser was null or undefined when calling updateProfile.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/user/update-profile`,
             updateUser,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public viewRequests(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public viewRequests(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public viewRequests(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public viewRequests(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/user/notifications`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 
    /**
     * @param comment 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public addComment(comment: Comment, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public addComment(comment: Comment, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public addComment(comment: Comment, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public addComment(comment: Comment, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (comment === null || comment === undefined) {
             throw new Error('Required parameter comment was null or undefined when calling addComment.');
         }
 
         let jwtToken=localStorage.getItem("token");
         let headers=this.defaultHeaders;
         if(jwtToken!=null) {
         jwtToken=jwtToken.replace('"','')
         jwtToken=jwtToken.replace('"','')
         headers=headers.append('Authorization','Bearer '+jwtToken);
         }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/post/add-comment`,
             comment,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 



    
    public createpost(msg:string,id:string,file:FormData) {
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
        let url="https://secureshare1.herokuapp.com/post/add/"+id+'/'+msg;
        return this.httpClient.post(url,file,{headers:headers});

    }
    // public addComment(comm:Comment) {
    //     let jwtToken=localStorage.getItem("token");
    //     let headers=this.defaultHeaders;
    //     if(jwtToken!=null) {
    //     jwtToken=jwtToken.replace('"','')
    //     jwtToken=jwtToken.replace('"','')
    //     headers=headers.append('Authorization','Bearer '+jwtToken);
    //     }
    //     let url="http://localhost:8080/post/add-comment";
    //     return this.httpClient.put(url,comm,{headers:headers});

    // }

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public deletePost(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public deletePost(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public deletePost(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public deletePost(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling deletePost.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.delete<ResponseObject>(`${this.configuration.basePath}/post/delete/${encodeURIComponent(String(id))}`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param postId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public fileOfPost(postId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<Blob>;
     public fileOfPost(postId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<Blob>>;
     public fileOfPost(postId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<Blob>>;
     public fileOfPost(postId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (postId === null || postId === undefined) {
             throw new Error('Required parameter postId was null or undefined when calling fileOfPost.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         return this.httpClient.get(`${this.configuration.basePath}/post/get-file/${encodeURIComponent(String(postId))}`,
             {
                 responseType: "blob",
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
//     public fileOfPost(postid:string) {
//         let jwtToken=localStorage.getItem("token");
//         let headers=this.defaultHeaders;
//         if(jwtToken!=null) {
//         jwtToken=jwtToken.replace('"','')
//         jwtToken=jwtToken.replace('"','')
//         headers=headers.append('Authorization','Bearer '+jwtToken);
//         }
//         let url="http://localhost:8080/post/get-file/"+postid;
//         return this.httpClient.get(url,{responseType:"blob"}).subscribe((res:Response)=>{
//                 var a = document.createElement("a");
//                 a.href = URL.createObjectURL(res.blob());
//                 a.download = fileName;
//                 // start download
//                 a.click();
//               })
// }
    // }

    /**
     * @param groupId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public getAllGroupPosts(groupId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public getAllGroupPosts(groupId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public getAllGroupPosts(groupId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public getAllGroupPosts(groupId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (groupId === null || groupId === undefined) {
             throw new Error('Required parameter groupId was null or undefined when calling getAllGroupPosts.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/post/user/${encodeURIComponent(String(groupId))}`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public getAllUserPosts(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public getAllUserPosts(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public getAllUserPosts(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public getAllUserPosts(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/post/user`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public allGroups(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public allGroups(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public allGroups(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public allGroups(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/group/all`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public allUserGroups(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public allUserGroups(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public allUserGroups(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public allUserGroups(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/group/currentUser`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param createGroup 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public createGroup(createGroup: CreateGroup, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public createGroup(createGroup: CreateGroup, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public createGroup(createGroup: CreateGroup, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public createGroup(createGroup: CreateGroup, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (createGroup === null || createGroup === undefined) {
             throw new Error('Required parameter createGroup was null or undefined when calling createGroup.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.post<ResponseObject>(`${this.configuration.basePath}/group/create`,
             createGroup,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public deleteGroup(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public deleteGroup(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public deleteGroup(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public deleteGroup(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling deleteGroup.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.delete<ResponseObject>(`${this.configuration.basePath}/group/delete/${encodeURIComponent(String(id))}`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public exploreGroups(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public exploreGroups(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public exploreGroups(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public exploreGroups(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/group/explore`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public requestGroup(id: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public requestGroup(id: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public requestGroup(id: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public requestGroup(id: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (id === null || id === undefined) {
             throw new Error('Required parameter id was null or undefined when calling requestGroup.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.post<ResponseObject>(`${this.configuration.basePath}/group/request/${encodeURIComponent(String(id))}`,
             null,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param groupDescription 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public updateDescription(groupDescription: GroupDescription, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public updateDescription(groupDescription: GroupDescription, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public updateDescription(groupDescription: GroupDescription, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public updateDescription(groupDescription: GroupDescription, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (groupDescription === null || groupDescription === undefined) {
             throw new Error('Required parameter groupDescription was null or undefined when calling updateDescription.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/group/update-description`,
             groupDescription,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }

    /**
     * @param uploadRequest 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public updateLimit1(uploadRequest: UploadRequest, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public updateLimit1(uploadRequest: UploadRequest, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public updateLimit1(uploadRequest: UploadRequest, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public updateLimit1(uploadRequest: UploadRequest, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
         if (uploadRequest === null || uploadRequest === undefined) {
             throw new Error('Required parameter uploadRequest was null or undefined when calling updateLimit1.');
         }
 
         let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];
         const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
         if (httpContentTypeSelected !== undefined) {
             headers = headers.set('Content-Type', httpContentTypeSelected);
         }
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/group/update-limit`,
             uploadRequest,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public getProfile(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public getProfile(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public getProfile(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public getProfile(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/user/my-profile`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
     /**
     * @param login 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public validateLogin(login: Login, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
    public validateLogin(login: Login, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
    public validateLogin(login: Login, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
    public validateLogin(login: Login, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (login === null || login === undefined) {
            throw new Error('Required parameter login was null or undefined when calling validateLogin.');
        }

        let headers = this.defaultHeaders;

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.post<ResponseObject>(`${this.configuration.basePath}/user/validate-login`,
            login,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public getAllUsers(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public getAllUsers(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public getAllUsers(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public getAllUsers(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/user/all`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
     /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProfilePosts(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
    public getProfilePosts(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
    public getProfilePosts(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
    public getProfilePosts(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {

        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','');
        jwtToken=jwtToken.replace('"','');
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/post/user-all`,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }


    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public myGroups(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
     public myGroups(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
     public myGroups(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
     public myGroups(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
 
         let jwtToken=localStorage.getItem("token");
         let headers=this.defaultHeaders;
         if(jwtToken!=null) {
         jwtToken=jwtToken.replace('"','');
         jwtToken=jwtToken.replace('"','');
         headers=headers.append('Authorization','Bearer '+jwtToken);
         }
 
         let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
         if (httpHeaderAcceptSelected === undefined) {
             // to determine the Accept header
             const httpHeaderAccepts: string[] = [
                 '*/*'
             ];
             httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         }
         if (httpHeaderAcceptSelected !== undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }
 
 
         let responseType: 'text' | 'json' = 'json';
         if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
             responseType = 'text';
         }
 
         return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/group/myGroups`,
             {
                 responseType: <any>responseType,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
 


    // /**
    //  * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
    //  * @param reportProgress flag to report request and response progress.
    //  */
    //  public myGroups(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
    //  public myGroups(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
    //  public myGroups(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
    //  public myGroups(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {


    //     let jwtToken=localStorage.getItem("token");
    //     let headers=this.defaultHeaders;
    //     if(jwtToken!=null) {
    //     jwtToken=jwtToken.replace('"','')
    //     jwtToken=jwtToken.replace('"','')
    //     headers=headers.append('Authorization','Bearer '+jwtToken);
    //     }
 
    //      let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    //      if (httpHeaderAcceptSelected === undefined) {
    //          // to determine the Accept header
    //          const httpHeaderAccepts: string[] = [
    //              '/'
    //          ];
    //          httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    //      }
    //      if (httpHeaderAcceptSelected !== undefined) {
    //          headers = headers.set('Accept', httpHeaderAcceptSelected);
    //      }
 
 
    //      let responseType: 'text' | 'json' = 'json';
    //      if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
    //          responseType = 'text';
    //      }
 
    //      return this.httpClient.get<ResponseObject>(`${this.configuration.basePath}/group/myGroups`,
    //          {
    //              responseType: <any>responseType,
    //              withCredentials: this.configuration.withCredentials,
    //              headers: headers,
    //              observe: observe,
    //              reportProgress: reportProgress
    //          }
    //      );
    //  }

     /**
     * @param userGroup 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public removeUser(userGroup: UserGroup, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
    public removeUser(userGroup: UserGroup, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
    public removeUser(userGroup: UserGroup, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
    public removeUser(userGroup: UserGroup, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
        if (userGroup === null || userGroup === undefined) {
            throw new Error('Required parameter userGroup was null or undefined when calling removeUser.');
        }

        let jwtToken=localStorage.getItem("token");
        let headers=this.defaultHeaders;
        if(jwtToken!=null) {
        jwtToken=jwtToken.replace('"','')
        jwtToken=jwtToken.replace('"','')
        headers=headers.append('Authorization','Bearer '+jwtToken);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                '*/*'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }

        return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/group/remove-user`,
            userGroup,
            {
                responseType: <any>responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    // /**
    //  * @param id 
    //  * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
    //  * @param reportProgress flag to report request and response progress.
    //  */
    //  public removeUser(userGroup: UserGroup, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<ResponseObject>;
    //  public removeUser(userGroup: UserGroup, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpResponse<ResponseObject>>;
    //  public removeUser(userGroup: UserGroup, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: '*/*'}): Observable<HttpEvent<ResponseObject>>;
    //  public removeUser(userGroup: UserGroup, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: '*/*'}): Observable<any> {
    //     if (userGroup === null || userGroup === undefined) {
    //                 throw new Error('Required parameter userGroup was null or undefined when calling removeUser.');
    //             }
 
    //      let jwtToken=localStorage.getItem("token");
    //     let headers=this.defaultHeaders;
    //     if(jwtToken!=null) {
    //     jwtToken=jwtToken.replace('"','')
    //     jwtToken=jwtToken.replace('"','')
    //     headers=headers.append('Authorization','Bearer '+jwtToken);
    //     }
 
    //      let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    //      if (httpHeaderAcceptSelected === undefined) {
    //          // to determine the Accept header
    //          const httpHeaderAccepts: string[] = [
    //              '*/*'
    //          ];
    //          httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    //      }
    //      if (httpHeaderAcceptSelected !== undefined) {
    //          headers = headers.set('Accept', httpHeaderAcceptSelected);
    //      }
 
 
    //      let responseType: 'text' | 'json' = 'json';
    //      if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
    //          responseType = 'text';
    //      }
 
    //      return this.httpClient.put<ResponseObject>(`${this.configuration.basePath}/group/remove-user`,
    //      userGroup,
    //          {
    //              responseType: <any>responseType,
    //              withCredentials: this.configuration.withCredentials,
    //              headers: headers,
    //              observe: observe,
    //              reportProgress: reportProgress
    //          }
    //      );
    //  }

}
