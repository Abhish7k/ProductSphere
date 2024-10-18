import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

const PagesLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  noStore();

  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body>
        <Navbar authenticatedUser={authenticatedUser} />

        {children}
      </body>
    </html>
  );
};

export default PagesLayout;
