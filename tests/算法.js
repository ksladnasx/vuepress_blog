/**
 * Definition for singly-linked list.
 */
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let arr = [];
  let current = head;
  while (current) {
    arr.push(current.val);
    current = current.next;
  }

  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[i] !== arr[arr.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

//调用函数，head 是一个链表的头节点，链表的结构为 1 -> 2 -> 2 -> 1
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);
console.log(isPalindrome(head));

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  let diff = new Array(temperatures.length).fill(0);
  // console.log(diff);
  for (let i = 1; i < temperatures.length; i++) {
    diff[i] = temperatures[i] - temperatures[i - 1];
  }
  let r = new Array(temperatures.length).fill(0);
  for (let i = 0; i < diff.length - 1; i++) {
    let tmp = 0;
    let count = 0;
    if (diff[i + 1] > 0) {
      r[i] = 1;
      continue;
    } else {
      for (let j = i + 1; j < diff.length; j++) {
        count++;
        tmp += diff[j];
        if (tmp > 0) {
          r[i] = count;
          break;
        }
      }
    }
  }

  return r;
};
//调用函数，temperatures 是一个数组，表示每天的温度
let temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemperatures(temperatures));

// 二叉树遍历+处理 = 翻转二叉树
var invertTree = function (root) {
  if (!root) return null;
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};

var canReact = function (arr, start, visited = new Set()) {
  // 越界检查
  if (start < 0 || start >= arr.length) return false;

  // 已经访问过，避免死循环
  if (visited.has(start)) return false;

  // 到达值为0的位置
  if (arr[start] === 0) return true;

  // 标记当前下标已访问
  visited.add(start);

  // 递归尝试两个方向
  return (
    canReact(arr, start + arr[start], visited) ||
    canReact(arr, start - arr[start], visited)
  );
};

const arr = [4, 2, 3, 0, 3, 1, 2];
console.log(canReact(arr, 5));

//最大正方形，动态规划
var maximalSquare = function (matrix) {
  if (!matrix.length || !matrix[0].length) return 0;

  let rows = matrix.length;
  let cols = matrix[0].length;
  let maxSide = 0;

  // dp[i][j] 表示以 (i,j) 为右下角的最大正方形边长
  let dp = new Array(rows);
  for (let i = 0; i < rows; i++) {
    dp[i] = new Array(cols).fill(0);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "1") {
        if (i === 0 || j === 0) {
          // 第一行或第一列，最大边长只能是1
          dp[i][j] = 1;
        } else {
          // 状态转移方程
          dp[i][j] =
            Math.min(
              dp[i - 1][j], // 上方
              dp[i][j - 1], // 左方
              dp[i - 1][j - 1], // 左上方
            ) + 1;
        }
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }

  return maxSide * maxSide; // 返回面积
};

// 测试
const matrix = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"],
];
console.log(maximalSquare(matrix)); // 输出: 4 (2x2的正方形)

//寻找第k大的数，快速选择
function findKthLargest(nums, k) {
  if (nums.length === 1) return nums[0];

  const pivotIndex = Math.floor(nums.length / 2);
  const pivot = nums[pivotIndex];

  const left = [];
  const right = [];
  const equal = [];

  for (const num of nums) {
    if (num > pivot) {
      right.push(num);
    } else if (num < pivot) {
      left.push(num);
    } else {
      equal.push(num);
    }
  }

  // 第 k 大在右边
  if (k <= right.length) {
    return findKthLargest(right, k);
  }

  // 第 k 大就是 pivot
  if (k <= right.length + equal.length) {
    return pivot;
  }

  // 去左边找
  return findKthLargest(left, k - right.length - equal.length);
}
// 测试
// const arr =[1,1,1,1,1,1];
const arr = [3, 2, 3, 1, 2, 4, 5, 5, 6];

console.log(findKthLargest(arr, 4));

// 实现 Trie (前缀树)
class Trie {
  constructor() {
    this.children = {}; //字典，每个节点相当于可以记录无数个子节点字母
    this.isEnd = false;
  }

  //公共方法就别带function了
  getallwords(node = this, prefix = "") {
    if (node.isEnd) {
      console.log(prefix);
    }

    for (const ch in node.children) {
      this.print(node.children[ch], prefix + ch);
    }
  }

  insert(word) {
    let node = this;

    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new Trie();
      }
      node = node.children[ch];
    }
    //单词匹配结束后结尾节点标记为一个单词结束
    node.isEnd = true;
  }

  insertmany(words) {
    let node = this;
    for (const word of words) {
      this.insert(word);
    }
  }
  search(word) {
    let node = this; //根节点开始

    //按顺序遍历单词每个字母
    for (const ch of word) {
      if (!node.children[ch]) {
        return false;
      }

      //继续下一个字母
      node = node.children[ch];
    }
    //如果单词的结尾字母并不属于任何单词的结尾字母node.isEnd为false，说明这并不是完整单词。
    return node.isEnd;
  }

  // 返回所有以 prefix 开头的单词
  getWordsWithPrefix(prefix) {
    let node = this;

    // 先找到 prefix 对应节点
    for (const ch of prefix) {
      if (!node.children[ch]) {
        return [];
      }

      node = node.children[ch];
    }

    const result = [];

    // DFS 搜索所有后续路径
    const dfs = (curNode, path) => {
      // 当前是完整单词
      if (curNode.isEnd) {
        result.push(path);
      }

      for (const ch in curNode.children) {
        dfs(curNode.children[ch], path + ch);
      }
    };

    dfs(node, prefix);

    return result;
  }

  // 打印树结构
  printTree(node = this, prefix = "", isLast = true, label = "root") {
    // 当前节点显示内容
    let marker = node.isEnd ? " *" : "";

    // root 特殊处理
    if (label === "root") {
      console.log("root");
    } else {
      console.log(prefix + (isLast ? "└── " : "├── ") + label + marker);
    }

    // 获取所有子节点
    const keys = Object.keys(node.children);

    keys.forEach((ch, index) => {
      const lastChild = index === keys.length - 1;

      // 下一层缩进
      const nextPrefix =
        label === "root" ? "" : prefix + (isLast ? "    " : "│   ");

      this.printTree(node.children[ch], nextPrefix, lastChild, ch);
    });
  }
}
//也可以这样添加公共方法
//判断是否为前缀，跟搜索差不多只是不用判断字母是否为单词结尾了
Trie.prototype.startwith = function (prefix) {
  let node = this;

  for (const ch of prefix) {
    if (!node.children[ch]) {
      return false;
    }
    node = node.children[ch];
  }

  return true;
};

const trie = new Trie();

trie.insert("app");
trie.insert("cat");
trie.insertmany(["apple", "application", "apply", "banana", "band", "bat"]);
console.log(trie.search("apple"));
console.log(trie.search("appl"));

console.log(trie.startwith("app"));

console.log(trie.getWordsWithPrefix("app"));

trie.printTree();

//连通图
class Map {
  constructor() {
    this.next = {};
  }
}

var canFinish = function (numCourses, prerequisites) {
  let graph = Array.from({ length: numCourses }, () =>
    Array(numCourses).fill(0),
  );

  // 建图
  for (const [a, b] of prerequisites) {
    graph[b][a] = 1;
  }

  // Floyd-Warshall
  for (let k = 0; k < numCourses; k++) {
    for (let i = 0; i < numCourses; i++) {
      for (let j = 0; j < numCourses; j++) {
        graph[i][j] = graph[i][j] || (graph[i][k] && graph[k][j]);
      }
    }
  }

  // 判断是否有环
  for (let i = 0; i < numCourses; i++) {
    if (graph[i][i]) {
      return false;
    }
  }

  return true;
};

console.log(
  canFinish(5, [
    [1, 4],
    [2, 4],
    [3, 1],
    [3, 2],
  ]),
);

// console.log(canFinish(20,[[0,10],[3,18],[5,5],[6,11],[11,14],[13,1],[15,1],[17,4]]))

//翻转链表
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) return null;

  const stack = [];

  let cur = head;

  // 全部入栈
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }

  // 新头节点
  const root = stack.pop();

  cur = root;

  // 出栈重连
  while (stack.length) {
    cur.next = stack.pop();

    cur = cur.next;
  }

  // 最后断开
  cur.next = null;

  return root;
};

//更好的解决办法，双指针原地反转
var reverseList = function (head) {
  let prev = null;
  let cur = head;

  while (cur) {
    // 保存下一个节点
    const next = cur.next;
    cur.next = prev; // 反转指针
    // 双指针前进
    prev = cur;
    cur = next;
  }
  return prev;
};


//岛屿数量
var numIslands = function(grid) {
  let r = grid.length
  let c = grid[0].length
  let count = 0
  for(let i = 0;i<=r;i++){
    for(let j = 0;j<= c;j++){
      if (grid[i][j]){
       if(i == 0 &j == 0){
          count++
       }else if(i == r-1 & j == 0){
          if(grid[i-1][j] != 1 ){
            count ++
          }
       }else if(i == 0 &j == c-1){
          if(grid[i][j-1] != 1 ){
            count ++
          }
       }else if(grid[i-1][j] != 1 && grid[i][j-1] != 1){
          count ++
       }

      }
      
    }
  }
};