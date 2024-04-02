import React from "react";
import { Route, Routes } from "react-router";
import AddContact from "./Components/ContactUs/User/AddContact/AddContact";
import AddReply from "./Components/ContactUs/Admin/AddReplyContact/AddReplyContact";
import ContactDetails from "./Components/ContactUs/Admin/ContactDetails/ContactDetails";
import CheckContact from "./Components/ContactUs/User/ReplyContact/CheckContact";
import AddRate from "./Components/Rates/Add-Rates/AddRate";
import Home from "./Components/Home/Home";
import RateDetails from "./Components/Rates/RateDetails/RateDetails";
import FindReview from "./Components/Rates/FindReview/FindReview";
import UpdateReview from "./Components/Rates/UpdateReview/UpdateReview";
import AddFeedBack from "./Components/FeedBack/User/AddFeedBack";
import FeedBackDetails from "./Components/FeedBack/Admin/FeedBackDetails";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*Contact*/}
          <Route path="/" element={<Home />} />
          <Route path="/addcontact" element={<AddContact />} />
          <Route path="/addreply/:id" element={<AddReply />} />
          <Route path="/contactdetails" element={<ContactDetails />} />
          <Route path="/checkcontact" element={<CheckContact />} />

          {/*Ratings*/}
          <Route path="/ratehome" element={<RateDetails />} />
          <Route path="/addrate" element={<AddRate />} />
          <Route path="/findrate" element={<FindReview />} />
          <Route path="/updatereview/:id" element={<UpdateReview />} />

          {/*FeedBack*/}
          <Route path="/addfeed" element={<AddFeedBack />} />
          <Route path="/feeddetails" element={<FeedBackDetails />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
