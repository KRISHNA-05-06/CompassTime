import { useState } from "react";
import { ChevronLeft, Search, Mail, Phone, Building } from "lucide-react";
import { Header } from "../Header";

interface StaffDirectorySectionProps {
  onBack: () => void;
}

interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  level: number;
}

export function StaffDirectorySection({ onBack }: StaffDirectorySectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const staff: StaffMember[] = [
    {
      id: "1",
      name: "Jennifer Martinez",
      position: "Director of Operations",
      department: "Management",
      email: "j.martinez@company.com",
      phone: "(555) 100-0001",
      level: 1
    },
    {
      id: "2",
      name: "Michael Chen",
      position: "Department Manager",
      department: "Customer Service",
      email: "m.chen@company.com",
      phone: "(555) 100-0002",
      level: 2
    },
    {
      id: "3",
      name: "Robert Williams",
      position: "Department Manager",
      department: "Sales",
      email: "r.williams@company.com",
      phone: "(555) 100-0003",
      level: 2
    },
    {
      id: "4",
      name: "Manasa Alla",
      position: "Team Lead",
      department: "Customer Service",
      email: "manasa.alla@usf.edu",
      phone: "(555) 123-4567",
      level: 3
    },
    {
      id: "5",
      name: "Emily Davis",
      position: "Team Lead",
      department: "Sales",
      email: "e.davis@company.com",
      phone: "(555) 100-0005",
      level: 3
    },
    {
      id: "6",
      name: "David Thompson",
      position: "Senior Associate",
      department: "Customer Service",
      email: "d.thompson@company.com",
      phone: "(555) 100-0006",
      level: 4
    },
    {
      id: "7",
      name: "Lisa Anderson",
      position: "Senior Associate",
      department: "Sales",
      email: "l.anderson@company.com",
      phone: "(555) 100-0007",
      level: 4
    },
    {
      id: "8",
      name: "James Wilson",
      position: "Associate",
      department: "Customer Service",
      email: "j.wilson@company.com",
      phone: "(555) 100-0008",
      level: 5
    },
    {
      id: "9",
      name: "Maria Garcia",
      position: "Associate",
      department: "Customer Service",
      email: "m.garcia@company.com",
      phone: "(555) 100-0009",
      level: 5
    },
    {
      id: "10",
      name: "John Smith",
      position: "Associate",
      department: "Sales",
      email: "j.smith@company.com",
      phone: "(555) 100-0010",
      level: 5
    }
  ];

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-purple-100 text-purple-700';
      case 2: return 'bg-blue-100 text-blue-700';
      case 3: return 'bg-green-100 text-green-700';
      case 4: return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Staff Directory" />
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-600 mb-4">
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <p className="text-sm text-gray-500 mt-1">All team members</p>
        </div>
      </div>

      <div className="p-4">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Staff List */}
        <div className="space-y-3">
          {filteredStaff.map((member) => (
            <div key={member.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getLevelColor(member.level)}`}>
                  <span>{getInitials(member.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.position}</p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Building className="w-4 h-4" />
                      <span>{member.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No staff members found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}