import "./App.css";
import React, { useEffect, useState } from "react";

import * as Sentry from "@sentry/react";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RetypePassword from "./pages/RetypePassword";
import ForgotPwd from "./pages/ForgotPwd";
import Inside from "./pages/Inside";
import PrivateRoute from "./authentication/PrivateRoute";
import PublicRoute from "./authentication/PublicRoute";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import CreateProject from "./PrivatePages/CreateProject/CreateProject";
import QuestionnaireNew from "./PrivatePages/setupProject/QuestionnaireNew";
import QuestionnaireExisting from "./PrivatePages/setupProject/QuestionnaireExisting";
import UploadTb from "./PrivatePages/setupProject/UploadTb";
import DataMapping from "./PrivatePages/setupProject/mappingMode";
import Practice from "./PrivatePages/setupProject/Practice";
import Conventional from "./PrivatePages/Conventional/Conventional";
import Template from "./PrivatePages/template/Template";
import Preview from "./PrivatePages/classificationPreview/Preview";
import PreviewPage from "./PrivatePages/classificationPreview/PreviewPage";
import FinancialStatement from "./PrivatePages/consolidatedFinancialStatement/FinancialStatement";
import Adjustments from "./PrivatePages/adjustments/Adjustments";
import AdjustmentsDeleted from "./PrivatePages/adjustments/AdjustmentsDeleted";
import AdjustmentsLog from "./PrivatePages/adjustments/AdjustmentsLog";
import Dashboard from "./PrivatePages/dashboard/Dashboard";
import CreateFs from "./PrivatePages/createFs/CreateFs";
import Presets from "./PrivatePages/Presets/Presets";
import ProfileChange from "./PrivatePages/ProfileChange/ProfileChange";
import Folder from "./PrivatePages/folders/Folder";
import AddFiles from "./PrivatePages/folders/AddFiles";
import ThankYou from "./PrivatePages/ThankYou";
import InvestmentRegister from "./../src/Console/Component/InvestmentRegister";
import CreateInvestment from "./../src/Console/Component/createInvestment";
import AddInvestment from "./../src/Console/Component/AddInvestment";
import EditRegister from "./../src/Console/Component/EditRegister";
import AdditionRegister from "./../src/Console/Component/AdditionRegister";
import AdditionPresetMode from "./../src/Console/Component/AdditionPresetMode";
import SignUpV2 from "./../src/WorkSpace/SignUpV2"
// import FileFormat from './Components/fileFormat/FileFormat'
import axios from "axios";
import { socket } from "./services/socket/socket";

import {
  ThemeContext,
  ViewContext,
  AccessProjectContext,
} from "./helper/DarkModeContext";

// axios.defaults.baseURL = "http://myfinalystapi.icodexa.com/";
axios.defaults.baseURL = "http://localhost:8081/";
// axios.defaults.baseURL = "http://myfinalystapi.icodexa.com/";
// axios.defaults.baseURL = 'http://localhost:3000/'

function App() {
  const project_id = localStorage.getItem("project_id");

  const auth = localStorage.getItem("auth_token");

  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };
  React.useEffect(() => {
    socket.on("error", (data) => {
      console.log("{USER LOGGED IN 1}", data);
    });

    socket.on("on-auto-save", (data) => {
      //To trigger in the Fetch API (Conventional Model)
      console.log("{User Logged IN 1}", data);
    });

    socket.on("message", (data) => {
      console.log("{USER LOGGED IN 1}", data);
    });

    fetchAccessProject();

    clearCache();
  }, []);

  const clearCache = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };

  const fetchAccessProject = () => {
    console.log(project_id);
    axios.get(`api/v1/auth/get-profile`, { headers }).then((response) => {
      if (response.status === 200) {
        const filtredAccessProjects =
          response.data.user.data.access_projects.filter((project) => {
            return project.project_id === project_id;
          });

        console.log(filtredAccessProjects);

        if (filtredAccessProjects.length > 0) {
          setAccess(filtredAccessProjects[0]);
        } else {
          setAccess({ access: "All", project_id: "" });
        }
        // console.log(response.data.user.data);
      }
    });
  };

  const [theme, setTheme] = useState(true);

  const [directoryView, setDirectoryView] = useState("list");

  const [access, setAccess] = useState({ access: "All", project_id: "" });

  // useEffect(() => {
  //   switch (theme) {
  //     case themes.light:
  //       document.body.classList.add("white-content");
  //       break;
  //     case themes.dark:
  //     default:
  //       document.body.classList.remove("white-content");
  //       break;
  //   }
  // }, [theme]);

  return (
    <ViewContext.Provider value={{ directoryView, setDirectoryView }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <AccessProjectContext.Provider value={{ access, setAccess }}>
          <Router>
            <ScrollToTop />
            <Switch>
              {/* <PublicRoute restricted= {true} path='/' exact component={SignUp}/> */}
              <PublicRoute
                restricted={true}
                path="/"
                exact
                component={SignIn}
              />
              <PublicRoute
                restricted={true}
                path="/signup"
                component={SignUp}
              />
              {/* new workspace */}
              <PublicRoute
                restricted={true}
                path="/signUpV2"
                component={SignUpV2}
              />
              <Route path="/thankyou/:uid" exact component={ThankYou} />

              <PublicRoute
                restricted={true}
                path="/retypepassword/:id"
                component={RetypePassword}
              />
              <PrivateRoute path="/logout" component={Inside} />
              <PrivateRoute
                exact
                path="/createproject"
                component={CreateProject}
              />
              <PrivateRoute
                exact
                path="/createproject/practice"
                component={Practice}
              />
              <PrivateRoute
                exact
                path="/createproject/questionnairenew"
                component={QuestionnaireNew}
              />
              <PrivateRoute
                exact
                path="/createproject/questionnaireexisting"
                component={QuestionnaireExisting}
              />
              <PrivateRoute
                exact
                path="/createproject/uploadtb"
                component={UploadTb}
              />
              <PrivateRoute
                exact
                path="/createproject/datamapping/:pid"
                component={DataMapping}
              />
              <PrivateRoute
                exact
                path="/conventional/:pid"
                component={Conventional}
              />
              <PrivateRoute exact path="/template/:pid" component={Template} />
              <PrivateRoute exact path="/preview" component={Preview} />
              <PrivateRoute exact path="/previewpage" component={PreviewPage} />
              <PrivateRoute
                exact
                path="/financialstatement"
                component={FinancialStatement}
              />
              <PrivateRoute exact path="/adjustments" component={Adjustments} />
              <PrivateRoute
                exact
                path="/deletedadjustments"
                component={AdjustmentsDeleted}
              />
              <PrivateRoute
                exact
                path="/adjustmentslog"
                component={AdjustmentsLog}
              />
              <PrivateRoute
                exact
                path="/createfinancialstatement"
                component={CreateFs}
              />
              {/* <PrivateRoute exact path="/folders" component={Folder} /> */}
              <PrivateRoute exact path="/folder/:fid" component={AddFiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/presets" component={Presets} />

              <PrivateRoute
                exact
                path="/profile-change"
                component={ProfileChange}
              />

              {/* console */}
              <PrivateRoute
                exact
                path="/investment-register"
                component={InvestmentRegister}
              />
              <PrivateRoute
                exact
                path="/create-investment/:cid"
                component={CreateInvestment}
              />
              <PrivateRoute
                exact
                path="/add-investment/:cid"
                component={AddInvestment}
              />
              <PrivateRoute
                exact
                path="/edit-register/:cid"
                component={EditRegister}
              />
              <PrivateRoute
                exact
                path="/addition-register/:rid"
                component={AdditionRegister}
              />
              <PrivateRoute
                exact
                path="/addition-preset-mode/:id"
                component={AdditionPresetMode}
              />
              <PublicRoute path="*" component={() => "404 NOT FOUND"} />

              
            </Switch>
          </Router>
        </AccessProjectContext.Provider>
      </ThemeContext.Provider>
    </ViewContext.Provider>
  );
}

// export default Sentry.withProfiler(App);
export default App;
