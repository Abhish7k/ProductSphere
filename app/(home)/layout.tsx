import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";
import { getNotifications, getProductsByUserId } from "@/lib/actions";

const HomeLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();

  const notifications = await getNotifications();

  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");

  return (
    <html lang="en">
      <body>
        <Navbar
          authenticatedUser={authenticatedUser}
          notifications={notifications}
          products={products}
        />

        {children}
      </body>
    </html>
  );
};

export default HomeLayout;
