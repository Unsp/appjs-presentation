export const RIPPLE_IMPULSE_COUNT = 10;
export const RIPPLE_IDLE_TIME = -1000;

const ENERGY_DECAY_RELEASE = 0.012;
const ENERGY_DECAY_HOLD_IDLE = 0.025;
const MOVEMENT_THUMB_EPS = 0.0012;
const MOVEMENT_PROGRESS_EPS = 0.0005;

export type RippleImpulse = {
  x: number;
  y: number;
  t: number;
  vx: number;
};

export type WakeState = {
  thumbX: number;
  thumbY: number;
  velX: number;
  energy: number;
};

export function createRippleImpulses(): RippleImpulse[] {
  return Array.from({ length: RIPPLE_IMPULSE_COUNT }, () => ({
    x: 0,
    y: 0,
    t: RIPPLE_IDLE_TIME,
    vx: 0,
  }));
}

export function createWakeState(thumbY: number): WakeState {
  return {
    thumbX: 0,
    thumbY,
    velX: 0,
    energy: 0,
  };
}

export function pushRippleImpulse(
  impulses: RippleImpulse[],
  x: number,
  y: number,
  time: number,
  vx: number,
) {
  impulses.shift();
  impulses.push({ x, y, t: time, vx });
}

export function rippleImpulsesToUniforms(impulses: RippleImpulse[]) {
  const values: number[] = [];
  for (let i = 0; i < RIPPLE_IMPULSE_COUNT; i += 1) {
    const impulse = impulses[i];
    values.push(impulse.x, impulse.y, impulse.t, impulse.vx);
  }
  return values;
}

function decayEnergy(energy: number, rate: number, deltaSec: number) {
  const next = energy * Math.pow(rate, Math.min(deltaSec, 0.05));
  return next < 0.008 ? 0 : next;
}

export function updateWakeSimulation(options: {
  impulses: RippleImpulse[];
  wake: WakeState;
  isScrubbing: boolean;
  progress: number;
  thumbX: number;
  thumbY: number;
  time: number;
  deltaSec: number;
  lastPush: { progress: number; thumbX: number; time: number; vx: number };
}) {
  const {
    impulses,
    wake,
    isScrubbing,
    progress,
    thumbX,
    thumbY,
    time,
    deltaSec,
    lastPush,
  } = options;

  wake.thumbX = thumbX;
  wake.thumbY = thumbY;

  if (!isScrubbing) {
    wake.energy = decayEnergy(wake.energy, ENERGY_DECAY_RELEASE, deltaSec);
    wake.velX *= Math.pow(0.06, Math.min(deltaSec, 0.05));
    return;
  }

  const dt = Math.max(deltaSec, 0.0001);
  const thumbDelta = Math.abs(thumbX - lastPush.thumbX);
  const progressDelta = Math.abs(progress - lastPush.progress);
  const isMoving =
    thumbDelta > MOVEMENT_THUMB_EPS || progressDelta > MOVEMENT_PROGRESS_EPS;

  if (!isMoving) {
    return;
  }

  const instantVel = (thumbX - lastPush.thumbX) / dt;
  const signedVel =
    Math.abs(instantVel) > 0.0001
      ? instantVel
      : lastPush.vx !== 0
        ? lastPush.vx
        : 0.001;

  wake.velX = wake.velX * 0.55 + signedVel * 0.45;
  wake.energy = Math.min(1.5, wake.energy + deltaSec * 4.2);

  if (lastPush.time < 0 || progressDelta > 0.0006 || thumbDelta > 0.0018) {
    const dir =
      Math.abs(signedVel) > 0.0001
        ? Math.sign(signedVel)
        : Math.sign(wake.velX);
    const speed = Math.min(Math.abs(wake.velX) * 22.0, 1.35);
    pushRippleImpulse(impulses, thumbX, thumbY, time, dir * speed);
    lastPush.progress = progress;
    lastPush.thumbX = thumbX;
    lastPush.time = time;
    lastPush.vx = signedVel;
  }
}

export function wakeToUniforms(wake: WakeState) {
  return [wake.thumbX, wake.thumbY, wake.velX, wake.energy];
}
