const Queue = require('../queue/Queue')
const store = require('../../store')

// Set up initial data.
// --------------------

const people = new Queue()
store.people.forEach(person => people.enqueue(person))

// --------------------

module.exports = {
  get() {
    // Return all people in the queue.
  },

  enqueue(person) {
    // Add a person to the queue.
  },

  dequeue() {
    // Remove a person from the queue.
  }
}
