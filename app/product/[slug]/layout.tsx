import { auth } from "@/auth";
import Navbar from "@/components/navbar/Navbar";

const ProductPageLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const authenticatedUser = await auth();

  return (
    <html lang="en">
      <body>
        <Navbar authenticatedUser={authenticatedUser} />
        {children}
      </body>
    </html>
  );
};

export default ProductPageLayout;
