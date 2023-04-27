import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import HtmlHead from "components/html-head/HtmlHead";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import VibrationOutlinedIcon from "@mui/icons-material/VibrationOutlined";
import PhonelinkEraseOutlinedIcon from "@mui/icons-material/PhonelinkEraseOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { GoogleMap, Data, DrawingManager, useJsApiLoader, Circle, Polygon, Marker,MarkerClusterer } from "@react-google-maps/api";
// const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

import { SocketIo, DEFAULT_USER } from "config";
import RealTimeNotification from "../../@mock-api/data/notifications";
const containerStyle = {
  width: "100wv",
  height: "33rem",
};
const center = {
  lat: 28.6139,
  lng: 77.209,
};
let lib = ["places", "geometry", "visualization", "drawing"];

const Dashboard = () => {

  const title = "Dashboard";
  const description = "Ecommerce Dashboard Page";
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDvqub0gVMyj_O-pMmLRkQQKP_UsCMKFXQ",
    libraries: lib,
  });
  const [coords, setCoords] = React.useState([]);
  const [map, setMap] = React.useState(null);

  const [markers, setMarker] = React.useState([])
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);


  const [isConnected, setIsConnected] = React.useState(SocketIo.connected);
  const [deviceCount, setDeviceCount] = React.useState("");
  const [deviceList, setDeviceList] = React.useState([]);

  React.useEffect(() => {
    setDeviceCount("");
    setDeviceList([]);
  
    //if (isConnected) {
    console.log(sessionStorage.getItem("user_id"))
    SocketIo.emit('ondashboard', ({ userId: DEFAULT_USER.id == null ? sessionStorage.getItem("user_id") : DEFAULT_USER.id == null ? sessionStorage.getItem("user_id") : DEFAULT_USER.id == null ? sessionStorage.getItem("user_id") : DEFAULT_USER.id }));
    SocketIo.on('dashboardData', (result) => {
    //  console.log(result);
      //if (result.length !== 0) {
      setDeviceCount(result.data[0]);
      setDeviceList(result.deviceList)
      // } else {
      //   setDeviceCount("");
      //   setDeviceList([])

      // }
  
    
    });
    // }
    return () => {
      SocketIo.off('ondashboard');
      SocketIo.off('dashboardData');
      setDeviceCount("");
      setDeviceList([])

    };
  }, []);




  return isLoaded ? (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      
      <div className="page-title-container">
        <NavLink
          className="muted-link pb-1 d-inline-block hidden breadcrumb-back"
          to="/"
        >
          <span className="align-middle text-small ms-1">&nbsp;</span>
        </NavLink>
        <h1 className="mb-0 pb-0  display-4" id="title" style={{ marginLeft: '0.5rem', fontWeight: '700', fontSize: '1.5rem', color: '#5ebce3', }}>Dashboard</h1></div>
      {/* Title End */}

      {/* Stats Here */}
      <Row className="mb-5 g-2">
        {/* Card One */}
        <Col xs="6" md="4" lg="4">
          <NavLink to="device-list">
            <Card className="h-100 hover-scale-up cursor-pointer">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                  <DesktopWindowsOutlinedIcon className="text-primary" />
                </div>
                <div
                  className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                  style={{ fontSize: "0.8rem" }}
                >
                  TOTAL DEVICES
                </div>
                <div
                  className="text-primary cta-4"
                  style={{ fontSize: "1.3rem" }}
                >
                  {deviceCount.totalDevice}
                </div>
              </Card.Body>
            </Card>
          </NavLink>
        </Col>

        {/* Card Two */}
        <Col xs="6" md="4" lg="4">
          <Card className="h-100 hover-scale-up">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <VibrationOutlinedIcon className="text-primary" />
              </div>
              <div
                className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                style={{ fontSize: "0.8rem" }}
              >
                ACTIVE DEVICES
              </div>
              <div
                className="text-primary cta-4"
                style={{ fontSize: "1.3rem" }}
              >
                {deviceCount.totalActive}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Three */}
        <Col xs="6" md="4" lg="4">
          <Card className="h-100 hover-scale-up">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <PhonelinkEraseOutlinedIcon className="text-primary" />
              </div>
              <div
                className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                style={{ fontSize: "0.8rem" }}
              >
                INACTIVE DEVICES
              </div>
              <div
                className="text-primary cta-4"
                style={{ fontSize: "1.3rem" }}
              >
                {deviceCount.totalDeactive}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Four */}
        <Col xs="6" md="4" lg="4">
          {/* <NavLink to="alert-history"> */}
          <Card className="h-100 hover-scale-up">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <NotificationsActiveOutlinedIcon className="text-primary" />
              </div>
              <div
                className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                style={{ fontSize: "0.8rem" }}
              >
                TODAY'S ALERTS
              </div>
              <div
                className="text-primary cta-4"
                style={{ fontSize: "1.3rem" }}
              >
                {deviceCount.todayAlert}
              </div>
            </Card.Body>
          </Card>
          {/* </NavLink> */}
        </Col>

        {/* Card Five */}
        <Col xs="6" md="4" lg="4">
          {/* <NavLink to="alert-history"> */}
          <Card className="h-100 hover-scale-up">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <Link to="/alert/active-alert" style={{ color: "#7c7c7c" }}>
                  <NotificationsActiveOutlinedIcon className="text-primary" />
                </Link>
              </div>
              <div
                className="mb-1 d-flex align-items-center text-alternate lh-1-25"
                style={{ fontSize: "0.8rem" }}
              >
                ACTIVE ALERTS
              </div>
              <div
                className="text-primary cta-4"
                style={{ fontSize: "1.3rem" }}
              >
                {deviceCount.acticeAlert}
              </div>
            </Card.Body>
          </Card>
          {/* </NavLink> */}
        </Col>
      </Row>
      {/* End Here */}


      {/* Google Map Code Start from here */}
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          mapTypeId="terrain"
        >


        <MarkerClusterer
           averageCenter
           enableRetinaIcons
           gridSize={60}
        >

           {(clusterer) => deviceList.map((data, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(data.latitude),
                  lng: parseFloat(data.longitude),
                }}
                clusterer={clusterer}
                draggable={true}
                zIndex={2}
              />
            ))}

         </MarkerClusterer>

        </GoogleMap>
        {/* Google Map Code End from here */}

      </div>
      {/* <RealTimeNotification></RealTimeNotification> */}
    </>
  ) : (
    <></>
  );
};

export default Dashboard;
