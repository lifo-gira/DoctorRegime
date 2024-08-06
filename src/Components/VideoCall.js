import React, { useEffect, useState, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall({onMeetEnd,doctorId}) {

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [patientId, setpatientId] = useState(null);
  const [doctor_Id, setdoctor_Id] = useState(null);
  const [patientName, setpatientName] = useState(null);
  const [doctorName, setdoctorName] = useState(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(
          `https://regimeapi.onrender.com/patient-info/${doctorId}`
        );
        const data = await response.json();

        if (response.ok) {
          setPatients(data);
          console.log(data)
          setDocumentId(data.health_tracker.meeting_link);
          setpatientId(data.patient_id);
          setdoctor_Id(data.doctor_id)
          setdoctorName(data.doctor_assigned)
          setpatientName(data.user_id);
        } else {
          setError(data.detail || 'Failed to fetch patient information');
        }
      } catch (error) {
        setError('Error fetching patient information');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, [doctorId]);

  useEffect(() => {
    console.log("Checking dependencies:", documentId, patientId, patientName, doctor_Id, doctorName);
    if (documentId && patientId && patientName && doctor_Id && doctorName) {
      init();
    }
  }, [documentId,patientId,patientName,doctor_Id,doctorName]);

  const [userInfo, setUserInfo] = useState({
    userName: "",
    userId: "",
  });
  const zeroCloudInstance = useRef(null);

  async function init() {
    const userId = doctor_Id; // You can keep this as-is
    const userName = doctorName; // You can keep this as-is
    setUserInfo({
      userName,
      userId,
    });
    console.log(userInfo)
    const appID = 1455965454;
    const serverSecret = "c49644efc7346cc2a7a899aed401ad76";

    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      documentId,
      userId,
      userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);

    // zeroCloudInstance.current.on("call:call-ended", () => {
    //   console.log("Video call ended");
    //   onMeetEnd(); // Call the function when the video call ends
    // });
    // add plugin
    zeroCloudInstance.current.addPlugins({ ZIM });
    
  }

  function handleSend(callType) {
    const callee = patientId; // Hardcoded callee userID
    const calleeUsername = patientName; // Hardcoded callee username

    // send call invitation
    zeroCloudInstance.current
    .sendCallInvitation({
        callees: [{ userID: callee, userName: calleeUsername }],
        callType: callType,
        timeout: 60,
      })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert("The user does not exist or is offline.");
          return;
        }
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  }

  return (
    <div>
      <div>My username: <span>{userInfo.userName}</span></div>
      <div>My userId: <span>{userInfo.userId}</span>
      </div>
      <button
        onClick={() => {
          handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
        }}
      >
        Video call
      </button>
      <button
        onClick={() => {
          handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
        }}
      >
        Voice call
      </button>
    </div>
  );
}
