import Image from 'next/image';

const NoData = () => {
  return (
    <div className="flex justify-center items-center flex-col p-6rounded-md shadow-lg h-[350px]">
      <h2 className="text-xl font-semibold text-gray-700">No Data Available</h2>
      <div className="relative w-48 h-48">
        <Image
          src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif"
          alt="No data available"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default NoData;
