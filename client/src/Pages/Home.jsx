import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ListingItem from '../components/ListingItem';
import bgImg from '../assets/home.jpg'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div className="bg-black">
  <div className="bg-cover h-screen object-contain opacity-0.8"
    style={{
      backgroundImage: `url(${bgImg})`,
    }}>
    {/* top */}
    <div className="relative top-0 h-full flex flex-col space-y-4 md:space-y-10 items-center bg-black opacity-90 xl:w-5/12 sm:w-3/4 -z-1">
      <h1 className="mt-20 md:mt-32 text-white font-bold text-xl sm:text-3xl lg:text-4xl">
        Find your next <span className="text-cyan-400">perfect</span>
        <br />
        travel partner
      </h1>
      <div className="text-white text-xs sm:text-base">
        OnTheGo is the best place to find your next perfect partner to travel with.
      </div>
      <Link
        to={'/search'}
        className="pt-2 sm:pt-4 text-base sm:text-lg text-cyan-400 font-extrabold hover:underline"
      >
        Click here to Search your Destination
      </Link>
    </div>
  </div>
</div>

  );
}
