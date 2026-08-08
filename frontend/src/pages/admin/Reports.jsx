import { useEffect, useState } from "react";
import {
  FileText,
  Search,
  CalendarDays,
  Users,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { getAttendance } from "../../services/attendanceService";
import { getStudents } from "../../services/studentService";
import { getSubjects } from "../../services/subjectService";

function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [attendanceRes, studentsRes, subjectsRes] =
        await Promise.all([
          getAttendance(),
          getStudents(),
          getSubjects(),
        ]);

      setAttendance(attendanceRes.data.data || []);
      setStudents(studentsRes.data.data || []);
      setSubjects(subjectsRes.data.data || []);
    } catch (error) {
      console.log("Reports Error:", error);
    }
  };

  const filteredAttendance = attendance.filter((record) => {
    const studentName = record.student?.name || "";
    const subjectName = record.subject?.subjectName || "";
    const subjectCode = record.subject?.subjectCode || "";
    const status = record.status || "";

    const searchText = search.toLowerCase();

    const matchesSearch =
      studentName.toLowerCase().includes(searchText) ||
      subjectName.toLowerCase().includes(searchText) ||
      subjectCode.toLowerCase().includes(searchText) ||
      status.toLowerCase().includes(searchText);

    const recordDate = record.date
      ? new Date(record.date).toISOString().split("T")[0]
      : "";

    const matchesDate =
      selectedDate === "" || recordDate === selectedDate;

    return matchesSearch && matchesDate;
  });

  const totalRecords = filteredAttendance.length;

  const presentCount = filteredAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = filteredAttendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const attendancePercentage =
    totalRecords === 0
      ? 0
      : ((presentCount / totalRecords) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="reports-page">

        {/* PAGE HEADER */}

        <div className="reports-page-header">

          <div className="reports-title-row">

            <div className="reports-title-icon">
              <FileText size={24} />
            </div>

            <div>
              <h1>Reports</h1>

              <p>
                View and analyze attendance reports.
              </p>
            </div>

          </div>

        </div>

        {/* SUMMARY CARDS */}

        <div className="reports-summary">

          <div className="report-summary-card">

            <div className="report-summary-icon blue">
              <Users size={21} />
            </div>

            <div>
              <span>Total Students</span>
              <strong>{students.length}</strong>
            </div>

          </div>

          <div className="report-summary-card">

            <div className="report-summary-icon purple">
              <BarChart3 size={21} />
            </div>

            <div>
              <span>Total Subjects</span>
              <strong>{subjects.length}</strong>
            </div>

          </div>

          <div className="report-summary-card">

            <div className="report-summary-icon green">
              <CheckCircle size={21} />
            </div>

            <div>
              <span>Present</span>
              <strong>{presentCount}</strong>
            </div>

          </div>

          <div className="report-summary-card">

            <div className="report-summary-icon red">
              <XCircle size={21} />
            </div>

            <div>
              <span>Absent</span>
              <strong>{absentCount}</strong>
            </div>

          </div>

          <div className="report-summary-card">

            <div className="report-summary-icon orange">
              <BarChart3 size={21} />
            </div>

            <div>
              <span>Attendance</span>
              <strong>{attendancePercentage}%</strong>
            </div>

          </div>

        </div>

        {/* FILTERS */}

        <div className="reports-filter-card">

          <div className="reports-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search student, subject or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="reports-date-filter">

            <CalendarDays size={17} />

            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(e.target.value)
              }
            />

          </div>

          {selectedDate && (
            <button
              className="reports-clear-button"
              onClick={() => setSelectedDate("")}
            >
              Clear Date
            </button>
          )}

        </div>

        {/* REPORT TABLE */}

        <div className="reports-table-card">

          <div className="reports-table-header">

            <div>
              <h2>Attendance Report</h2>

              <p>
                {filteredAttendance.length} record
                {filteredAttendance.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

          </div>

          <div className="reports-table-wrapper">

            <table className="reports-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record) => (

                    <tr key={record._id}>

                      <td>

                        <div className="report-student-cell">

                          <div className="report-student-avatar">
                            {record.student?.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <strong>
                            {record.student?.name ||
                              "Unknown Student"}
                          </strong>

                        </div>

                      </td>

                      <td>
                        <span className="report-roll-badge">
                          {record.student?.rollNo || "-"}
                        </span>
                      </td>

                      <td>

                        <div className="report-subject-cell">

                          <strong>
                            {record.subject?.subjectName ||
                              "Unknown Subject"}
                          </strong>

                          <span>
                            {record.subject?.subjectCode || ""}
                          </span>

                        </div>

                      </td>

                      <td>

                        <div className="report-date-cell">

                          <CalendarDays size={14} />

                          {record.date
                            ? new Date(
                                record.date
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}

                        </div>

                      </td>

                      <td>

                        {record.status === "Present" ? (

                          <span className="report-status present">
                            <CheckCircle size={14} />
                            Present
                          </span>

                        ) : (

                          <span className="report-status absent">
                            <XCircle size={14} />
                            Absent
                          </span>

                        )}

                      </td>

                    </tr>

                  ))
                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="reports-empty"
                    >

                      <FileText size={38} />

                      <strong>
                        No attendance records found
                      </strong>

                      <span>
                        Try changing your search or date filter.
                      </span>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Reports;