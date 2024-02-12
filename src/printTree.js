import TreeModel from "./treeModel.js";
import {traverseTree} from "./traverseTree.js";
import {unicodeCharacters} from "./constants.js";

export function printTree(tree) {
    if (!(tree instanceof TreeModel)) {
        throw new Error("Tree must be instance of TreeModel");
    }

    let renderRoot = document.createElement('ul');
    renderRoot.classList.add('list');

    let nodes = traverseTree(tree);
    for(let {node, nestingLevel} of nodes) {
        printLineToDOM(node, nestingLevel, renderRoot);
    }

    document.body.append(renderRoot);
}

function printLineToDOM(node, nestingLevel, renderRoot) {
    let child = document.createElement('li');
    child.classList.add(node.isCategory ? 'category' : 'service', 'item');
    renderRoot.append(child);
    child.innerText =
        `${unicodeCharacters.nbsp.repeat(nestingLevel * 4)} ${ node.name } ${ node.isCategory ? unicodeCharacters.arrowDown : `${node.price} ${unicodeCharacters.rouble}` }`
}