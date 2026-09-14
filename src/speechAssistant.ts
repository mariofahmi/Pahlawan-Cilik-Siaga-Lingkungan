// Web Speech API Voice Assistant for Children (Bahasa Indonesia)

class SpeechAssistant {
  private voiceEnabled: boolean = false;
  private indonesianVoice: SpeechSynthesisVoice | null = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isSupported = true;
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
      this.loadVoice();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoice();
      }
    }
  }

  private loadVoice() {
    if (!this.isSupported) return;
    const voices = window.speechSynthesis.getVoices();
    // Prefer Indonesian voices (id-ID, Indonesian)
    const idVoice = voices.find(v => v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().includes('indonesia'));
    if (idVoice) {
      this.indonesianVoice = idVoice;
    }
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    if (!enabled && this.isSupported) {
      window.speechSynthesis.cancel();
    }
  }

  public isVoiceEnabled(): boolean {
    return this.voiceEnabled;
  }

  public getSupported(): boolean {
    return this.isSupported;
  }

  public speak(text: string, interrupt: boolean = true) {
    if (!this.isSupported || !this.voiceEnabled) return;

    try {
      if (interrupt) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.pitch = 1.15; // Slightly higher pitch for friendly cheerful child tone
      utterance.rate = 0.95;  // Clear, articulate pacing for young learners

      if (this.indonesianVoice) {
        utterance.voice = this.indonesianVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  }

  public stop() {
    if (this.isSupported) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechAssistant = new SpeechAssistant();
