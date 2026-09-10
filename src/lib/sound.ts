// Web Audio API Retro Terminal Synthesizer
// Provides zero-dependency, low-latency mechanical keyboard clicks and vintage terminal beeps.

let audioCtx: AudioContext | null = null;
const SOUND_STORAGE_KEY = "terminal_sound_enabled";

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      // @ts-expect-error webkitAudioContext fallback
      window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(SOUND_STORAGE_KEY);
  // Default to enabled for immersive retro experience
  return stored === null ? true : stored === "true";
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "true" : "false");
}

export function toggleSound(): boolean {
  const current = isSoundEnabled();
  const next = !current;
  setSoundEnabled(next);
  if (next) {
    playCommandBeep("success");
  }
  return next;
}

/**
 * Synthesizes a subtle, tactile mechanical switch click
 */
export function playKeyClick(): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. High transient burst (switch leaf ping / tactile bump)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Subtle random frequency jitter between 1600Hz - 2200Hz to simulate real key variations
  const randomFreq = 1600 + Math.random() * 600;
  osc.type = "sine";
  osc.frequency.setValueAtTime(randomFreq, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.015);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.02);

  // 2. Low mechanical housing bottom-out thud
  const thudOsc = ctx.createOscillator();
  const thudGain = ctx.createGain();

  thudOsc.type = "triangle";
  thudOsc.frequency.setValueAtTime(140 + Math.random() * 30, now);
  thudOsc.frequency.exponentialRampToValueAtTime(50, now + 0.025);

  thudGain.gain.setValueAtTime(0.06, now);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

  thudOsc.connect(thudGain);
  thudGain.connect(ctx.destination);

  thudOsc.start(now);
  thudOsc.stop(now + 0.03);
}

/**
 * Vintage CRT / Terminal Beep tones
 */
export function playCommandBeep(type: "success" | "error" | "bell" = "success"): void {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  if (type === "success") {
    // Upward retro chirp
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(880, now + 0.05);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  } else if (type === "error") {
    // Low double blip
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(180, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  } else {
    // Classic VT100 terminal bell (750 Hz)
    osc.type = "sine";
    osc.frequency.setValueAtTime(750, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);
  }
}
