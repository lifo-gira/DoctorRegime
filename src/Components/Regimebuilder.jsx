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
  Button,
  IconButton,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
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
  ArrowLeftStartOnRectangleIcon,
  HeartIcon,
  ClockIcon,
  PlayCircleIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  InboxIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Player } from "@lottiefiles/react-lottie-player";
import Endurance from "../Asset/runner.png";
import Strength from "../Asset/muscle.png";
import Balance from "../Asset/balance.png";
import Flexibility from "../Asset/flexibility.png";
import Run from "../Asset/Sit-Stand.jpg";
import Squat from "../Asset/Left-Knee-Bend.jpg";
import Pushup from "../Asset//Right-Knee-Bend.jpg";
import Pullup from "../Asset/Right-Leg-Bend.jpg";
import LeftLegBend from "../Asset/Left-Leg-Bend.jpg";
import Stretching from "../Asset/stretching.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Regimebuilder = ({ onProfileClick, userId }) => {
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
    // console.log(userId);
    // Initial check
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [exerciseDetails, setExerciseDetails] = useState([]); // Initialize state for exercise details as an empty array
  const handleTimeChange = (event, index) => {
    const newValue = parseInt(event.target.value);
    setExerciseDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = { ...updatedDetails[index], set: newValue };
      return updatedDetails;
    });
  };

  const handleCountChange = (event, index) => {
    const newValue = parseInt(event.target.value);
    setExerciseDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = { ...updatedDetails[index], rep: newValue };
      return updatedDetails;
    });
  };

  const demoexercise = [
    "https://lottie.host/8cbfc4f4-2576-4800-ab68-fbb557b7b648/qiEFjh3zMb.json",
    "https://lottie.host/b460d1ac-22ad-4021-8449-e71e8299074d/GLEetlLXRN.json",
    "https://lottie.host/83052e28-21d2-4efd-81b8-e3d7a52428bc/N3tSnWrJCJ.json",
    "https://lottie.host/559e8925-5b7f-49e4-b68d-7c79bc61d51e/PWvvXVkYzy.json",
    "https://lottie.host/8cbfc4f4-2576-4800-ab68-fbb557b7b648/qiEFjh3zMb.json"
  ];

  const demoexer = [Run, Squat, Pushup, Pullup, LeftLegBend];

  const [openRight, setOpenRight] = React.useState(false);
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const [open, setOpen] = useState(0);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [subSubMenuOpen, setSubSubMenuOpen] = useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleSubMenuOpen = (value) => {
    setSubMenuOpen(subMenuOpen === value ? 0 : value);
  };

  const handleSubSubMenuOpen = (value) => {
    setSubSubMenuOpen(subSubMenuOpen === value ? 0 : value);
  };

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [display, setdisplay] = useState(false);

  const handleSelectLottie = (url) => {
    if (!selectedExercises.includes(url)) {
      setSelectedExercises((prevExercises) => [...prevExercises, url]);
      setdisplay(false);
    } else {
      // Display toast alert if exercise is already selected
      console.log("Already selected");
      toast.error("Exercise already selected", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleRemoveExercise = (url) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((exercise) => exercise !== url)
    );
    toast.error("Exercise successfully removed", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setdisplay(false);
  };
  
  const [selectedDetailedExerciseIndex, setSelectedDetailedExerciseIndex] = useState(0);

  const handleUpdateButton = () => {
    // Update the detailed view with all selected exercises in sequence
    if (selectedExercises.length > 0) {
      setSelectedDetailedExerciseIndex(0);
      updateExercisesGiven(userId, 2);
      setdisplay(true);
    } else {
      setdisplay(false);
    }
  };

  useEffect(() => {
    // console.log("Selected",selectedExercises)
    let interval;
    if (selectedDetailedExerciseIndex !== null) {
      interval = setInterval(() => {
        setSelectedDetailedExerciseIndex((prevIndex) =>
          prevIndex < selectedExercises.length - 1 ? prevIndex + 1 : null
        );
      }, 3000); // Change detailed view every 3 seconds, you can adjust this interval as needed
    }
    if (
      demoexer.indexOf(selectedExercises[selectedDetailedExerciseIndex]) < 0
    ) {
      setdisplay(false);
    }
    // console.log("Selected", selectedExercises[selectedDetailedExerciseIndex]);
    // console.log(
    //   "index",
    //   demoexer.indexOf(selectedExercises[selectedDetailedExerciseIndex])
    // );
    return () => clearInterval(interval);
  }, [selectedDetailedExerciseIndex, selectedExercises]);

  useEffect(() => {
    // Initialize exercise details when the component mounts or selectedExercises change
    const details = selectedExercises.map((item) => {
      const fileName = item.split("/").pop().split(".")[0];
      return { exerciseName: fileName, set: 0, rep: 0 }; // Initialize time and count as 0
    });
    setExerciseDetails((prevDetails) => {
      // Preserve existing details for already loaded cards
      const existingDetails = prevDetails.slice(0, selectedExercises.length);
      // Merge existing details with newly initialized ones
      const mergedDetails = details.map((detail, index) => ({
        ...detail,
        ...existingDetails[index], // Preserve existing details for this card
      }));
      return mergedDetails;
    });
  }, [selectedExercises]);

  // useEffect(() => {
  //   exerciseDetails.forEach(({ exerciseName, rep, set }) => {
  //     switch (exerciseName) {
  //       case "run":
  //         setRunDetails({ rep, set });
  //         break;
  //       case "squat":
  //         setSquatsDetails({ rep, set });
  //         break;
  //       case "pushup":
  //         setPushupDetails({ rep, set });
  //         break;
  //       case "pullup":
  //         setPullupDetails({ rep, set });
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // }, [exerciseDetails]);

  const updateExercisesGiven = async (patientId, newFlag) => {
    console.log(patientId, "patienId");
    try {
      console.log(exerciseDetails)

      const updatedExercises = exerciseDetails.map(exercise => ({
        name: exercise.exerciseName,
        set: exercise.set,
        rep: exercise.rep
      }));
      // Update exerciseGivenData based on the latest details stored in state variables
      const exercise_data = {
        data: updatedExercises
      };

      // Send the updated exerciseGivenData to the backend
      const response = await fetch(
        `https://regimeapi.onrender.com/update_given_exercise_info/${patientId}/${newFlag}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exercise_data),
        }
      );
      // console.log(response)
      if (!response.ok) {
        throw new Error("Failed to update exercise information");
      }

      const responseData = await response.json();
      console.log(responseData); // Log the response from the FastAPI endpoint
      // Handle response as needed
    } catch (error) {
      console.error("Error updating exercise information:", error);
      // Handle error
    }
  };

  // console.log(runDetails, squatsDetails, pushupDetails, pullupDetails);

  return (
    <div
      className={`w-full  flex flex-col  ${
        screenheight < 1180 ? "h-full" : "h-screen"
      }`}
    >
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 h-screen  "
        overlay={false}
      >
        <div className=" flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Exercises
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className={`w-full h-screen`}>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0">
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3 flex gap-2"
                >
                  <Avatar src={Endurance} alt="avatar" size="sm" />
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Endurance
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem onClick={() => handleSubMenuOpen(1.1)}>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Agility
                  </ListItem>
                  {subMenuOpen === 1.1 && (
                    <div className={`w-full h-full `}>
                      <div className="w-full h-full py-1 gap-4 flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent scrollbar-thumb-rounded-2xl">
                        {demoexer.map((item, index) => (
                          <Card
                            className={`w-full h-full flex flex-col items-center justify-center py-3 px-4 gap-4 ${
                              item.risk
                                ? "bg-gradient-to-br from-red-100 to-white"
                                : "bg-gradient-to-br from-light-blue-100 to-white"
                            } `}
                            onClick={() => handleSelectLottie(item)}
                            key={index}
                            style={{ minWidth: "100px" }}
                          >
                            <div className="w-full h-full">
                              <img src={item} alt="" className={`w-20 h-20`} />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0">
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3 flex gap-2"
                >
                  <Avatar src={Strength} alt="avatar" size="sm" />
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Strength
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <div className={`w-full h-full `}>
                  <div className="w-full h-full py-1 gap-4 flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent scrollbar-thumb-rounded-2xl">
                    {demoexer.map((item, index) => (
                      <Card
                        className={`w-full h-full flex flex-col items-center justify-center py-3 px-4 gap-4 ${
                          item.risk
                            ? "bg-gradient-to-br from-red-100 to-white"
                            : "bg-gradient-to-br from-light-blue-100 to-white"
                        } `}
                        onClick={() => handleSelectLottie(item)}
                        key={index}
                        style={{ minWidth: "100px" }}
                      >
                        <div className="w-full h-full">
                          <img src={item} alt="" className={`w-20 h-20`} />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 3 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0">
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 p-3 flex gap-2"
                >
                  <Avatar src={Balance} alt="avatar" size="sm" />
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Balance
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <div className={`w-full h-full `}>
                  <div className="w-full h-full py-1 gap-4 flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent scrollbar-thumb-rounded-2xl">
                    {demoexer.map((item, index) => (
                      <Card
                        className={`w-full h-full flex flex-col items-center justify-center py-3 px-4 gap-4 ${
                          item.risk
                            ? "bg-gradient-to-br from-red-100 to-white"
                            : "bg-gradient-to-br from-light-blue-100 to-white"
                        } `}
                        onClick={() => handleSelectLottie(item)}
                        key={index}
                        style={{ minWidth: "100px" }}
                      >
                        <div className="w-full h-full">
                          <img src={item} alt="" className={`w-20 h-20`} />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0">
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 p-3 flex gap-2"
                >
                  <Avatar src={Flexibility} alt="avatar" size="sm" />
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Flexibility
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <div className={`w-full h-full `}>
                  <div className="w-full h-full py-1 gap-4 flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent scrollbar-thumb-rounded-2xl">
                    {demoexer.map((item, index) => (
                      <Card
                        className={`w-full h-full flex flex-col items-center justify-center py-3 px-4 gap-4 ${
                          item.risk
                            ? "bg-gradient-to-br from-red-100 to-white"
                            : "bg-gradient-to-br from-light-blue-100 to-white"
                        } `}
                        onClick={() => handleSelectLottie(item)}
                        key={index}
                        style={{ minWidth: "100px" }}
                      >
                        <div className="w-full h-full">
                          <img src={item} alt="" className={`w-20 h-20`} />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0">
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 p-3 flex gap-2"
                >
                  <Avatar src={Stretching} alt="avatar" size="sm" />
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Stretching
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem onClick={() => handleSubMenuOpen(5.1)}>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Compression
                  </ListItem>
                  {subMenuOpen === 5.1 && (
                    <div className={`w-full h-full `}>
                      <div className="w-full h-full py-1 gap-4 flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent scrollbar-thumb-rounded-2xl">
                        {demoexer.map((item, index) => (
                          <Card
                            className={`w-full h-full flex flex-col items-center justify-center py-3 px-4 gap-4 ${
                              item.risk
                                ? "bg-gradient-to-br from-red-100 to-white"
                                : "bg-gradient-to-br from-light-blue-100 to-white"
                            } `}
                            onClick={() => handleSelectLottie(item)}
                            key={index}
                            style={{ minWidth: "100px" }}
                          >
                            <div className="w-full h-full">
                              <img src={item} alt="" className={`w-20 h-20`} />
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </div>
      </Drawer>
      <div
        className={`w-full  border-b-2 border-cyan-300 bg-white flex   px-8 ${
          screenWidth < 930 && screenWidth >= 640
            ? "flex-col h-1/6"
            : screenWidth < 640
            ? "flex-col h-2/5"
            : "flex-row h-20 justify-between"
        }`}
      >
        <div
          className={` h-full  flex  items-center px-8 text-4xl font-extrabold ${
            screenWidth < 930
              ? "w-full text-center justify-center"
              : "w-1/3 justify-start"
          }`}
        >
          WAD
        </div>
        <div
          className={` h-full  ${
            screenWidth < 930 && screenWidth >= 640
              ? "w-full flex flex-row"
              : screenWidth < 640
              ? "w-full flex flex-col"
              : "w-2/3 flex flex-row"
          }`}
        >
          <List
            className={`  items-center  ${
              screenWidth < 640 && screenWidth >= 310
                ? "flex flex-col gap-5 items-center justify-center w-full"
                : screenWidth < 310
                ? "flex flex-col justify-start items-start"
                : "flex flex-row gap-12 w-full"
            }`}
          >
            <ListItem
              className={`${
                screenWidth < 640
                  ? "w-3/4 text-center"
                  : screenWidth < 310
                  ? ""
                  : " w-1/3 p-1 "
              }`}
              //   selected={open === 1}
              //   onClick={() => handleItemClick(1)}
              //   style={{
              //     backgroundColor: activeMenuItem === "Dashboard" && activeMenuItem != "Report" ? "cyan" : "transparent",
              //   }}
            >
              <div className={`flex flex-row mx-auto `}>
                <ListItemPrefix
                  onClick={onProfileClick}
                  className="cursor-pointer"
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mr-auto font-normal cursor-pointer"
                  onClick={onProfileClick}
                >
                  Dashboard
                </Typography>
              </div>
            </ListItem>
            <ListItem
              className={`${
                screenWidth < 640 ? "w-3/4 text-center" : " w-1/3 p-1 "
              }`}
              //   selected={open === 1}
              //   onClick={() => handleItemClick(1)}
              //   style={{
              //     backgroundColor: activeMenuItem === "Dashboard" && activeMenuItem != "Report" ? "cyan" : "transparent",
              //   }}
              onClick={() => openDrawerRight()}
            >
              <div className={`flex flex-row mx-auto `}>
                <ListItemPrefix className="cursor-pointer">
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mr-auto font-normal cursor-pointer"
                >
                  Categories
                </Typography>
              </div>
            </ListItem>
            <ListItem
              className={`${
                screenWidth < 640 ? "w-3/4 text-center" : " w-1/3 p-1 "
              }`}
              //   selected={open === 1}
              //   onClick={() => handleItemClick(1)}
              //   style={{
              //     backgroundColor: activeMenuItem === "Dashboard" && activeMenuItem != "Report" ? "cyan" : "transparent",
              //   }}
            >
              <div className={`flex flex-row mx-auto `}>
                <ListItemPrefix className="cursor-pointer">
                  <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mr-auto font-normal cursor-pointer"
                >
                  Sign Out
                </Typography>
              </div>
            </ListItem>
          </List>
        </div>
      </div>
      <div
        className={`w-full h-5/6  mt-auto flex flex-col items-center gap-2 px-4`}
      >
        <div
          className={`w-full  ${
            screenWidth < 930 && screenWidth >= 450
              ? "py-4"
              : screenWidth < 450
              ? "px-4 py-4 h-3/5"
              : "h-1/6"
          }`}
        >
          <Card
            color="transparent"
            shadow={true}
            className={` bg-white  my-1 py-1 mx-auto px-4 ${
              screenWidth < 850 && screenWidth >= 450
                ? "w-2/3 flex flex-col justify-center items-center gap-4"
                : screenWidth < 450
                ? "w-full flex flex-col justify-center items-center gap-4"
                : " w-2/3 flex flex-row justify-center items-center py-4"
            }`}
          >
            <div
              className={`h-full ${screenWidth < 850 ? "w-full " : "w-1/6 "}`}
            >
              <div
                className={`flex flex-row gap-4 px-2 items-center justify-center`}
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
              className={` h-full flex flex-col gap-2 ${
                screenWidth < 850
                  ? "w-full justify-center items-center"
                  : "w-5/6 "
              }`}
            >
              <div
                className={`flex w-full h-1/3   items-center ${
                  screenWidth < 850 && screenWidth >= 450
                    ? "w-full justify-center flex-row gap-2"
                    : screenWidth < 450
                    ? "flex-col gap-0"
                    : "flex-row gap-2"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray">
                    Inbasekar
                  </Typography>
                </div>
                <hr
                  className={` ${
                    screenWidth < 460 ? "w-0 h-0" : "w-1 h-7 bg-black"
                  }`}
                />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-start"
                >
                  Orthopedic Surgeon
                </Typography>
              </div>
              <div
                className={`w-full h-2/3   ${
                  screenWidth < 850 ? "w-full text-justify" : "text-start"
                }`}
              >
                Skilled orthopedic surgeon dedicated to restoring mobility and
                improving quality of life through expert diagnosis, surgical
                precision, and compassionate care.
              </div>
            </div>
          </Card>
        </div>

        <div
          className={`w-full h-5/6   px-4 ${
            screenWidth < 1300
              ? "flex flex-col gap-2 py-2 justify-center"
              : "flex flex-row gap-2 py-2 justify-center"
          }`}
        >
          {selectedExercises.length > 0 ? (
            <div
              className={` h-full   gap-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-blue-400 scrollbar-track-transparent scroll-smooth ${
                screenWidth < 1300
                  ? "flex flex-col w-full px-4"
                  : "w-2/3 flex flex-col"
              }`}
            >
              {selectedExercises.map((item, index) => {
                // Extracting filename without path and extension
                const fileName = item.split("/").pop().split(".")[0];
                console.log(item)
                return (
                  <Card
                    color="transparent"
                    shadow={true}
                    className={`w-full bg-white  ${
                      screenWidth < 1080
                        ? "flex flex-col justify-center items-center py-4 px-4"
                        : "flex flex-row justify-between items-center my-1 py-1"
                    }`}
                    key={index}
                  >
                    <div
                      className={` ${screenWidth < 1000 ? "w-3/5" : "w-1/6"}`}
                    >
                      <div className={`flex flex-col px-2 py-1 items-center`}>
                        <div
                          className={`w-full h-full flex items-center justify-center`}
                        >
                          <img
                            src={item}
                            alt=""
                            className={` ${
                              screenWidth < 1000 ? "w-20 h-20" : "w-20 h-20"
                            }`}
                          />
                        </div>
                        <div className="flex w-full h-1/4 justify-center">
                          <Typography variant="h7" color="blue-gray">
                            {fileName}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`   ${
                        screenWidth < 1300 && screenWidth >= 1000
                          ? "flex flex-col items-center justify-center gap-4 py-4 w-5/6"
                          : screenWidth < 1000 && screenWidth >= 380
                          ? "flex flex-col items-center justify-center gap-4 py-4 w-3/4"
                          : screenWidth < 380
                          ? "flex flex-col items-center justify-center gap-4 py-4 w-full"
                          : " w-4/6 flex flex-row items-center gap-4"
                      }`}
                    >
                      <div
                        className={` h-full ${
                          screenWidth < 1000
                            ? "flex flex-col items-center justify-center gap-4 py-4 w-full"
                            : "w-1/3"
                        }`}
                      >
                        <div
                          className={`w-1/2 bg-blue-gray-700 rounded-lg mx-auto text-white py-1`}
                        >
                          Category
                        </div>
                      </div>
                      <div
                        className={` h-full bg-pink-400 flex flex-row rounded-lg items-center justify-center ${
                          screenWidth < 1000 ? "w-full" : "w-1/3"
                        }`}
                      >
                        <div
                          className={`w-1/6 h-full  flex justify-center items-center`}
                        >
                          <HeartIcon className={`w-5 h-5`} color="white" />
                        </div>
                        <div
                          className={`w-3/6   mx-auto text-white py-1 text-start`}
                        >
                          Rep Count
                        </div>
                        <div className={`w-2/6 h-ful`}>
                          <div className="w-full flex justify-center items-center gap-1">
                            <div className="flex flex-col items-center">
                              <input
                                type="number"
                                value={exerciseDetails[index]?.rep || 0}
                                onChange={(event) =>
                                  handleCountChange(event, index)
                                }
                                className=" text-black text-sm font-bold border rounded-md w-12 h-6 text-center"
                                placeholder="00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`h-full bg-blue-400 flex flex-row rounded-lg items-center ${
                          screenWidth < 1000 ? "w-full" : "w-1/3"
                        }`}
                      >
                        <div
                          className={`w-1/6 h-full  flex justify-center items-center`}
                        >
                          <ClockIcon className={`w-5 h-5`} color="white" />
                        </div>
                        <div
                          className={`w-3/6   mx-auto text-white py-1 text-start`}
                        >
                          Sets
                        </div>
                        <div className={`w-2/6 h-ful`}>
                          <div className="w-full flex justify-center items-center gap-1">
                            <div className="flex flex-col items-center">
                              <input
                                type="number"
                                value={exerciseDetails[index]?.set || 0}
                                onChange={(event) =>
                                  handleTimeChange(event, index)
                                }
                                className=" text-black text-sm font-bold border rounded-md w-12 h-6 text-center"
                                placeholder="00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`w-1/6 flex flex-row gap-8 justify-center`}>
                      <TrashIcon
                        color="black"
                        className={`w-7 h-7 cursor-pointer`}
                        onClick={() => handleRemoveExercise(item)}
                      />
                    </div>
                  </Card>
                );
              })}
              <div className={`w-full flex flex-row`}>
                <div className={`w-1/2`}>
                  <Button variant="outlined" className="rounded-full">
                    Edit
                  </Button>
                </div>
                <div className={`w-1/2`}>
                  <Button
                    variant="outlined"
                    className="rounded-full"
                    onClick={handleUpdateButton}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Typography variant="h4" color="blue-gray">
              No exercises selected - Go to Categories to select Exercises
            </Typography>
          )}

          {selectedExercises.length > 0 && display && (
            <div
              className={` h-full ${screenWidth < 1300 ? "w-full" : "w-1/3"}`}
            >
              <div
                className={`w-full h-full  flex flex-col justify-center ${
                  screenWidth < 470 ? "px-2" : "px-8"
                }`}
              >
                <Card
                  color="transparent"
                  shadow={true}
                  className="w-full bg-white flex flex-row justify-between items-start"
                >
                  <div
                    className={`w-full  ${
                      screenWidth < 470 ? "h-3/5" : "h-5/6"
                    }`}
                  >
                    <div className={`flex flex-col items-start`}>
                      <div
                        className={`w-full ${
                          screenWidth < 470 ? "h-1/2" : "h-3/5"
                        } flex items-start justify-center`}
                      >
                        <Player
                          src={
                            demoexercise[
                              demoexer.indexOf(
                                selectedExercises[selectedDetailedExerciseIndex]
                              )
                            ]
                          }
                          className="player"
                          loop
                          autoplay
                          style={{
                            height:
                              screenWidth < 470
                                ? "300px"
                                : screenWidth < 360
                                ? "250px"
                                : "400px",
                            width:
                              screenWidth < 470 && screenWidth >= 360
                                ? "200px"
                                : screenWidth < 360
                                ? "150px"
                                : "300px",
                          }}
                        />
                      </div>
                      <div className="flex w-full h-20 justify-center">
                        <Typography variant="h4" color="blue-gray">
                          Exercise
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-left" />
    </div>
  );
};

export default Regimebuilder;
