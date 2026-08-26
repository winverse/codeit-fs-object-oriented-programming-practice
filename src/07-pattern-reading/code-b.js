// 파일: src/07-pattern-reading/code-b.js
class YouTubeChannel {
  #subscribers = [];

  subscribe(user) {
    this.#subscribers.push(user);
  }

  unsubscribe(user) {
    this.#subscribers = this.#subscribers.filter(
      (u) => u !== user,
    );
  }

  uploadVideo(title) {
    console.log(`[YouTube] 영상 업로드: ${title}`);
    this.#subscribers.forEach((user) => user.notify(title));
  }
}

class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  notify(videoTitle) {
    console.log(
      `[${this.#name}님의 알림창] 새 영상이 올라왔습니다: ${videoTitle}`,
    );
  }
}

const channel = new YouTubeChannel();

const user1 = new User("김철수");
const user2 = new User("이영희");

channel.subscribe(user1);
channel.subscribe(user2);

channel.uploadVideo("자바스크립트 기초 강좌 1강");
// [YouTube] 영상 업로드: 자바스크립트 기초 강좌 1강
// [김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강
// [이영희님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강

channel.unsubscribe(user2);
channel.uploadVideo("자바스크립트 기초 강좌 2강");
// [YouTube] 영상 업로드: 자바스크립트 기초 강좌 2강
// [김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 2강
