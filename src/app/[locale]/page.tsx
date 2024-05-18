import { unstable_setRequestLocale } from "next-intl/server";

export default function MainPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Hello world!
    </h1>
  );
}
