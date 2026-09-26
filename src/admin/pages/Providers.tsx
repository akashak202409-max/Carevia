import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table"
import { Search, Filter, Download, Plus, MoreHorizontal, Users, UserCheck, AlertTriangle, ShieldCheck, Ban, Check, X } from "lucide-react"
import { getDoctors, saveDoctors } from "../../utils/storage"
import { useState, useEffect } from "react"

export function Providers() {
  const [providersList, setProvidersList] = useState([]);
  
  useEffect(() => {
    loadDoctors();
  }, []);
  
  const loadDoctors = () => {
    const docs = getDoctors();
    setProvidersList(docs);
  };
  
  const handleApprove = (id) => {
    const docs = getDoctors();
    const updated = docs.map(d => d.id === id ? { ...d, status: 'ACTIVE' } : d);
    saveDoctors(updated);
    loadDoctors();
  };
  
  const handleReject = (id) => {
    const docs = getDoctors();
    const updated = docs.map(d => d.id === id ? { ...d, status: 'REJECTED' } : d);
    saveDoctors(updated);
    loadDoctors();
  };
  
  const totalProviders = providersList.length;
  const activeProviders = providersList.filter(p => p.status === 'ACTIVE' || !p.status).length;
  const pendingProviders = providersList.filter(p => p.status === 'PENDING').length;
  const rejectedProviders = providersList.filter(p => p.status === 'REJECTED').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-muted mb-2">
        <span className="hover:text-charcoal transition-colors cursor-pointer">Management</span>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">Doctors & Providers</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-charcoal">Doctors & Providers</h1>
          <p className="text-muted mt-1">Manage healthcare professionals and providers registered with Carevia.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Provider
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total Providers", value: totalProviders.toString(), desc: "Registered professionals", icon: Users, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Active Providers", value: activeProviders.toString(), desc: "+8.6% this month", icon: UserCheck, color: "text-success", bg: "bg-green-50" },
          { label: "Pending Verification", value: pendingProviders.toString(), desc: "Requires admin review", icon: AlertTriangle, color: "text-warning", bg: "bg-amber-50" },
          { label: "Verified Providers", value: activeProviders.toString(), desc: "84.4% of providers", icon: ShieldCheck, color: "text-success", bg: "bg-green-50" },
          { label: "Rejected", value: rejectedProviders.toString(), desc: "Currently inactive", icon: Ban, color: "text-error", bg: "bg-red-50" }
        ].map(stat => (
          <div key={stat.label} className="bg-surface border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div className={`h-10 w-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.color}`}>
                 <stat.icon className="h-5 w-5" />
               </div>
            </div>
            <p className="text-sm font-medium text-muted mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-charcoal">{stat.value}</p>
            <p className="text-xs text-muted mt-2">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-surface p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full lg:w-[420px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input 
            type="text" 
            placeholder="Search doctor, provider name, ID or phone..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <select className="h-10 rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 whitespace-nowrap">
            <option>Specialization</option>
          </select>
          <select className="h-10 rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 whitespace-nowrap">
            <option>Provider Type</option>
          </select>
          <select className="h-10 rounded-lg border border-slate-200 bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 whitespace-nowrap">
            <option>Verification Status</option>
          </select>
          <Button variant="outline" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-slate-200 shadow-sm">
         <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-white rounded-t-2xl">
            <div>
               <h3 className="font-bold text-charcoal text-lg">All Providers</h3>
               <p className="text-sm text-muted">1,284 providers</p>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm">Columns</Button>
            </div>
         </div>
         <Table className="border-0 rounded-none shadow-none">
            <TableHeader className="bg-slate-50">
            <TableRow>
               <TableHead className="w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
               </TableHead>
               <TableHead>Provider</TableHead>
               <TableHead>Provider ID</TableHead>
               <TableHead>Profession</TableHead>
               <TableHead>Specialization</TableHead>
               <TableHead>Experience</TableHead>
               <TableHead>Location</TableHead>
               <TableHead>Rating</TableHead>
               <TableHead>Verification</TableHead>
               <TableHead>Status</TableHead>
               <TableHead className="text-right">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {providersList.map(provider => (
               <TableRow key={provider.id}>
                  <TableCell className="text-center">
                     <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-3">
                        <img src={provider.img || 'https://via.placeholder.com/40'} alt="" className="h-10 w-10 rounded-full object-cover" />
                        <span className="font-medium text-charcoal">{provider.name}</span>
                     </div>
                  </TableCell>
                  <TableCell className="text-muted text-sm">DOC-{provider.id.toString().slice(-4)}</TableCell>
                  <TableCell className="text-sm">{provider.isDoctor ? 'Doctor' : 'Care Professional'}</TableCell>
                  <TableCell className="text-sm">{provider.spec}</TableCell>
                  <TableCell className="text-sm">{provider.exp}</TableCell>
                  <TableCell className="text-sm">{provider.loc}</TableCell>
                  <TableCell className="text-sm font-medium">★ {provider.rating}</TableCell>
                  <TableCell>
                     {provider.status === "PENDING" ? (
                     <Badge variant="warning" className="bg-amber-100 text-amber-700">Pending</Badge>
                     ) : provider.status === "REJECTED" ? (
                     <Badge variant="default" className="bg-red-100 text-red-700">Rejected</Badge>
                     ) : (
                     <Badge variant="success" className="bg-green-100 text-green-700">Verified</Badge>
                     )}
                  </TableCell>
                  <TableCell>
                     {provider.status === "ACTIVE" || !provider.status ? (
                     <Badge variant="success">Active</Badge>
                     ) : (
                     <Badge variant="default">Inactive</Badge>
                     )}
                  </TableCell>
                  <TableCell className="text-right">
                     {provider.status === 'PENDING' ? (
                       <div className="flex items-center justify-end gap-2">
                         <button onClick={() => handleApprove(provider.id)} className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition" title="Approve">
                           <Check className="w-4 h-4" />
                         </button>
                         <button onClick={() => handleReject(provider.id)} className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition" title="Reject">
                           <X className="w-4 h-4" />
                         </button>
                       </div>
                     ) : (
                     <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/providers/${provider.id}`}>
                           <MoreHorizontal className="h-4 w-4" />
                        </Link>
                     </Button>
                     )}
                  </TableCell>
               </TableRow>
            ))}
            </TableBody>
         </Table>
         <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-white rounded-b-2xl">
            <span className="text-sm text-muted">Showing 1–10 of 1,284 providers</span>
            <div className="flex gap-1">
               <Button variant="outline" size="sm" className="px-2 text-muted">Previous</Button>
               <Button variant="outline" size="sm" className="px-3 bg-brand-50 text-brand-600 border-brand-200">1</Button>
               <Button variant="outline" size="sm" className="px-3 text-muted">2</Button>
               <Button variant="outline" size="sm" className="px-3 text-muted">3</Button>
               <Button variant="outline" size="sm" className="px-2 text-muted">Next</Button>
            </div>
         </div>
      </div>
    </div>
  )
}
