// src/4-04-student-responsibility/problem.js
// TODO: Student에는 이름과 전공, getName(), getMajor()만 남기기
// #grades와 addGrade(), getAverage()는 새 클래스 GradeBook으로 옮기고,
// 성적표 출력은 새 클래스 ReportCardPrinter의 print(student, gradeBook)가 맡기
class Student {
  #name;
  #major;
  #grades;

  constructor(name, major) {
    this.#name = name;
    this.#major = major;
    this.#grades = [];
  }

  getName() {
    return this.#name;
  }

  getMajor() {
    return this.#major;
  }

  addGrade(grade) {
    this.#grades.push(grade);
  }

  getAverage() {
    const total = this.#grades.reduce(
      (sum, grade) => sum + grade,
      0,
    );
    return total / this.#grades.length;
  }

  printReportCard() {
    console.log(`[성적표] ${this.#name} (${this.#major})`);
    console.log(`평균 학점: ${this.getAverage()}`);
  }
}

// TODO: 성적은 GradeBook에 기록하고, 성적표는
// ReportCardPrinter의 print(student, gradeBook)로 출력하도록 바꾸기
const student = new Student("김코드", "컴퓨터공학과");
student.addGrade(3.5);
student.addGrade(4.5);
student.addGrade(4);
student.printReportCard();
// 출력:
// [성적표] 김코드 (컴퓨터공학과)
// 평균 학점: 4
