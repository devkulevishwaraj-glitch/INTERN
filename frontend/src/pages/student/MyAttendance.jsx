import { useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getMyAttendance } from "../../services/attendanceService";

function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getMyAttendance();

      console.log("My Attendance:", res.data);

      setAttendance(res.data.data || []);
    } catch (error) {
      console.error("My Attendance Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // OVERALL ATTENDANCE
  // ==============================

  const presentCount = attendance.filter(
    (item) =>
      item.status?.toLowerCase() === "present"
  ).length;

  const absentCount = attendance.filter(
    (item) =>
      item.status?.toLowerCase() === "absent"
  ).length;

  const totalCount = presentCount + absentCount;

  const attendancePercentage =
    totalCount > 0
      ? Math.round((presentCount / totalCount) * 100)
      : 0;

  // ==============================
  // SUBJECT-WISE ATTENDANCE
  // ==============================

  const subjectData = {};

  attendance.forEach((item) => {
    const subjectName =
      item.subject?.subjectName ||
      item.subject?.name ||
      "Unknown Subject";

    if (!subjectData[subjectName]) {
      subjectData[subjectName] = {
        present: 0,
        absent: 0,
      };
    }

    if (
      item.status?.toLowerCase() === "present"
    ) {
      subjectData[subjectName].present++;
    }

    if (
      item.status?.toLowerCase() === "absent"
    ) {
      subjectData[subjectName].absent++;
    }
  });

  return (
    <DashboardLayout>

      <div className="my-attendance-page">

        {/* ================= HEADER ================= */}

        <div className="my-attendance-header">

          <div className="my-attendance-title">

            <div className="my-attendance-title-icon">
              <ClipboardCheck size={24} />
            </div>

            <div>
              <h1>My Attendance</h1>

              <p>
                View your complete attendance records.
              </p>
            </div>

          </div>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="my-attendance-error">
            {error}
          </div>
        )}

        {/* ================= STATISTICS ================= */}

        <div className="my-attendance-stats">

          {/* PRESENT */}

          <div className="my-attendance-stat-card">

            <div className="my-attendance-stat-icon present">
              <CheckCircle size={22} />
            </div>

            <div>
              <span>Present</span>

              <strong>
                {loading ? "..." : presentCount}
              </strong>
            </div>

          </div>

          {/* ABSENT */}

          <div className="my-attendance-stat-card">

            <div className="my-attendance-stat-icon absent">
              <XCircle size={22} />
            </div>

            <div>
              <span>Absent</span>

              <strong>
                {loading ? "..." : absentCount}
              </strong>
            </div>

          </div>

          {/* TOTAL */}

          <div className="my-attendance-stat-card">

            <div className="my-attendance-stat-icon total">
              <ClipboardCheck size={22} />
            </div>

            <div>
              <span>Total Classes</span>

              <strong>
                {loading ? "..." : totalCount}
              </strong>
            </div>

          </div>

          {/* PERCENTAGE */}

          <div className="my-attendance-stat-card">

            <div className="my-attendance-stat-icon percentage">
              <TrendingUp size={22} />
            </div>

            <div>
              <span>Attendance</span>

              <strong>
                {loading
                  ? "..."
                  : `${attendancePercentage}%`}
              </strong>
            </div>

          </div>

        </div>

        {/* ================= SUBJECT-WISE ================= */}

        <div className="my-attendance-card">

          <div className="my-attendance-card-header">

            <div>
              <h2>Subject-wise Attendance</h2>

              <p>
                Your attendance performance for each subject
              </p>
            </div>

            <div className="my-attendance-card-icon">
              <BookOpen size={21} />
            </div>

          </div>

          {loading ? (

            <div className="my-attendance-message">
              Loading attendance...
            </div>

          ) : Object.keys(subjectData).length === 0 ? (

            <div className="my-attendance-message">
              No attendance records found.
            </div>

          ) : (

            <div className="subject-attendance-list">

              {Object.entries(subjectData).map(
                ([subject, data]) => {

                  const total =
                    data.present + data.absent;

                  const percentage =
                    total > 0
                      ? Math.round(
                          (data.present / total) * 100
                        )
                      : 0;

                  return (
                    <div
                      className="subject-attendance-row"
                      key={subject}
                    >

                      <div className="subject-name">
                        <strong>{subject}</strong>
                      </div>

                      <div className="subject-count">

                        <span className="present-count">
                          {data.present} Present
                        </span>

                        <span className="absent-count">
                          {data.absent} Absent
                        </span>

                      </div>

                      <div className="subject-percentage">
                        {percentage}%
                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>

        {/* ================= ATTENDANCE HISTORY ================= */}

        <div className="my-attendance-card">

          <div className="my-attendance-card-header">

            <div>
              <h2>Attendance History</h2>

              <p>
                Your complete attendance history
              </p>
            </div>

            <div className="my-attendance-card-icon">
              <ClipboardCheck size={21} />
            </div>

          </div>

          {loading ? (

            <div className="my-attendance-message">
              Loading attendance...
            </div>

          ) : attendance.length === 0 ? (

            <div className="my-attendance-message">
              No attendance records found.
            </div>

          ) : (

            <div className="attendance-history-wrapper">

              <table className="attendance-history-table">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {[...attendance]
                    .sort(
                      (a, b) =>
                        new Date(b.date) -
                        new Date(a.date)
                    )
                    .map((item) => (

                      <tr key={item._id}>

                        <td>
                          {item.date
                            ? new Date(
                                item.date
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}
                        </td>

                        <td>
                          {item.subject?.subjectName ||
                            item.subject?.name ||
                            "Unknown Subject"}
                        </td>

                        <td>

                          <span
                            className={
                              item.status
                                ?.toLowerCase() ===
                              "present"
                                ? "status-present"
                                : "status-absent"
                            }
                          >
                            {item.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* ================= PAGE CSS ================= */}

      <style>{`

        .my-attendance-page {
          width: 100%;
          padding-bottom: 30px;
        }

        /* HEADER */

        .my-attendance-header {
          margin-bottom: 25px;
        }

        .my-attendance-title {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .my-attendance-title-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eef4ff;
          color: #4169e1;
        }

        .my-attendance-title h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }

        .my-attendance-title p {
          margin: 5px 0 0;
          color: #7b8494;
          font-size: 14px;
        }

        /* ERROR */

        .my-attendance-error {
          padding: 14px 16px;
          margin-bottom: 20px;
          border-radius: 10px;
          background: #fff0f0;
          color: #d93025;
          border: 1px solid #ffd5d5;
        }

        /* STATISTICS */

        .my-attendance-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }

        .my-attendance-stat-card {
          background: white;
          border: 1px solid #edf0f5;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.03);
        }

        .my-attendance-stat-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .my-attendance-stat-icon.present {
          background: #e9f9ef;
          color: #20a05a;
        }

        .my-attendance-stat-icon.absent {
          background: #fff0f0;
          color: #e14b4b;
        }

        .my-attendance-stat-icon.total {
          background: #f1edff;
          color: #7657d9;
        }

        .my-attendance-stat-icon.percentage {
          background: #eef4ff;
          color: #4169e1;
        }

        .my-attendance-stat-card span {
          display: block;
          color: #7b8494;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .my-attendance-stat-card strong {
          display: block;
          font-size: 25px;
          color: #202633;
        }

        /* CARDS */

        .my-attendance-card {
          background: white;
          border: 1px solid #edf0f5;
          border-radius: 15px;
          padding: 22px;
          margin-bottom: 22px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.03);
        }

        .my-attendance-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .my-attendance-card-header h2 {
          margin: 0;
          font-size: 19px;
          color: #202633;
        }

        .my-attendance-card-header p {
          margin: 5px 0 0;
          color: #8a92a1;
          font-size: 13px;
        }

        .my-attendance-card-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #eef4ff;
          color: #4169e1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* SUBJECT */

        .subject-attendance-list {
          display: flex;
          flex-direction: column;
        }

        .subject-attendance-row {
          display: grid;
          grid-template-columns: 1fr 1fr 100px;
          align-items: center;
          gap: 20px;
          padding: 17px 5px;
          border-bottom: 1px solid #f0f2f6;
        }

        .subject-attendance-row:last-child {
          border-bottom: none;
        }

        .subject-name strong {
          font-size: 15px;
          color: #303744;
        }

        .subject-count {
          display: flex;
          gap: 18px;
          font-size: 13px;
        }

        .present-count {
          color: #20a05a;
        }

        .absent-count {
          color: #e14b4b;
        }

        .subject-percentage {
          text-align: right;
          font-size: 17px;
          font-weight: 700;
          color: #4169e1;
        }

        /* TABLE */

        .attendance-history-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .attendance-history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .attendance-history-table th {
          text-align: left;
          padding: 13px 12px;
          background: #f7f8fb;
          color: #737c8c;
          font-size: 13px;
          font-weight: 600;
        }

        .attendance-history-table td {
          padding: 15px 12px;
          border-bottom: 1px solid #f0f2f6;
          color: #404754;
          font-size: 14px;
        }

        .attendance-history-table tbody tr:hover {
          background: #fafbfe;
        }

        /* STATUS */

        .status-present,
        .status-absent {
          display: inline-flex;
          align-items: center;
          padding: 6px 11px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-present {
          background: #e9f9ef;
          color: #20a05a;
        }

        .status-absent {
          background: #fff0f0;
          color: #e14b4b;
        }

        /* MESSAGE */

        .my-attendance-message {
          padding: 30px 10px;
          text-align: center;
          color: #8a92a1;
          font-size: 14px;
        }

        /* RESPONSIVE */

        @media (max-width: 1000px) {

          .my-attendance-stats {
            grid-template-columns: repeat(2, 1fr);
          }

        }

        @media (max-width: 650px) {

          .my-attendance-stats {
            grid-template-columns: 1fr;
          }

          .subject-attendance-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .subject-percentage {
            text-align: left;
          }

          .subject-count {
            gap: 15px;
          }

          .my-attendance-title h1 {
            font-size: 23px;
          }

          .my-attendance-card {
            padding: 16px;
          }

        }

      `}</style>

    </DashboardLayout>
  );
}

export default MyAttendance;