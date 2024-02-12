export function* traverseTree(tree) {
    let nodeStack = [];
    for (let i = tree.roots.length - 1; i >= 0; i--) {
        nodeStack.push([tree.roots[i], 0]);
    }

    while (nodeStack.length) {
        let [node, nestingLevel] = nodeStack.pop();
        for (let i = node.children.length - 1; i >= 0; i--) {
            nodeStack.push([node.children[i], nestingLevel + 1]);
        }

        yield {
            node,
            nestingLevel
        }
    }
}