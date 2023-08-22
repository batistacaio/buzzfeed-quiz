import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quiz-questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title: string = ''

  questions: any
  questionSelected: any
  questionIndex: number = 0
  questionMaxIndex: number = 0

  answers: string[] = []
  answerSelected: string = ''

  finished: boolean = false

  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.title = quiz_questions.title

      this.questions = quiz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    }
  }

  submitAnswer(value: string) {
    this.answers.push(value)
    this.nextQuestion()
  }

  async nextQuestion() {
    this.questionIndex++

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if(
        arr.filter(item => item === prev).length > arr.filter(item => item === curr).length
      ) {
        return prev
      } else {
        return curr
      }
    })
    return result
  }
}