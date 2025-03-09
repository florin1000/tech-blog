---
title: Anagram
date: "2024-05-28T22:40:32.169Z"
description: How to efficiently solve an anagram
category: "Algorithms"
tags: ["algorithms", "anagram"]
heroImage: "./anagram.webp"
---

> **Problem**   
> Given two strings, a and b, write a function to determine if a is an anagram of b

#### Description

This is a classic algorithm problem where you need to determine if the two strings provided to the function are
anagrams of each other. An anagram is a word or phrase formed by rearranging the letters of another, typically using all the original letters exactly once. The function should return true if the strings are anagrams, and false otherwise.

#### Assumptions

-inputs (string *a* and *b*) are lowercase for simplicity

#### Approach

1. One way of solving this involves converting each string into an array of characters, sorting these arrays, and then joining them back into strings. If the sorted strings are equal, then the original strings are anagrams.
2. Using a proper Data structure like a hash map or an object to count the frequency of each character in the strings. Then, by comparing the character counts for both strings, you can determine if they are anagrams.

#### Solution 1

```js
const isAnagram = (a, b) => a.split("").sort().join("") === b.split("").sort().join("")
```

##### Pro

Using the built-in functions available for strings/lists and piping the results we can get readable solution.

##### Downside

It is not very efficient, the time complexity is O(n log n) (Since *sort()* is O(n log n))

#### Solution 2

```js

function anagram(a, b) {
  let map = new Map();
  const aSpread = [...a];
  const bSpread = [...b];

  for (let i = 0; i < aSpread.length; i++) {
    if (map.has(aSpread[i])) {

      map.set(aSpread[i], map.get(aSpread[i]) + 1)
    } else {
      map.set(aSpread[i], 1)
    }
  }

  for (let i = 0; i < bSpread.length; i++) {
    if (map.has(bSpread[i])) {
      if (map.get(bSpread[i]) === 1) {
        map.delete(bSpread[i])
      } else {
        map.set(bSpread[i], map.get(bSpread[i]) - 1)
      }
    } else {
      return false
    }
  }
  return map.size === 0;

}
```

What I have done:

1. Spread the characters into an array so that it’s clear we’re working with a list. Then, create an empty hash map to store the character frequencies.
2. Loop over the first array (consisting of the string’s characters) and create a key for every unique character. Increment the count for each occurrence to track how many times each character appears.
3. In the second loop, iterate over the characters and subtract from the counts. The goal is to have a count of zero for each letter at the end. If a character is not found, return false.

Complexity = O(n) + O(n) +O(1) = O(n)

#### Conclusion

 - In this post, we've explored multiple approaches to solving the anagram problem. The sorting method is simple and easy to implement, but it comes with a time complexity of O(n log n), making it less efficient for large inputs. On the other hand, the hash map approach offers a more efficient solution with an O(n) time complexity, though it requires a bit more thought in managing character counts.   
 - Choosing the right approach depends heavily on the constraints of the problem. For smaller inputs or less performance-critical scenarios, the simplicity of the sorting method might suffice. However, for larger datasets, the hash map approach is preferable.   
 - Every solution has its trade-offs. While the sorting solution is concise and leverages built-in functions, the hash map solution provides a better runtime efficiency. Understanding these trade-offs is crucial in algorithm design.

#### Reference
- [Codewars - Anagram Problems](https://www.codewars.com/kata/search/?q=anagram&order_by=sort_date%20desc)
- [LeetCode - Anagram Problems](https://leetcode.com/problemset/all/?search=anagram)
- [MDN Web Docs on JavaScript Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Understanding JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
