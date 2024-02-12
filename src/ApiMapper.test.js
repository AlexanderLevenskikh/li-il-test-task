import ApiMapper from "./apiMapper.js";

test('Single node', () => {
    let data = {
        "services": [
            {
                "id": 1,
                "head": null,
                "name": "Проф.осмотр",
                "node": 0,
                "price": 100,
                "sorthead": 20
            }
        ]
    };
    let treeModel = ApiMapper.mapToTreeModel(data);
    expect(treeModel.roots.length).toBe(1);
    expect(treeModel.roots[0].isRoot()).toBe(true);
    expect(treeModel.roots[0].name).toBe('Проф.осмотр');
    expect(treeModel.roots[0].price).toBe(100);
    expect(treeModel.roots[0].isCategory).toBeFalsy();
});

test('One level order is correct', () => {
    let data = {
        "services": [
            {
                "id": 1,
                "head": null,
                "name": "Проф.осмотр",
                "node": 0,
                "price": 100,
                "sorthead": 20
            },
            {
                "id": 2,
                "head": null,
                "name": "Хирургия",
                "node": 1,
                "price": 0,
                "sorthead": 10
            },
        ]
    };
    let treeModel = ApiMapper.mapToTreeModel(data);
    expect(treeModel.roots.length).toBe(2);
    expect(treeModel.roots[0].id).toBe(2);
    expect(treeModel.roots[0].isCategory).toBeTruthy();
    expect(treeModel.roots[1].isCategory).toBeFalsy();
});

test('Correctly adds children', () => {
    let data = {
        "services": [
            {
                "id": 1,
                "head": null,
                "name": "Хирургия",
                "node": 1,
                "price": 0,
                "sorthead": 10
            },
            {
                "id": 2,
                "head": 1,
                "name": "Удаление зубов",
                "node": 1,
                "price": 0,
                "sorthead": 10
            },
        ]
    };
    let treeModel = ApiMapper.mapToTreeModel(data);
    expect(treeModel.roots.length).toBe(1);
    expect(treeModel.roots[0].id).toBe(1);
    expect(treeModel.roots[0].children.length).toBe(1);
    expect(treeModel.roots[0].children[0].id).toBe(2);
});

test('Children level order is correct', () => {
    let data = {
        "services": [
            {
                "id": 1,
                "head": null,
                "name": "Хирургия",
                "node": 1,
                "price": 0,
                "sorthead": 10
            },
            {
                "id": 2,
                "head": 1,
                "name": "Удаление зубов",
                "node": 1,
                "price": 0,
                "sorthead": 30
            },
            {
                "id": 3,
                "head": 1,
                "name": "Хирургические вмешательство",
                "node": 0,
                "price": 200,
                "sorthead": 10
            },
        ]
    };
    let treeModel = ApiMapper.mapToTreeModel(data);
    expect(treeModel.roots.length).toBe(1);
    expect(treeModel.roots[0].id).toBe(1);
    expect(treeModel.roots[0].children.length).toBe(2);
    expect(treeModel.roots[0].children[0].id).toBe(3);
    expect(treeModel.roots[0].children[1].id).toBe(2);
});