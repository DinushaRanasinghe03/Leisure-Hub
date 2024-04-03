import logo from './logo.svg';
import './App.css';
import Header1 from './components/Layout/Header1/Header1.js'
import BasicCardDetailsForm from './pages/cardDetails/cardDetails.js';
import BasicExample from './pages/paymentDetails/personalDetails.js';
import BasicExampleAdd from './pages/AddPaymentDetails/AddPaymentDetails.js';
import BasicExampleDelete from './pages/DeletePaymentDetails/DeletePayment.js';
import BasicExampleTable from './pages/ShowPaymentData/ShowPaymentData.js';
import OTPAuthenticationPage from './pages/otp/otp.js';
import OTPAuthenticationPageSave from './pages/otp/OTPVerify.js';
import MembershipAdd from './pages/MembersipPayments/MembershipPayment.js';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<BasicExampleAdd/>}/>
      <Route path="all" element={<BasicExampleTable/>}/>
      <Route path="edit" element={<BasicExampleDelete/>}/>
      <Route path="card" element={<BasicCardDetailsForm/>}/>
      </Routes>

       {/* <div className="App">
          
          <BasicExampleAdd/>
         
       </div> */}
       </BrowserRouter>
  );
}

export default App;
