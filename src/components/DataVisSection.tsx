import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap } from 'lucide-react';

const accuracyData = [
  { name: 'Epoch 1', accuracy: 65, loss: 0.8 },
  { name: 'Epoch 5', accuracy: 78, loss: 0.5 },
  { name: 'Epoch 10', accuracy: 85, loss: 0.35 },
  { name: 'Epoch 15', accuracy: 92, loss: 0.22 },
  { name: 'Epoch 20', accuracy: 96, loss: 0.15 },
  { name: 'Epoch 25', accuracy: 98, loss: 0.08 },
];

const sensorData = [
  { time: '12:00', temp: 24, humidity: 45 },
  { time: '13:00', temp: 26, humidity: 42 },
  { time: '14:00', temp: 28, humidity: 40 },
  { time: '15:00', temp: 27, humidity: 41 },
  { time: '16:00', temp: 25, humidity: 44 },
  { time: '17:00', temp: 23, humidity: 46 },
];

const DataVisSection = () => {
  return (
    <section id="data-vis" className="py-32 relative bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 section-title-accent"
        >
          <span className="subheading-premium">Analytics</span>
          <h2 className="heading-premium text-white">Data <span className="gradient-text-premium">Intelligence</span></h2>
          <p className="text-gray-400 max-w-2xl mt-6 text-sm font-medium">
            Visualizing the performance of AI models and real-time sensor data from IoT nodes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Training Progress */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[3rem] border-white/5"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Database size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Model Accuracy</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Deep Learning Optimization</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={accuracyData}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#4b5563" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#4b5563" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAcc)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="text-center flex-1">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Final Accuracy</p>
                <p className="text-2xl font-black text-primary">98.2%</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center flex-1">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Validation Loss</p>
                <p className="text-2xl font-black text-cyan-400">0.08</p>
              </div>
            </div>
          </motion.div>

          {/* IoT Sensor Data */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-[3rem] border-white/5"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-2xl bg-cyan-400/10 text-cyan-400">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Sensor Stream</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Real-time IoT Node Feed</p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensorData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#4b5563" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#4b5563" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="temp" stroke="#f87171" strokeWidth={3} dot={{ fill: '#f87171', r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="humidity" stroke="#22d3ee" strokeWidth={3} dot={{ fill: '#22d3ee', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/2 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                  <Zap size={16} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Node</p>
                   <p className="text-sm font-bold text-white uppercase italic tracking-tighter">ESP32_PUNE_B1</p>
                </div>
              </div>
              <div className="bg-white/2 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <Cpu size={16} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Processing</p>
                   <p className="text-sm font-bold text-white uppercase italic tracking-tighter">On-Edge Inference</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataVisSection;
