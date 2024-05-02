import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './models/book.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public bookIndex = 0;
  public editMode = false;
  public currentRating = 0;
  public allRated = false;
  public averageRating = 0;

  public bookCollection: Book[] = [
  {
    title: "Вятърните градини", 
    description: "Исторически роман, който разказва за борбата на млада жена да спаси семейната си винарна в предвоенна България.",
    author: "Лора Петрова",
    ratings: []
  },
  {
    title: "Сенките на времето", 
    description: "Фентъзи сага за изгубен магически град, който е ключ към властта над времето, разказана през перспективите на трима герои от различни светове.",
    author: "Иван Георгиев",
    ratings: []
  },
  {
    title: "Звездни мостове", 
    description: "Научно-фантастичен трилър за учен, който открива връзка между квантовите явления и междузвездни пътувания, докато се състезава с времето срещу тайна организация.",
    author: "Мила Иванова",
    ratings: []
  },
  {
    title: "Мъглите на Авалон", 
    description: "Роман, вдъхновен от артурски легенди, който разглежда живота на вълшебницата Моргана ле Фей, разказан от нейна гледна точка.",
    author: "Кристина Димитрова",
    ratings: []
  },
  {
    title: "Ехо във водите", 
    description: "Мистерия, която следва разследване на изчезването на известен археолог в дълбините на Черно море, разкривайки древни тайни и легенди.",
    author: "Георги Томов",
    ratings: []
  }
];

  addRating(rating: number): void {
    this.bookCollection[this.bookIndex].ratings.push(rating);
    this.calculateAverageRating();
    this.currentRating = 0;
    this.checkIfAllRated();
    this.processNextBook();
  }

  checkIfAllRated(): void {
    this.allRated = this.bookCollection.every(book => book.ratings.length > 0);
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  updateBookInfo(title: string, description: string, author: string): void {
    const book = this.bookCollection[this.bookIndex];
    if (this.editMode) {
      book.title = title || book.title;
      book.description = description || book.description;
      book.author = author || book.author;
    }
    this.editMode = false;  
  }

  calculateAverageRating(): void {
    const ratings = this.bookCollection[this.bookIndex].ratings;
    const sum = ratings.reduce((a, b) => a + b, 0);
    this.averageRating = ratings.length ? sum / ratings.length : 0;
  }

  restartRating(): void {
    this.bookIndex = 0;
    this.allRated = false;
    this.bookCollection.forEach(book => book.ratings = []);
  }

  completeRating(): void {
    alert("Работата по оценяването е завършена успешно!");
  }

  processNextBook(): void {
    
    this.bookIndex++;

      if(this.bookIndex >= this.bookCollection.length) {
        this.bookIndex = 0;
      }

    this.editMode = false;  
  }

  processPreviousBook(): void {

    this.bookIndex--;
      
      if(this.bookIndex < 0) {
        this.bookIndex = this.bookCollection.length - 1; 
      }

    this.editMode = false;  
  }
}

