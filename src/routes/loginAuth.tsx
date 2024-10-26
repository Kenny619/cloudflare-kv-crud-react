import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

export const loginAuth = async (c: Context) => {
	const { password } = await c.req.parseBody();

	if (password !== c.env.ADMIN_PASSWORD) {
		return c.redirect("/login?invalidpassword");
	}

	const jwt = await sign(
		{
			role: "admin",
		},
		c.env.JWT_SECRET,
	);

	setCookie(c, "token", jwt, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
		path: "/",
	});

	return c.redirect("/admin");
};
