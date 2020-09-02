const mock = () => {
	let list = [];
	let sublist;
	const maxI = parseInt(Math.random() * 20) + 1;
	let maxJ;
	for (let i = 0; i < maxI; ++i) {
		sublist = [];
		maxJ = parseInt(Math.random() * 20) + 1;
		for (let j = 0; j < maxJ; ++j) {
			sublist.push({
				title: `Color ${i}x${j}`,
				color: `#${((1 << 24) * Math.random() | 0).toString(16)}000000`.substr(0, 7)
			});
		}
		list.push(sublist);
	}
	return list;
};

export default mock;
