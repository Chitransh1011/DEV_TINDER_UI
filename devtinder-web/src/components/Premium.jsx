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
  return userPremium?
  (
 <div className="flex flex-col items-center justify-center">
    <h1 className="font-bold text-3xl mt-8">Already a premium user</h1>
    <p className="mt-10 text-yellow-300 text-2xl">Membership Type : {membershipType.toUpperCase()}</p>
</div>
  ):
  (
    <>
      <div className="flex w-full mt-16">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center w-30 ml-16">
          <h1 className="font-bold text-3xl">Silver Membersip</h1>
          <ul className="flex flex-col">
            <li className="list-disc">Upto 1000 request in 1 day</li>
            <li className="list-disc">Chat with other people</li>
            <li className="list-disc">Blue tick</li>
            <li className="list-disc">Validity upto 6 Months</li>
          </ul>
          <button onClick={()=>handlePayment('silver')} className="btn btn-primary">Buy Silver</button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center w-30 mr-16">
         <h1 className="font-bold text-3xl">Gold Membersip</h1>
          <ul className="flex flex-col">
            <li className="list-disc">Upto unlimited request in 1 day</li>
            <li className="list-disc">Chat with other people</li>
            <li className="list-disc">Blue tick</li>
            <li className="list-disc">Validity upto 12 Months</li>
          </ul>
           <button onClick={()=>handlePayment('gold')} className="btn btn-secondary">Buy Gold</button>
        </div>
      </div>
    </>
  );
};

export default Premium;
