import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='flex items-center truncate text-lg font-semibold text-slate-700'>
          <MdLocationOn className='h-4 w-4 text-green-700' />
          <span className='font-semibold text-black'>Destination -</span>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            
            <p className='text-sm text-gray-600 truncate w-full'>
            <span className='font-semibold text-black'>Time -</span>
              {listing.time}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
          <span className='font-semibold text-black'>Date -</span>
            {listing.date}
          </p>
        </div>
      </Link>
    </div>
  );
}
