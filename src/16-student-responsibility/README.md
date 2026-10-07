# 16. 단일 책임 원칙으로 학생 클래스 나누기

푸는 시점: SOLID 원칙 › 단일 책임 원칙 퀴즈 뒤

## 할 일

`problem.js`의 `Student`는 학생 정보 보관, 성적 기록과 평균 계산, 성적표 출력을 모두 맡고 있습니다. 학점 계산 방식이 바뀌어도, 성적표 모양이 바뀌어도 `Student`를 고쳐야 합니다. 이 일을 세 클래스로 나눕니다.

1. `Student`에는 이름과 전공을 담고 `getName()`, `getMajor()`만 남깁니다.
2. 성적 목록은 새 클래스 `GradeBook`의 private field `#grades`로 옮기고, `addGrade(grade)`와 `getAverage()`를 `GradeBook`에 둡니다.
3. 성적표 출력은 새 클래스 `ReportCardPrinter`의 `print(student, gradeBook)`가 맡습니다. 이름과 전공은 `student`에서, 평균 학점은 `gradeBook`에서 읽습니다.
4. 파일 끝의 실행 코드를 `GradeBook`에 성적을 기록하고 `ReportCardPrinter`로 성적표를 출력하도록 바꿉니다.

## 실행과 테스트

저장소 루트에서 실행합니다.

```bash
node src/16-student-responsibility/problem.js
pnpm test:16
```

## 성공 기준

- `pnpm test:16`이 통과합니다.
- `node`로 실행하면 `[성적표] 김코드 (컴퓨터공학과)`, `평균 학점: 4`가 차례로 출력됩니다.
- `Student`에는 `getName()`, `getMajor()`만 있고, 성적 기록·평균 계산은 `GradeBook`, 출력은 `ReportCardPrinter`에만 있습니다.

## 정답과 해설

직접 구현하고 테스트한 뒤 같은 폴더의 `answers/problem.js`에서 정답을, `answers/README.md`에서 해설을 확인합니다.
