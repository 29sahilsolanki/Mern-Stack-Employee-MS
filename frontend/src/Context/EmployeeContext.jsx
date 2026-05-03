import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AdminContext";
import { toast } from "react-toastify";
const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const { token } = useAuth();

  //---------------------employee details-----------------//
  const [employee, setEmployee] = useState("");
  const employeeDetails = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/employee-details";
      const res = await axios.get(url, { headers: { Authorization: token } });
      setEmployee(res?.data?.employeeRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token) {
      employeeDetails();
    }
  }, [token]);

  //-------------------employee attendance--------------------//
  const [attendance, setAttendance] = useState([]);
  const employeeAttendance = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/employee-attendance";
      const res = await axios.get(url, { headers: { Authorization: token } });
      setAttendance(res?.data?.attendanceRes);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (token) {
      employeeAttendance();
    }
  }, [token]);

  //--------------------mark employee attendance---------------------//
  const insertAttendance = async (status) => {
    try {
      if (!window.confirm(`Are you sure to apply leave.??`)) {
        toast.error("Attendance Marking cancelled");
        return;
      }
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/insert-attendance";
      const res = await axios.post(
        url,
        { status },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      await employeeAttendance();
      console.log(res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  //----------------fetch attendance by date-----------------//
  const [date, setDate] = useState("");
  const [attByDate, setAttByDate] = useState([]);
  const attendanceByDate = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/attendancebydate";
      const res = await axios.get(url, {
        params: { date },
        headers: { Authorization: token },
      });
      toast.success(res?.data?.message);
      setAttByDate(res?.data?.findRes);
      // console.log(res?.data);
    } catch (error) {
      setAttByDate([]);
      toast.error(error?.response?.data?.message);
      // console.log(error?.response?.data);
    }
  };

  //------------------emp-leave-details-----------------//
  const [leave, setLeave] = useState([]);
  const empLeaveDetails = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/empleave-details";
      const res = await axios.get(url, { headers: { Authorization: token } });
      setLeave(res?.data?.leaveRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    if (token) {
      empLeaveDetails();
    }
  }, [token]);

  //----------------apply employee leave------------------//
  const [leaveDate, setLeaveDate] = useState({ from: "", to: "", reason: "" });
  const insertEmpLeave = async () => {
    try {
      const startDate = leaveDate.from;
      const endDate = leaveDate.to;
      const reason = leaveDate.reason;

      if (!window.confirm(`Are you sure to apply leave.??`)) {
        toast.error("Leave application cancelled");
        return;
      }

      const url = "https://employee-ms-backend-2dci.onrender.com/ems/apply-leaves";
      const res = await axios.post(
        url,
        { startDate, endDate, reason },
        { headers: { Authorization: token } },
      );
      setLeaveDate({ from: "", to: "", reason: "" });
      toast.success(res?.data?.message);
      empLeaveDetails();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employee,
        attendance,
        attByDate,
        leave,
        leaveDate,
        setDate,
        setLeaveDate,
        insertAttendance,
        attendanceByDate,
        empLeaveDetails,
        insertEmpLeave,
        employeeDetails,
        employeeAttendance,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
