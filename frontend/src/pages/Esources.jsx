// import { Download, FileText, Loader2, Youtube } from "lucide-react";
// import React, { useState, useEffect } from "react";

// const backend_url = import.meta.env.VITE_BACKEND_URL;

// const Resources = () => {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [downloadingId, setDownloadingId] = useState(null);

//   // -------------------- Fetch Files From Backend --------------------
//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(backend_url + "/api/file/files");
//       const data = await res.json();
//       // Ensure your backend returns { files: [...] }
//       setDocuments(data.files || []);
//     } catch (error) {
//       console.error("Error fetching files", error);
//       setDocuments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------- Handle File Download --------------------
//   const handleDownload = async (fileId, fileName) => {
//     try {
//       setDownloadingId(fileId);

//       const res = await fetch(backend_url + `/api/file/download/${fileId}`);

//       if (!res.ok) throw new Error("Failed to download");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       // force a sensible filename
//       link.download = `${fileName.replace(/\s+/g, "_")}.pdf`;
//       document.body.appendChild(link);
//       link.click();

//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading document/pdf:", error);
//       alert("Failed to download document.");
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   // -------------------- YouTube Sample Data --------------------
//   // keep/update with real IDs/thumbnails as needed
//   const youtubeVideos = [
//     {
//       id: "yt-1",
//       title: "What is DBT? Complete Guide",
//       description: "Learn about Direct Benefit Transfer and how it works",
//       videoId: "dQw4w9WgXcQ",
//       thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//       duration: "5:30",
//     },
//     {
//       id: "yt-2",
//       title: "How to Enable DBT in Your Bank Account",
//       description: "Step by step tutorial for enabling DBT",
//       videoId: "dQw4w9WgXcQ",
//       thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//       duration: "8:45",
//     },
//     {
//       id: "yt-3",
//       title: "Common DBT Problems and Solutions",
//       description: "Troubleshooting guide for DBT issues",
//       videoId: "dQw4w9WgXcQ",
//       thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//       duration: "12:15",
//     },
//     {
//       id: "yt-4",
//       title: "Student Success Stories",
//       description: "Real stories from students who benefited from DBT",
//       videoId: "dQw4w9WgXcQ",
//       thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//       duration: "6:20",
//     },
//   ];

//   const openYouTube = (videoId) =>
//     window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");

//   return (
//     <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="text-center">
//         <h2 className="text-3xl font-bold text-gray-900 mb-3">
//           Tools & Resources
//         </h2>
//         <p className="text-gray-600 text-lg">
//           Access important documents and educational videos
//         </p>
//       </div>

//       {/* -------------------- Files Section -------------------- */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex items-center space-x-3 mb-6">
//           <FileText className="w-7 h-7 text-blue-600" />
//           <h3 className="text-2xl font-bold text-gray-900">
//             Important Documents & Circulars
//           </h3>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//             <span className="ml-3 text-gray-600">Loading documents...</span>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {documents.map((doc) => (
//               <div
//                 key={doc._id}
//                 className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200"
//               >
//                 {/* LEFT SIDE */}
//                 <div className="flex items-start space-x-4 flex-1">
//                   <img src="/pdf.png" className="w-12 h-12 mt-1" alt="pdf" />

//                   <div className="flex-1">
//                     <h4 className="font-semibold text-gray-900">{doc.title}</h4>
//                     <p className="text-sm text-gray-600">{doc.description}</p>

//                     <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
//                       <span>📄 {doc.fileSize}</span>
//                       <span>
//                         📅{" "}
//                         {doc.uploadedAt
//                           ? new Date(doc.uploadedAt).toLocaleDateString()
//                           : "—"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* DOWNLOAD BUTTON */}
//                 <button
//                   onClick={() => handleDownload(doc._id, doc.title)}
//                   disabled={downloadingId === doc._id}
//                   className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 ml-4"
//                 >
//                   {downloadingId === doc._id ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       <span>Downloading</span>
//                     </>
//                   ) : (
//                     <>
//                       <Download className="w-4 h-4" />
//                       <span>Download</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {!loading && documents.length === 0 && (
//           <div className="text-center py-12 text-gray-500">
//             <FileText className="w-12 h-12 mx-auto opacity-50 mb-2" />
//             No documents available at the moment
//           </div>
//         )}
//       </div>

//       {/* -------------------- YouTube Section (completed) -------------------- */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex items-center space-x-3 mb-6">
//           <Youtube className="w-7 h-7 text-red-600" />
//           <h3 className="text-2xl font-bold text-gray-900">
//             Educational Videos
//           </h3>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           {youtubeVideos.map((video) => (
//             <div
//               key={video.id}
//               className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <div
//                 className="relative"
//                 onClick={() => openYouTube(video.videoId)}
//               >
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className="w-full h-48 object-cover"
//                 />

//                 {/* dark overlay + play circle */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="bg-black bg-opacity-30 rounded-full p-3 transition-transform group-hover:scale-105">
//                     <div className="bg-red-600 rounded-full p-3">
//                       <Youtube className="w-6 h-6 text-white" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* duration badge */}
//                 <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                   {video.duration}
//                 </div>
//               </div>

//               <div className="p-4">
//                 <h4 className="font-semibold text-gray-900 mb-1">
//                   {video.title}
//                 </h4>
//                 <p className="text-sm text-gray-600 mb-3">
//                   {video.description}
//                 </p>

//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-500 flex items-center">
//                     <Youtube className="w-4 h-4 mr-1" />
//                     Watch on YouTube
//                   </span>
//                   <button
//                     onClick={() => openYouTube(video.videoId)}
//                     className="text-sm text-blue-600 hover:underline"
//                   >
//                     Open
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Help Section */}
//       <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
//         <h4 className="font-semibold text-blue-800 mb-2">📌 Need Help?</h4>
//         <p className="text-sm text-blue-700">
//           If you're unable to download any document or facing issues, please
//           contact support.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Resources;
