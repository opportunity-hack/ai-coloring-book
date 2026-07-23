// Client-side bot deterrence only: the expected value lives in the DOM, so
// this stops casual spam, not determined bots. A server-verified check
// (e.g. Cloudflare Turnstile) needs backend support and is a planned follow-up.

// No "I" — easily confused with 1/l by young kids.
const CAPTCHA_ALPHABET = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
export const CAPTCHA_LENGTH = 6;

export function generateCaptcha() {
  let result = "";
  for (let i = 0; i < CAPTCHA_LENGTH; i++) {
    result += CAPTCHA_ALPHABET.charAt(
      Math.floor(Math.random() * CAPTCHA_ALPHABET.length)
    );
  }
  return result;
}

export function validateCaptcha(input, expected) {
  return (input ?? "").trim().toUpperCase() === expected;
}
