Java solution - passes 100% of test cases
I use a Trie.

If your tests are hanging/timing out/not finishing, you likely need a faster algorithm.

I keep a "size" at each node that keeps track of how many complete words can be made from that node. This makes my runtime faster since I don't have to recalculate the number of valid words from a node.

import java.util.Scanner;
import java.util.HashMap;

public class Solution {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();
        Trie trie = new Trie();
        for (int i = 0; i < n; i++) {
            String operation = scan.next();
            String contact   = scan.next();
            if (operation.equals("add")) {
                trie.add(contact);
            } else if (operation.equals("find")) {
                System.out.println(trie.find(contact));
            }
        }
        scan.close();
    }
}

/* Based loosely on tutorial video in this problem */
class TrieNode {
    private HashMap<Character, TrieNode> children = new HashMap<>();
    public int size;

    public void putChildIfAbsent(char ch) {
        children.putIfAbsent(ch, new TrieNode());
    }

    public TrieNode getChild(char ch) {
        return children.get(ch);
    }
}

class Trie {
    TrieNode root = new TrieNode();

    Trie(){} // default constructor

    Trie(String[] words) {
        for (String word : words) {
            add(word);
        }
    }

    public void add(String str) {
        TrieNode curr = root;
        for (int i = 0; i < str.length(); i++) {
            Character ch = str.charAt(i);
            curr.putChildIfAbsent(ch);
            curr = curr.getChild(ch);
            curr.size++;
        }
    }

    public int find(String prefix) {
        TrieNode curr = root;

        /* Traverse down tree to end of our prefix */
        for (int i = 0; i < prefix.length(); i++) {
            Character ch = prefix.charAt(i);
            curr = curr.getChild(ch);
            if (curr == null) {
                return 0;
            }
        }
        return curr.size;
    }
}
From my HackerRank Java solutions.
