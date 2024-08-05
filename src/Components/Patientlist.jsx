import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  CardHeader,
  CardBody,
  Avatar,
  Drawer,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  Squares2X2Icon,
  ChartBarSquareIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellIcon,
  ChevronRightIcon,
  ArrowUpRightIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
} from "recharts";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Patientlist = ({
  onReportClick,
  patientdata,
  data,
  data1,
  event,
  handlePhoneIconClick,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenheight, setScreenHeight] = useState(window.innerHeight);
  const [isdisplay, setdisplay] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const appointmentdetails = [
    {
      id: "123ABC",
      name: "name",
      age: 0,
      gender: "NA",
      phone: null,
      injury: "NA",
      time: "Time",
      waitingOrPending: true,
    },
  ];

  const [tempdetails, settemdetails] = useState([]);
  const handleappointment = (pid) => {
    const searchres = findPatientById(pid);
    if (searchres) {
      console.log(searchres, "searchres");

      // Convert schedule_start_date string to Date object
      const dateString = searchres.health_tracker.schedule_start_date;
      const dateParts = dateString
        .replace(/[()]/g, "")
        .split(",")
        .map((part) => parseInt(part.trim()));

      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];
      const hour = dateParts[3];
      const minute = dateParts[4];

      const startDate = new Date(year, month - 1, day, hour, minute);

      const appointmentdetails = {
        id: searchres.id,
        name: searchres.user_id,
        age: searchres.PersonalDetails.Age,
        gender: searchres.PersonalDetails.PatientDetails.Gender,
        injury: searchres.PersonalDetails.Reports.map((report, index) => (
          <div key={index}>
            {report && (
              <div>
                <span>{report}</span>
              </div>
            )}
          </div>
        )),
        phone: "NA",
        time: startDate.toLocaleString("en-US"),
        patient_id: searchres.patient_id,
      };

      settemdetails(appointmentdetails);
      console.log("Selected patient", appointmentdetails);
    } else {
      appointmentdetails.id = searchres.id;
      appointmentdetails.name = searchres.name;
      appointmentdetails.age = searchres.age;
      appointmentdetails.gender = searchres.gender;
      appointmentdetails.injury = searchres.injury;
      appointmentdetails.phone = "NA";
      appointmentdetails.time = "NA";
      appointmentdetails.patient_id = searchres.patient_id;
      settemdetails(appointmentdetails);
      console.log("Selected patient", appointmentdetails);
    }
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Your existing logic here
    if (!event) {
      if (patientdata.length > 0) {
        console.log(patientdata[0], "patientdata");

        // Convert schedule_start_date string to Date object
        const dateString = patientdata[0].health_tracker.schedule_start_date;
        const dateParts = dateString
          .replace(/[()]/g, "")
          .split(",")
          .map((part) => parseInt(part.trim()));

        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const hour = dateParts[3];
        const minute = dateParts[4];

        const startDate = new Date(year, month - 1, day, hour, minute);

        const appointmentdetails = {
          id: patientdata[0].user_id,
          name: patientdata[0].user_id,
          age: patientdata[0].PersonalDetails.Age,
          gender: patientdata[0].PersonalDetails.PatientDetails.Gender,
          injury: patientdata[0].PersonalDetails.Reports.map(
            (report, index) => (
              <div key={index}>
                {report && (
                  <div>
                    <span>{report}</span>
                  </div>
                )}
              </div>
            )
          ),
          phone: "NA",
          time: startDate.toLocaleString("en-US"),
          patient_id: patientdata[0].patient_id,
        };

        settemdetails(appointmentdetails);
        console.log("Appointmentdetails", tempdetails);
      }
    } else {
      console.log(patientdata);
      const searchData = patientdata.find(
        (pdata) => pdata.user_id === event.user_id
      );
      if (searchData) {
        appointmentdetails.id = searchData.user_id;
        appointmentdetails.name = searchData.user_id;
        appointmentdetails.age = searchData.PersonalDetails.Age;
        appointmentdetails.gender =
          searchData.PersonalDetails.PatientDetails.Gender;
        appointmentdetails.injury = searchData.PersonalDetails.Reports.map(
          (report, index) => (
            <div key={index}>
              {report && (
                <div>
                  <span>{report}</span>
                </div>
              )}
            </div>
          )
        );
        appointmentdetails.time =
          event.health_tracker.schedule_start_date.toString();
        appointmentdetails.phone = "NA";
        appointmentdetails.patient_id = searchData.patient_id;
        settemdetails(appointmentdetails);
        console.log("Appointment", tempdetails);
      } else {
        appointmentdetails.id = "123ABC";
        appointmentdetails.name = "name";
        appointmentdetails.age = 0;
        appointmentdetails.gender = "NA";
        appointmentdetails.injury = "NA";
        appointmentdetails.phone = "NA";
        appointmentdetails.time = "NA";
        settemdetails(appointmentdetails);
        console.log("No data", tempdetails);
      }
    }
    console.log("Event", event);
    if (!isdisplay) {
      setdisplay(true);
    }
  }, [event]);

  const findPatientById = (patientId) => {
    return patientdata.find((patient) => patient.patient_id === patientId);
  };
  const data2 = [
    {
      name: "JAN",
      uv: 40,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "FEB",
      uv: 30,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "MAR",
      uv: 20,
      pv: 9800,
      amt: 2290,
    },
    { 
      name: "MAY",
      uv: 20,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "MAY",
      uv: 18,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "JUN",
      uv: 23,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "JUL",
      uv: 34,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "AUG",
      uv: 23,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "SEP",
      uv: 34,
      pv: 4300,
      amt: 2100,
    },
    
  ];

  return (
    <div
      className={`h-full w-full ${
        screenWidth < 1200 ? "flex flex-col" : "flex flex-row"
      }`}
    >
      <div className={`h-full ${screenWidth < 1200 ? "w-full" : "w-3/5"}`}>
        <div className={`w-full h-full `}>
          <div
            className={`h-full  px-4 ${
              screenWidth < 1180 ? "w-full" : "w-full"
            }`}
          >
            <div
              className={`w-full items-center px-8 py-0 ${
                screenWidth < 460
                  ? "flex flex-col py-4 h-full"
                  : "h-20 flex flex-row justify-between"
              }`}
            >
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-poppins"
              >
                Patients Assigned
              </Typography>
              <div
                className={`flex flex-row justify-between gap-2 items-center cursor-pointer`}
              >
                <Typography variant="h5" color="cyan" className="font-poppins">
                  View all
                </Typography>
                <ChevronRightIcon className="w-4 h-4" />
              </div>
            </div>
            <div
              className={`w-full h-5/6 gap-5 flex flex-col px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-blue-400 scrollbar-track-transparent scroll-smooth`}
            >
              {screenWidth >= 690 &&
                patientdata.map((item, index) => (
                  <Card
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-row justify-between items-center my-1 py-1 px-2"
                    key={index}
                    onClick={() => handleappointment(item.patient_id)}
                  >
                    <div className={`w-3/6`}>
                      <div
                        className={`flex flex-row gap-4 py-0 px-2 items-center`}
                      >
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                        <div className="flex w-full flex-col">
                          <div className="flex items-center justify-between">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-poppins"
                            >
                              {item.user_id}
                            </Typography>
                          </div>
                          <Typography
                            color="blue-gray"
                            className="text-start font-poppins"
                          >
                            25,{item.PersonalDetails.PatientDetails.Gender}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={`w-1/6 text-base font-medium font-poppins`}>
                      ID: #{item.user_id[0]}
                      {item.user_id[1]}
                      {item.user_id[2]}-
                      {item.PersonalDetails.PatientDetails.Gender[0]}
                    </div>
                    <div
                      className={`w-2/6  flex flex-row  justify-between items-center`}
                    >
                      <div
                        className={` rounded-lg py-0.5 font-medium text-sm  w-2/3 flex justify-center font-poppins ${
                          item.waitingOrPending
                            ? "text-red-900 bg-red-500 bg-opacity-40"
                            : "text-blue-900 bg-blue-300"
                        }`}
                      >
                        {item.PersonalDetails.Reports.map((report, index) => (
                          <div key={index}>
                            {report && (
                              <div>
                                <span>{report}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div
                        className={`flex flex-row gap-1 items-center justify-end w-1/3 `}
                      >
                        <div
                          className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer font-poppins`}
                          onClick={() => onReportClick(item.patient_id)}
                        >
                          Report
                        </div>
                        <ArrowUpRightIcon
                          color="blue"
                          className="w-4 h-4 cursor-pointer"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              {screenWidth < 690 &&
                screenWidth >= 600 &&
                patientdata.map((item, index) => (
                  <Card
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-row justify-center items-center my-1 py-1"
                    key={index}
                    onClick={() => handleappointment(item.user_id)}
                  >
                    <div className={`w-1/2 h-full`}>
                      <div
                        className={`flex flex-row gap-4 py-2 px-2 items-center`}
                      >
                        <Avatar
                          size="md"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                        <div className="flex w-full flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-poppins"
                            >
                              {item.user_id}
                            </Typography>
                          </div>
                          <Typography
                            color="blue-gray"
                            className="text-start font-poppins"
                          >
                            25,{item.PersonalDetails.PatientDetails.Gender}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={`w-1/2 h-full flex flex-col gap-4`}>
                      <div
                        className={`h-1/6 w-full text-base font-medium text-start font-poppins`}
                      >
                        ID: #{item.user_id[0]}
                        {item.user_id[1]}
                        {item.user_id[2]}-
                        {item.PersonalDetails.PatientDetails.Gender[0]}
                      </div>
                      <div className={`h-2/6 w-full flex flex-row  `}>
                        <div
                          className={` rounded-lg py-0.5 font-medium  w-1/2 px-4 font-poppins ${
                            item.waitingOrPending
                              ? "text-blue-900 bg-blue-300"
                              : "text-red-900 bg-red-500 bg-opacity-40"
                          }`}
                        >
                          {item.PersonalDetails.Reports.map((report, index) => (
                            <div key={index}>
                              {report && (
                                <div>
                                  <span>{report}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div
                          className={`flex flex-row gap-1 items-center justify-end px-4 w-1/2 `}
                        >
                          <div
                            className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer font-poppins `}
                            onClick={() => onReportClick(item.patient_id)}
                          >
                            Report
                          </div>
                          <ArrowUpRightIcon
                            color="blue"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              {screenWidth < 600 &&
                screenWidth >= 400 &&
                patientdata.map((item, index) => (
                  <Card
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-row justify-center items-center my-1 py-1"
                    key={index}
                    onClick={() => handleappointment(item.user_id)}
                  >
                    <div className={`w-1/3 h-full`}>
                      <div
                        className={`flex flex-row gap-4 py-2 px-2 items-center justify-center`}
                      >
                        <Avatar
                          size="xl"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                      </div>
                    </div>
                    <div className={`w-2/3 h-full flex flex-col py-2`}>
                      <div className="flex w-full flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-poppins"
                          >
                            {item.user_id}
                          </Typography>
                        </div>
                        <Typography
                          color="blue-gray"
                          className="text-start font-poppins"
                        >
                          25,{item.PersonalDetails.PatientDetails.Gender}
                        </Typography>
                        <div
                          className={`h-1/6 w-full text-base font-medium text-start font-poppins`}
                        >
                          ID: #{item.user_id[0]}
                          {item.user_id[1]}
                          {item.user_id[2]}-
                          {item.PersonalDetails.PatientDetails.Gender[0]}
                        </div>
                        <div className={`h-2/6 w-full flex flex-row  `}>
                          <div
                            className={` rounded-lg py-0.5 font-medium  w-1/2 px-4 font-poppins ${
                              item.waitingOrPending
                                ? "text-blue-900 bg-blue-300"
                                : "text-red-900 bg-red-500 bg-opacity-40"
                            }`}
                          >
                            {item.PersonalDetails.Reports.map(
                              (report, index) => (
                                <div key={index}>
                                  {report && (
                                    <div>
                                      <span>{report}</span>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <div
                            className={`flex flex-row gap-1 items-center justify-end px-4 w-1/2 `}
                          >
                            <div
                              className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer font-poppins`}
                              onClick={() => onReportClick(item.patient_id)}
                            >
                              Report
                            </div>
                            <ArrowUpRightIcon
                              color="blue"
                              className="w-4 h-4 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              {screenWidth < 400 &&
                patientdata.map((item, index) => (
                  <Card
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-col justify-center items-center my-1 py-1"
                    key={index}
                    onClick={() => handleappointment(item.user_id)}
                  >
                    <div className={`h-1/3 w-full`}>
                      <div
                        className={`flex flex-row gap-4 py-1 px-2 items-center justify-center`}
                      >
                        <Avatar
                          size="xl"
                          variant="circular"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          alt="tania andrew"
                        />
                      </div>
                    </div>
                    <div
                      className={`h-2/3 w-full flex flex-col items-center py-2`}
                    >
                      <div className="flex w-full flex-col gap-2 justify-center items-center">
                        <div className="flex items-center justify-between">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-poppins"
                          >
                            {item.user_id}
                          </Typography>
                        </div>
                        <Typography
                          color="blue-gray"
                          className="text-center font-poppins"
                        >
                          25,{item.PersonalDetails.PatientDetails.Gender}
                        </Typography>
                        <div
                          className={` w-full text-base font-medium text-center font-poppins`}
                        >
                          ID: #{item.user_id[0]}
                          {item.user_id[1]}
                          {item.user_id[2]}-
                          {item.PersonalDetails.PatientDetails.Gender[0]}
                        </div>
                        <div className={`w-full flex flex-row px-2`}>
                          <div
                            className={` rounded-lg py-0.5 font-medium  w-1/2  font-poppins ${
                              item.waitingOrPending
                                ? "text-blue-900 bg-blue-300"
                                : "text-red-900 bg-red-500 bg-opacity-40"
                            }`}
                          >
                            {item.PersonalDetails.Reports.map(
                              (report, index) => (
                                <div key={index}>
                                  {report && (
                                    <div>
                                      <span>{report}</span>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <div
                            className={`flex flex-row gap-1 items-center justify-end w-1/2 `}
                          >
                            <div
                              className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer font-poppins`}
                              onClick={() => onReportClick(item.patient_id)}
                            >
                              Report
                            </div>
                            <ArrowUpRightIcon
                              color="blue"
                              className="w-4 h-4 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`h-full flex flex-col pb-4 ${
          screenWidth < 1200 ? "w-full" : "w-2/5"
        }`}
      >
        <div className={`h-1/3 w-full  flex flex-col px-4 py-2`}>
          <div className={`h-10 w-full `}>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-start font-medium font-poppins"
            >
              Patients Details
            </Typography>
          </div>
          {tempdetails ? (
            <div className={`h-5/6 w-full `}>
              {console.log(tempdetails)}
              {screenWidth >= 500 && (
                <Card
                  color="transparent"
                  shadow={true}
                  className={`w-full h-full bg-white flex flex-col justify-between items-center px-6 gap-2 ${
                    screenWidth < 1200 ? "py-4" : "py-4"
                  }`}
                >
                  <div className={`h-1/2 w-full  flex flex-row`}>
                    <div className={`w-5/6 h-full flex flex-row gap-4`}>
                      <div
                        className={`w-1/6 h-full flex justify-center items-center`}
                      >
                        <Avatar
                          variant="circular"
                          size="lg"
                          alt="tania andrew"
                          className="border-[3px] border-white-900"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        />
                      </div>
                      <div
                        className={`w-5/6 h-full flex flex-col justify-center`}
                      >
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="text-start font-poppins"
                        >
                          {tempdetails.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="text-start font-poppins"
                        >
                          {tempdetails.age} , {tempdetails.gender}
                        </Typography>
                      </div>
                    </div>
                    <div
                      className={`w-1/6 h-full flex flex-row items-center justify-between font-poppins`}
                    >
                      <ChatBubbleBottomCenterTextIcon className="w-7 h-7" />
                      <PhoneIcon
                        className="w-7 h-7"
                        onClick={() =>
                          handlePhoneIconClick(tempdetails.patient_id)
                        }
                      />
                      {console.log(tempdetails.patient_id)}
                    </div>
                  </div>
                  <div className={`h-1/2 w-full   flex flex-row`}>
                    <div
                      className={`w-2/5 h-full  justify-start ${
                        screenWidth < 1200 ? "flex flex-row" : "flex flex-col"
                      }`}
                    >
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className={`text-start font-poppins ${
                          screenWidth < 1200 ? "w-2/5" : "w-full"
                        }`}
                      >
                        Diagnosis:
                      </Typography>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className={`text-start font-poppins ${
                          screenWidth < 1200 ? "w-3/5" : "w-full"
                        }`}
                      >
                        {tempdetails.injury}
                      </Typography>
                    </div>
                    <div className={`w-3/5 h-full flex flex-col items-end`}>
                      <Typography
                        variant="h7"
                        color="blue-gray"
                        className="text-end font-poppins"
                      >
                        {tempdetails.time}
                      </Typography>
                    </div>
                  </div>
                </Card>
              )}
              {screenWidth < 500 && (
                <Card
                  color="transparent"
                  shadow={true}
                  className={`w-full h-full bg-white flex flex-col justify-between items-center px-6 ${
                    screenWidth < 1200 ? "py-4" : ""
                  }`}
                >
                  <div
                    className={`w-full h-full flex flex-col justify-center gap-2`}
                  >
                    <div
                      className={`w-full h-full flex justify-center items-center`}
                    >
                      <Avatar
                        variant="circular"
                        size="lg"
                        alt="tania andrew"
                        className="border-[3px] border-white-900"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      />
                    </div>
                    <div
                      className={`w-full h-full flex flex-col justify-center items-center`}
                    >
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="text-start font-poppins"
                      >
                        {tempdetails.user_id}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-start font-poppins"
                      >
                        32 , {tempdetails.PersonalDetails.PatientDetails.Gender}
                      </Typography>
                    </div>
                    <div
                      className={`w-full h-full flex flex-row items-center justify-center gap-8`}
                    >
                      <ChatBubbleBottomCenterTextIcon className="w-7 h-7" />
                      <PhoneIcon
                        className="w-7 h-7"
                        onClick={() =>
                          handlePhoneIconClick(tempdetails.patient_id)
                        }
                      />
                      {console.log(tempdetails.patient_id)}
                    </div>
                    <div className={`w-full h-full flex justify-center`}>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="text-start font-poppins"
                      >
                        Diagnosis:{" "}
                        {tempdetails.PersonalDetails.Reports.map(
                          (report, index) => (
                            <div key={index}>
                              {report && (
                                <div>
                                  <span>{report}</span>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </Typography>
                    </div>
                    <div className={`w-full h-full`}>
                      <Typography
                        variant="h7"
                        color="blue-gray"
                        className="text-center font-poppins"
                      >
                        {event.start.toString()}
                      </Typography>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <p className="font-poppins">Patient not found</p>
          )}
        </div>
        <div
          className={`w-full  flex flex-col ${
            screenWidth < 1000 ? "h-full" : "h-4/5"
          }`}
        >
          <div className={`h-10 w-full px-4`}>
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-start font-medium font-poppins"
            >
              Dashboard
            </Typography>
          </div>
          <div className={`h-full w-full  flex flex-col gap-2`}>
            <div
              className={`w-full ${
                screenWidth < 1000
                  ? "flex flex-col gap-4 h-full"
                  : "h-2/5 flex flex-row"
              }`}
            >
              <div
                className={`h-full px-4 ${
                  screenWidth < 1000 ? "w-full" : "w-1/2"
                }`}
              >
                <Card className="w-full h-full py-1 px-2">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="text-start text-sm font-poppins"
                  >
                    Patient Analytics
                  </Typography>
                  <div
                    className={`w-full ${
                      screenWidth < 1200 ? "h-full" : "h-5/6"
                    }`}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        width={700}
                        height={700}
                        data={data}
                        margin={{
                          top: 10,
                          right: 10,
                          left: -20,
                          bottom: 0,
                        }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="pv"
                          stroke="#8884d8"
                          strokeWidth={4}
                          strokeDasharray={"25 4"}
                        />
                        <Line
                          type="monotone"
                          dataKey="uv"
                          stroke="#82ca9d"
                          strokeWidth={4}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
              <div
                className={`h-full px-4 ${
                  screenWidth < 1000 ? "w-full" : "w-1/2"
                }`}
              >
                <Card className="w-full h-full px-2 py-1">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="text-start font-poppins text-sm"
                  >
                    Statistics
                  </Typography>
                  <div
                    className={`w-full ${
                      screenWidth < 1200 ? "h-full" : "h-5/6"
                    } px-1.5`}
                  >
                    <CircularProgressbar
                      value={60}
                      text={"60%"}
                      styles={buildStyles({
                        textColor: "black",
                        pathColor: "turquoise",
                        trailColor: "gold",
                        trailWidth: 10,
                      })}
                      className="h-28 w-28 font-poppins font-semibold"
                    />
                  </div>
                </Card>
              </div>
            </div>
            <div
              className={`w-full  px-4 ${
                screenWidth < 1000 ? "h-full" : "h-3/5"
              }`}
            >
              <Card className="w-full h-full p-2">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-start font-poppins"
                >
                  Step Count
                </Typography>
                <div className={`w-full h-5/6`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      width={500}
                      height={400}
                      data={data2}
                      margin={{
                        top: 0,
                        right: 5,
                        left: 10,
                        bottom: 2,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="cyan"
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="95%"
                            stopColor="transparent"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <XAxis dataKey="name" mirror={true}/>
                      <YAxis mirror={true}/>
                      <Tooltip />
                      
                      <Area
                        dataKey="uv"
                        stroke="cyan"
                        strokeWidth={2}
                        fill="url(#colorUv)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patientlist;
