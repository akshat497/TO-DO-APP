import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the interface for the API response
interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    authtoken: string;
  };
}


// Define the interface for the user data
interface UserData {
  _id: string;
  name: string;
  email: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserResponse {
  success: boolean;
  message: string;
  data: UserData;
}
interface Note {
  _id: string;
  user: string;
  title: string;
  description: string;
  tag: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface NoteData {
  title: string;
  description: string;
  tag?: string;
  active:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth/'; // Ensure this is correct
  private noteApiUrl='http://localhost:5000/api/notes/'
  private userData: any;
  private notes: any;
  setUserData(data: any) {
    this.userData = data;
  }
  setUserNotes(data: any) {
    this.notes = data;
  }
  getUserData() {
    return this.userData;
  }
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}login`, { email, password });
  }

  fetchUser(token: string): Observable<UserResponse> {
    // Create headers with the token
    const headers = new HttpHeaders({
      'auth-token': token
    });

    return this.http.post<UserResponse>(`${this.apiUrl}fetchuser`, {}, { headers });
  }
  fetchNotes(token: string): Observable<{ success: boolean, message: string, data: Note[] }> {
    const headers = new HttpHeaders({ 'auth-token': token });
    return this.http.get<{ success: boolean, message: string, data: Note[] }>(`${this.noteApiUrl}getallnotes`, { headers });
  }
  addNote(token: string, note: { title: string; description: string; tag?: string }): Observable<{ success: boolean, data: any }> {
    const headers = new HttpHeaders({ 'auth-token': token });
    return this.http.post<{ success: boolean, data: any }>(`${this.noteApiUrl}addnotes`, note, { headers });
  }
  deleteNote(noteId: string, token: string): Observable<{ success: boolean, message: string }> {
    const headers = new HttpHeaders({ 'auth-token': token });
    return this.http.delete<{ success: boolean, message: string }>(`${this.noteApiUrl}/delete/${noteId}`, { headers });
  }
  // auth.service.ts
markComplete(note:Note, token: string): Observable<{ success: boolean, message: string }> {
  const headers = new HttpHeaders({ 'auth-token': token });
  const body = { ...note, active: false };  // Marking the note as complete
  return this.http.put<{ success: boolean, message: string }>(`${this.noteApiUrl}updatenote/${note._id}`, body, { headers });
}
updateNote(noteId: string, note: Note, token: string): Observable<{ success: boolean, message: string }> {
  const headers = new HttpHeaders({ 'auth-token': token });
  return this.http.put<{ success: boolean, message: string }>(`${this.noteApiUrl}updatenote/${noteId}`, note, { headers });
}
registerUser(user: { name: string, email: string, password: string }): Observable<{ success: boolean, authtoken: string, message: string }> {
  return this.http.post<{ success: boolean, authtoken: string, message: string }>(`${this.apiUrl}createuser`, user);
}


}
