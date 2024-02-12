export class TreeNodeModel {
    id;
    name;
    price;
    headId;
    isCategory;
    children = [];

    constructor(id, name, price, isCategory, headId, children = []) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.isCategory = isCategory;
        this.headId = headId;
        this.children = children;
    }

    isRoot() {
        return this.headId === null || this.headId === undefined;
    }
}