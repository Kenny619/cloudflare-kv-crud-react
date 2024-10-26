import type { Context } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Card } from "../components/ui/card";

export const loginSchema = z.object({
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" })
		.regex(/[a-zA-Z]/, {
			message: "Password must contain at least one alphabet",
		})
		.regex(/[A-Z]/, {
			message: "Password must contain at least one capital letter",
		})
		.regex(/\d/, { message: "Password must contain at least one number" })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Password must contain at least one symbol",
		}),
});

export const loginValidator = zValidator("form", loginSchema, (result, c) => {
	if (!result.success) {
		console.log(result.error.errors[0].message);
		return Login(
			c,
			result.error.errors.map((error) => error.message),
		);
	}
});

export const Login = (c: Context, errMsg?: string[]) => {
	return c.render(
		<Card title="Login" description="" footer="">
			<div className="flex flex-col w-full">
				<form action="/login/auth" method="post">
					<div className="flex flex-row gap-2">
						<label className="input input-bordered rounded-sm w-3/5 flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="h-4 w-4 opacity-70"
							>
								<title>Password</title>
								<path
									fillRule="evenodd"
									d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
									clipRule="evenodd"
								/>
							</svg>
							<input
								type="password"
								className="grow flex flex-row items-start"
								placeholder="Enter password"
								name="password"
								required
							/>
						</label>
						<button
							type="submit"
							className="btn  btn-info rounded-sm gap-2 flex flex-row "
						>
							login
						</button>
					</div>
				</form>

				<div className="mt-4">
					{errMsg
						? errMsg.map((msg) => (
								<p key={msg} className="text-sm text-left text-red-600">
									-{msg}
								</p>
							))
						: ""}
				</div>
			</div>
		</Card>,
	);
};
