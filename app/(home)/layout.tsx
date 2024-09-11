import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";
import { unstable_noStore as noStore } from "next/cache";

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  noStore();

  const authenticatedUser = await auth();

  console.log(authenticatedUser);

  return (
    <html lang="en">
      <body>
        <Navbar authenticatedUser={authenticatedUser} />

        {children}
      </body>
    </html>
  );
};

export default HomeLayout;
