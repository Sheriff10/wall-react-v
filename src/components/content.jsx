import axios from "axios";
import React, { useEffect, useState } from "react";
import CBody from "./cBody";
import { FaDollarSign, FaGripHorizontal, FaImage, FaSearch, FaTwitter } from 'react-icons/fa'
import NoResult from "./noResult";

export default function Content() {
   const limit = 6;
   const [offset, setOffset] = useState(0);
   const [search, setSearch] = useState('')
   const [data, setData] = useState([]);
   const [err, setErr] = useState(false)
   const [c_tags_arr, setC_tags_arr] = useState([]);
   const [campaign_tag, setCampaign_tag] = useState("all");
   useEffect(() => {
      getData();
   }, [campaign_tag]);
   useEffect(() => {
      if (offset > 0) {
         getMoreData()
      }
   }, [offset])

   const tBtnFunc = (icon, text, className) => {
      return { icon, text, className };
   };
   const tArray = [
      tBtnFunc("", "All", "all"),
      tBtnFunc(<FaGripHorizontal />, "Onchain", "on_chain"),
      tBtnFunc(<FaTwitter />, "Social", "social"),
      tBtnFunc(<FaDollarSign />, "Token", "token"),
      tBtnFunc(<FaImage />, "NFT", "nft"),
   ];

   // FILTER CONFIG
   // ....................................................................
   const active_filter = (c_tag) => {
      // this if block removes the "active" class from the "all" tab
      // and it adds tabs with "active" class to "campaing tags array"
      // and also remove them when the "active" class has been remove
      if (c_tag !== "all") {
         const getTab1 = document.querySelector(`.content .all`);
         getTab1.classList.remove("active");

         // Toggling tabs in the "campaing tags array"
         const exists = c_tags_arr.includes(c_tag);
         if (exists == false) {
            c_tags_arr.push(c_tag);
            upadate_campaign_tags();
         } else {
            const newTab = c_tags_arr.filter((tab) => tab !== c_tag);
            c_tags_arr.splice(0, c_tags_arr.length, ...newTab)
            upadate_campaign_tags();
         }

         // add active class to the all tab
         const getTab = document.querySelector(`.content .${c_tag}`);
         getTab.classList.toggle("active");
      }

      // this if block removes the "active" class from all other tabs when "all" is clicked
      if (c_tag == "all") {
         // removing the active class from all tabs
         const tab_list = ["on_chain", "social", "token", "more"];
         for (let i = 0; i < tab_list.length; i++) {
            const tabs_no = tab_list[i];
            const getTabs = document.querySelector(`.content .${tabs_no}`);
            getTabs.classList.remove("active");
         }

         // removing all "campaing tags array"
         c_tags_arr.splice(0, c_tags_arr.length, ...[]);
         upadate_campaign_tags("all");

         // add active class to the all tab
         const getTab = document.querySelector(`.content .${c_tag}`);
         getTab.classList.add("active");
      }
   };

   // this function updates the campaign tags (filter)
   const upadate_campaign_tags = (tab) => {
      // Set "data" to empty to bring the loading effect
      if (tab !== "all") setData("")
      
      // convert the campaign tag arrays to string 
      // then adding it to the campaign tag state.
      const c_tag_string = c_tags_arr.join(',')
      setCampaign_tag(c_tag_string);
   };

   // This gets called whenever the "campaign tag state" changes and load data from the api
   const getData = async () => {
      setOffset(0)
      setErr(false)
      setSearch('')
      await axios
         .get(`${window.api}?campaign_tag=${campaign_tag}&limit=${limit}&offset=0`)
         .then((res) => {
            setData(res.data.results);
         }).catch((err) => console.log(err));

         // we set offset to zero cos it gets updated when we click view more
         // offset resets when a new filter is click
   };



   // VIEW MORE CONFIG
   // .......................................................................................

   // this function will be called when ever offset changes 
   // it'll bring more data and add to the existing one.
   const getMoreData = async () => {
      if (search.length == 0) {
         console.log()
         await axios
         .get(`${window.api}?campaign_tag=${campaign_tag}&limit=${limit}&offset=${offset}`)
         .then((res) => {
            // adding data to the existing one
            const extraData = data.concat(res.data.results)
            setData(extraData)
            console.log("view alllllll here")
            // toggling the spinner 
            toggleSpinner()
         }).catch((err) => console.log(err));
      } 
      // Search view more
      else{
         setOffset(0)
         await axios
         .get(`${window.api}?search=${search}&limit=${limit}&offset=${offset}`)
         .then((res) => {
            const extraSearch = data.concat(res.data.results)
            setData(extraSearch)
            toggleSpinner()
         }).catch((err) => console.log(err));
      }
   };

   // this function toggle the "view more" button spinner class
   const toggleSpinner = () => {
      const viewMoreBtnSpin = document.querySelector(".view .toggle-spin")
      viewMoreBtnSpin.classList.toggle("spinner-border")
   }
   // this function update offset to bring the next 6 data and toggle the spinner
   const viewMore = () => {
      setOffset(offset + 6)
      toggleSpinner();
   }


   // SEARCH CONFIG
   // ........................................................................................
   const searchData = async () => {
      setData('');
      await axios
         .get(`${window.api}?search=${search}&limit=${limit}&offset=0`)
         .then((res) => {
            setData(res.data.results)
            if (res.data.count == 0) setErr(true)
            else setErr(false)
            console.log(res)
         }).catch((err) => console.log(err));
   };
   return (
      <div className="content">

         <div className="c-header">
            <div className="c-tab">
               <div className="c-tab-head">
                  <span>Quest({data.length})</span>
                  <div className="col-3">
                     <div className="input-group mb-3">
                        <button type="submit" onClick={searchData} className="input-group-text bg-dark" id="basic-addon1"><FaSearch /></button>
                        <input type="text" className="form-control" placeholder="search" value={search} onChange={e => setSearch(e.target.value)}/>
                     </div>
                  </div>
               </div>
               <div className="c-tab-btn">
                  {tArray.map((i, index) => (
                     <a href="#" key={index} className={ i.text == "All" ? `active ${i.className}` : i.className } 
                        onClick={() => active_filter(i.className)}
                     >
                        <span><i>{i.icon}</i> {i.text}</span>
                     </a>
                  ))}
                  <a href="#"> More</a>
               </div>
            </div>
         </div>
         <div className="n-r">
            {err === false ? null : <NoResult />}
         </div>
         <CBody data={data} />

         {/* VIEW MORE BUTTON SECTION */}
         <div className="col-12 text-center view-con">
            <button className="btn view text-center text-light" onClick={viewMore}>
               view more{" "}
               <div className="spinner-border-sm toggle-spin text-primary" role="status">
                  <span className="sr-only"></span>
               </div>
            </button>
         </div>
      </div>
   );
}
