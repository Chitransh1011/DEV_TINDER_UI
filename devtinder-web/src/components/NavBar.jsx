import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(clearFeed());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all"
            >
              <span className="text-2xl">🧑‍💻</span>
              <span className="hidden sm:inline">Dev-Media</span>
            </Link>

            {user && (
              <>
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                  <span className="text-sm text-gray-300">
                    Welcome, <span className="font-semibold text-purple-400">{user.firstName}</span>
                  </span>
                  
                  {user.isPremium && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                        user.membershipType === "gold"
                          ? "text-yellow-400 border-yellow-400 bg-yellow-400/10"
                          : "text-gray-300 border-gray-400 bg-gray-400/10"
                      }`}
                    >
                      {user.membershipType === "gold" ? "⭐ GOLD" : "✨ SILVER"}
                    </span>
                  )}

                  {/* Avatar Dropdown */}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900 hover:ring-purple-400 transition-all"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          alt="Profile"
                          src={user?.photoUrl}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-gray-800 rounded-lg z-[1] mt-3 w-52 p-2 shadow-xl border border-gray-700"
                    >
                      <li>
                        <Link to="/profile" className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                          <span className="badge badge-sm badge-primary">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/connections" className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Connections
                        </Link>
                      </li>
                      <li>
                        <Link to="/requests" className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                          Requests
                        </Link>
                      </li>
                      <li>
                        <Link to="/premium" className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          Premium
                        </Link>
                      </li>
                      <div className="divider my-1"></div>
                      <li>
                        <a onClick={handleLogout} className="hover:bg-red-600/20 hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-3">
                  {user.isPremium && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold border ${
                        user.membershipType === "gold"
                          ? "text-yellow-400 border-yellow-400"
                          : "text-gray-300 border-gray-400"
                      }`}
                    >
                      {user.membershipType === "gold" ? "⭐" : "✨"}
                    </span>
                  )}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="btn btn-ghost btn-circle"
                  >
                    {mobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-slide-up">
            <div className="px-4 py-3 space-y-1">
              <div className="px-3 py-2 text-sm text-gray-300 border-b border-gray-700 mb-2">
                Welcome, <span className="font-semibold text-purple-400">{user.firstName}</span>
              </div>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-lg hover:bg-purple-600/20 hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/connections"
                className="block px-3 py-2 rounded-lg hover:bg-purple-600/20 hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connections
              </Link>
              <Link
                to="/requests"
                className="block px-3 py-2 rounded-lg hover:bg-purple-600/20 hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Requests
              </Link>
              <Link
                to="/premium"
                className="block px-3 py-2 rounded-lg hover:bg-purple-600/20 hover:text-purple-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-600/20 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
