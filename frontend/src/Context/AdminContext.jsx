import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  //-----------------menu------------------//
  const [isOpen, setIsOpen] = useState(true);

  //-----------------Employee Login------------------//

  const [input, setInput] = useState({ email: "", password: "" });
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setRole(localStorage.getItem("role") || "");
    setToken(localStorage.getItem("token") || "");
  }, []);

  const employeeLogin = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/login-employee";
      const res = await axios.post(url, input);
      console.log(res?.data);
      const { name, role, jwtToken } = res.data;

      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      localStorage.setItem("token", jwtToken);

      setName(name);
      setRole(role);
      setToken(jwtToken);

      setInput({ email: "", password: "" });

      toast.success(res.data.message || "login successfully");
    } catch (error) {
      //   console.log(error?.response?.data);
      toast.error(error?.response?.data?.message);
    }
  };

  //-----------------Employee Logout-----------------//

  const employeeLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setName("");
    setRole("");
    setToken("");
  };

  //------------fetch all employees------------//
  const [data, setData] = useState([]);
  const fetchEmployees = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/employees";
      const res = await axios.get(url, { headers: { Authorization: token } });
      const newData = res?.data?.employeeRes.filter((p) => p.role !== "admin");
      setData(newData);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    if (token && role === "admin") {
      fetchEmployees();
    }
  }, [token]);

  //-----------------attendance by date------------------//
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [attendance, setAttendance] = useState([]);
  const fetchAttendanceByDate = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/attendanceby-date";
      const res = await axios.get(url, {
        params: { date },
        headers: { Authorization: token },
      });
      setAttendance(res?.data?.attendanceRes);
    } catch (error) {
      console.log(error?.response?.data);
      setDate(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
      });
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    if (token && role === "admin") {
      fetchAttendanceByDate();
    }
  }, [token, date]);

  //----------------update attendance-----------------//
  const updateAttendance = async (id, status) => {
    try {
      const url = `https://employee-ms-backend-2dci.onrender.com/ems/update-attendance/${id}`;
      const res = await axios.put(
        url,
        { status },
        { headers: { Authorization: token } },
      );
      toast.success(res?.data?.message);
      fetchAttendanceByDate();
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  //------------------fetch leaves------------------//

  const [leaveData, setLeaveData] = useState([]);

  const fetchLeaves = async () => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/leaves";
      const res = await axios.get(url, { headers: { Authorization: token } });
      setLeaveData(res?.data?.leaveRes);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  useEffect(() => {
    if (token && role === "admin") {
      fetchLeaves();
    }
  }, [token]);

  //-------------update leaves-------------//

  const updateLeaves = async (id, status) => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/update-leaves";
      const res = await axios.put(
        url,
        { status },
        {
          headers: { Authorization: token },
          params: { id },
        },
      );
      toast.success(res?.data?.message);
      fetchLeaves();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //---------------------Settings------------------------//
  const [singleEmployee, setSingleEmployee] = useState([]);

  const [query, setQuery] = useState("");
  const fetchSingleEmployee = async () => {
    try {
      const url = `https://employee-ms-backend-2dci.onrender.com/ems/search-employee/${query}`;
      const res = await axios.get(url, { headers: { Authorization: token } });
      setSingleEmployee(res?.data?.findEmployee);
      setQuery("");
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  const [empAppliedLeave, setEmpAppliedLeave] = useState([]);
  const [email, setEmail] = useState("");
  const appliedLeaveDetails = async (req, res) => {
    try {
      const url = "https://employee-ms-backend-2dci.onrender.com/ems/applied-leave-details";
      const res = await axios.get(url, {
        params: { email },
        headers: { Authorization: token },
      });
      setEmpAppliedLeave(res?.data?.findUserLeave);
      setEmail("");
      toast.success(res?.data?.message);
    } catch (error) {
      setEmail("");
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  const deleteLeaveRecord = async (id) => {
    try {
      const url = `https://employee-ms-backend-2dci.onrender.com/ems/delete-leaves/${id}`;
      const res = await axios.delete(url, {
        headers: { Authorization: token },
      });
      if (!window.confirm(`Are you sure to delete leave record.??`)) {
        toast.error("Deleting record cancelled");
        return;
      }
      setEmpAppliedLeave([]);
      fetchLeaves();
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const url = `https://employee-ms-backend-2dci.onrender.com/ems/delete-employee/${id}`;
      const res = await axios.delete(url, {
        headers: { Authorization: token },
      });
      if (!window.confirm(`Are you sure to delete employee record.??`)) {
        toast.error("Deleting record cancelled");
        return;
      }
      toast.success(res?.data?.message);
      setSingleEmployee([]);
      fetchEmployees();
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSingleEmployee([]);
      console.log(error?.response?.data);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        input,
        token,
        role,
        name,
        isOpen,
        data,
        attendance,
        leaveData,
        query,
        singleEmployee,
        empAppliedLeave,
        email,
        setEmail,
        setQuery,
        setIsOpen,
        setInput,
        setDate,
        employeeLogin,
        employeeLogout,
        updateAttendance,
        fetchAttendanceByDate,
        updateLeaves,
        fetchSingleEmployee,
        appliedLeaveDetails,
        deleteLeaveRecord,
        deleteEmployee,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAuth = () => useContext(AdminContext);
