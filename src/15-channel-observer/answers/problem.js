class YouTubeChannel {
  #subscribers;

  constructor() {
    this.#subscribers = [];
  }

  subscribe(subscriber) {
    this.#subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.#subscribers = this.#subscribers.filter(
      (s) => s !== subscriber,
    );
  }

  uploadVideo(title) {
    console.log(`[YouTube] 영상 업로드: ${title}`);
    this.#notifyAll(title);
  }

  #notifyAll(title) {
    this.#subscribers.forEach((subscriber) =>
      subscriber.update(title),
    );
  }
}

class User {
  #name;

  constructor(name) {
    this.#name = name;
  }

  update(videoTitle) {
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
// 출력:
// [YouTube] 영상 업로드: 자바스크립트 기초 강좌 1강
// [김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강
// [이영희님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 1강

channel.unsubscribe(user2);
channel.uploadVideo("자바스크립트 기초 강좌 2강");
// 출력:
// [YouTube] 영상 업로드: 자바스크립트 기초 강좌 2강
// [김철수님의 알림창] 새 영상이 올라왔습니다: 자바스크립트 기초 강좌 2강
