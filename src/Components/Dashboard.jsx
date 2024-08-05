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
  ChevronDownIcon,
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
} from "recharts";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/en-gb";

const Dashboard = ({
  onReportClick,
  patientdata,
  doctordata,
  onEventSelect,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenheight, setScreenHeight] = useState(window.innerHeight);

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

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flagMinusOneCount, setFlagMinusOneCount] = useState(0);
  const [flagZeroCount, setFlagZeroCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-backup-vap2.onrender.com/patient-details/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Convert schedule_start_date to Date objects for each patient
        const processedData = data.map((patient) => {
          const startDateString = patient.health_tracker.schedule_start_date;
          const dateTimeParts = startDateString
            .replace(/[()]/g, "")
            .split(",")
            .map((part) => parseInt(part.trim()));

          const startDate = new Date(
            dateTimeParts[0],
            dateTimeParts[1] - 1,
            dateTimeParts[2],
            dateTimeParts[3],
            dateTimeParts[4]
          );
          console.log(startDate, "startdate");
          return {
            ...patient,
            title: "Meeting", // Add the title "Meeting" to each item
            health_tracker: {
              ...patient.health_tracker,
              schedule_start_date: startDate,
            },
          };
        });

        setPatients(processedData);
        setLoading(false);

        // Count occurrences of flag == -1 and flag == 0
        const minusOneCount = processedData.filter(
          (patient) => patient.flag === -1
        ).length;
        const zeroCount = processedData.filter(
          (patient) => patient.flag === 0
        ).length;

        setFlagMinusOneCount(minusOneCount);
        setFlagZeroCount(zeroCount);

        console.log("Processed patient data:", processedData); // Log fetched and processed data
      } catch (error) {
        console.error("Error fetching patient information:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  const localizer = momentLocalizer(moment);

  const initialEvents = [
    {
      title: "Meeting",
      start: new Date(2024, 1, 6, 10, 0),
      end: new Date(2024, 1, 6, 11, 0),
      id: "vignesh",
    },
    {
      title: "Conference",
      start: new Date(2024, 1, 7, 12, 0),
      end: new Date(2024, 1, 7, 15, 0),
      id: "test123",
    },
  ];

  const [events, setEvents] = useState(patients[0]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [param, setparam] = useState(null);
  const handleSelectEvent = (event) => {
    console.log(event, "EVENT");
    // const selectedpatientdata = patientdata.find(patient => patient.id === event.id);
    // if(!selectedpatientdata){
    //   setparam({ initialEvent: event, additionalEvent: staticname });
    // }
    // else{
    //   setparam({ initialEvent: event, additionalEvent: selectedpatientdata });
    // }

    // console.log("Event",event);

    // passingfun(param);
    onEventSelect(event);
  };

  // const passingfun=(para)=>{
  //   console.log("Param 2",para);
  //   onEventSelect(para);
  // }

  return (
    <div className={`w-full h-full`}>
      <div
        className={`w-full  ${
          screenWidth < 1200 ? "flex flex-col h-full" : "flex flex-row h-3/5"
        }`}
      >
        <div
          className={`h-full pb-2 ${screenWidth < 1200 ? "w-full" : "w-3/5"}`}
        >
          <div
            className={`h-full  px-4 ${
              screenWidth < 1180 ? "w-full" : "w-full"
            }`}
          >
            <div
              className={`w-full items-center py-0 ${
                screenWidth < 460
                  ? "flex flex-col py-4 h-full px-2"
                  : "h-1/6 flex flex-row justify-between px-8"
              }`}
            >
              <Typography
                variant="h4"
                color="blue-gray"
                className={`font-poppins`}
              >
                Patients Assigned
              </Typography>
              <div
                className={`flex flex-row justify-between gap-2 items-center cursor-pointer`}
              >
                <Typography
                  variant="h5"
                  color="cyan"
                  className={`font-poppins`}
                >
                  View all
                </Typography>
                <ChevronRightIcon className="w-4 h-4" />
              </div>
            </div>
            <div
              className={`w-full h-5/6 pt-2 gap-5 flex flex-col px-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-blue-400 scrollbar-track-transparent scroll-smooth`}
            >
              {screenWidth >= 690 &&
                patientdata.map((item, index) => (
                  <Card
                    color="transparent"
                    shadow={true}
                    className="w-full bg-white flex flex-row justify-between items-center my-1 py-1 px-2"
                    key={index}
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
                              className={`font-poppins`}
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
                    <div className={`w-1/6 text-base font-medium`}>
                      ID: #{item.user_id[0]}
                      {item.user_id[1]}
                      {item.user_id[2]}-
                      {item.PersonalDetails.PatientDetails.Gender[0]}
                    </div>
                    <div
                      className={`w-2/6  flex flex-row  justify-between items-center`}
                    >
                      <div
                        className={` rounded-lg py-0.5 font-medium text-sm  w-2/3 flex justify-center ${
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
                          className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
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
                            <Typography variant="h5" color="blue-gray">
                              {item.user_id}
                            </Typography>
                          </div>
                          <Typography color="blue-gray" className="text-start">
                            25,{item.PersonalDetails.PatientDetails.Gender}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className={`w-1/2 h-full flex flex-col gap-4`}>
                      <div
                        className={`h-1/6 w-full text-base font-medium text-start`}
                      >
                        ID: #{item.user_id[0]}
                        {item.user_id[1]}
                        {item.user_id[2]}-
                        {item.PersonalDetails.PatientDetails.Gender[0]}
                      </div>
                      <div className={`h-2/6 w-full flex flex-row  `}>
                        <div
                          className={` rounded-lg py-0.5 font-medium  w-1/2 px-4 ${
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
                            className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
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
                          <Typography variant="h5" color="blue-gray">
                            {item.user_id}
                          </Typography>
                        </div>
                        <Typography color="blue-gray" className="text-start">
                          25,{item.PersonalDetails.PatientDetails.Gender}
                        </Typography>
                        <div
                          className={`h-1/6 w-full text-base font-medium text-start`}
                        >
                          ID: #{item.user_id[0]}
                          {item.user_id[1]}
                          {item.user_id[2]}-
                          {item.PersonalDetails.PatientDetails.Gender[0]}
                        </div>
                        <div className={`h-2/6 w-full flex flex-row  `}>
                          <div
                            className={` rounded-lg py-0.5 font-medium  w-1/2 px-4 ${
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
                              className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
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
                          <Typography variant="h5" color="blue-gray">
                            {item.user_id}
                          </Typography>
                        </div>
                        <Typography color="blue-gray" className="text-center">
                          25,{item.PersonalDetails.PatientDetails.Gender}
                        </Typography>
                        <div
                          className={` w-full text-base font-medium text-center`}
                        >
                          ID: #{item.user_id[0]}
                          {item.user_id[1]}
                          {item.user_id[2]}-
                          {item.PersonalDetails.PatientDetails.Gender[0]}
                        </div>
                        <div className={`w-full flex flex-row px-2`}>
                          <div
                            className={` rounded-lg py-0.5 font-medium  w-3/5  ${
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
                            className={`flex flex-row gap-1 items-center justify-end w-2/5 `}
                          >
                            <div
                              className={`text-base font-medium border-b-2 border-blue-gray-500 cursor-pointer`}
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
        <div
          className={`h-full  flex flex-col ${
            screenWidth < 1200 ? "w-full" : "w-2/5"
          }`}
        >
          <div className={`w-full h-2/5 `}>
            <div
              className={` w-full flex flex-col ${
                screenWidth < 1180 ? "h-2/3" : "h-full px-4 py-1"
              }`}
            >
              <div
                className={`h-1/6 w-full  flex flex-row items-center py-4 ${
                  screenWidth < 1180 ? "justify-center" : "justify-between"
                }`}
              >
                <Typography
                  variant="h5"
                  color="black"
                  className="text-start font-poppins w-2/3"
                >
                  Patients
                </Typography>
                <div className={`flex flex-row font-poppins items-center gap-2 text-sm bg-gray-50 rounded-lg py-1 px-2`}>
                  2024
                  <ChevronDownIcon color="gray" className={`w-3 h-3`}/>
                </div>
              </div>

              <div
                className={`h-5/6  gap-4 w-full  ${
                  screenWidth < 1180 && screenWidth >= 520
                    ? "flex flex-row px-8"
                    : screenWidth < 520
                    ? "w-full flex flex-col justify-center items-center px-4"
                    : "flex flex-row"
                }`}
              >
                <Card
                  color="transparent"
                  shadow={true}
                  className={` bg-gradient-to-br from-light-blue-50 via-light-blue-50 to-white flex flex-col justify-center items-center my-1 py-1 w-full`}
                >
                  <div className="w-full h-1/4 font-semibold text-black text-lg font-poppins">
                    Patients Completed
                  </div>
                  <div className="w-full h-3/4 flex flex-row items-center">
                    <div className="w-1/2 text-5xl text-black font-semibold font-poppins">
                      37
                    </div>
                    <div className="w-1/2 flex justify-center">
                      <UserCircleIcon color="skyblue" className="w-20 h-20" />
                    </div>
                  </div>
                </Card>
                <Card
                  color="transparent"
                  shadow={true}
                  className={`bg-gradient-to-br from-red-100 via-red-50 to-white flex flex-col justify-center items-center my-1 py-1 w-full`}
                >
                  <div className="w-full h-1/4 font-semibold text-black text-lg font-poppins">
                    Patients Assigned
                  </div>
                  <div className="w-full h-3/4 flex flex-row items-center">
                    <div className="w-1/2 text-5xl text-black font-semibold font-poppins">
                      29
                    </div>
                    <div className="w-1/2 flex justify-center">
                      <UserCircleIcon color="red" className="w-20 h-20" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className={`w-full h-3/5 px-4 pt-4`}>
            <div className={`h-full w-full   flex flex-col`}>
              <div
                className={`w-full h-1/6  text-start flex items-center ${
                  screenWidth < 1180 ? "py-8 justify-center" : "py-3"
                }`}
              >
                <Typography
                  variant="h5"
                  color="black"
                  className="text-start font-poppins"
                >
                  Exercises Assigned
                </Typography>
              </div>
              <div className="w-full h-5/6 py-1 gap-4 flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-100 scrollbar-track-transparent scrollbar-thumb-rounded-2xl">
                {doctordata.map((item, index) => (
                  <div
                    className={`w-full h-full flex flex-col items-center justify-center py-3 px-4 gap-4 rounded-xl ${
                      item.risk
                        ? "bg-gradient-to-br from-white via-red-50 to-white border-solid border-2 border-red-600"
                        : "bg-gradient-to-br from-white via-blue-50 to-white border-solid border-2 border-cyan-300"
                    } `}
                    key={index}
                  >
                    <div className="w-full h-1/3">
                      <Avatar
                        size="lg"
                        variant="circular"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="tania andrew"
                        className={`${
                          item.risk
                            ? "shadow-red-300 shadow-md"
                            : "shadow-cyan-300 shadow-md"
                        }`}
                      />
                    </div>
                    <div className="h-2/3 w-full flex flex-col  justify-center">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="font-poppins"
                      >
                        {item.name}
                      </Typography>
                      <div
                        className={`w-full flex flex-row justify-center items-center font-poppins`}
                      >
                        ID:
                        <Typography
                          variant="h7"
                          color="black"
                          className="font-poppins"
                        >
                          {item.profession}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-2/5 flex flex-col ${
          screenWidth < 1200 ? "py-4 gap-4 px-2" : "px-6 pb-2"
        } `}
      >
        <div className={`w-full h-1/6 flex items-center px-6`}>
          <Typography
            variant="h4"
            color="black"
            className="text-start font-poppins"
          >
            My Schedule
          </Typography>
        </div>
        <div className="container w-full h-full mx-auto p-2 bg-white rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-100 scrollbar-track-transparent">
          <div className="h-full w-full">
            <Calendar
              localizer={localizer}
              events={patients}
              startAccessor={(event) =>
                new Date(event.health_tracker.schedule_start_date)
              }
              endAccessor={(event) =>
                new Date(event.health_tracker.schedule_start_date)
              }
              style={{ height: 500, fontFamily: "Poppins" }}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
