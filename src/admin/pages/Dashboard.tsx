import { KPICard } from "../components/dashboard/KPICard"
import { RevenueChart } from "../components/dashboard/RevenueChart"
import { AppointmentDonut } from "../components/dashboard/AppointmentDonut"
import { RecentAppointmentsTable } from "../components/dashboard/RecentAppointmentsTable"
import { Users, UserRoundCog, CalendarDays, Video, IndianRupee, AlertCircle } from "lucide-react"
import { getDoctors, getPatients, getAppointments } from "../../utils/storage"
import { useState, useEffect } from "react"

export function Dashboard() {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0, revenue: 0 });

  useEffect(() => {
    const docs = getDoctors();
    const pats = getPatients();
    const appts = getAppointments();
    
    // Calculate simulated revenue from completed appointments if we had it
    const rev = appts.length * 500; 

    setStats({
      doctors: docs.length,
      patients: pats.length,
      appointments: appts.length,
      revenue: rev
    });
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-charcoal">Dashboard</h1>
          <p className="text-muted mt-1">
            Welcome back, Admin. Here's what's happening across Carevia today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="h-10 rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="h-10 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Total Patients"
          value={stats.patients.toString()}
          change="+12.4%"
          isPositive={true}
          icon={Users}
        />
        <KPICard
          title="Total Providers"
          value={stats.doctors.toString()}
          change="+8.6%"
          isPositive={true}
          icon={UserRoundCog}
        />
        <KPICard
          title="Appointments"
          value="3,842"
          change="+14.2%"
          isPositive={true}
          icon={CalendarDays}
        />
        <KPICard
          title="Consultations"
          value="2,196"
          change="+10.8%"
          isPositive={true}
          icon={Video}
        />
        <KPICard
          title="Revenue"
          value="₹18.6L"
          change="+16.5%"
          isPositive={true}
          icon={IndianRupee}
        />
        <KPICard
          title="Pending Approvals"
          value="48"
          change="-2.4%"
          isPositive={false}
          icon={AlertCircle}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <RevenueChart />
        <AppointmentDonut />
      </div>

      <RecentAppointmentsTable />
    </div>
  )
}
