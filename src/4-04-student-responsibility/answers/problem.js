class Student {
  #name;
  #major;

  constructor(name, major) {
    this.#name = name;
    this.#major = major;
  }

  getName() {
    return this.#name;
  }

  getMajor() {
    return this.#major;
  }
}

class GradeBook {
  #grades;

  constructor() {
    this.#grades = [];
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
}

class ReportCardPrinter {
  print(student, gradeBook) {
    console.log(
      `[성적표] ${student.getName()} (${student.getMajor()})`,
    );
    console.log(`평균 학점: ${gradeBook.getAverage()}`);
  }
}

const student = new Student("김코드", "컴퓨터공학과");
const gradeBook = new GradeBook();
gradeBook.addGrade(3.5);
gradeBook.addGrade(4.5);
gradeBook.addGrade(4);

const reportCardPrinter = new ReportCardPrinter();
reportCardPrinter.print(student, gradeBook);
// 출력:
// [성적표] 김코드 (컴퓨터공학과)
// 평균 학점: 4
