const createTree = (array, parentId = "") => {
	const newArray = [];
	for (const it of array) {
		if(it.parent_id == parentId ){
			const children = createTree(array, it.id);
			if(children.length > 0){
				it.children = children;
			}
			newArray.push(it);
		}
	}
	return newArray;
};

module.exports = (array, parentId = "") => {
	const tree = createTree(array, parentId = "");
	return tree;
};