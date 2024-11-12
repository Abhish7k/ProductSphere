import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { PiBell, PiGear } from "react-icons/pi";
import PendingProducts from "./PendingProducts";
import { auth } from "@/auth";
import {
  getActiveProducts,
  getAdminData,
  getPendingProducts,
  getRejectedProducts,
  getTotalUpvotesCount,
  getUsers,
  isUserAdmin,
} from "@/lib/actions";
import { redirect } from "next/navigation";
import { OverviewChart } from "@/components/OverviewChart";
import { RecentActivity } from "@/components/RecentActivity";

const AdminPage = async () => {
  const isAdmin = await isUserAdmin();

  if (!isAdmin) {
    return redirect("/");
  }

  const authenticatedUser = await auth();

  const users = await getUsers();

  const activeProducts = await getActiveProducts();

  const pendingProducts = await getPendingProducts();

  const rejectedProducts = await getRejectedProducts();

  const totalUpvotesCount = await getTotalUpvotesCount();

  const premiumUsers = users.filter((user) => user.isPremium);

  const data = await getAdminData();

  return (
    <div className="px-8 md:px-20 xl:px-[10%] 2xl:px-[12%] transition-all">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-6 items-center py-10">
          <Link href="/">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={500}
              height={500}
              className="w-14 h-14 md:w-20 md:h-20 rounded-md cursor-pointer transition-all"
            />
          </Link>

          <div className="transition-all">
            <h1 className="text-2xl md:text-4xl font-bold transition-all">
              Welcome back Admin
            </h1>
            <p className="text-sm md:text-base text-gray-500 transition-all">
              Here is what&apos;s happening in your business today
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 px10 gap-4 mt-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">Users</CardTitle>👤
          </CardHeader>
          <CardContent>{users.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">Premium Users</CardTitle>{" "}
            💰
          </CardHeader>
          <CardContent>{premiumUsers.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">Active Products</CardTitle>{" "}
            📦
          </CardHeader>
          <CardContent>{activeProducts.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">
              Pending Products
            </CardTitle>{" "}
            🕒
          </CardHeader>
          <CardContent>{pendingProducts.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">
              Rejected Products
            </CardTitle>
            🚫
          </CardHeader>
          <CardContent>{rejectedProducts.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-bold">Upvotes</CardTitle> 🔺
          </CardHeader>
          <CardContent>{totalUpvotesCount}</CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-7 my-5 gap-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="pb-10">Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <OverviewChart data={data} />
          </CardContent>
        </Card>

        <Card className="w-full col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>View recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity users={users} />
          </CardContent>
        </Card>
      </div>

      <Separator className="my-10" />

      <div className="pb-10 space-y-10">
        <h1 className="text-2xl font-bold">Pending Products</h1>

        <PendingProducts
          pendingProducts={pendingProducts}
          authenticatedUser={authenticatedUser}
        />
      </div>
    </div>
  );
};

export default AdminPage;
