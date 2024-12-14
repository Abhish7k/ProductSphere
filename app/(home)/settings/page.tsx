import { auth } from "@/auth";
import { isUserPremium } from "@/lib/actions";
import { redirect } from "next/navigation";
import ManageBilling from "./ManageBilling";
import { getNextPaymentDetails } from "@/lib/stripe";
import UpgradePremiumButton from "./UpgradePremiumButton";

const SettingsPage = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  const isPremium = await isUserPremium();

  const subscriptionDetails = await getNextPaymentDetails();

  console.log(isPremium);

  return (
    <div className="md:w-3/5 mx-auto py-10 px-6 md:px-0">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-gray-500">Manage your settings</p>

      <div className="mt-10">
        {isPremium ? (
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h1>Next Payment Date</h1>
              <p className="">
                {subscriptionDetails
                  ? subscriptionDetails.nextPaymentDate
                  : "No payment date"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <h1>Next Payment Amount</h1>
              <p className="">
                ${" "}
                {subscriptionDetails
                  ? subscriptionDetails.amount
                  : "No payment amount"}
              </p>
            </div>

            <hr />

            {isPremium ? (
              <>
                <ManageBilling />
              </>
            ) : (
              <div
                className="mt-10 text-blue-500 
            cursor-pointer hover:underline"
              >
                Membership Info
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            <h1>You are not a premium user</h1>

            <div>
              <UpgradePremiumButton authenticatedUser={authenticatedUser} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
