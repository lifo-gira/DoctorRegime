import React, { useEffect, useState} from "react";
import './App.css';
import Profilebar from './Components/Profilebar';
import Regimebuilder from './Components/Regimebuilder';
import VideoCall from "./Components/VideoCall"
import { BrowserRouter as Route, Router, Switch } from "react-router-dom";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState("Profilebar");
  const [userID, setuserID] = useState(null);
  const [doctorId, setdoctorId] = useState(null);
  const handleMenuItemClick = (menuItem, userId) => {
    setuserID(userId);
    setActiveMenuItem(menuItem);
    console.log(userID); // This will print the updated value
  };

  useEffect(() => {
    console.log(doctorId); // Log the updated userID after it's been set
  }, [userID,doctorId]);

  // const handleCallClick = (value)=>{
  //   console.log("ID",value)
  //   setdoctorId(value)
  //   setActiveMenuItem("VideoCall")
  // }
  const [patflag,setpatflag] = useState('false');
console.log("start  ",patflag)
  const onPatList = ()=>{
    setActiveMenuItem("Profilebar")
    setpatflag('true')
    console.log("meet end",patflag)
  }
//   const [loading, setLoading] = useState(true);
//   const [startId, setstartId] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://api-backup-vap2.onrender.com/patient-details/all"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setstartId(data[0].patient_id)
//         // console.log(data[0].patient_id)
//         setLoading(false);
//         // console.log("Processed patient data:", processedData); // Log fetched and processed data
//       } catch (error) {
//         console.error("Error fetching patient information:", error);
//         setLoading(true);
//       }
//     };

//     fetchData();
//   }, []);

//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     setstartId(startId)
//     console.log(startId)
//     if (!initialized && startId) {
//       handleCallClick(startId);
//       setInitialized(true);
//     }
//   }, [initialized,startId]);

//   const handleCallClick = async (userId) => {
//     try {
//       // Fetch patient information
//       const response = await fetch(`https://api-backup-vap2.onrender.com/patient-info/${userId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch patient information");
//       }
//       const data = await response.json();
//       const documentId = data.health_tracker.meeting_link;
//       const patientId = data.patient_id;
//       const doctorId = data.doctor_id;
//       const patientName = data.user_id;
//       const doctorName = data.doctor_assigned;
  
//       // Generate KitToken
//       const appID = 1455965454;
//       const serverSecret = "c49644efc7346cc2a7a899aed401ad76";
//       const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID,
//         serverSecret,
//         documentId,
//         doctorId,
//         doctorName
//       );
  
//       // Initialize Zego Cloud SDK
//       const zeroCloudInstance = ZegoUIKitPrebuilt.create(KitToken);
//       zeroCloudInstance.addPlugins({ ZIM });
  
//       // Send video call invitation
//       const callee = patientId;
//       const calleeUsername = patientName;
//       zeroCloudInstance
//         .sendCallInvitation({
//           callees: [{ userID: callee, userName: calleeUsername }],
//           callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
//           timeout: 60,
//         })
//         .then((res) => {
//           console.warn(res);
//           if (res.errorInvitees.length) {
//             alert("The user does not exist or is offline.");
//             return null;
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           // alert("The user does not exist or is offline.");
//           return null;
//         });
//     } catch (error) {
//       console.error(error);
//       return;
//       // Handle errors
//     }
//   };

  return (
    <>
    <div className="App">
      {activeMenuItem === "Profilebar" && <Profilebar onRegimeClick={(userId)=> handleMenuItemClick("Regimebuilder",userId)} patlis={patflag} onAssessmentClick={(userId)=> handleMenuItemClick("Analysis",userId)}/>}
      {activeMenuItem === "Regimebuilder" && <Regimebuilder userId={userID} onProfileClick={()=>handleMenuItemClick("Profilebar")}/>}
      {activeMenuItem === "VideoCall" && (
        <VideoCall doctorId={doctorId} onVideocallClick={()=>handleMenuItemClick("VideoCall")} onMeetEnd={onPatList}/>
      )}
    </div>
    </>
  );
}

export default App;
