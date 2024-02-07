"use strict";

export function normalize(parts) {
  let str = [parts].join("");
  let num = str.replace(/\D/g, "");
  return num;
}

export function luhn10(cc) {
  let num = normalize(cc);

  let sum = 0;
  let dbl = true;
  let checkDigit = num.slice(-1);

  for (let i = num.length - 2; i >= 0; i--) {
    if (dbl) {
      let val = +num.charAt(i) * 2;
      if (val > 9) {
        val = Math.floor(val / 10) + (val % 10);
      }
      sum += +val;
      dbl = false;
    } else {
      sum += +num.charAt(i);
      dbl = true;
    }
  }

  let total = sum + +checkDigit;
  return total % 10 == 0;
}

export function type(cc) {
  let num = normalize(cc);

  if (num.startsWith("4")) {
    if (13 === num.length || 16 === num.length) {
      if (luhn10(num)) {
        return {valid: true, cardType: "Visa"};
      }
    }
    return {valid: false, cardType: "Visa"};
  }

  if (
    num.startsWith("50") ||
    num.startsWith("51") ||
    num.startsWith("52") ||
    num.startsWith("53") ||
    num.startsWith("54") ||
    num.startsWith("55")
  ) {
    if (16 === num.length) {
      if (luhn10(num)) {
        return {valid: true, cardType: "Mastercard"};
      }
    }
    return {valid: false, cardType: "Mastercard"};
  }

  if (num.startsWith("34") || num.startsWith("37")) {
    if (15 === num.length) {
      if (luhn10(num)) {
        return {valid: true, cardType: "American Express"};
      }
    }
    return {valid: false, cardType: "American Express"};
  }

  if (num.startsWith("6011") || num.startsWith("65")) {
    if (16 === num.length) {
      if (luhn10(num)) {
        return {valid: true, cardType: "Discover Card"};
      }
    }
    return {valid: false, cardType: "Discover Card"};
  }

  if (12 <= num.length && 19 >= num.length) {
    if (luhn10(num)) {
      return {valid: true, cardType: "unknown"};
    }
  }

  return {valid: false, cardType: "unknown"};
}
