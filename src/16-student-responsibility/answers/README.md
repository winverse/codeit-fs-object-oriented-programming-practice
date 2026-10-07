# 16. 단일 책임 원칙으로 학생 클래스 나누기 해설

처음 `Student`에는 바뀌는 이유가 셋 있었습니다. 학생 정보가 바뀔 때, 평균 계산 방식이 바뀔 때, 성적표 모양이 바뀔 때입니다. 정답에서는 이 셋을 `Student`, `GradeBook`, `ReportCardPrinter`로 나눠 클래스마다 바뀌는 이유를 하나만 남겼습니다. `ReportCardPrinter`는 `student`와 `gradeBook`의 내부 필드를 읽지 않고 `getName()`, `getMajor()`, `getAverage()`만 호출하므로, 성적 목록을 담는 방식이 바뀌어도 `GradeBook`만 고치면 됩니다. 반대로 성적표의 머리말 모양을 바꾸는 변경은 `ReportCardPrinter`만 고칩니다. `printReportCard()`만 새 클래스로 옮기고 `addGrade()`와 `getAverage()`를 `Student`에 남기면, 학생 정보와 학점 계산이 여전히 한 클래스에 묶여 테스트가 실패합니다.
