"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsd_lite_1 = require("tsd-lite");
const basic_1 = require("./fixtures/basic");
// eslint-disable-next-line react-hooks/rules-of-hooks
const router = (0, basic_1.useRouter)();
describe('router.push()', () => {
    // router.push will return void when the type matches, otherwise it should error
    describe('href', () => {
        it('will error on non-urls', () => {
            (0, tsd_lite_1.expectError)(router.push('should-error'));
        });
        it('can accept an absolute url', () => {
            (0, tsd_lite_1.expectType)(router.push('/apple'));
            (0, tsd_lite_1.expectType)(router.push('/banana'));
        });
        it('can accept a ANY relative url', () => {
            // We only type-check absolute urls
            (0, tsd_lite_1.expectType)(router.push('./this/work/but/is/not/valid'));
        });
        it('works for dynamic urls', () => {
            (0, tsd_lite_1.expectType)(router.push('/colors/blue'));
        });
        it('works for CatchAll routes', () => {
            (0, tsd_lite_1.expectType)(router.push('/animals/bear'));
            (0, tsd_lite_1.expectType)(router.push('/animals/bear/cat/dog'));
            (0, tsd_lite_1.expectType)(router.push('/mix/apple/blue/cat/dog'));
        });
        it.skip('works for optional CatchAll routes', () => {
            // CatchAll routes are not currently optional
            // expectType<void>(router.push('/animals/'));
        });
        it('will error when providing extra parameters', () => {
            (0, tsd_lite_1.expectError)(router.push('/colors/blue/test'));
        });
        it('will error when providing too few parameters', () => {
            (0, tsd_lite_1.expectError)(router.push('/mix/apple'));
            (0, tsd_lite_1.expectError)(router.push('/mix/apple/cat'));
        });
        it('can accept any external url', () => {
            (0, tsd_lite_1.expectType)(router.push('http://expo.dev'));
        });
    });
    describe('HrefObject', () => {
        it('will error on non-urls', () => {
            (0, tsd_lite_1.expectError)(router.push({ pathname: 'should-error' }));
        });
        it('can accept an absolute url', () => {
            (0, tsd_lite_1.expectType)(router.push({ pathname: '/apple' }));
            (0, tsd_lite_1.expectType)(router.push({ pathname: '/banana' }));
        });
        it('can accept a ANY relative url', () => {
            // We only type-check absolute urls
            (0, tsd_lite_1.expectType)(router.push({ pathname: './this/work/but/is/not/valid' }));
        });
        it('works for dynamic urls', () => {
            (0, tsd_lite_1.expectType)(router.push({
                pathname: '/colors/[color]',
                params: { color: 'blue' },
            }));
        });
        it('requires a valid pathname', () => {
            (0, tsd_lite_1.expectError)(router.push({
                pathname: '/colors/[invalid]',
                params: { color: 'blue' },
            }));
        });
        it('requires a valid param', () => {
            (0, tsd_lite_1.expectError)(router.push({
                pathname: '/colors/[color]',
                params: { invalid: 'blue' },
            }));
        });
        it('works for catch all routes', () => {
            (0, tsd_lite_1.expectType)(router.push({
                pathname: '/animals/[...animal]',
                params: { animal: ['cat', 'dog'] },
            }));
        });
        it('allows numeric inputs', () => {
            (0, tsd_lite_1.expectType)(router.push({
                pathname: '/mix/[fruit]/[color]/[...animals]',
                params: { color: 1, fruit: 'apple', animals: [2, 'cat'] },
            }));
        });
        it('requires an array for catch all routes', () => {
            (0, tsd_lite_1.expectError)(router.push({
                pathname: '/animals/[...animal]',
                params: { animal: 'cat' },
            }));
        });
        it('works for mixed routes', () => {
            (0, tsd_lite_1.expectType)(router.push({
                pathname: '/mix/[fruit]/[color]/[...animals]',
                params: { color: 'red', fruit: 'apple', animals: [] },
            }));
        });
        it('requires all params in mixed routes', () => {
            (0, tsd_lite_1.expectError)(router.push({
                pathname: '/mix/[fruit]/[color]/[...animals]',
                params: { color: 'red', animals: ['cat', 'dog'] },
            }));
        });
    });
});
it('useLocalSearchParams', () => {
    (0, tsd_lite_1.expectType)((0, basic_1.useLocalSearchParams)());
    (0, tsd_lite_1.expectType)((0, basic_1.useLocalSearchParams)());
    (0, tsd_lite_1.expectError)((0, basic_1.useLocalSearchParams)());
    (0, tsd_lite_1.expectError)((0, basic_1.useLocalSearchParams)());
});
it('useGlobalSearchParams', () => {
    (0, tsd_lite_1.expectType)((0, basic_1.useGlobalSearchParams)());
    (0, tsd_lite_1.expectType)((0, basic_1.useGlobalSearchParams)());
    (0, tsd_lite_1.expectError)((0, basic_1.useGlobalSearchParams)());
    (0, tsd_lite_1.expectError)((0, basic_1.useGlobalSearchParams)());
});
describe('useSegments', () => {
    it('can accept an absolute url', () => {
        (0, tsd_lite_1.expectType)((0, basic_1.useSegments)());
    });
    it('only accepts valid possible urls', () => {
        (0, tsd_lite_1.expectError)((0, basic_1.useSegments)());
    });
    it('can accept an array of segments', () => {
        (0, tsd_lite_1.expectType)((0, basic_1.useSegments)());
    });
    it('only accepts valid possible segments', () => {
        (0, tsd_lite_1.expectError)((0, basic_1.useSegments)());
    });
});
//# sourceMappingURL=typed-routes.test.js.map