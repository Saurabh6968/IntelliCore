const test = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const connectDB = require('../src/db');

const originalConnect = mongoose.connect;
const originalExit = process.exit;

test('connectDB does not exit the process when MongoDB is unreachable', async () => {
  let exitCalled = false;

  process.exit = (...args) => {
    exitCalled = true;
    throw new Error(`process.exit called with ${args.join(', ')}`);
  };

  mongoose.connect = async () => {
    throw new Error('simulated MongoDB connection failure');
  };

  try {
    const result = await connectDB();
    assert.equal(result, false);
    assert.equal(exitCalled, false);
  } finally {
    process.exit = originalExit;
    mongoose.connect = originalConnect;
  }
});
