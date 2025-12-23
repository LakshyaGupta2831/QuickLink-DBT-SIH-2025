import {
  Download,
  FileText,
  Loader2,
  Youtube,
  ExternalLink,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Resources = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoLoading, setVideoLoading] = useState(true);

  // YouTube videos data
  const youtubeVideos = [
    {
      id: 1,
      title: "What is DBT? Complete Guide",
      description: "Learn about Direct Benefit Transfer and how it works",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "5:30",
    },
    {
      id: 2,
      title: "How to Enable DBT in Your Bank Account",
      description: "Step by step tutorial for enabling DBT",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "8:45",
    },
    {
      id: 3,
      title: "Common DBT Problems and Solutions",
      description: "Troubleshooting guide for DBT issues",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "12:15",
    },
    {
      id: 4,
      title: "Student Success Stories",
      description: "Real stories from students who benefited from DBT",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "6:20",
    },
  ];

  // Fetch documents from DB on component mount
  useEffect(() => {
    fetchDocuments();
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setVideoLoading(true);
      const res = await fetch(backend_url + "/api/video/all");
      const data = await res.json();
      console.log(data.data);
      setVideos(data.data || []);
    } catch (error) {
      console.error("Error fetching videos", error);
      setVideos([]); // fallback to empty if api fails
    } finally {
      setVideoLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch(backend_url + "/api/file/files");
      const data = await response.json();
      setDocuments(data.files || []);
    } catch (error) {
      console.error("Error fetching files/pdf", error);
      setDocuments([]);

      // Mock data
      //   setDocuments([
      //     {
      //       id: 1,
      //       name: "DBT Seeding Application Form",
      //       description: "Official form for DBT seeding application",
      //       fileSize: "245 KB",
      //       uploadDate: "2024-01-15",
      //     },
      //     {
      //       id: 2,
      //       name: "Aadhaar Bank Linking Guidelines",
      //       description: "Complete guide for linking Aadhaar with bank account",
      //       fileSize: "1.2 MB",
      //       uploadDate: "2024-01-20",
      //     },
      //     {
      //       id: 3,
      //       name: "Scholarship Status Check Manual",
      //       description: "How to check your scholarship application status",
      //       fileSize: "890 KB",
      //       uploadDate: "2024-02-01",
      //     },
      //     {
      //       id: 4,
      //       name: "DBT Scheme Circular 2024",
      //       description: "Latest government circular on DBT schemes",
      //       fileSize: "2.5 MB",
      //       uploadDate: "2024-02-10",
      //     },
      //     {
      //       id: 5,
      //       name: "Bank Contact Directory",
      //       description: "Complete list of bank branches and contact details",
      //       fileSize: "3.1 MB",
      //       uploadDate: "2024-02-15",
      //     },
      //   ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      setDownloadingId(fileId);
      const response = await fetch(
        backend_url + `/api/file/download/${fileId}`
      );

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      console.log("file name is " + fileName);
      link.download = `${fileName.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      //   document.body.removeChild(link);
      //   window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Failed to download document.");
    } finally {
      setDownloadingId(null);
    }
  };

  const openYouTubeVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tools & Resources
        </h2>
        <p className="text-gray-600 text-lg">
          Access important documents and educational videos
        </p>
      </div>

      {/* Important Documents Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-7 h-7 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            Important Documents & Circulars
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading documents...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 border border-gray-200
                           flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                {/* Info Section */}
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">
                    <img src="pdf.png" className="w-12 h-12" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {doc.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {doc.description}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>📄 {doc.fileSize}</span>
                      <span>
                        📅 {new Date(doc.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(doc._id, doc.title)}
                  disabled={downloadingId === doc.id}
                  className="w-full md:w-auto flex items-center justify-center space-x-2
                             bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
                             hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {downloadingId === doc._id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && documents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No documents available at the moment</p>
          </div>
        )}
      </div>

      {/* YouTube Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Youtube className="w-7 h-7 text-red-600" />
          <h3 className="text-2xl font-bold text-gray-900">
            Educational Videos
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {(videos.length > 0 ? videos : youtubeVideos).map((video) => (
            <div
              key={video.id}
              className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openYouTubeVideo(video.videoId)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-all">
                  <div className="bg-red-600 rounded-full p-4">
                    <Youtube className="w-8 h-8 text-white" />
                  </div>
                </div> */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {video.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center">
                    <Youtube className="w-4 h-4 mr-1" />
                    Watch on YouTube
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-semibold text-blue-800 mb-2">📌 Need Help?</h4>
        <p className="text-sm text-blue-700">
          If you're unable to download any document or facing issues, please
          contact support.
        </p>
      </div>
    </div>
  );
};

export default Resources;

// -----------------------------------------------------------------------------------------

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
//       console.log(data);

//       setDocuments(data.files); // expects: [{id, name, description, fileSize, uploadDate}]
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
//       link.download = `${fileName}.pdf`;
//       document.body.appendChild(link);
//       link.click();

//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error(error);
//       alert("Download failed. Try again.");
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   // -------------------- YouTube Sample Data --------------------
//   const youtubeVideos = [
//     {
//       id: 1,
//       title: "What is DBT?",
//       description: "Learn about Direct Benefit Transfer",
//       videoId: "dQw4w9WgXcQ",
//       thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     },
//     {
//       id: 2,
//       title: "Enable DBT in Bank",
//       description: "Step by step guide",
//       videoId: "dQw4w9WgXcQ",
//       thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     },
//   ];

//   const openYouTube = (id) =>
//     window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");

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
//                         📅 {new Date(doc.uploadedAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* DOWNLOAD BUTTON */}
//                 <button
//                   onClick={() => handleDownload(doc._id, doc.title)}
//                   disabled={downloadingId === doc.id}
//                   className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 ml-4"
//                 >
//                   {downloadingId === doc.id ? (
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

//       {/* -------------------- YouTube Section -------------------- */}
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex items-center space-x-3 mb-6">
//           <Youtube className="w-7 h-7 text-red-600" />
//           <h3 className="text-2xl font-bold text-gray-900">
//             Educational Videos
//           </h3>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           {youtubeVideos.map((v) => (
//             <div
//               key={v.id}
//               className="bg-gray-50 border rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer"
//               onClick={() => openYouTube(v.videoId)}
//             >
//               <img
//                 src={v.thumbnail}
//                 alt={v.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h4 className="font-semibold text-gray-900">{v.title}</h4>
//                 <p className="text-sm text-gray-600">{v.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// -----------------------------------------------------------------------------------------

// export default Resources;

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
//       console.error(error);
//       alert("Download failed. Try again.");
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
