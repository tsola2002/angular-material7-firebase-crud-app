import { Injectable } from '@angular/core';
import { Book } from './book';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private dbPath = '/Books';
  // booksRef: AngularFireList<any>;
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }
  
  // CREATE BOOK
  AddBook(book: Book) {
    this.booksRef.push({
      book_name: book.book_name,
      // isbn_10: book.isbn_10,
      // author_name: book.author_name,
      // publication_date: book.publication_date,
      // binding_type: book.binding_type,
      // in_stock: book.in_stock,
      // languages: book.languages
    });
    // .catch(error => {
    //   this.errorMgmt(error);
    // })
  }

  // GET BOOK BY ID
  GetBook(id: string) {
    this.bookRef = this.db.object('Books/' + id);
    return this.booksRef;
  }

  // GET BOOK LIST
  GetBookList() {
    // this uses list method in the firelist library
    this.booksRef = this.db.list('Books');
    return this.booksRef;
  }

  // UPDATE A BOOK RECORD
  UpdateBook(book: Book) {
    this.bookRef.update({
      book_name: book.book_name,
      // isbn_10: book.isbn_10,
      // author_name: book.author_name,
      // publication_date: book.publication_date,
      // binding_type: book.binding_type,
      // in_stock: book.in_stock,
      // languages: book.languages
    });
    // .catch(error => {
    //   this.errorMgmt(error);
    // })
  }

  // DELETE A BOOK RECORD
  DeleteBook(id: string) {
    this.bookRef = this.db.object('books-list/' + id);
    this.bookRef.remove();
    // .catch(error => {
    //   this.errorMgmt(error);
    // })
  }

  // ERROR MANAGEMENT
  private errorMgmt(error: any) {
    console.log(error);
  }
}
