import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

interface NoteData {
  title: string;
  description: string;
  tag?: string;
}
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  userData: any;
  notes:any;
  formattedDate: string = '';
  formattedCreatedAt: string = '';
  formattedUpdatedAt: string = '';
  selectedTab: string = 'profile'; // Default tab
  newNote: NoteData = { title: '', description: '' };
  token: string | null = '';
  isModalOpen: boolean = false;
  selectedNote: any = { title: '', description: '', tag: '' };
  openModal(note: any): void {
    console.log(note,this.isModalOpen)
    this.selectedNote = { ...note };  // Clone the note to avoid modifying the original object
    this.isModalOpen = true;
    console.log(note,this.isModalOpen)
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
 // Updated type for notes

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Fetch user data using the token
      this.authService.fetchUser(token).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.userData = response.data; // Store the user data
            this.formattedDate = new Date(this.userData.date).toLocaleDateString();
            this.formattedCreatedAt = new Date(this.userData.createdAt).toLocaleDateString();
            this.formattedUpdatedAt = new Date(this.userData.updatedAt).toLocaleDateString();
          } else {
            console.error('Unexpected user response structure:', response);
          }

          // Fetch notes
          this.authService.fetchNotes(token).subscribe({
            next: (notesResponse) => {
              if (notesResponse.success && notesResponse.data) {
                this.notes = notesResponse.data;
              } else {
                console.error('Unexpected notes response structure:', notesResponse);
              }
            },
            error: (error) => {
              console.error('Failed to fetch notes', error);
            }
          });
        },
        error: (error) => {
          console.error('Failed to fetch user data', error);
        }
      });

    } else {
      console.error('No auth token found');
    }
  }
  onAddNoteSubmit(form: NgForm): void {
    if (form.valid) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.authService.addNote(token, this.newNote).subscribe({
          next: (response) => {
            if (response.success) {
              console.log('Note added successfully');
              this.authService.fetchNotes(token).subscribe({
                next: (notesResponse) => {
                  if (notesResponse.success && notesResponse.data) {
                    this.notes = notesResponse.data; // Update notes with the latest data
                  } else {
                    console.error('Failed to fetch updated notes:', notesResponse.message);
                  }
                },
                error: (error) => {
                  console.error('Error fetching updated notes:', error);
                }
              });
              this.newNote = { title: '', description: '' }; // Clear form
              form.resetForm();
            } else {
              console.error('Failed to add note:', );
            }
          },
          error: (error) => {
            console.error('Error adding note:', error);
          }
        });
      }}}
      deleteNote(noteId: string): void {
        console.log(noteId);
        const token = localStorage.getItem('authToken');
        if (token) {
          this.authService.deleteNote(noteId, token).subscribe({
            next: (response) => {
              if (response.success) {
                console.log('Note deleted successfully.');

                // Fetch the updated list of notes after deletion
                this.authService.fetchNotes(token).subscribe({
                  next: (notesResponse) => {
                    if (notesResponse.success && notesResponse.data) {
                      this.notes = notesResponse.data; // Update notes with the latest data
                    } else {
                      console.error('Failed to fetch updated notes:', notesResponse.message);
                    }
                  },
                  error: (error) => {
                    console.error('Error fetching updated notes:', error);
                  }
                });
              } else {
                console.error('Failed to delete note:', response.message);
              }
            },
            error: (error) => {
              console.error('Error deleting note:', error);
            }
          });
        } else {
          console.error('No auth token found');
        }
      }
      markComplete(note: any): void {
        const token = localStorage.getItem('authToken');

        if (token) {
          this.authService.markComplete(note, token).subscribe({
            next: (response) => {
              if (response.success) {
                console.log('Note marked as complete.');

                // Fetch the updated list of notes after marking complete
                this.authService.fetchNotes(token).subscribe({
                  next: (notesResponse) => {
                    if (notesResponse.success && notesResponse.data) {
                      this.notes = notesResponse.data; // Update notes with the latest data
                    } else {
                      console.error('Failed to fetch updated notes:', notesResponse.message);
                    }
                  },
                  error: (error) => {
                    console.error('Error fetching updated notes:', error);
                  }
                });
              } else {
                console.error('Failed to mark note as complete:', response.message);
              }
            },
            error: (error) => {
              console.error('Error marking note as complete:', error);
            }
          });
        }
      }
      onUpdateNoteSubmit(form: NgForm): void {
        if (form.valid) {
          const token = localStorage.getItem('authToken');
          if (token) {
            this.authService.updateNote(this.selectedNote._id, this.selectedNote, token).subscribe({
              next: (response) => {
                if (response.success) {
                  console.log('Note updated successfully');
                  this.authService.fetchNotes(token).subscribe({
                    next: (notesResponse) => {
                      if (notesResponse.success && notesResponse.data) {
                        this.notes = notesResponse.data; // Update notes with the latest data
                      } else {
                        console.error('Failed to fetch updated notes:', notesResponse.message);
                      }
                    },
                    error: (error) => {
                      console.error('Error fetching updated notes:', error);
                    }
                  });  // Fetch updated notes
                  this.closeModal();  // Close modal after successful update
                } else {
                  console.error('Failed to update note:', response.message);
                }
              },
              error: (error) => console.error('Error updating note', error)
            });
          }
        }
      }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
