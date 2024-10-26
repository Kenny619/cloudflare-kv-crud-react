import type { z } from "zod";
type Item = {
	name: string;
	valueType: string | string[];
	required: boolean;
	nullable: boolean;
	zod: z.ZodType;
	zodError: string;
	creatable: boolean;
	editable: boolean;
	defaultValue?: string;
};

function displayValue(
	editValue: string | undefined,
	defaultValue: string | undefined,
) {
	if (editValue) return editValue;
	if (defaultValue) return defaultValue;
	return "";
}

function defaultChecked(
	editValue: string | undefined,
	defaultValue: string | undefined,
	option: string,
) {
	if (editValue) {
		return editValue === option;
	}
	if (defaultValue) {
		return defaultValue === option;
	}
	return false;
}

const InputElement = ({
	itemSchema,
	editValue,
}: { itemSchema: Item; editValue?: string }) => {
	const { name, valueType, required, editable, defaultValue, nullable } =
		itemSchema;

	if (!Array.isArray(valueType)) {
		return (
			<>
				<div className="label pb-0 mb-0">
					<span className="label-text text-sm text-error">
						{required ? "*" : ""}
					</span>
				</div>
				{editable ? (
					<input
						name={name}
						value={displayValue(editValue, defaultValue)}
						type="text"
						required={required}
						className="input input-bordered w-full "
					/>
				) : (
					<input
						name={name}
						value={displayValue(editValue, defaultValue)}
						type="text"
						required={required}
						readOnly
						className="input input-bordered w-full "
					/>
				)}
			</>
		);
	}

	return (
		<>
			{required ? (
				<div className="label pb-0 mb-0">
					<span className="label-text text-sm text-error">
						{required ? "*" : ""}
					</span>
				</div>
			) : null}
			<div className="form-control">
				{valueType.map((option) => (
					<label key={option} className="label cursor-pointer">
						<span className="label-text text-sm pr-2">{option}</span>
						<input
							type="radio"
							name={name}
							value={option}
							className="radio"
							checked={defaultChecked(editValue, defaultValue, option)}
						/>
					</label>
				))}
			</div>
		</>
	);
};

export default InputElement;
