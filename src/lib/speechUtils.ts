/**
 * Shared utility for Hungarian text-to-speech synthesis.
 * Cancels any ongoing utterance, then speaks the provided text
 * using the hu-HU locale at a slightly reduced rate for clarity.
 */
export function speakHungarian(text: string): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hu-HU';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}
