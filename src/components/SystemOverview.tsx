import { motion } from "framer-motion";
import { Activity, ShieldCheck, Box, Server, CheckCircle2 } from "lucide-react";

const SystemOverview = () => {
  const metaModules = [
    { name: "Plant Disease Detection", status: "Operational", acc: "98.2%", type: "Computer Vision" },
    { name: "Smart Agriculture IoT", status: "Active", acc: "96.4%", type: "Edge Computing" },
    { name: "Heart Disease Prediction", status: "Stable", acc: "94.8%", type: "Neural Networks" },
    { name: "Real-time Traffic AI", status: "Testing", acc: "91.5%", type: "Data Stream" }
  ];

  return (
    <section id="overview" className="scroll-mt-24 mb-20 animate-fadeUp">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-10 bg-[#1e293b]" />
        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">System_Metrics_Overview</h2>
        <div className="h-px flex-1 bg-[#1e293b]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         {[
           { label: "Deployment Nodes", val: "12", icon: <Server size={18} />, color: "text-blue-500" },
           { label: "Accuracy Average", val: "95.2%", icon: <CheckCircle2 size={18} />, color: "text-green-500" },
           { label: "Data Streams", val: "4.8GB/d", icon: <Activity size={18} />, color: "text-red-500" },
           { label: "Active Systems", val: "06", icon: <Box size={18} />, color: "text-amber-500" },
         ].map((stat, i) => (
           <div key={i} className="system-module p-6 mb-0 flex items-center justify-between group hover:border-blue-500/30 transition-colors">
              <div>
                 <p className="text-[10px] font-mono-system text-[#94a3b8] uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-2xl font-black text-white italic">{stat.val}</p>
              </div>
              <div className={`${stat.color} opacity-30 group-hover:opacity-100 transition-opacity`}>
                 {stat.icon}
              </div>
           </div>
         ))}
      </div>

      <div className="system-module">
         <div className="flex items-center gap-3 mb-8">
            <ShieldCheck size={20} className="text-blue-500" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Production_Model_Registry</h3>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-system">
               <thead>
                 <tr className="border-b border-[#1e293b] text-[10px] text-[#94a3b8] uppercase tracking-[0.2em]">
                   <th className="pb-4 font-bold">Module_Identifier</th>
                   <th className="pb-4 font-bold">Category</th>
                   <th className="pb-4 font-bold">Accuracy</th>
                   <th className="pb-4 font-bold">Status</th>
                 </tr>
               </thead>
               <tbody className="text-xs">
                 {metaModules.map((module, i) => (
                   <tr key={i} className="border-b border-[#1e293b]/50 hover:bg-white/2 transition-colors">
                      <td className="py-4 text-white font-bold">{module.name}</td>
                      <td className="py-4 text-[#94a3b8]">{module.type}</td>
                      <td className="py-4 text-blue-500 font-bold">{module.acc}</td>
                      <td className="py-4">
                         <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                           module.status === 'Testing' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'
                         }`}>
                           {module.status}
                         </span>
                      </td>
                   </tr>
                 ))}
               </tbody>
            </table>
         </div>
      </div>
    </section>
  );
};

export default SystemOverview;
