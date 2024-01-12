import { useState } from "react";
import ChatBot from "react-simple-chatbot";
import user from "../asset/user.svg";
import { ThemeProvider } from "styled-components";
import robot from "../asset/robot.svg";
export default function ChatContainer() {
  const chatBotConfig = {
    userAvatar: user,
    botAvatar: robot,
  };
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };
  const [userInfo, setUserInfo] = useState({
    name: "",
    attendance: [],
    lunch: "",
  });
  const steps = [
    {
      id: "1",
      message: "Welcome!, Please enter your name?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      validator: (value) => {
        if (/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(value)) {
          return true;
        } else {
          return "Please input alphabet characters only.";
        }
      },
      trigger: "3",
    },
    {
      id: "3",
      message: ({ previousValue, steps }) => {
        console.log("prev name", previousValue);
        setUserInfo((prevState) => ({
          ...prevState,
          name: previousValue,
        }));
        return "{previousValue}, How can I help you";
      },
      trigger: "menu",
      // end: true,
    },
    {
      id: "main-menu",
      options: [
        { value: "attendance", label: "Attendance", trigger: "6" },
        { value: "lunch", label: "Lunch preference", trigger: "8" },
        { value: "support", label: "HR Support", trigger: "hr-support" },
      ],
    },
    {
      id: "menu",
      options: [
        { value: "attendance", label: "Attendance", trigger: "6" },
        { value: "support", label: "HR Support", trigger: "hr-support" },
      ],
    },
    {
      id: "6",
      message: "Do you want ",
      trigger: "attendance-menu",
      // end: true,
    },

    {
      id: "attendance-menu",
      options: [
        { value: "signin", label: "Signing in", trigger: "working-model" },
        { value: "signout", label: "Signing out", trigger: "7" },
      ],
    },
    {
      id: "working-model",
      options: [
        { value: "wfh", label: "Work From Home", trigger: "7" },
        { value: "wfo", label: "Coming to office", trigger: "7" },
      ],
    },
    {
      id: "7",
      message: ({ previousValue, steps }) => {
        const date = new Date();
        const signin = {
          time: date.toLocaleString(),
          model:
            previousValue === "wfh" ? "work from home" : "work from office",
        };
        console.log("signin", signin);
        setUserInfo((prevState) => ({
          ...prevState,
          attendance: [signin, ...prevState.attendance],
        }));
        return "Your entry is marked";
      },
      trigger: ({ value, steps }) => {
        console.log("value", value);
        console.log("steps", steps);
        return steps["working-model"].value === "wfh" ? "menu" : "8";
      },
      // end: true,
    },
    {
      id: "8",
      message: "Please choose your lunch preference",
      trigger: "lunch-menu",
      // end: true,
    },
    {
      id: "lunch-menu",
      options: [
        { value: "vegitable", label: "Vegitable", trigger: "lunch-menu-size" },
        { value: "chicken", label: "Chicken", trigger: "lunch-menu-size" },
        { value: "egg", label: "Egg", trigger: "lunch-menu-size" },
        { value: "fish", label: "Fish", trigger: "lunch-menu-size" },
        { value: "na", label: "No need", trigger: "9" },
      ],
    },
    {
      id: "lunch-menu-size",
      options: [
        { value: "small", label: "Small", trigger: "9" },
        { value: "medium", label: "Medium", trigger: "9" },
        { value: "large", label: "Large", trigger: "9" },
      ],
    },
    {
      id: "9",
      message: ({ previousValue, steps }) => {
        console.log("dteps", steps);
        const meal = steps["lunch-menu"].value;
        let lunch;
        if (meal === "na") {
          lunch = {
            meal: "",
            size: "",
          };
        } else {
          lunch = {
            meal: meal,
            size: steps["lunch-menu-size"].value,
          };
        }
        setUserInfo((prevState) => ({
          ...prevState,
          lunch: lunch,
        }));
        return "Your lunch is marked";
      },
      trigger: "main-menu",
      // end: true,
    },
    {
      id: "hr-support",
      message: "Please enter your query",
      trigger: "10",
    },
    {
      id: "10",
      user: true,
      trigger: "11",
    },
    {
      id: "11",
      message: "Please enter your email",
      trigger: "12",
    },
    {
      id: "12",
      user: true,
      trigger: "13",
    },
    {
      id: "13",
      message: ({ previousValue, steps }) => {
        alert(previousValue);
        return "Your email is sent to HR department";
      },
      trigger: "close",
    },
    {
      id: "close",
      message: "Thank you",
      end: true,
    },
    // We will add step 4 and 5 later  ]
  ];

  console.log(userInfo);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} {...chatBotConfig} />
      </ThemeProvider>
    </div>
  );
}
