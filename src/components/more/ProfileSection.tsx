import { useState } from "react";
import { ChevronLeft, Mail, Phone, MapPin, Briefcase, Hash, Calendar, Building, Edit2, Save, X } from "lucide-react";
import { Header } from "../Header";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface ProfileSectionProps {
  onBack: () => void;
}

interface ProfileItemProps {
  icon: any;
  label: string;
  value: string;
  editable?: boolean;
  field?: 'email' | 'phone';
  isEditing: boolean;
  editedInfo: { email: string; phone: string };
  onEditChange: (field: 'email' | 'phone', value: string) => void;
}

const ProfileItem = ({ icon: Icon, label, value, editable, field, isEditing, editedInfo, onEditChange }: ProfileItemProps) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm text-gray-500">{label}</div>
      {isEditing && editable && field ? (
        <Input
          type={field === 'email' ? 'email' : 'tel'}
          value={editedInfo[field]}
          onChange={(e) => onEditChange(field, e.target.value)}
          className="mt-1"
        />
      ) : (
        <div className="text-gray-900 break-words">{value}</div>
      )}
    </div>
  </div>
);

export function ProfileSection({ onBack }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Manasa Alla",
    employeeId: "EMP-2847",
    email: "manasa.alla@usf.edu",
    phone: "(555) 123-4567",
    department: "Customer Service",
    position: "Team Lead",
    location: "Building A - Floor 2",
    hireDate: "January 15, 2023",
    supervisor: "Michael Chen",
    payRate: "$14.00/hour",
    emergencyContact: "James Johnson - (555) 987-6543"
  });

  const [editedInfo, setEditedInfo] = useState({
    email: userInfo.email,
    phone: userInfo.phone
  });

  const handleEdit = () => {
    setEditedInfo({
      email: userInfo.email,
      phone: userInfo.phone
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserInfo({
      ...userInfo,
      email: editedInfo.email,
      phone: editedInfo.phone
    });
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedInfo({
      email: userInfo.email,
      phone: userInfo.phone
    });
    setIsEditing(false);
  };

  const handleEditChange = (field: 'email' | 'phone', value: string) => {
    setEditedInfo({ ...editedInfo, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Profile" />
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="flex items-center gap-2 text-blue-600">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            {!isEditing ? (
              <Button 
                onClick={handleEdit} 
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-blue-600"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleCancel} 
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-600"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </Button>
                <Button 
                  onClick={handleSave} 
                  size="sm"
                  className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </Button>
              </div>
            )}
          </div>
          <h1 className="text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Profile Photo and Name */}
        <div className="bg-white rounded-lg p-6 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white mb-4">
              <span className="text-3xl">MA</span>
            </div>
            <h2 className="text-gray-900 mb-1">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.position}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="text-gray-900 mb-3">Personal Information</h3>
          <ProfileItem 
            icon={Hash} 
            label="Employee ID" 
            value={userInfo.employeeId} 
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
          <ProfileItem 
            icon={Mail} 
            label="Email" 
            value={userInfo.email} 
            editable={true} 
            field="email"
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
          <ProfileItem 
            icon={Phone} 
            label="Phone" 
            value={userInfo.phone} 
            editable={true} 
            field="phone"
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
        </div>

        {/* Employment Details */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="text-gray-900 mb-3">Employment Details</h3>
          <ProfileItem 
            icon={Building} 
            label="Department" 
            value={userInfo.department}
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
          <ProfileItem 
            icon={Briefcase} 
            label="Position" 
            value={userInfo.position}
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
          <ProfileItem 
            icon={MapPin} 
            label="Location" 
            value={userInfo.location}
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
          <ProfileItem 
            icon={Calendar} 
            label="Hire Date" 
            value={userInfo.hireDate}
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
          <ProfileItem 
            icon={Briefcase} 
            label="Supervisor" 
            value={userInfo.supervisor}
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
          <ProfileItem 
            icon={Briefcase} 
            label="Pay Rate" 
            value={userInfo.payRate}
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-gray-900 mb-3">Emergency Contact</h3>
          <ProfileItem 
            icon={Phone} 
            label="Emergency Contact" 
            value={userInfo.emergencyContact}
            isEditing={isEditing}
            editedInfo={editedInfo}
            onEditChange={handleEditChange}
          />
        </div>
      </div>
    </div>
  );
}