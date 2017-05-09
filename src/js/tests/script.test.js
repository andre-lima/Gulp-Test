import test from 'ava';
import { timesTwo, timesNum, write } from '../script.js';

test('baz', t => {
	t.pass();
});

test('derp', async t => {
	const bar = Promise.resolve('derp');

	t.is(await bar, 'derp');
});

test('times 2', t => {
	t.is(timesTwo(5), 10);
    t.is(timesTwo(-10), -20);
});

test('times n', t => {
	t.is(timesNum(5,3), 15);
    t.is(timesNum(-10,-5), 50);
});

test('writing', t => {
	t.is(write('blabla'), 'blabla');
});
