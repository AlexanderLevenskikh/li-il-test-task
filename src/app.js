import Api from "./Api.js";
import ApiMapper from "./ApiMapper.js";
import {printTree} from "./printTree.js";

await initApp();

async function initApp() {
    try {
        let data = await Api.getServices();
        let treeModel = ApiMapper.mapToTreeModel(data);
        printTree(treeModel);

    } catch (e) {
        console.error(e);
    }
}

