/*
INSTRUCTION:
- define new schema file under this directory.  Use registered KV name as a key and the file name.
- import the schema file to this file.
- add the schema to the KVSchemaObject.
*/

import trackerSchema from "./tracker.schema";

export const KVSchemaObjects: KVSchemaObject = {
	tracker: trackerSchema,
};
