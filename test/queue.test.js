const Queue = require('../src/utils/queue');

describe.only('Tests of the queue', () => {

    test.only('When queue is created it is empty', () => {
        const queue = new Queue();

        expect(queue.isEmpty()).toBeTruthy();
    })

    test.only('When element is added to the queue peek shows the first element and does`t remove it ', () => {
        const queue = new Queue();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.peek()).toEqual(1);

        expect(queue.elements).toEqual([1,2,3]);
        expect(queue.elements.length).toEqual(3);
    })

    test.only('When element is added to the queue dequeue shows returns the first element ', () => {
        const queue = new Queue();

        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        expect(queue.dequeue()).toEqual(1);

        expect(queue.elements).toEqual([2,3]);
        expect(queue.elements.length).toEqual(2);
    })
})
