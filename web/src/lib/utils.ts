import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phoneNumberString;
}

// allow for a-z 0-9 and spaces and |, remove everything else
export const sanitizeString = (str: string) => str.replace(/[^a-z0-9 ]/gi, '');
export const sanitizeString2 = (str: string) => str.replace(/[^a-z0-9 \/-]/gi, '');
export const sanitizeNumber = (str: string) => str.toString().replace(/[^0-9]/gi, '');

export function areObjectsEqual(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

// essentially we want to return the fields that are different between the two objects
// so we can send only those fields to the server
// EX: obj1 = { a: 1, b: 2, c: 3} obj2 = { a: 1, b: 3, f: 3} => { b: 3, f: 3 }
export function getObjectDiff(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...keys1, ...keys2];
  const diff: any = {};
  for (let key of keys) {
    if (obj1[key] !== obj2[key]) {
      diff[key] = obj2[key];
    }
  }
  return diff;
}

export function Time(date: string): string {
  const now = new Date();
  const givenDate = new Date(date);
  let diffInSeconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

  let unit = 'second';
  let num = diffInSeconds;
  if (Math.abs(diffInSeconds) >= 60) {
    num = Math.floor(Math.abs(diffInSeconds) / 60);
    unit = 'minute';
    if (num >= 60) {
      num = Math.floor(num / 60);
      unit = 'hour';
      if (num >= 24) {
        num = Math.floor(num / 24);
        unit = 'day';
      }
    }
  }

  if (num !== 1) {
    unit += 's';
  }

  if (diffInSeconds < 0) {
    return `in ${num} ${unit}`;
  } else {
    return `${num} ${unit} ago`;
  }
}
