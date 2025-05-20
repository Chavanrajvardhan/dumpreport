'use client';

import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function PerformanceComparisonDashboard() {
  const [chartType, setChartType] = useState('bar');

  const apiData = [
    {
      name: "Login and projects access",
      reactInitial: 0.70,
      reactSecondary: 0.70,
      nextjsInitial: 5.11,
      nextjsSecondary: 0.79,
      diff1: 0.70 - 5.11,
      diff2: 0.70 - 0.79
    },
    {
      name: "All Project access to dashboard",
      reactInitial: 0.80,
      reactSecondary: 0.70,
      nextjsInitial: 5.64,
      nextjsSecondary: 1.32,
      diff1: 0.80 - 5.64,
      diff2: 0.70 - 1.32
    },
    {
      name: "getorgsegment/getallfranchisenone",
      reactInitial: 0.50,
      reactSecondary: 0.50,
      nextjsInitial: 5.13,
      nextjsSecondary: 0.8,
      diff1: 0.50 - 5.13,
      diff2: 0.50 - 0.8
    },
    {
      name: "getterritorydumpreportdata",
      reactInitial: 28.75,
      reactSecondary: 28.75,
      nextjsInitial: 40,
      nextjsSecondary: 30,
      diff1: 28.75 - 40,
      diff2: 28.75 - 30,
    }
  ];
  // @ts-ignore
  const formatCell = (reactValue, nextjsValue) => {
    const diff = nextjsValue - reactValue;
    const color = diff > 0 ? '#7f1d1d33' : diff < 0 ? '#14532d33' : '#1f293733';
    return { backgroundColor: color };
  };

  const chartData = apiData.map(item => ({
    name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
    'React Initial': item.reactInitial,
    'Next.js Initial': item.nextjsInitial,
    'React Secondary': item.reactSecondary,
    'Next.js Secondary': item.nextjsSecondary,
  }));

  const largeValueData = apiData.filter(item =>
    item.reactInitial > 10 || item.nextjsInitial > 10 ||
    item.reactSecondary > 10 || item.nextjsSecondary > 10
  ).map(item => ({
    name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
    'React Initial': item.reactInitial,
    'Next.js Initial': item.nextjsInitial,
    'React Secondary': item.reactSecondary,
    'Next.js Secondary': item.nextjsSecondary,
  }));

  const smallValueData = apiData.filter(item =>
    item.reactInitial <= 10 && item.nextjsInitial <= 10 &&
    item.reactSecondary <= 10 && item.nextjsSecondary <= 10
  ).map(item => ({
    name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
    'React Initial': item.reactInitial,
    'Next.js Initial': item.nextjsInitial,
    'React Secondary': item.reactSecondary,
    'Next.js Secondary': item.nextjsSecondary,
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">React vs Next.js Performance Comparison</h2>

        <div className="flex justify-center gap-6 mb-10">
          {['bar', 'line', 'table'].map(type => (
            <button
              key={type}
              className={`px-10 py-6 rounded-md transition text-xl font-small ${
                chartType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setChartType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} View
            </button>
          ))}
        </div>

        {(chartType === 'bar' || chartType === 'line') && (
          <>
            {/* Small Values Chart */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold mb-4 text-center">APIs with Quick Response Times (≤ 10s)</h3>
              <div className="h-96 bg-gray-800 rounded-lg p-6 shadow-lg">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={smallValueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#ccc" tick={{fontSize: 12}} />
                      <YAxis stroke="#ccc" 
                             label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', fill: '#ccc', dy: -20 }} 
                             tick={{fontSize: 12}} />
                      <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }} />
                      <Legend wrapperStyle={{paddingTop: 20}} />
                      <Bar dataKey="React Initial" fill="#6366f1" />
                      <Bar dataKey="Next.js Initial" fill="#34d399" />
                      <Bar dataKey="React Secondary" fill="#6366f1" />
                      <Bar dataKey="Next.js Secondary" fill="#34d399" />
                    </BarChart>
                  ) : (
                    <LineChart data={smallValueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#ccc" tick={{fontSize: 12}} />
                      <YAxis stroke="#ccc" 
                             label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', fill: '#ccc', dy: -20 }} 
                             tick={{fontSize: 12}} />
                      <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }} />
                      <Legend wrapperStyle={{paddingTop: 20}} />
                      <Line type="monotone" dataKey="React Initial" stroke="#6366f1" strokeWidth={2} dot={{r: 4}} />
                      <Line type="monotone" dataKey="Next.js Initial" stroke="#34d399" strokeWidth={2} dot={{r: 4}} />
                      <Line type="monotone" dataKey="React Secondary" stroke="#f59e0b" strokeWidth={2} dot={{r: 4}} />
                      <Line type="monotone" dataKey="Next.js Secondary" stroke="#3b82f6" strokeWidth={2} dot={{r: 4}} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Large Values Chart */}
            {largeValueData.length > 0 && (
              <div className="mb-16">
                <h3 className="text-xl font-semibold mb-4 text-center">APIs with Longer Response Times (&gt; 10s)</h3>
                <div className="h-96 bg-gray-800 rounded-lg p-6 shadow-lg">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                      <BarChart data={largeValueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#ccc" tick={{fontSize: 12}} />
                        <YAxis stroke="#ccc" 
                               label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', fill: '#ccc', dy: -20 }} 
                               tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }} />
                        <Legend wrapperStyle={{paddingTop: 20}} />
                        <Bar dataKey="React Initial" fill="#6366f1" />
                        <Bar dataKey="Next.js Initial" fill="#34d399" />
                        <Bar dataKey="React Secondary" fill="#6366f1" />
                        <Bar dataKey="Next.js Secondary" fill="#34d399" />
                      </BarChart>
                    ) : (
                      <LineChart data={largeValueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#ccc" tick={{fontSize: 12}} />
                        <YAxis stroke="#ccc" 
                               label={{ value: 'Time (s)', angle: -90, position: 'insideLeft', fill: '#ccc', dy: -20 }} 
                               tick={{fontSize: 12}} />
                        <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderColor: "#4b5563" }} />
                        <Legend wrapperStyle={{paddingTop: 20}} />
                        <Line type="monotone" dataKey="React Initial" stroke="#6366f1" strokeWidth={2} dot={{r: 4}} />
                        <Line type="monotone" dataKey="Next.js Initial" stroke="#34d399" strokeWidth={2} dot={{r: 4}} />
                        <Line type="monotone" dataKey="React Secondary" stroke="#f59e0b" strokeWidth={2} dot={{r: 4}} />
                        <Line type="monotone" dataKey="Next.js Secondary" stroke="#3b82f6" strokeWidth={2} dot={{r: 4}} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}

        {chartType === 'table' && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold mb-4 text-center">Performance Data Comparison</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
              <table className="min-w-full text-base text-left text-gray-300 bg-gray-800">
                <thead className="bg-gray-700 text-gray-100">
                  <tr>
                    <th className="py-5 px-6 border-b border-gray-600">API Operation</th>
                    <th className="py-5 px-6 border-b border-gray-600 text-center">React Initial</th>
                    <th className="py-5 px-6 border-b border-gray-600 text-center">Next.js Initial</th>
                    <th className="py-5 px-6 border-b border-gray-600 text-center">Difference</th>
                    <th className="py-5 px-6 border-b border-gray-600 text-center">React Secondary</th>
                    <th className="py-5 px-6 border-b border-gray-600 text-center">Next.js Secondary</th>
                    <th className="py-5 px-6 border-b border-gray-600 text-center">Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {apiData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                      <td className="py-5 px-6 font-medium">{row.name}</td>
                      <td className="py-5 px-6 text-center">{row.reactInitial.toFixed(2)}</td>
                      <td className="py-5 px-6 text-center" style={formatCell(row.reactInitial, row.nextjsInitial)}>
                        {row.nextjsInitial.toFixed(2)}
                      </td>
                      <td className="py-5 px-6 text-center font-semibold"
                          style={{ backgroundColor: row.diff1 > 0 ? '#7f1d1d33' : '#14532d33' }}>
                        {row.diff1.toFixed(2)}
                      </td>
                      <td className="py-5 px-6 text-center">{row.reactSecondary.toFixed(2)}</td>
                      <td className="py-5 px-6 text-center" style={formatCell(row.reactSecondary, row.nextjsSecondary)}>
                        {row.nextjsSecondary.toFixed(2)}
                      </td>
                      <td className="py-5 px-6 text-center font-semibold"
                          style={{ backgroundColor: row.diff2 > 0 ? '#7f1d1d33' : '#14532d33' }}>
                        {row.diff2.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Key Performance Insights:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>React shows faster initial load times in 3 out of 4 API operations</li>
            <li>The territory dump report shows the most significant difference (72s vs 32.15s)</li>
            <li>For secondary loads, Next.js performs better in 1 case and worse in 3 cases</li>
            <li>Next.js secondary load for territory dump is notably faster than React (25.96s vs 32.15s)</li>
          </ul>
        </div> */}

        <div className="mt-8 p-4 text-sm text-gray-400 bg-gray-800 rounded-lg shadow-lg">
          <p className="font-medium mb-2">Color legend in table view:</p>
          <div className="flex gap-8 mt-2">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-red-900/20 rounded mr-2"></div>
              <span>Next.js slower than React</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-green-900/20 rounded mr-2"></div>
              <span>Next.js faster than React</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}