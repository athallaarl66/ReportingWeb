import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Asumsi menggunakan React Router
import {
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  User,
  FileText,
  Image,
  ClipboardList,
} from "lucide-react";
import toast from "react-hot-toast"; // Menggunakan Toaster yang sudah diimpor di App.jsx

// --- MOCK DATA ---
// Data dummy tugas. Anda perlu mengganti ini dengan fungsi fetch API Anda.
const mockTaskDetail = {
  id: 1,
  taskName: "Inspect Generator",
  assignedTo: "John Doe",
  department: "Electrical",
  role: "Technician",
  dueDate: "2025-10-25",
  location: "Gudang Utama, Unit C",
  description:
    "Lakukan pengecekan menyeluruh terhadap level oli dan getaran mesin.",
  status: "Pending",
  form_data: {
    oilLevel: "Normal (85%)",
    vibrationReading: "0.25 mm/s",
    notes:
      "Mesin berjalan normal, namun filter udara perlu diganti bulan depan.",
  },
  // Contoh gambar: Anda harus mendapatkan URL gambar dari penyimpanan cloud (e.g., Firebase Storage/S3)
  uploaded_images: [
    "https://placehold.co/600x400/10B981/FFFFFF?text=Bukti+Foto+1",
    "https://placehold.co/600x400/059669/FFFFFF?text=Bukti+Foto+2",
  ],
  admin_notes: "",
};
// --- END MOCK DATA ---

const TaskReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    // Ganti dengan fungsi API Anda: axios.get(`/api/tasks/${id}`)
    const fetchTaskDetail = async () => {
      setLoading(true);
      try {
        // Simulasi delay API
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Cari data mock, atau gunakan mockTaskDetail jika ID sesuai
        const data = id == mockTaskDetail.id ? mockTaskDetail : null;

        if (data) {
          setTask(data);
          setAdminNotes(data.admin_notes || "");
        } else {
          toast.error("Task ID not found in database.");
        }
      } catch (error) {
        toast.error("Failed to fetch task details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetail();
  }, [id]);

  const handleApproval = async (status) => {
    if (!task) return;

    // Validasi jika Admin menolak tanpa memberikan catatan
    if (status === "Rejected" && adminNotes.trim() === "") {
      toast.error("Mohon isi Catatan Admin saat menolak tugas.");
      return;
    }

    const actionText = status === "Approved" ? "Menyetujui" : "Menolak";

    // Ganti ini dengan fungsi API untuk update status tugas
    const loadingToast = toast.loading(`${actionText} tugas...`);

    try {
      // Simulasi API call: axios.put(`/api/tasks/${task.id}/status`, { status, adminNotes });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        `Task ${task.taskName} berhasil di ${
          status === "Approved" ? "SETUJUI" : "TOLAK"
        }.`,
        { id: loadingToast }
      );

      // Navigasi kembali ke daftar tugas setelah submit
      navigate("/task");
    } catch (error) {
      toast.error(`Gagal ${actionText} tugas. Coba lagi.`, {
        id: loadingToast,
      });
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="text-white p-10 text-center">Loading Task Details...</div>
    );
  }

  if (!task) {
    return (
      <div className="text-white p-10 text-center">
        Task Not Found for ID: {id}
      </div>
    );
  }

  // Komponen untuk menampilkan setiap baris detail
  const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center space-x-3 py-2 border-b border-gray-700 last:border-b-0">
      <Icon size={18} className="text-indigo-400 shrink-0" />
      <span className="font-semibold text-gray-400 w-36 shrink-0">
        {label}:
      </span>
      <span className="text-gray-200 font-medium break-words">{value}</span>
    </div>
  );

  return (
    <div className="p-6 bg-[#1e1e1e] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-3 flex items-center gap-3">
        <ClipboardList size={30} className="text-indigo-500" /> Review Tugas:{" "}
        {task.taskName}
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI: METADATA & DATA FORM */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-2xl h-fit">
          <h2 className="text-xl font-bold text-indigo-400 mb-4 border-b border-gray-700 pb-2">
            Task Metadata
          </h2>
          <DetailRow icon={FileText} label="Task Name" value={task.taskName} />
          <DetailRow icon={User} label="Pegawai" value={task.assignedTo} />
          <DetailRow icon={User} label="Departemen" value={task.department} />
          <DetailRow icon={User} label="Role" value={task.role} />
          <DetailRow icon={Clock} label="Due Date" value={task.dueDate} />
          <DetailRow icon={MapPin} label="Lokasi" value={task.location} />

          <div className="mt-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-2">
              Description Tugas
            </h3>
            <p className="text-sm text-gray-300 bg-gray-700/50 p-3 rounded-lg border border-gray-700">
              {task.description}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400 mb-4 border-b border-gray-700 pb-2">
              Form Data Pegawai
            </h2>
            {Object.entries(task.form_data).map(([key, value]) => (
              <DetailRow
                key={key}
                icon={FileText}
                label={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())} // Format key: oilLevel -> Oil Level
                value={value}
              />
            ))}
          </div>
        </div>

        {/* KOLOM KANAN (2/3): BUKTI GAMBAR & APPROVAL */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bagian Bukti Gambar */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
            <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
              <Image size={24} /> Bukti Foto Pegawai (
              {task.uploaded_images.length})
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {task.uploaded_images.length > 0 ? (
                task.uploaded_images.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                  >
                    <img
                      src={imgUrl}
                      alt={`Bukti Tugas ${index + 1}`}
                      className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open(imgUrl, "_blank")} // Membuka gambar di tab baru
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/600x400/333/999?text=Image+Error";
                      }}
                    />
                    <p className="text-center text-xs text-gray-400 p-1">
                      Klik untuk memperbesar
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic col-span-2">
                  Pegawai belum mengunggah bukti gambar.
                </p>
              )}
            </div>
          </div>

          {/* Bagian Approval */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border-t-4 border-indigo-500">
            <h2 className="text-xl font-bold text-white mb-4">
              Keputusan Admin
            </h2>

            <div className="mb-6">
              <label
                className="block text-gray-400 mb-2 font-semibold"
                htmlFor="adminNotes"
              >
                Catatan Admin (Wajib diisi jika menolak)
              </label>
              <textarea
                id="adminNotes"
                className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                rows="3"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Tuliskan catatan persetujuan atau alasan penolakan..."
              ></textarea>
            </div>

            <div className="flex justify-start space-x-4 border-t border-gray-700 pt-4">
              <button
                onClick={() => handleApproval("Approved")}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition duration-300 shadow-lg shadow-emerald-600/30 transform hover:scale-[1.02]"
              >
                <CheckCircle size={20} /> Setujui (Approve)
              </button>

              <button
                onClick={() => handleApproval("Rejected")}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 shadow-lg shadow-red-600/30 transform hover:scale-[1.02]"
              >
                <XCircle size={20} /> Tolak (Reject)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskReviewPage;
