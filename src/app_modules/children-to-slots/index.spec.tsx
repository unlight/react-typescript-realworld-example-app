import React from 'react';
import { childrenToSlots } from '.';

describe('children slots', () => {
    it('smoke test', () => {
        expect(childrenToSlots).toEqual(expect.any(Function));
        expect(childrenToSlots.length).toEqual(1);
    });

    it('default (single)', () => {
        const children = <div />;
        const result = childrenToSlots(children);
        expect(result.default).toBe(children);
    });

    it('default (multiple)', () => {
        const children = [<div />, <span />];
        const result = childrenToSlots(children);
        expect(result.default).toEqual(children);
    });

    it('named (single)', () => {
        const children = <div slot="testSlot" />;
        const result = childrenToSlots(children);
        expect(result.testSlot).toBe(children);
    });

    it('named (multiple)', () => {
        const children = [
            <div />,
            <div slot="testSlot" />,
            <span slot="testSlot" />,
            <span slot="testSlot2" />,
            <span />,
        ];
        const result = childrenToSlots(children);
        expect(result.default).toEqual([children[0], children[4]]);
        expect(result.testSlot).toEqual([children[1], children[2]]);
        expect(result.testSlot2).toBe(children[3]);
    });
});
