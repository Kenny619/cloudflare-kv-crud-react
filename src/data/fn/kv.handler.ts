export const kv = {
	defaultData: {
		tracker: [
			{
				accountName: "emilimisumi",
				service: "Instagram",
				lastAccessed: "1728097408570",
				lastAccessedId: "3277807251907971645",
				status: "active",
			},
		],
	},

	get: (
		schemaName: keyof KVSchemaObject,
	): InferDataSchema<KVSchemaObject[typeof schemaName]>[] => {
		const storedKVdata = JSON.parse(localStorage.getItem(schemaName) ?? "[]");

		return storedKVdata;
	},

	add: (
		schemaName: keyof KVSchemaObject,
		data: InferDataSchema<KVSchemaObject[typeof schemaName]>,
	): InferDataSchema<KVSchemaObject[typeof schemaName]>[] => {
		const tempData = kv.get(schemaName) ?? [];
		tempData.push(data);
		localStorage.setItem(schemaName, JSON.stringify(tempData));
		return tempData;
	},

	edit: (
		schemaName: keyof KVSchemaObject,
		index: number,
		data: InferDataSchema<KVSchemaObject[typeof schemaName]>,
	): InferDataSchema<KVSchemaObject[typeof schemaName]>[] => {
		const tempData = kv.get(schemaName);
		tempData[index] = data;
		localStorage.setItem(schemaName, JSON.stringify(tempData));
		return tempData;
	},

	delete: (
		schemaName: keyof KVSchemaObject,
		index: number,
	): InferDataSchema<KVSchemaObject[typeof schemaName]>[] => {
		const tempData = kv.get(schemaName);
		tempData.splice(index, 1);
		localStorage.setItem(schemaName, JSON.stringify(tempData));
		return tempData;
	},
};
