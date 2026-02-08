// import React from 'react';
// import Heatmap from './Heatmap';
// import { useStore } from './store';

// function App() {
//   const { heatmapData, setHeatmapData, updateCell } = useStore();

//   // Example: Generate random heatmap data
//   const generateRandomData = () => {
//     const rows = 8;
//     const cols = 8;
//     const newData = Array.from({ length: rows }, () =>
//       Array.from({ length: cols }, () => Math.floor(Math.random() * 100))
//     );
//     setHeatmapData(newData);
//   };

//   // Example: Update a specific cell
//   const handleCellUpdate = () => {
//     updateCell(0, 0, 99);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">D3.js Heatmap with Zustand</h1>

//         <div className="mb-6 space-x-4">
//           <button
//             onClick={generateRandomData}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Generate Random Data
//           </button>
//           <button
//             onClick={handleCellUpdate}
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           >
//             Update Cell [0,0] to 99
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <Heatmap
//             title="Interactive Heatmap"
//             subtitle="Hover over cells to see values"
//             width={600}
//             height={600}
//           />
//         </div>

//         <div className="mt-6 p-4 bg-gray-100 rounded-md">
//           <h2 className="text-lg font-semibold mb-2">Current Data:</h2>
//           <pre className="text-xs overflow-auto">{JSON.stringify(heatmapData, null, 2)}</pre>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
