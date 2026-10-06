// Web Audio API Procedural Ambient Soundscape for Cinematic Dance Journey

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private masterGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];
  private currentSceneNumber: number = 1;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch {
      console.warn('Web Audio API not supported on this device');
    }
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbientDrone();
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 1.5);
      }
    } else {
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.8);
      }
      setTimeout(() => {
        this.stopOscs();
      }, 900);
    }

    return this.isEnabled;
  }

  public getIsPlaying(): boolean {
    return this.isEnabled;
  }

  public getCurrentScene(): number {
    return this.currentSceneNumber;
  }

  public onSceneChange(sceneNum: number) {
    this.currentSceneNumber = sceneNum;
    if (!this.isEnabled || !this.ctx) return;

    // Trigger subtle harmonic chime
    this.playChime(sceneNum);

    // Adjust ambient root pitch gently depending on scene mood
    this.modulateDrone(sceneNum);
  }

  private startAmbientDrone() {
    if (!this.ctx || !this.masterGain) return;
    this.stopOscs();

    // Elegant, soothing harmonic chord (D minor / F maj / violet ambience)
    const baseFreqs = [73.42, 110.0, 164.81, 220.0]; // D2, A2, E3, A3

    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.035 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.oscs.push(osc);
    });
  }

  private modulateDrone(sceneNum: number) {
    if (!this.ctx || this.oscs.length === 0) return;
    // Scene 7 (Beyond Code) is warm champagne gold (shift to F# / A major feel)
    const scaleFactor = sceneNum === 7 ? 1.12 : sceneNum === 9 ? 1.25 : 1.0;
    const baseFreqs = [73.42, 110.0, 164.81, 220.0];

    this.oscs.forEach((osc, idx) => {
      if (!this.ctx) return;
      const targetFreq = baseFreqs[idx] * scaleFactor;
      osc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 2.0);
    });
  }

  public playChime(noteIndex = 1) {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;

    const notes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99, 880.0];
    const freq = notes[(noteIndex - 1) % notes.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.045, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.6);
  }

  private stopOscs() {
    this.oscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Already stopped
      }
    });
    this.oscs = [];
  }
}

export const soundscape = new AmbientSoundscape();
