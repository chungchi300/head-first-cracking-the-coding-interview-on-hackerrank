describe("All", () => {
  it("", () => {
    class LinkedList {
      constructor(value) {
        this.head = { value, next: null };
        this.tail = this.head;
      }
      insert(value) {
        //update tail
        const node = { value, next: null };
        this.tail.next = node;
        //NOTE: update quick short tail reference
        this.tail = node;
      }

      insertNode(value) {
        //update tail

        this.tail.next = node;
        this.tail = node;
      }
      remove(value) {
        let preNodeGoingToTargetValue = this.head;

        while (
          preNodeGoingToTargetValue.next &&
          preNodeGoingToTargetValue.next.value !== value
        ) {
          preNodeGoingToTargetValue = preNodeGoingToTargetValue.next;
        }
        //NOTE: travese and go to the node

        if (
          preNodeGoingToTargetValue.next &&
          preNodeGoingToTargetValue.next.value == value
        ) {
          //maintain new linked list
          preNodeGoingToTargetValue.next = preNodeGoingToTargetValue.next.next;

          //When it is set to null, it just removed to empty
          if (preNodeGoingToTargetValue.next == null) {
            console.log({ preNodeGoingToTargetValue });
            this.tail = preNodeGoingToTargetValue;
          } else {
            //reset removed node reference proper;y
            preNodeGoingToTargetValue.next.next = null;
          }
        }
      }
      getSecondLastNode() {
        let currentNode = this.head;

        while (currentNode.next !== this.tail) {
          currentNode = currentNode.next;
        }
        return currentNode;
      }
      removeTail() {
        let secondLastNode = this.getSecondLastNode();
        this.tail = secondLastNode;
        secondLastNode.next = null;
      }

      contains(value) {
        let nodeGoingToTargetValue = this.head;

        while (nodeGoingToTargetValue.value !== value) {
          nodeGoingToTargetValue = nodeGoingToTargetValue.next;
        }
        //NOTE: travese and go to the node

        return nodeGoingToTargetValue.value == value;
      }

      isHead(node) {
        return node === this.head;
      }

      isTail(node) {
        return node === this.tail;
      }
    }
    let myLinkedList = new LinkedList(1);
    expect(myLinkedList).toEqual({
      head: { value: 1, next: null },
      tail: { value: 1, next: null }
    });
    myLinkedList.insert(2);

    expect(myLinkedList).toEqual({
      head: { next: { next: null, value: 2 }, value: 1 },
      tail: { next: null, value: 2 }
    });
    myLinkedList.removeTail();
    expect(myLinkedList).toEqual({
      head: { value: 1, next: null },
      tail: { value: 1, next: null }
    });
    let node = { value: 2, next: null };
    myLinkedList.insertNode(node);

    expect(myLinkedList).toEqual({
      head: { next: { next: null, value: 2 }, value: 1 },
      tail: { next: null, value: 2 }
    });
    expect(myLinkedList.isTail(node)).toBe(true);

    myLinkedList.insert(3);
    expect(myLinkedList).toEqual({
      head: { next: { next: { next: null, value: 3 }, value: 2 }, value: 1 },
      tail: { next: null, value: 3 }
    });
    myLinkedList.remove(3);
    expect(myLinkedList).toEqual({
      head: { next: { next: null, value: 2 }, value: 1 },
      tail: { next: null, value: 2 }
    });
  });
});
