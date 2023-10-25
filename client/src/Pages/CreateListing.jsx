import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgImg from '../assets/profilebg.jpg'


export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: '',
    date: '',
    time: '',

  });
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="text-cyan-300 font-semibold min-h-screen bg-cover"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}>
      <div className="w-full sm:w-2/5 h-3/4 bg-slate-200 border border-gray-800 rounded-md p-4 sm:p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative sm:top-10 sm:left-1/3 bg-transparent ">

        <main className='p-3 max-w-2xl mx-auto'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-center my-4 sm:my-7'>
            Create a Request
          </h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2 sm:gap-4'>
              <select
                className='h-10 sm:h-12 w-full px-2 py-1 rounded focus-within:outline-red-300 bg-white opacity-70 text-black'
                id='name'
                onChange={handleChange}
                value={formData.name}
              >
                <option value=''>Select a destination</option>
                <option value='Bhopal Railway Station'>Bhopal Railway Station</option>
                <option value='Sehore Railway Station'>Sehore Railway Station</option>
                <option value='Rani Kamlapati Railway Station'>Rani Kamlapati Railway Station</option>
                <option value='Raja Bhoj Airport, Bhopal'>Raja Bhoj Airport, Bhopal</option>
                <option value='Indore Airport'>Indore Airport</option>
              </select>

              <input
                type='date'
                placeholder='Date'
                className='h-10 sm:h-12 w-full px-2 py-1 rounded focus-within:outline-red-300 bg-white opacity-70 text-black'
                id='date'
                required
                onChange={handleChange}
                value={formData.date}
              />
              <input
                type='time'
                placeholder='Time'
                className='h-10 sm:h-12 w-full px-2 py-1 rounded focus-within:outline-red-300 bg-white opacity-70 text-black'
                id='time'
                required
                onChange={handleChange}
                value={formData.time}
              />
              <button
                disabled={loading}
                className='p-2 sm:p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
              >
                {loading ? 'Creating...' : 'Create Request'}
              </button>
              {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
