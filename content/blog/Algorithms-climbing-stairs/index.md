---
title: Climbing Stairs
date: "2024-05-28T22:40:32.169Z"
description: In how many ways you can climb a staircase
category: "Algorithms"
tags: ["algorithms", "stairs"]
heroImage: './stairs3.webp'
---

> **Problem**   
> You are climbing a staircase with n steps. At each step, you can climb either 1 or 2 steps. Determine the number of distinct ways to reach the top.
> 
#### Description

What the problem asks is to determine in how many ways you can climb a staircase if you can climb 1 or 2 steps at once
ex:
1.Input: "n = 3" -> *3*
explanation: (1 + 1 + 1) or (1 + 2) or (2 + 1)

#### Assumptions

The input n is an integer greater than 1.

#### Approach

To solve this problem, write down the number of ways you can combine 1 and 2 steps to reach the top. For example:
n= 2 => (1+1) or (2)  →*2*
n= 3 => (1+1+1) or (2+1) or (1+2)  →*3*
n= 4 => (1+1+1+1) or (2+1+1) or (1+2+1) or (1+1+2) or (2+2)  →*5*
n= 5 => (1+1+1+1+1) or (2+1+1+1) or (1+2+1+1) or (1+1+2+1) or (1+1+1+2) or (1+2+2) or (2+1+2) or (2+2+1)  →*8*

AS you can see the result for *n* is the made of *n-1* + *n-2*.
for n = 4 => 3 + 2 => 3+2 =>5
for n = 5 => 4 + 3 => 5+3 =>8

Notice that the number of ways for n steps is the sum of the ways for n-1 and n-2 steps. This recurrence is similar to the Fibonacci sequence:

1. bottom-up -> *while* loop
2. recursive

#### Solution

```js
//assumption is that the inoput is greater than 0 and is integer
function climbingStairs(n, sum = 0) {
  if (n === 2 || n === 3) {

    return n;
  }

  let i = 3
  let s = [2, 3];
  while (i < n) {
    s[1] = s[0] + s[1]
    s[0] = s[1] - s[0];
    i++;
  }

  return s[1]

}

function climbingStairs2(n, list = [2, 3], i = 3) {
  if (n === 2 || n === 3) {

    return n;
  }

  if (i < n) {
    list[1] = list[0] + list[1]
    list[0] = list[1] - list[0];

    return climbingStairs2(n, list, i + 1)
  }

  return list[1]
}
```

#### Explanation

1. The first solution uses a while loop to build the result iteratively. It maintains an array with two elements representing the number of ways to reach the last two steps. At each iteration, it calculates the current number of ways by summing these two values, then updates the array accordingly.
2. The recursive approach follows the same logic but uses recursion to update the state. Both solutions have O(n) time complexity, but the iterative solution is preferred in JavaScript because it avoids potential stack overflow issues due to recursion.

#### Conclusion

Both solutions have a time complexity of O(n) since they iterate through the problem space only once. The iterative, bottom-up approach is generally more efficient and reliable in JavaScript due to the lack of tail call optimization, which can make the recursive approach prone to stack overflow on very large inputs. For readability and performance, the iterative solution is recommended.

#### Reference

- [Codewars - Climbing stairs Problems](https://www.codewars.com/kata/search/?q=stairs&order_by=sort_date%20desc)
- [LeetCode - Climbing stairs Problems](https://leetcode.com/problemset/?search=stairs)
- [MDN Web Docs on JavaScript Maximum call stack call size](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Too_much_recursion)
- [Developer Mozzila Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion)
