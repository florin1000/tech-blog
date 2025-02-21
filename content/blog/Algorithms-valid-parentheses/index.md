---
title: Algorithms - Valid Parentheses
date: "2024-05-28T22:40:32.169Z"
description: How to check for right pair of parentheses
---

> **Problem**   
> Given a string containing just the characters '(', ')', '{', '}', '\[', and '\]', determine if the input string is valid.

#### Description

What the problem asks is you to check if the input provided consists of opened and closed parentheses (in the right order)
ex:
1.Input: "()" -> *true*
2.Input: "()[]{}" -> *true*
3.Input: "(]" -> *false*

#### Assumptions

-input is only made of parentheses *(}]){[* and has al least 2 chars

#### Approach

Although there are many ways to solve this le't focus on the most evident and easy to implement, which is using the appropriate
data structure which is a stack. Because in javascript we don't really have a stack we are going to use an array and keep adding
or removing elements at the beginning or the end. In our case we are going to use a stack with methods like Last-In-First-Out (LIFO) behavior

#### Solution

```js
function validParentheses(param) {
  //valid input is made only of "()[]{}" and is at least length of so we don;t have to do additional checks

  const parenthesesMap = new Map()
  parenthesesMap.set("(", ")");
  parenthesesMap.set("[", "]");
  parenthesesMap.set("{", "}");
  parenthesesMap.set(")", "(");
  parenthesesMap.set("]", "[");
  parenthesesMap.set("}", "{");

  const bufferStack = [];
  for (const c of param) {
    if (bufferStack[bufferStack.length - 1] === parenthesesMap.get(c)) {
      bufferStack.pop();
    } else {
      bufferStack.push(c)
    }
  }
  return bufferStack.length === 0;
}

```

#### Explanation

We know the input only contains three types of parentheses: (), [], and {}.
We use a stack (bufferStack) to keep track of the opening parentheses as we iterate over the string. For each character in the string:

- If the character is a closing bracket and it matches the opening bracket at the top of the stack (determined by our parenthesesMap), we remove the opening bracket from the stack.
- Otherwise, we push the current character onto the stack.
  At the end, if the stack is empty, it means that every opening bracket was properly matched with a corresponding closing bracket, so the input string is valid. Otherwise, there are unmatched brackets remaining.

#### Conclusion

This solution is efficient, operating in O(n) time by leveraging a stack to manage matching parentheses. By processing each character only once, it efficiently validates whether all brackets in the input are correctly paired and nested.
enough 
#### Reference
- [Codewars - Anagram Problems](https://www.codewars.com/kata/search/?q=parentheses&order_by=sort_date%20desc)
- [LeetCode - Anagram Problems](https://leetcode.com/problemset/?search=parentheses)
- [MDN Web Docs on JavaScript Arrays Push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [Understanding JavaScript Arrays Pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
