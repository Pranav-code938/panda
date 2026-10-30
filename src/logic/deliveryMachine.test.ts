import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextPandaExpression,
  getIgnoreButtonLabel,
  calculateEvasionOffset,
  processIgnoreAttempt,
} from './deliveryMachine';

test('panda expression escalates appropriately with ignore attempts', () => {
  assert.equal(getNextPandaExpression(0), 'serious');
  assert.equal(getNextPandaExpression(1), 'surprised');
  assert.equal(getNextPandaExpression(2), 'confused');
  assert.equal(getNextPandaExpression(3), 'bemused');
  assert.equal(getNextPandaExpression(4), 'exasperated');
  assert.equal(getNextPandaExpression(10), 'exasperated');
});

test('ignore button label transforms as requested', () => {
  assert.equal(getIgnoreButtonLabel(0), 'IGNORE');
  assert.equal(getIgnoreButtonLabel(1), 'IGNORE?');
  assert.equal(getIgnoreButtonLabel(2), 'IGNORE!');
  assert.equal(getIgnoreButtonLabel(3), 'nice try.');
  assert.equal(getIgnoreButtonLabel(4), 'nice try.');
  assert.equal(getIgnoreButtonLabel(5), 'Fine. Open it. 🙄');
  assert.equal(getIgnoreButtonLabel(8), 'Fine. Open it. 🙄');
});

test('evasion offsets stay safely within boundary bounds and avoid blocking center', () => {
  const bounds = { width: 320, height: 500 };
  for (let i = 1; i <= 8; i++) {
    const offset = calculateEvasionOffset(i, bounds, 0.42);
    // Absolute values should not exceed maximum bounded area
    assert.ok(Math.abs(offset.x) <= bounds.width * 0.45);
    assert.ok(Math.abs(offset.y) <= bounds.height * 0.35);
    // Should not be stuck at center (0, 0)
    assert.ok(Math.abs(offset.x) >= 20 || Math.abs(offset.y) >= 20);
  }
});

test('processIgnoreAttempt correctly advances counter and state', () => {
  const result = processIgnoreAttempt(0, { width: 360, height: 600 }, 0.5);
  assert.equal(result.count, 1);
  assert.equal(result.expression, 'surprised');
  assert.equal(result.label, 'IGNORE?');

  const result3 = processIgnoreAttempt(2, { width: 360, height: 600 }, 0.5);
  assert.equal(result3.count, 3);
  assert.equal(result3.expression, 'bemused');
  assert.equal(result3.label, 'nice try.');

  const result5 = processIgnoreAttempt(4, { width: 360, height: 600 }, 0.5);
  assert.equal(result5.count, 5);
  assert.equal(result5.expression, 'exasperated');
  assert.equal(result5.label, 'Fine. Open it. 🙄');
});
