export { auth as middleware } from "@/auth";
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.mp4|png|jpg$).*)"],
};