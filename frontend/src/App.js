import './App.css';
import BasicCardDetailsForm from './pages/cardDetails/cardDetails.js';
import BasicExample from './pages/paymentDetails/personalDetails.js';
import BasicExampleAdd from './pages/AddPaymentDetails/AddPaymentDetails.js';
import BasicExampleDelete from './pages/DeletePaymentDetails/DeletePayment.js';
import BasicExampleTable from './pages/ShowPaymentData/ShowPaymentData.js';
import OTPAuthenticationPage from './pages/otp/otp.js';
import OTPVerification from "./pages/verifyOTP/OTPVerify.js";
import PaymentSuccessMessage from "./pages/PaymentSuccess/PaymentSuccess.js"
import MembershipAdd from "./pages/MembersipPayments/MembershipPayment.js"
import PaymentSummaryPage from "./pages/PaymentSummary/PaymentSummary.js"
import PaymentUnSuccessMessage from "./pages/PaymentSuccess/ReservationUnsuccess.js"
import MemPaymentUnSuccessMessage from "./pages/MembershipPaymentStatus/MembershipPaymentUnsuccess.js"
import MemPaymentSuccessMessage from "./pages/MembershipPaymentStatus/MembershipPaymentSuccess.js"

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<BasicExampleAdd/>}/>
        <Route path="personal" element={<BasicExample/>}/>
      <Route path="all" element={<BasicExampleTable/>}/>
      <Route path="edit" element={<BasicExampleDelete/>}/>
      <Route path="card" element={<BasicCardDetailsForm/>}/>
      <Route path="otp" element={<OTPAuthenticationPage/>}/>
      <Route path="verify" element={<OTPVerification/>}/>
      <Route path="end" element={<PaymentSuccessMessage/>}/>
      <Route path="/membership" element={<MembershipAdd/>}/>
      <Route path="/psummary" element={<PaymentSummaryPage/>}/>
      <Route path="/resunsuccess" element={<PaymentUnSuccessMessage/>}/>
      <Route path="/memsuccess" element={<MemPaymentSuccessMessage/>}/>
      <Route path="/memunsuccess" element={<MemPaymentUnSuccessMessage/>}/>

      </Routes>

       {/* <div className="App">
          
          <MembershipAdd/>
         
       </div> */}
       </BrowserRouter>
  );
}

export default App;
