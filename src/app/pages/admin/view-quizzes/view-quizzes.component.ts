import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = []

  constructor(private quiz: QuizService) { }

  ngOnInit(): void {

    this.quiz.quizzes().subscribe({
      next: (data) => {
        console.log(data);
        this.quizzes = data;

      },
      error: (err) => { console.log(err); }

    })
  }

}
