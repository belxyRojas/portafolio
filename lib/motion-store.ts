export const motionStore = {
  heroProgress: 0,
  mouseX: 0,
  mouseY: 0,
  reducedMotion: false,
};

export function setHeroProgress(value: number) {
  motionStore.heroProgress = value;
}

export function setPointer(x: number, y: number) {
  motionStore.mouseX = x;
  motionStore.mouseY = y;
}
