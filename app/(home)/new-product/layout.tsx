import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";
import { getNotifications } from "@/lib/actions";
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

  const notifications = await getNotifications();

  return (
    <html lang="en">
      <body>
        <Navbar
          authenticatedUser={authenticatedUser}
          notifications={notifications}
        />

        {children}
      </body>
    </html>
  );
};

export default PagesLayout;
