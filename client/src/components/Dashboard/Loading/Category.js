function Category() {
  return (
    <div className=" animate-pulse space-y-8">
      <div className="flex justify-end">
        <div className="bg-gray-200 dark:bg-[#252525] rounded-md h-11 w-56 " />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-[#252525] rounded-md h-20"
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
