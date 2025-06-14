import { useState } from "react";
import Home from "./Home";
import NavBar from "./NavBar";
import LoginForm from "./LoginForm";
import RegistrationForm from "./Registrationform";
import AddDoctorForm from "./AddDoctorForm";
import AddDoctorSchedule from "./AddDoctorSchedule";
import DoctorsList from "./DoctorsList";
import DoctorAppointments from "./DoctorAppointments";
import AdminAppointments from "./AdminAppointments";
import UserBookings from "./UserBookings";

const Main = () => {
  let [page, setPage] = useState("home");
  let [user, setUser] = useState(null);
  let currentPage;

  if (page === "home") currentPage = <Home />;
  else if (page === "login")
    currentPage = <LoginForm navigate={setPage} setUser={setUser} />;
  else if (page === "register")
    currentPage = <RegistrationForm setUser={setUser} />;
  else if (page === "add-doctor") currentPage = <AddDoctorForm />;
  else if (page === "add-schedule")
    currentPage = <AddDoctorSchedule user={user} />;
  else if (page === "doctors") currentPage = <DoctorsList user={user} />;
  else if (page === "appointments")
    currentPage = <DoctorAppointments user={user} />;
  else if (page === "admin-appointments")
    currentPage = <AdminAppointments user={user} />;
  else if (page === "user-bookings") currentPage = <UserBookings user={user} />;

  return (
    <div>
      <NavBar navigate={setPage} user={user} setUser={setUser} />
      {currentPage}
    </div>
  );
};
export default Main;
