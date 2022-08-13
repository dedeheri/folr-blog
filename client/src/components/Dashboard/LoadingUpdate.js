function LoadingUpdate() {
  return (
    <div className="space-y-4">
      <div className="bg-gray-100 dark:bg-[#252525] rounded-md h-9 w-1/2" />
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 pb-10 animate-pulse">
        <div className="w-full h-full lg:col-span-4">
          <div className="border p-5 dark:border-[#353535] rounded-xl space-y-4">
            {[...Array(12)].map((_, i) => (
              <div key={i}>
                <div className="bg-gray-100 dark:bg-[#252525] rounded-md h-11" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-full lg:col-span-2 space-y-4">
          <div className="border p-5 dark:border-[#353535] rounded-xl space-y-4">
            {[...Array(7)].map((_, i) => (
              <div key={i}>
                <div className="bg-gray-100 dark:bg-[#252525] rounded-md h-11" />
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <div className="bg-gray-100 dark:bg-[#252525] rounded-md h-11 w-full" />
            <div className="bg-gray-100 dark:bg-[#252525] rounded-md h-11 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingUpdate;
