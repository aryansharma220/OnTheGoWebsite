import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import logo from '../assets/logo_new.jpeg'

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='shadow-md w-full h-auto md:h-24 px-2 md:px-4 bg-black opacity-100'>
      <div className='flex flex-wrap justify-between items-center max-w-7xl mx-auto p-3'>
        <Link to='/'>
          <img className="h-12 md:h-16 invert mt-3" src={logo} alt="OnTheGo" />
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center mt-3 md:mt-0'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex gap-4 mt-3 md:mt-0'>
          <Link to='/'>
            <li className='text-slate-300 font-bold hover:underline hover:text-cyan-400'>
              Home
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className='text-slate-300 font-bold hover:underline hover:text-cyan-400'>
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
