import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
    const [userPremium,setUserPremium] = useState(false);
    const [membershipType,setMembershipType] = useState("");
    const verifyPremiumUser = async()=>{
        const res = await axios.get(BASE_URL+"/premium/verify",{withCredentials:true});
        if(res.data.isPremium){
            setUserPremium(true);
            setMembershipType(res.data.membershipType);
        }
    }
    useEffect(()=>{
        verifyPremiumUser();
    },[])
    const handlePayment = async(type)=>{
        const order = await axios.post(BASE_URL+"/payment/create",{
            membershipType:type
        },{withCredentials:true});
        const {amount,currency,orderId,notes,keyId} = order.data
              const options = {
        key: keyId, 
        amount, 
        currency,
        name: 'Dev Media',
        description: 'Transaction',
        order_id: orderId, 
        prefill: {
          name: notes.firstName + ' '+ notes.lastName,
          email: notes.email,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
        handler:verifyPremiumUser,
      };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }
  return userPremium ? (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 animate-fade-in">
      <div className="glass-card p-8 sm:p-12 max-w-md text-center shadow-2xl">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-yellow-400 animate-float" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <h1 className="font-bold text-3xl sm:text-4xl mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Premium Member
        </h1>
        <p className="text-gray-300 mb-6">
          You're already enjoying all the premium benefits!
        </p>
        <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-lg p-6">
          <p className="text-sm text-gray-400 mb-2">Current Plan</p>
          <p className="text-3xl font-bold text-yellow-400 uppercase">
            {membershipType === "gold" ? "⭐ GOLD" : "✨ SILVER"}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-[calc(100vh-5rem)] px-4 py-10 sm:py-16 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-bold text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            Upgrade to Premium
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Unlock exclusive features and connect with more developers
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Silver Card */}
          <div className="glass-card p-8 sm:p-10 card-hover group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-400/20 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Silver</h2>
                <div className="bg-gray-400/20 border border-gray-400/30 rounded-full px-4 py-1">
                  <span className="text-gray-300 font-semibold text-sm">✨ Popular</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">₹499</span>
                <span className="text-gray-400 ml-2">/ 6 months</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Up to 1000 requests per day",
                  "Chat with connections",
                  "Premium badge",
                  "Priority support",
                  "6 months validity",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment("silver")}
                className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-400/30"
              >
                Get Silver
              </button>
            </div>
          </div>

          {/* Gold Card */}
          <div className="glass-card p-8 sm:p-10 card-hover group relative overflow-hidden border-2 border-yellow-500/30">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-bl-full"></div>
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold px-6 py-2 rounded-bl-2xl shadow-lg">
              BEST VALUE
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Gold
                </h2>
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/50 rounded-full px-4 py-1">
                  <span className="text-yellow-400 font-semibold text-sm">⭐ Premium</span>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">₹999</span>
                <span className="text-gray-400 ml-2">/ 12 months</span>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited requests per day",
                  "Chat with connections",
                  "Premium gold badge",
                  "Priority support 24/7",
                  "12 months validity",
                  "Exclusive features access",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment("gold")}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/40 animate-gradient"
              >
                Get Gold
              </button>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-white mb-8">Why Go Premium?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                title: "Unlimited Access",
                description: "Connect with unlimited developers"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                ),
                title: "Chat Feature",
                description: "Direct messaging with connections"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                ),
                title: "Premium Badge",
                description: "Stand out with exclusive badge"
              },
            ].map((feature, idx) => (
              <div key={idx} className="glass-card p-6 text-center card-hover">
                <svg className="w-12 h-12 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
