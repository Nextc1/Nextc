
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsSignedIn(true);
        const { data: userData, error } = await supabase
          .from('users')
          .select('profile_picture_url')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          setProfilePic(userData.profile_picture_url || '/default-profile.png');
        } else {
          console.error(error.message);
        }
      } else {
        setIsSignedIn(false);
      }
    };
    checkUser();
  }, []);

  const handleSignIn = () => {
    router.push('/api/auth/signin');
  };

  const handleSignUp = () => {
    router.push('/api/auth/signup');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // Clear the access token from local storage
      localStorage.removeItem('access_token');
      setIsSignedIn(false);
      setProfilePic(null);
      router.push('/');
    } else {
      console.error(error.message);
    }
  };

  return (
    <div className="navbar bg-black flex">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">Next Carbon</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search projects, companies"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        {isSignedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Profile"
                  src={profilePic || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={handleProfile} className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
              <li>
                <a>Wallet</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleSignIn} className="btn btn-primary">
              Sign In
            </button>
            <button onClick={handleSignUp} className="btn btn-secondary">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
