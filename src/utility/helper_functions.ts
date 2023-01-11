
export function mergeObjectsWithArrayAsValue(a: { [key: string]: {}[] }, b: { [key: string]: {}[] }) {
    const merged: { [key: string]: {}[] } = {};
    const mergedKeys: Set<string> = new Set([...Object.keys(a || {}), ...Object.keys(b || {})])
    for (const key of mergedKeys) {
        merged[key] = [...((a)[key] || []), ...((b)[key] || [])]
    }
    return merged
}