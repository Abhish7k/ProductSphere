import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";
import {
  getNotifications,
  getProductsByUserId,
  isUserPremium,
} from "@/lib/actions";
import { redirect } from "next/navigation";

const PagesLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  const isPremium = await isUserPremium();

  const products = await getProductsByUserId(authenticatedUser?.user?.id || "");

  if (!isPremium && products?.length === 2) {
    redirect("/");
  }

  const notifications = await getNotifications();

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

export default PagesLayout;
