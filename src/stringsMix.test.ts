import { G964 } from './stringsMix';

it('creates char counts', () => {
  const text = 'Aaaa bbB ssss c';
  const charCounts = G964.createCharCounts(text);

  expect(charCounts[0]).toStrictEqual({ char: 's', count: 4 });
  expect(charCounts[1]).toStrictEqual({ char: 'a', count: 3 });
  expect(charCounts[2]).toStrictEqual({ char: 'b', count: 2 });
});

it('creates the correct string', () => {
  const text1 = 'Are the kids at home? aaaaa fffff';
  const text2 = 'Yes they are here! aaaaa fffff';
  const charCounts1 = G964.createCharCounts(text1);
  const charCounts2 = G964.createCharCounts(text2);

  expect(charCounts1[0]).toStrictEqual({ char: 'a', count: 6 });
  expect(charCounts1[1]).toStrictEqual({ char: 'f', count: 5 });
  expect(charCounts1[2]).toStrictEqual({ char: 'e', count: 3 });

  const response = G964.createResponseString(charCounts1, charCounts2);
  expect(response).toBe('=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh');
});

it('creates the correct string for strings with special characters', () => {
  const text1 = 'mmmmm m nnnnn y&friend&Paul has heavy hats! &';
  const text2 = 'my frie n d Joh n has ma n y ma n y frie n ds n&';
  const charCounts1 = G964.createCharCounts(text1);
  const charCounts2 = G964.createCharCounts(text2);
  const response = G964.createResponseString(charCounts1, charCounts2);

  expect(response).toBe('1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss');
});

it('creates the correct char string', () => {
  expect(G964.createChars('a', 4)).toBe('aaaa');
  expect(G964.createChars('h', 2)).toBe('hh');
  expect(G964.createChars('k', 7)).toBe('kkkkkkk');
  expect(G964.createChars('f', 3)).toBe('fff');
});
