import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Database, Zap, Cpu, BarChart2 } from "lucide-react";

const accuracyData = [
  { epoch: 1, acc: 68, loss: 0.95 },
  { epoch: 5, acc: 82, loss: 0.55 },
  { epoch: 10, acc: 89, loss: 0.32 },
  { epoch: 15, acc: 94, loss: 0.18 },
  { epoch: 20, acc: 97, loss: 0.12 },
  { epoch: 25, acc: 98.4, loss: 0.08 },
];

const sensorData = [
  { t: 0, val: 23 }, { t: 10, val: 24 }, { t: 20, val: 26 }, { t: 30, val: 25 },
  { t: 40, val: 28 }, { t: 50, val: 27 }, { t: 60, val: 24 }, { t: 70, val: 23 },
];

const ModelInsights = () => {
  return (
    <section id="models" className="scroll-mt-24 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-[#1e293b]" />
        <h2 className="text-sm font-black text-[#94a3b8] uppercase tracking-[0.4em] font-mono-system shrink-0">Model_Systems_Analytics</h2>
        <div className="h-px w-10 bg-[#1e293b]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Model Optimization Curve */}
        <div className="system-module">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20">
                <BarChart2 size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight">Optimization_Curve</h3>
                <p className="text-[10px] font-mono-system text-[#94a3b8]">Gradient Descent Path • CNN_04</p>
              </div>
            </div>
            <span className="text-[10px] font-black text-green-500 font-mono-system">98.4%_ACC</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accuracyData}>
                <defs>
                   <linearGradient id="curveColor" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="acc" stroke="#3b82f6" fillOpacity={1} fill="url(#curveColor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#1e293b]">
             <div>
                <p className="text-[9px] font-mono-system text-[#94a3b8] uppercase mb-1">Validation</p>
                <p className="text-sm font-black text-white italic">0.08_LOSS</p>
             </div>
             <div>
                <p className="text-[9px] font-mono-system text-[#94a3b8] uppercase mb-1">Complexity</p>
                <p className="text-sm font-black text-white italic">14.2M_PARAM</p>
             </div>
             <div>
                <p className="text-[9px] font-mono-system text-[#94a3b8] uppercase mb-1">Latency</p>
                <p className="text-sm font-black text-white italic">18ms_EDGE</p>
             </div>
          </div>
        </div>

        {/* Real-time Telemetry (IoT) */}
        <div className="system-module">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 text-green-500 rounded border border-green-500/20">
                <Zap size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-tight">Telemetry_Feed</h3>
                <p className="text-[10px] font-mono-system text-[#94a3b8]">ESP32 Node Stream • Sensor_Array_B</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
               <span className="text-[10px] font-black text-white font-mono-system tracking-widest">LIVE</span>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="t" hide />
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                <Line type="stepAfter" dataKey="val" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="bg-white/2 p-3 rounded border border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono-system text-[#94a3b8] uppercase uppercase">Uptime</span>
                <span className="text-xs font-bold text-white">99.98%</span>
             </div>
             <div className="bg-white/2 p-3 rounded border border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono-system text-[#94a3b8] uppercase uppercase">Packets</span>
                <span className="text-xs font-bold text-white">2.4k/sec</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelInsights;
