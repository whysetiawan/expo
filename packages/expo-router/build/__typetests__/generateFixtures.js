"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToUnionType = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const fixtures = {
    basic: {
        staticRoutes: ['/apple', '/banana'],
        dynamicRoutes: [
            '/colors/${SingleRoutePart<T>}',
            '/animals/${CatchAllRoutePart<T>}',
            '/mix/${SingleRoutePart<T>}/${SingleRoutePart<T>}/${CatchAllRoutePart<T>}',
        ],
        dynamicRouteTemplates: [
            '/colors/[color]',
            '/animals/[...animal]',
            '/mix/[fruit]/[color]/[...animals]',
        ],
    },
};
async function default_1() {
    // await mkdir(join(__dirname, './fixtures/'), { force: true });
    const template = await (0, promises_1.readFile)((0, path_1.join)(__dirname, '../../types/expo-router.d.ts'), 'utf8');
    await Promise.all(Object.entries(fixtures).map(async ([key, value]) => {
        const types = template
            // Swap from being a namespace to a module
            .replace('declare namespace ExpoRouter {', '')
            // Add the route values
            .replace('type StaticRoutes = string;', `type StaticRoutes = ${(0, exports.setToUnionType)(value.staticRoutes)};`)
            .replace('type DynamicRoutes<T extends string> = string;', `type DynamicRoutes<T extends string> = ${(0, exports.setToUnionType)(value.dynamicRoutes)};`)
            .replace('type DynamicRouteTemplate = never;', `type DynamicRouteTemplate = ${(0, exports.setToUnionType)(value.dynamicRouteTemplates)};`)
            .replace(/\}\s+$/, '')
            .replaceAll(/export const/g, 'export declare const')
            .replaceAll(/export function/g, 'export declare function');
        return (0, promises_1.writeFile)((0, path_1.join)(__dirname, './fixtures/', key + '.ts'), types);
    }));
    console.log('done');
}
exports.default = default_1;
const setToUnionType = (set) => {
    return set.length > 0 ? [...set].map((s) => `\`${s}\``).join(' | ') : 'never';
};
exports.setToUnionType = setToUnionType;
//# sourceMappingURL=generateFixtures.js.map