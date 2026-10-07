// src/16-student-responsibility/problem.js
// TODO: Student가 맡은 일을 학생 정보(Student), 성적 관리(GradeBook),
// 성적표 출력(ReportCardPrinter) 세 클래스로 나누기
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

// TODO: 나눈 클래스로 성적을 기록하고 성적표를 출력하기
const student = new Student("김코드", "컴퓨터공학과");
student.addGrade(3.5);
student.addGrade(4.5);
student.addGrade(4);
student.printReportCard();
// 출력:
// [성적표] 김코드 (컴퓨터공학과)
// 평균 학점: 4
