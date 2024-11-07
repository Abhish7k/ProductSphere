import { FaXmark } from "react-icons/fa6";

const PaymentFailedPage = () => {
  return (
    <div className="flex flex-col gap-10 items-center justify-center mt-24">
      <div className="bg-red-100 rounded-full p-4 inline-flex">
        <FaXmark className="text-red-600 w-16 h-16 mx-auto" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Payment Failed
        </h1>

        <p className="text-gray-500 dark:text-gray-400 md:text-xl">
          Something went wrong.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
