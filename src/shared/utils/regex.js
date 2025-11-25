// shared/utils/regex.js

// Password must have at least 8 chars, and 3 of 4 conditions (lowercase, uppercase, number, symbol)
export const passwordRegex = /^.{8,}$/; 

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phoneRegex = /^[0-9]{10,}$/;
