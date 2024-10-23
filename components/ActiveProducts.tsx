interface Props {
  activeProducts: any;
}

const ActiveProducts = async ({ activeProducts }: Props) => {
  return (
    <div className="w-full">
      <div className="flex items-center border-b pb-3">
        <h1 className="text-xl font-medium">All Products</h1>
      </div>
    </div>
  );
};

export default ActiveProducts;
