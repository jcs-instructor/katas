export function mobUrl(mobName) {
  return "https://mobti.me/" + mobName;
}

export class MobTimer {
  private secondsRemaining: number = 0;
  getSecondsRemaining(): number {
    return this.secondsRemaining;
  }

  private duration: number = 5;
  getDuration(): number {
    return this.duration;
  }
  setDuration(duration: number): void {
    this.duration = duration;
  }

  private isRunning: boolean = false;

  getIsRunning(): boolean {
    return this.isRunning;
  }

  start() {
    this.isRunning = true;
    this.secondsRemaining = this.duration * 60;

    // this.startTime = new Date().getTime();
  }
}
