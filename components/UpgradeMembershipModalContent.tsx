import { createCheckoutSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { PiX } from "react-icons/pi";
import { toast } from "sonner";

interface UpgradeMembershipProps {
  authenticatedUser: any;
}

const UpgradeMembershipModalContent: React.FC<UpgradeMembershipProps> = ({
  authenticatedUser,
}) => {
  const handleCallCheckoutSession = async () => {
    try {
      const result = await createCheckoutSession({
        email: authenticatedUser.user.email,
      });

      if (result && result.url) {
        window.location.href = result.url;
        // redirect(result.url)
      } else {
        throw new Error("Error creating checkout session");
      }
    } catch (error) {
      toast(
        <>
          <div className="flex items-center gap-4 mx-auto w-full">
            <PiX className="text-red-500 text-3xl" />
            <p className="text-md font-semibold">
              Could not create checkout session. Please try again later.
            </p>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-2xl font-semibold text-center">
        🚀 Go Pro and unlock more features
      </h1>
      <p className="text-gray-600 text-center max-w-md">
        Looking to create more projects ? Upgrade your membership to unlock
        unlimited projects
      </p>

      <div className="pt-5">
        <button
          onClick={handleCallCheckoutSession}
          className="group relative px-6 py-2 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white text-white bg-indigo-500 font-medium transition-all duration-300 hover:ring-2 hover:ring-indigo-500 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <span className="relative z-10 flex items-center gap-2">
            Upgrade Membership
          </span>

          <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
        </button>
      </div>
    </div>
  );
};

export default UpgradeMembershipModalContent;
