import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  User,
  BarChart3,
  CreditCard,
  HelpCircle,
  Mail,
  Briefcase,
  Target,
  Clock,
  Crown,
  Zap,
  TrendingUp,
  Shield,
  Calendar,
  RefreshCw,
  Volume2,
  Video,
  Image,
  Type,
  Plus,
  Download,
  Trash2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { getActivityStats } from "@/lib/activity-tracker";

const DEEP_MIDNIGHT_BLUE = "#001830";
const CLEAN_WHITE = "#FFFFFF";
const FAINT_GRAY = "#F0F0F0";
const LIGHT_GRAY = "#9CA3AF";

  const fullName = profile?.full_name || user?.user_metadata?.full_name || (isHe ? "אורח" : "Guest");
  const planLabel = profile?.plan ?? (isHe ? "חינם" : "Free");
  const usedLabel = `${totalActions}/${limit}`;
  const usagePercent = Math.min(100, Math.round((totalActions / limit) * 100));
  const renewalLabel = nextRenewalDate
    ? new Date(nextRenewalDate).toLocaleDateString(isHe ? "he-IL" : "en-US", {
        day: "numeric",
        month: "short",
      })
    : isHe
    ? "טרם נעשה שימוש"
    : "No usage yet";

  const cards = [
    {
      title: isHe ? "סטודיו" : "Studio",
      description: isHe ? "גשו לכלי היצירה ולסטודיו החכם" : "Access the creation tools and smart studio",
      icon: Sparkles,
      href: "/create",
    },
    {
      title: isHe ? "אזור אישי" : "Personal Area",
      description: isHe ? "המשך לנהל את ההגדרות והסטטוס שלך" : "Continue managing your settings and status",
      icon: User,
      href: "/profile",
    },
    {
      title: isHe ? "פעילות" : "Activity",
      description: isHe ? "צפו בסטטיסטיקות השימוש שלכם" : "See your usage statistics",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      title: isHe ? "ניהול מנוי" : "Subscription",
      description: isHe ? "בדקו את התכנית והצעות השדרוג" : "Review your plan and upgrade options",
      icon: CreditCard,
      href: "/pricing",
    },
    {
      title: isHe ? "תמיכה" : "Support",
      description: isHe ? "קבלו מענה מקצועי וזריז" : "Get fast professional support",
      icon: HelpCircle,
      href: "/support",
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen pb-20" style={{ backgroundColor: CLEAN_WHITE, color: DEEP_MIDNIGHT_BLUE }} dir={isHe ? "rtl" : "ltr"}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header Section */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {/* Top Left: Upgrade to PRO Button */}
              <button
                className="px-4 py-2 rounded-full text-white font-semibold text-sm"
                style={{ backgroundColor: DEEP_MIDNIGHT_BLUE, fontFamily: "'Heebo', sans-serif" }}
              >
                {isHe ? "שדרג ל-PRO" : "Upgrade to PRO"}
              </button>
              {/* Top Right: Free Plan Label */}
              <span className="text-sm" style={{ color: LIGHT_GRAY, fontFamily: "'Heebo', sans-serif" }}>
                {isHe ? "תוכנית חינם" : "Free Plan"}
              </span>
            </div>
            {/* Main Heading: Credits with Counter */}
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold" style={{ color: DEEP_MIDNIGHT_BLUE, fontFamily: "'Assistant', sans-serif" }}>
                {isHe ? "קרדיטים" : "Credits"}
              </h1>
              <span className="text-2xl font-semibold" style={{ color: DEEP_MIDNIGHT_BLUE, fontFamily: "'Assistant', sans-serif" }}>
                {usedLabel}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${usagePercent}%`, backgroundColor: DEEP_MIDNIGHT_BLUE }}
              />
            </div>
          </header>

          {/* Activity Stats Grid */}
          <section className="mb-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Side */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <BarChart3 size={20} style={{ color: DEEP_MIDNIGHT_BLUE }} />
                  <span className="text-sm font-medium" style={{ fontFamily: "'Heebo', sans-serif" }}>
                    {isHe ? "סיכום שבועי" : "Weekly Summary"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} style={{ color: DEEP_MIDNIGHT_BLUE }} />
                  <span className="text-sm font-medium" style={{ fontFamily: "'Heebo', sans-serif" }}>
                    {isHe ? "סיכום יומי" : "Daily Summary"}
                  </span>
                </div>
              </div>
              {/* Right Side */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar size={20} style={{ color: DEEP_MIDNIGHT_BLUE }} />
                  <span className="text-sm font-medium" style={{ fontFamily: "'Heebo', sans-serif" }}>
                    {isHe ? "שימוש ראשון" : "First Use"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw size={20} style={{ color: DEEP_MIDNIGHT_BLUE }} />
                  <span className="text-sm font-medium" style={{ fontFamily: "'Heebo', sans-serif" }}>
                    {isHe ? "חידוש הבא" : "Next Renewal"}
                  </span>
                  <span className="text-sm" style={{ color: LIGHT_GRAY, fontFamily: "'Heebo', sans-serif" }}>
                    {renewalLabel}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Cards */}
          <section className="mb-8">
            <div className="grid grid-cols-3 gap-4">
              {/* Creations Done */}
              <div className="border border-gray-300 rounded-lg p-6 text-center">
                <Plus size={32} className="mx-auto mb-2" style={{ color: DEEP_MIDNIGHT_BLUE }} />
                <p className="text-2xl font-semibold" style={{ color: DEEP_MIDNIGHT_BLUE, fontFamily: "'Assistant', sans-serif" }}>
                  {creationsCount || 0}
                </p>
                <p className="text-sm" style={{ color: LIGHT_GRAY, fontFamily: "'Heebo', sans-serif" }}>
                  {isHe ? "יצירות בוצעו" : "Creations Done"}
                </p>
              </div>
              {/* Downloads */}
              <div className="border border-gray-300 rounded-lg p-6 text-center">
                <Download size={32} className="mx-auto mb-2" style={{ color: DEEP_MIDNIGHT_BLUE }} />
                <p className="text-2xl font-semibold" style={{ color: DEEP_MIDNIGHT_BLUE, fontFamily: "'Assistant', sans-serif" }}>
                  {downloadsCount || 0}
                </p>
                <p className="text-sm" style={{ color: LIGHT_GRAY, fontFamily: "'Heebo', sans-serif" }}>
                  {isHe ? "הורדות" : "Downloads"}
                </p>
              </div>
              {/* Deletions */}
              <div className="border border-gray-300 rounded-lg p-6 text-center">
                <Trash2 size={32} className="mx-auto mb-2" style={{ color: DEEP_MIDNIGHT_BLUE }} />
                <p className="text-2xl font-semibold" style={{ color: DEEP_MIDNIGHT_BLUE, fontFamily: "'Assistant', sans-serif" }}>
                  {deletionsCount || 0}
                </p>
                <p className="text-sm" style={{ color: LIGHT_GRAY, fontFamily: "'Heebo', sans-serif" }}>
                  {isHe ? "מחיקות" : "Deletions"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation Menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
          {[
            { icon: Volume2, label: isHe ? "אודיו" : "Audio", active: false },
            { icon: Video, label: isHe ? "וידאו" : "Video", active: false },
            { icon: Image, label: isHe ? "תמונה" : "Image", active: false },
            { icon: Type, label: isHe ? "טקסט" : "Text", active: false },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-all duration-200 ${item.active ? 'bg-[#001830] text-white' : 'text-[#001830]'}`}
            >
              <item.icon size={24} strokeWidth={item.active ? 2 : 1.5} />
              <span className="text-[11px] font-medium leading-none">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default ProfilePage;
