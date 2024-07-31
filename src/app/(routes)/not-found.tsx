import { redirect } from "next/navigation";

export default function RootNotFound() {
  return redirect("/dashboard");
}
