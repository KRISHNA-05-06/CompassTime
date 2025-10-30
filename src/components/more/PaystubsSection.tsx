import { ChevronLeft, Download, FileText, Calendar } from "lucide-react";
import { Header } from "../Header";
import { Button } from "../ui/button";

interface PaystubsSectionProps {
  onBack: () => void;
}

interface Paystub {
  id: string;
  payPeriod: string;
  payDate: string;
  grossPay: number;
  netPay: number;
  hours: number;
}

export function PaystubsSection({ onBack }: PaystubsSectionProps) {
  const paystubs: Paystub[] = [
    {
      id: "1",
      payPeriod: "Oct 01 - Oct 15, 2025",
      payDate: "October 17, 2025",
      grossPay: 560.00,
      netPay: 462.00,
      hours: 40
    },
    {
      id: "2",
      payPeriod: "Sep 16 - Sep 30, 2025",
      payDate: "October 02, 2025",
      grossPay: 532.00,
      netPay: 438.60,
      hours: 38
    },
    {
      id: "3",
      payPeriod: "Sep 01 - Sep 15, 2025",
      payDate: "September 17, 2025",
      grossPay: 560.00,
      netPay: 462.00,
      hours: 40
    },
    {
      id: "4",
      payPeriod: "Aug 16 - Aug 31, 2025",
      payDate: "September 02, 2025",
      grossPay: 546.00,
      netPay: 450.30,
      hours: 39
    },
    {
      id: "5",
      payPeriod: "Aug 01 - Aug 15, 2025",
      payDate: "August 17, 2025",
      grossPay: 560.00,
      netPay: 462.00,
      hours: 40
    }
  ];

  const handleDownload = (paystub: Paystub) => {
    // Mock download functionality
    alert(`Downloading paystub for ${paystub.payPeriod}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Paystubs" />
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-600 mb-4">
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <p className="text-sm text-gray-500 mt-1">View and download your pay documents</p>
        </div>
      </div>

      <div className="p-4">
        {/* Current Pay Period Summary */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 mb-4 text-white">
          <div className="text-sm opacity-90 mb-1">Current Pay Period</div>
          <div className="text-2xl mb-4">{paystubs[0].payPeriod}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm opacity-90">Gross Pay</div>
              <div className="text-xl">${paystubs[0].grossPay.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm opacity-90">Net Pay</div>
              <div className="text-xl">${paystubs[0].netPay.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Paystubs List */}
        <div className="space-y-3">
          <h2 className="text-gray-900">Previous Paystubs</h2>
          {paystubs.map((paystub) => (
            <div key={paystub.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-gray-900">{paystub.payPeriod}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>Paid: {paystub.payDate}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload(paystub)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                <div>
                  <div className="text-xs text-gray-500">Hours</div>
                  <div className="text-gray-900">{paystub.hours}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Gross</div>
                  <div className="text-gray-900">${paystub.grossPay.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Net</div>
                  <div className="text-gray-900">${paystub.netPay.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tax Forms Section */}
        <div className="mt-6">
          <h2 className="text-gray-900 mb-3">Tax Documents</h2>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-gray-900">W-2 Form 2024</div>
                  <div className="text-sm text-gray-500">Annual tax statement</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
