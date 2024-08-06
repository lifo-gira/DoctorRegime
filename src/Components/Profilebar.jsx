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
  DocumentIcon,
  AdjustmentsHorizontalIcon,
  UsersIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Dashboard from "./Dashboard";
import Patientlist from "./Patientlist";
import Report from "./Report";
import Assessment from "./Assessment";
import Regimebuilder from "./Regimebuilder";

const Profilebar = ({onRegimeClick,patlis, onAssessmentClick}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenheight, setScreenHeight] = useState(window.innerHeight);
  const [isside, setisside] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      setisside(windowWidth < 1535);
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
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const menuItems = [
    "Dashboard",
    "Patient List",
    "Schedule",
  ];
  const [activeMenuItem, setActiveMenuItem] = useState(menuItems[0]);
  const [open, setOpen] = useState(1); // Track the selected item
  const handleItemClick = (itemNumber) => {
    setOpen(itemNumber);
    setActiveMenuItem(menuItems[itemNumber - 1]);
  };

  const [userID, setuserID] = useState(null);

  const handleMenuItemClick = (menuItem, userId) => {
    setuserID(userId);
    setActiveMenuItem(menuItem);
    console.log(userID); // This will print the updated value
  };

  useEffect(() => {
    setuserID(userID);
    console.log(userID); // This will print the updated value
  }, [userID]);

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flagMinusOneCount, setFlagMinusOneCount] = useState(0);
  const [flagZeroCount, setFlagZeroCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://regimeapi.onrender.com/patient-details/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPatients(data);
        setLoading(false);

        // Count occurrences of flag == -1 and flag == 0
        const minusOneCount = data.filter(patient => patient.flag === -1).length;
        const zeroCount = data.filter(patient => patient.flag === 0).length;

        setFlagMinusOneCount(minusOneCount);
        setFlagZeroCount(zeroCount);

        // console.log("Fetched data:", data); // Log fetched data
      } catch (error) {
        console.error("Error fetching patient information:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  // const patientdata = [
  //   {
  //     name: "John Doe",
  //     age: 25,
  //     gender: "Male",
  //     id: "ABC123",
  //     waitingOrPending: false,
  //     injury: "Left Knee Pain",
  //   },
  //   {
  //     name: "Jane Doe",
  //     age: 30,
  //     gender: "Female",
  //     id: "XYZ456",
  //     waitingOrPending: false,
  //     injury: "Right Knee Pain",
  //   },
  //   {
  //     name: "Bob Smith",
  //     age: 40,
  //     gender: "Male",
  //     id: "DEF789",
  //     waitingOrPending: true,
  //     injury: "Back Injury",
  //   },
  //   {
  //     name: "Alice Johnson",
  //     age: 28,
  //     gender: "Female",
  //     id: "GHI321",
  //     waitingOrPending: false,
  //     injury: "Elbow Pain",
  //   },
  //   {
  //     name: "Chris Williams",
  //     age: 35,
  //     gender: "Male",
  //     id: "JKL987",
  //     waitingOrPending: true,
  //     injury: "Shoulder Injury",
  //   },
  // ];

  const doctordata = [
    {
      name: "John Doe",
      profession: "12345678",
      risk: true,
    },
    {
      name: "John Doe",
      profession: "12345678",
      risk: false,
    },
    {
      name: "John Doe",
      profession: "12345678",
      risk: true,
    },
    {
      name: "John Doe",
      profession: "12345678",
      risk: false,
    },
    {
      name: "John Doe",
      profession: "12345678",
      risk: false,
    },
    {
      name: "John Doe",
      profession: "12345678",
      risk: false,
    },
    
  ];

  const patientdat = [
    {
      name: "John Doe",
      age: 25,
      gender: "Male",
      id: "ABC123",
      waitingOrPending: false,
      injury: "Left Knee Pain",
    },
    {
      name: "Jane Doe",
      age: 30,
      gender: "Female",
      id: "XYZ456",
      waitingOrPending: false,
      injury: "Right Knee Pain",
    },
    {
      name: "Bob Smith",
      age: 40,
      gender: "Male",
      id: "DEF789",
      waitingOrPending: true,
      injury: "Back Injury",
    },
    {
      name: "Alice Johnson",
      age: 28,
      gender: "Female",
      id: "GHI321",
      waitingOrPending: false,
      injury: "Elbow Pain",
    },
    {
      name: "Chris Williams",
      age: 35,
      gender: "Male",
      id: "JKL987",
      waitingOrPending: true,
      injury: "Shoulder Injury",
    },
    {
      name: "Alice Johnson",
      age: 28,
      gender: "Female",
      id: "GHI321",
      waitingOrPending: false,
      injury: "Elbow Pain",
    },
    {
      name: "Chris Williams",
      age: 35,
      gender: "Male",
      id: "JKL987",
      waitingOrPending: true,
      injury: "Shoulder Injury",
    },
    {
      name: "Alice Johnson",
      age: 28,
      gender: "Female",
      id: "GHI321",
      waitingOrPending: false,
      injury: "Elbow Pain",
    },
    {
      name: "Chris Williams",
      age: 35,
      gender: "Male",
      id: "JKL987",
      waitingOrPending: true,
      injury: "Shoulder Injury",
    },
    {
      name: "Alice Johnson",
      age: 28,
      gender: "Female",
      id: "GHI321",
      waitingOrPending: false,
      injury: "Elbow Pain",
    },
    {
      name: "Chris Williams",
      age: 35,
      gender: "Male",
      id: "JKL987",
      waitingOrPending: true,
      injury: "Shoulder Injury",
    },
  ];

  const data = [
    {
      name: 2022,
      uv: 20,
      pv: 0,
      amt: 2400,
    },
    {
      name: null,
      uv: 80,
      pv: 60,
      amt: 2210,
    },
    {
      name: "2023",
      uv: 50,
      pv: 30,
      amt: 2290,
    },
    {
      name: null,
      uv: 110,
      pv: 90,
      amt: 2290,
    },
    
  ];

  const data1 = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Chinese",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Physics",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "History",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

 

  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleEventSelect = (event) => {
    console.log(event)
    setSelectedEvent(event);
    setActiveMenuItem("Patient List")
  };

  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("wss://regimeapi.onrender.com/patients");

    socket.onmessage = (event) => {
      // Handle the WebSocket message
      console.log("WebSocket message received:", event.data);

      try {
        const messageData = JSON.parse(event.data);
        console.log(messageData, "HI");
        // Check if the flag is 1 in the received message
        console.log();
        if (messageData.flag === 0) {
          // Increment the notification count when a new WebSocket message is received with flag 1
          setNotificationCount((prevCount) => prevCount + 1);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
    // Example client-side code
    return () => {
      socket.close();
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
    setNotificationCount(0);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };


  return (
    <div
      className={`w-full flex flex-row ${
        screenWidth < 1200 ? "h-full " : "h-screen"
      }`}
    >
      {!isside && (
        <div
          className={`w-full md:w-1/6 lg:w-1/5 xl:w-1/6 bg-black h-screen overflow-y-auto `}
        >
          <Card className="h-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
            <div className="mb-2 flex flex-col items-center gap-4 p-4">
              <div className="flex items-center gap-1 rounded-full">
                <Avatar
                  variant="rounded"
                  size="xxl"
                  alt="tania andrew"
                  className="border-[3px] border-white-900"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
              </div>
              <div>
                <Typography variant="h5" color="blue-gray" className="font-poppins">
                  Anirudh P Menon
                </Typography>
                <Typography variant="h7" color="blue-gray" className="font-poppins">
                  Cardialogist
                </Typography>
              </div>
            </div>
            <List
              className={` bg-white ${
                screenWidth < 1535 ? "" : " w-full pl-8 pr-0"
              }`}
            >
              <ListItem
                className={`rounded-none ${
                  screenWidth < 1535 ? "w-2/3 px-4" : " w-full p-3"
                } ${activeMenuItem === "Dashboard" && activeMenuItem != "Report"
                ? "bg-gradient-to-r from-white to-cyan-200"
                : "transparent"}`}
                selected={open === 1}
                onClick={() => handleItemClick(1)}
              >
                <ListItemPrefix>
                  <Squares2X2Icon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal font-poppins">
                  Dashboard
                </Typography>
              </ListItem>
              <ListItem
                className={`rounded-none font-poppins ${
                  screenWidth < 1535 ? "w-2/3 px-4" : " w-full p-3"
                } ${activeMenuItem === "Patient List" ? "bg-gradient-to-r from-white to-cyan-200" : "transparent"}`}
                selected={open === 2}
                onClick={() => handleItemClick(2)}
              >
                <ListItemPrefix>
                  <UsersIcon className="h-5 w-5" />
                </ListItemPrefix>
                Patient List
              </ListItem>
              
              <ListItem
                className={`rounded-none font-poppins ${
                  screenWidth < 1535 ? "w-2/3 px-4" : " w-full p-3"
                } ${activeMenuItem === "Schedule" ? "bg-gradient-to-r from-white to-cyan-200" : "transparent" }`}
                selected={open === 3}
                onClick={() => handleItemClick(3)}
              >
                <ListItemPrefix>
                  <CalendarDaysIcon className="h-5 w-5" />
                </ListItemPrefix>
                Schedule
              </ListItem>
              <hr className="my-5 border-blue-gray-50 w-full" />
              <ListItem
                className={`rounded-none font-poppins ${
                  screenWidth < 1535 ? "w-2/3 px-4" : " w-full p-3"
                }`}
              >
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
              <ListItem
                className={`rounded-none font-poppins ${
                  screenWidth < 1535 ? "w-2/3 px-4" : " w-full p-3"
                }`}
              >
                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List>
          </Card>
        </div>
      )}
      {isside && (
        <div>
          <Drawer
            open={isDrawerOpen}
            overlay={false}
            className={`
            ${screenheight > 670 ? "mt-20" : ""}`}
          >
            <Card className="h-full max-w-[20rem] p-2 shadow-xl shadow-blue-gray-900/5 rounded-none">
              <div className="mb-2 flex flex-col items-center gap-2 p-0 ">
                {screenheight <= 670 && (
                  <div className="w-full flex justify-end">
                    <XMarkIcon
                      className="w-7 h-7"
                      onClick={() => {
                        openDrawer();
                        handleClick();
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center gap-1 rounded-full">
                  <Avatar
                    variant="rounded"
                    size="xl"
                    alt="tania andrew"
                    className="border-[3px] border-white-900"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Anirudh P Menon
                  </Typography>
                  <Typography variant="h7" color="blue-gray">
                    Cardiologist
                  </Typography>
                </div>
              </div>
              <List
                className={` bg-white ${
                  screenWidth < 1535 ? "p-0 pl-2" : " w-full pl-8 pr-4"
                }`}
              >
                <ListItem
                  className={`${
                    screenWidth < 1535 ? "w-5/6 px-4" : " w-full p-1"
                  } ${activeMenuItem === "Dashboard" && activeMenuItem != "Report"
                  ? "bg-gradient-to-r from-white to-cyan-200"
                  : "transparent"}`}
                  selected={open === 1}
                  onClick={() => handleItemClick(1)}
                >
                  <ListItemPrefix>
                    <Squares2X2Icon className="h-4 w-4" />
                  </ListItemPrefix>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="mr-auto font-normal"
                  >
                    Dashboard
                  </Typography>
                </ListItem>
                <ListItem
                  className={`${
                    screenWidth < 1535 ? "w-5/6 px-4" : " w-full p-3"
                  } ${activeMenuItem === "Patient List"
                  ? "bg-gradient-to-r from-white to-cyan-200"
                  : "transparent"}`}
                  selected={open === 2}
                  onClick={() => handleItemClick(2)}
                >
                  <ListItemPrefix>
                    <UsersIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Patient List
                </ListItem>
                <ListItem
                  className={`${
                    screenWidth < 1535 ? "w-5/6 px-4" : " w-full p-3"
                  } ${activeMenuItem === "Schedule"
                  ? "bg-gradient-to-r from-white to-cyan-200"
                  : "transparent"}`}
                  selected={open === 3}
                  onClick={() => handleItemClick(3)}
                >
                  <ListItemPrefix>
                    <CalendarDaysIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Schedule
                </ListItem>

                <hr
                  className={` border-blue-gray-50 w-full ${
                    screenWidth < 1535 ? "my-2" : " my-5"
                  }`}
                />
                <ListItem
                  className={`${
                    screenWidth < 1535 ? "w-5/6 px-4" : " w-full p-3"
                  }`}
                >
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Settings
                </ListItem>
                <ListItem
                  className={`${
                    screenWidth < 1535 ? "w-5/6 px-4" : " w-full p-3"
                  }`}
                >
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Log Out
                </ListItem>
              </List>
            </Card>
          </Drawer>
        </div>
      )}
      <div
        className={` bg-gray-200 flex flex-col h-full ${
          screenWidth < 1535 ? "w-full" : "w-5/6"
        }`}
      >
       
          {activeMenuItem!="Report" &&
          <div
            className={`w-full h-20 bg-gradient-to-b from-blue-gray-500 to-gray-600 flex flex-row items-center  ${
              screenWidth < 460 ? "pl-4 gap-4" : "pl-12 gap-8"
            }`}
          >
            {screenWidth < 1535 && (
              <div>
                <button class="relative group rounded-full">
                  <div
                    className={`relative flex items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 focus:ring-4 ring-opacity-30 duration-200 shadow-md ${
                      isClicked ? "rotate-[45deg]" : ""
                    }`}
                    onClick={() => {
                      handleClick();
                      openDrawer();
                    }}
                  >
                    <div class="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 ">
                      <div
                        className={`bg-white h-[2px] w-1/2 rounded ${
                          isClicked
                            ? "rotate-90 h-[1px] origin-right delay-75 translate-y-[1px]"
                            : ""
                        }`}
                      ></div>
                      <div class="bg-white h-[1px] rounded"></div>
                      <div
                        className={`bg-white h-[2px] w-1/2 rounded self-end ${
                          isClicked
                            ? "rotate-90 h-[1px] origin-left delay-75 translate-y-[1px]"
                            : ""
                        }`}
                      ></div>
                    </div>
                  </div>
                </button>
              </div>
            )}
            <div
              className={`flex flex-row items-center  ${
                screenWidth < 600 ? "w-4/6 gap-2" : "gap-20 w-3/4"
              }`}
            >
              <div class={`${screenWidth < 600 ? "w-full" : "w-2/3"}`}>
                <div class="relative flex items-center w-full h-12 rounded-2xl focus-within:shadow-lg bg-white overflow-hidden">
                  <div class="grid place-items-center h-full w-12 text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <input
                    class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                  />
                </div>
              </div>

              <div className="relative inline-flex items-center">
                <button
                  type="button"
                  className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <BellIcon className="w-8 h-8 cursor-pointer" />
                  {notificationCount > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 -end-0 dark:border-gray-900">
                      {notificationCount}
                    </div>
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 py-2 w-56 bg-white rounded-lg shadow-xl z-10">
                    <p
                      className={`text-gray-700 px-4 py-2 ${
                        notificationCount > 0 ? "cursor-pointer" : ""
                      }`}
                      onClick={notificationCount > 0 ? handleRefresh : null}
                    >
                      {notificationCount > 0
                        ? `${notificationCount} patients have been added. Click to refresh.`
                        : "No new messages"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
}
        <div className={`w-full ${screenWidth<1200 || activeMenuItem === "Report"?"h-full":"h-5/6 "}`}>
          {(activeMenuItem === "Dashboard" && patlis === 'false') && <Dashboard patientdata={patients} doctordata={doctordata}  onEventSelect={handleEventSelect} onReportClick={(userId) => handleMenuItemClick("Report", userId)} />}
          {(activeMenuItem === "Patient List" || patlis === 'true') && <Patientlist patientdata={patients}  data={data} data1={data1} event={selectedEvent} onReportClick={(userId) => handleMenuItemClick("Report", userId)}/>}
          {(activeMenuItem === "Report" && patlis === 'false') &&(<Regimebuilder userId={userID} onDashboard={()=> handleMenuItemClick("Dashboard")}  onRegimeClick={(patientId) => onRegimeClick(patientId)}  onAssessmentClick={(patientId) => handleMenuItemClick("Analysis",patientId)} />)}
          {(activeMenuItem === "Analysis") && (<Assessment userId={userID} onDashboard={()=> handleMenuItemClick("Dashboard")} />)}
        </div>
        
      </div>
    </div>
  );
};

export default Profilebar;