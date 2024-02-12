import TreeModel from "./treeModel.js";
import {traverseTree} from "./traverseTree.js";

test('traversal order is correct', () => {
    let roots = [
        {
            "id": 2,
            "name": "Хирургия",
            "price": 0,
            "headId": null,
            "isCategory": true,
            "children": [
                {
                    "id": 3,
                    "name": "Удаление зубов",
                    "price": 0,
                    "headId": 2,
                    "isCategory": true,
                    "children": [
                        {
                            "id": 4,
                            "name": "Удаление зуба",
                            "price": 800,
                            "headId": 3,
                            "isCategory": false,
                            "children": []
                        },
                        {
                            "id": 6,
                            "name": "Удаление осколка зуба",
                            "price": 2000,
                            "headId": 3,
                            "isCategory": false,
                            "children": []
                        },
                        {
                            "id": 5,
                            "name": "Удаление 8ого зуба",
                            "price": 1000,
                            "headId": 3,
                            "isCategory": false,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 7,
                    "name": "Хирургические вмешательство",
                    "price": 200,
                    "headId": 2,
                    "isCategory": false,
                    "children": []
                },
                {
                    "id": 8,
                    "name": "Имплантация зубов",
                    "price": 0,
                    "headId": 2,
                    "isCategory": true,
                    "children": [
                        {
                            "id": 9,
                            "name": "Коронка",
                            "price": 3000,
                            "headId": 8,
                            "isCategory": false,
                            "children": []
                        },
                        {
                            "id": 10,
                            "name": "Слепок челюсти",
                            "price": 500,
                            "headId": 8,
                            "isCategory": false,
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 1,
            "name": "Проф.осмотр",
            "price": 100,
            "headId": null,
            "isCategory": false,
            "children": []
        }
    ];
    let tree = new TreeModel(roots);

    let nodes = [...traverseTree(tree)];
    let expectedOrderWithNestingLevels = [
        { id: 2, nestingLevel: 0 },
        { id: 3, nestingLevel: 1 },
        { id: 4, nestingLevel: 2 },
        { id: 6, nestingLevel: 2 },
        { id: 5, nestingLevel: 2 },
        { id: 7, nestingLevel: 1 },
        { id: 8, nestingLevel: 1 },
        { id: 9, nestingLevel: 2 },
        { id: 10, nestingLevel: 2 },
        { id: 1, nestingLevel: 0 },
    ]

    expectedOrderWithNestingLevels.forEach((expectedOrderWithNestingLevel, i) => {
        expect(nodes[i].node.id).toBe(expectedOrderWithNestingLevel.id);
        expect(nodes[i].nestingLevel).toBe(expectedOrderWithNestingLevel.nestingLevel);
    });

})