import {TreeNodeModel} from "./treeNodeModel.js";
import TreeModel from "./treeModel.js";

export default class ApiMapper {
    static mapToTreeModel(response) {
        response.services.sort((a, b) => a.sorthead - b.sorthead);

        let lookup = {};
        let treeNodes = [];

        for (let service of response.services) {
            let treeNode = new TreeNodeModel(
                service.id, service.name, service.price, service.node === 1, service.head);
            lookup[service.id] = treeNode;
            treeNodes.push(treeNode);
        }

        treeNodes.forEach(node => {
            if (node.headId) {
                lookup[node.headId].children.push(node);
            }
        })

        return new TreeModel(treeNodes.filter(node => node.isRoot()));
    }
}