import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Upload, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const Prescriptions = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const endpoint = user?.role === 'pharmacist' || user?.role === 'admin' 
        ? '/prescriptions/all' 
        : '/prescriptions';
      const response = await api.get(endpoint);
      setPrescriptions(response.data.prescriptions);
    } catch (error) {
      toast.error('Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/prescriptions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Prescription uploaded successfully');
      setFile(null);
      document.getElementById('file-input').value = '';
      fetchPrescriptions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload prescription');
    } finally {
      setUploading(false);
    }
  };

  const handleReview = async (id, status, rejectionReason = '') => {
    try {
      // First, get the prescription to find the owner
      const prescriptionResponse = await api.get(`/prescriptions/all`);
      const prescriptionBefore = prescriptionResponse.data.prescriptions.find(p => p._id === id);
      
      // Now review it
      const response = await api.put(`/prescriptions/${id}/review`, { status, rejectionReason });
      const prescription = response.data.prescription;
      
      toast.success(`Prescription ${status}`);
      
      // Prepare notification
      const notificationTitle = status === 'approved' 
        ? 'Prescription Approved' 
        : 'Prescription Rejected';
      const notificationMessage = status === 'approved'
        ? 'Your prescription has been approved. You can now place orders.'
        : `Your prescription has been rejected. Reason: ${rejectionReason || 'No reason provided'}`;
      
      // Get the owner ID from the prescription
      const ownerId = prescriptionBefore?.userId?._id || prescriptionBefore?.userId || prescription?.userId?._id || prescription?.userId;
      
      // Save notification to localStorage for the prescription owner
      if (ownerId) {
        const key = `notifications_${ownerId}`;
        const existing = localStorage.getItem(key);
        const notifications = existing ? JSON.parse(existing) : [];
        
        const newNotification = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          title: notificationTitle,
          message: notificationMessage,
          type: status === 'approved' ? 'success' : 'error',
          link: '/prescriptions',
          read: false,
          createdAt: new Date().toISOString(),
        };
        
        notifications.unshift(newNotification);
        localStorage.setItem(key, JSON.stringify(notifications));
        
        // If the current user is the owner, refresh their notifications
        const currentUser = localStorage.getItem('user');
        if (currentUser) {
          try {
            const user = JSON.parse(currentUser);
            const currentUserId = user.id || user._id;
            if (currentUserId === ownerId.toString()) {
              // Trigger notification refresh for the owner
              setTimeout(() => {
                window.dispatchEvent(new Event('notificationUpdate'));
              }, 100);
            }
          } catch (e) {
            // Ignore
          }
        }
      }
      
      fetchPrescriptions();
    } catch (error) {
      toast.error('Failed to review prescription');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Prescriptions</h1>

      {user?.role === 'customer' && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload Prescription</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select File (Image or PDF)
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="input-field"
                required
              />
            </div>
            <button
              type="submit"
              disabled={uploading || !file}
              className="btn-primary disabled:opacity-50 flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {uploading ? 'Uploading...' : 'Upload Prescription'}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {prescriptions.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No prescriptions found</p>
          </div>
        ) : (
          prescriptions.map((prescription) => (
            <div key={prescription._id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">
                    Prescription #{prescription._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Uploaded: {new Date(prescription.createdAt).toLocaleDateString()}
                  </p>
                  {prescription.reviewDate && (
                    <p className="text-sm text-gray-600">
                      Reviewed: {new Date(prescription.reviewDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(prescription.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    prescription.status === 'approved' ? 'bg-green-100 text-green-800' :
                    prescription.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {prescription.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <a
                  href={prescription.filePath.startsWith('http') 
                    ? prescription.filePath 
                    : `http://localhost:5000${prescription.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  View Prescription
                </a>
              </div>

              {prescription.rejectionReason && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Rejection Reason:</strong> {prescription.rejectionReason}
                  </p>
                </div>
              )}

              {prescription.notes && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Notes:</strong> {prescription.notes}
                  </p>
                </div>
              )}

              {(user?.role === 'pharmacist' || user?.role === 'admin') && 
               prescription.status === 'pending' && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleReview(prescription._id, 'approved')}
                    className="btn-primary flex-1"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('Enter rejection reason:');
                      if (reason) {
                        handleReview(prescription._id, 'rejected', reason);
                      }
                    }}
                    className="btn-secondary flex-1 bg-red-600 text-white hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Prescriptions;

