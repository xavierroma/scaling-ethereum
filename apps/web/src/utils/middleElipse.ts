export function middleElipse(str: string = ""): string {
    if (str.length > 35) {
      return str.substr(0, 8) + "..." + str.substr(str.length - 8, str.length);
    }
    return str;
  }
  