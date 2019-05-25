/**
 * Code for Strings Mix Kata:
 * https://www.codewars.com/kata/5629db57620258aa9d000014
 */

export class G964 {
  public static mix(s1: string, s2: string): string {
    const charCount1 = this.createCharCounts(s1);
    const charCount2 = this.createCharCounts(s2);
    const response = this.createResponseString(charCount1, charCount2);
    return response;
  }

  public static createResponseString(
    charCounts1: charCountPair[],
    charCounts2: charCountPair[]
  ): string {
    const allCharCounts: charCountPair[] = [];

    for (let i = charCounts1.length - 1; i >= 0; i--) {
      const charCountPair = charCounts1[i];
      const char = charCountPair.char;
      const count = charCountPair.count;
      charCountPair.prefix = '1';

      const charInOtherStringIndex = charCounts2.findIndex(c => c.char === char);
      const charInOtherString = charCounts2[charInOtherStringIndex];

      if (charInOtherString) {
        if (charInOtherString.count === count) {
          charCountPair.prefix = '=';
        } else if (charInOtherString.count > count) {
          charCountPair.count = charInOtherString.count;
          charCountPair.prefix = '2';
        }
        charCounts2.splice(charInOtherStringIndex, 1);
      }

      allCharCounts.push(charCountPair);
    }

    const charCountsWithIds2 = this.addIdsToCharCounts(charCounts2, '2');

    const sortedCharCounts = [...allCharCounts, ...charCountsWithIds2].sort((a, b) => {
      if (b.count === a.count) {
        if (a.char < b.char) {
          return -1;
        }
        if (a.char > b.char) {
          return 1;
        }
      }
      return b.count - a.count;
    });

    const responseStrings = sortedCharCounts
      .map(charCount => {
        const chars = this.createChars(charCount.char, charCount.count);
        return `${charCount.prefix}:${chars}`;
      })
      .sort((a, b) => {
        if (a.length === b.length) {
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
        }
        return b.length - a.length;
      });

    return responseStrings.join('/');
  }

  public static createChars(char: string, count: number): string {
    let chars = '';
    for (let j = 0; j < count; j++) {
      chars = chars + char;
    }
    return chars;
  }

  public static addIdsToCharCounts(charCounts: charCountPair[], prefix: string): charCountPair[] {
    return charCounts.map(charCount => {
      charCount.prefix = prefix;
      return charCount;
    });
  }

  public static createCharCounts(text: string): charCountPair[] {
    const chars = [...text];
    const charCounts: charCountPair[] = [];
    chars.forEach(char => {
      const charIsLowerCase = char === char.toLowerCase() && char !== char.toUpperCase();

      if (charIsLowerCase) {
        const index = charCounts.findIndex(c => c.char === char);
        if (index === -1) {
          charCounts.push({ char, count: 1 });
        } else {
          const oldCount = charCounts[index].count;
          charCounts[index].count = oldCount + 1;
        }
      }
    });

    return charCounts.filter(c => c.count >= 2).sort((a, b) => b.count - a.count);
  }
}

interface charCountPair {
  prefix?: string;
  char: string;
  count: number;
}
