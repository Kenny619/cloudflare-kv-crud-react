import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Dispatch } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, type ZodTypeAny } from "zod";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { kvNameContext } from "./kvTableUnit";
import { KVSchemaObjects } from "@/data/schema/all.schema";
import { kv } from "@/data/fn/kv.handler";
import { Button } from "@/components/ui/button";
export const KVTableInputRow = ({
	dispatch,
	inputMode,
	setInputMode,
	index,
}: {
	dispatch: Dispatch<Action>;
	inputMode: InputMode;
	setInputMode: SetInputMode;
	index?: number;
}) => {
	//retrieve kvName and setup schema type and data type
	const [kvName] = useContext(kvNameContext);
	const schema = KVSchemaObjects[kvName];
	type KVSchemaType = typeof schema;
	type DataItemType = InferDataSchema<KVSchemaType>;

	//create input fields schema from KVSchema
	const data = kv.get(kvName)[index ?? 0];

	//create zod schema = resolver from zod properties in KVSchema
	const zodSchema = z.object(
		schema.reduce((acc: Record<string, ZodTypeAny>, cur) => {
			acc[cur.name as keyof typeof acc] = cur.zod;
			return acc;
		}, {}) as Record<string, ZodTypeAny>,
	);
	// Acquire default values for union valueType
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const defaultValues = schema.reduce((acc: any, cur) => {
		if (Array.isArray(cur.valueType)) {
			if (inputMode.action === "add") {
				acc[cur.name] = cur.defaultValue;
			} else {
				acc[cur.name as keyof typeof acc] = data[cur.name];
			}
		}
		return acc;
	}, {});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<DataItemType>({
		resolver: zodResolver(zodSchema),
		defaultValues: defaultValues,
	});

	const onSubmitEdit = () => {
		setInputMode({ action: null });
		dispatch({
			type: "edit",
			payload: { schemaName: kvName, data: getValues(), index },
		});
	};

	const onSubmitAdd = () => {
		setInputMode({ action: null });
		dispatch({
			type: "add",
			payload: { schemaName: kvName, data: getValues() },
		});
	};

	const onSubmit = inputMode.action === "add" ? onSubmitAdd : onSubmitEdit;

	return (
		<>
			{schema.map((item) => (
				<TableCell key={`edit-td-${item.name}`} className="align-top">
					{Array.isArray(item.valueType) ? (
						<div className="form-control" key={item.name}>
							<Controller
								control={control}
								name={item.name}
								rules={{ required: item.required }}
								render={({ field }) => (
									<RadioGroup
										name={item.name}
										value={field.value as unknown as string}
										onValueChange={field.onChange}
									>
										{Array.isArray(item.valueType) &&
											item.valueType.map((option: string) => (
												<div key={option} className="flex items-center gap-2 ">
													<RadioGroupItem value={option} id={option} />
													<Label
														htmlFor={option}
														className="text-xs font-normal"
													>
														{option}
													</Label>
												</div>
											))}
									</RadioGroup>
								)}
							/>
						</div>
					) : (
						<Input
							className={`${errors[item.name] ? "border-destructive bg-destructive/20" : !item.editable || !item.creatable ? "border-secondary bg-background" : "border-primary"} `}
							key={`edit-input-${item.name}`}
							{...register(`${item.name}`, { required: item.required })}
							name={item.name}
							form="addNewItem"
							//If passed value was null, force convert it into a string
							defaultValue={
								inputMode.action === "add"
									? (item.defaultValue as string)
									: inputMode.action === "edit"
										? (data[item.name] as unknown as string)
										: ""
							}
							readOnly={!item.creatable}
						/>
					)}

					<span
						className="text-destructive text-sm pt-2"
						key={`edit-input-error-${item.name}`}
					>
						{errors[item.name]?.message}
					</span>
				</TableCell>
			))}
			<TableCell key={"new-td-submit"} className="align-top">
				<form onSubmit={handleSubmit(onSubmit)} id="addNewItem">
					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							className="rounded-sm min-w-16"
							onClick={() => setInputMode({ action: null })}
						>
							<span className="text-xs">Cancel</span>
						</Button>

						<Button type="submit" className="rounded-sm min-w-16">
							<span className="text-xs">
								{inputMode.action === "add" ? "Add" : "Update"}
							</span>
						</Button>
					</div>
				</form>
			</TableCell>
		</>
	);
};
