import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Contact from '../components/Contact';



export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <div className="bg-white h-screen relative -top-8">

  <main>
    {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
    {error && (
      <p className='text-center my-7 text-2xl'>Something went wrong!</p>
    )}
    {listing && !loading && !error && (
      <div>
        <div className='flex flex-col max-w-full sm:max-w-4xl mx-auto p-3 my-7 gap-4 bg-purple-300 shadow-md rounded w-full sm:w-1/2 relative top-20'>
          <p className='flex text-xl sm:text-2xl font-semibold'>
            <FaMapMarkerAlt className='text-green-700' />
            {listing.name}
          </p>
          <p className='flex items-center mt-4 sm:mt-6 gap-2 text-slate-600 text-sm sm:text-base'>
            <span className='font-semibold text-black'>Time -</span>
            {listing.time}
          </p>
          <p className='text-slate-800'>
            <span className='font-semibold text-black'>Date -</span>
            {listing.date}
          </p>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
            <button
              onClick={() => setContact(true)}
              className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
            >
              Contact
            </button>
          )}
          {contact && <Contact listing={listing} />}
        </div>
      </div>
    )}
  </main>
</div>

  );
}
 