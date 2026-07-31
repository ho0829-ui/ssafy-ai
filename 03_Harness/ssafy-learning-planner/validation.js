function validateTaskInput(rawValue) {
  // <수업에서 작성> 앞뒤 공백 제거, 빈 입력 거부, 40자 경계 판정
  throw new Error("validateTaskInput의 핵심 규칙을 완성하세요.");
}

if (typeof window !== "undefined") {
  window.validateTaskInput = validateTaskInput;
}

if (typeof module !== "undefined") {
  module.exports = { validateTaskInput };
}

