import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import {
  Camera, MessageSquare, BarChart3, CalendarClock, DollarSign, BookOpen,
  ChevronLeft, ChevronRight, User, X,
} from "lucide-react";

// Luxury color palette
const CREAM_BG = "#FFFDF9";
const PALE_NAVY_BORDER = "#D8DFE8";
const GOLD = "#C8A876";
const GOLD_LIGHT = "#F5F0E8";
const NAVY = "#1A2340";
const GRAY_TEXT = "#6B7280";

const CreatePage = () => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const isHe = lang === "he";
  const [showProfile, setShowProfile] = useState(false);
  const Arrow = isHe ? ChevronLeft : ChevronRight;

  const tools = [
    {
      id: "studio",
      icon: Camera,
      titleKey: "tool.studio.title",
      descKey:  "tool.studio.desc",
      route:    "/create/product-photos",
      isPrimary: true,
    },
    {
      id: "message",
      icon: MessageSquare,
      titleKey: "tool.messages.title",
      descKey:  "tool.messages.desc",
      route:    "/create/messages",
    },
    {
      id: "analytics",
      icon: BarChart3,
      titleKey: "tool.analytics.title",
      descKey:  "tool.analytics.desc",
      route:    "/create/analytics",
    },
    {
      id: "time",
      icon: CalendarClock,
      titleKey: "tool.time.title",
      descKey:  "tool.time.desc",
      route:    "/create/time",
    },
    {
      id: "pricing",
      icon: DollarSign,
      titleKey: "tool.pricing.title",
      descKey:  "tool.pricing.desc",
      route:    "/create/pricing",
    },
    {
      id: "journal",
      icon: BookOpen,
      titleKey: "tool.journal.title",
      descKey:  "tool.journal.desc",
      route:    "/journal",
    },
  ];

  return (
    <div className="min-h-screen pb-32" dir={isHe ? "rtl" : "ltr"} style={{ backgroundColor: CREAM_BG }}>
      {/* Header with Profile Button */}
      <div className="px-6 pt-8 pb-8 flex items-start justify-between">
        <div className="flex-1">
          {/* Luxury Caption */}
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: GRAY_TEXT, letterSpacing: '0.1em' }}>
            {isHe ? "סטודיו AI" : "AI STUDIO"}
          </p>
          
          {/* Main Heading - Serif/Elegant Font */}
          <h1 className="text-4xl font-bold leading-tight mb-2" style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}>
            {t("create.title")}
          </h1>
          
          {/* Subheading */}
          <p className="text-base leading-relaxed" style={{ color: GRAY_TEXT }}>
            {isHe ? "בחרי את הכלי שתרצי לפתוח" : "Choose the tool you'd like to open"}
          </p>
        </div>
        
        {/* Profile Button - Top Right */}
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 shrink-0"
          style={{
            border: `2px solid ${PALE_NAVY_BORDER}`,
            color: NAVY,
          }}
          title={isHe ? "אזור אישי" : "Profile Area"}
        >
          <User size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Profile Panel - Slide In from Top Right */}
      {showProfile && (
        <div
          className="absolute top-0 right-0 w-96 h-screen shadow-2xl z-50 animate-float-up"
          style={{ backgroundColor: CREAM_BG, borderLeft: `1px solid ${PALE_NAVY_BORDER}` }}
        >
          <div className="p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-6 right-6 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{ color: NAVY }}
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Profile Header */}
            <div className="mt-8 mb-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: GOLD_LIGHT, border: `2px solid ${GOLD}` }}
              >
                <User size={40} strokeWidth={1} style={{ color: GOLD }} />
              </div>
              <h2 className="text-2xl font-bold text-center" style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}>
                {isHe ? "אזור אישי" : "Profile Area"}
              </h2>
              <p className="text-center text-sm mt-2" style={{ color: GRAY_TEXT }}>
                {isHe ? "ניהול פרטיך ועדיפויותיך" : "Manage your details and preferences"}
              </p>
            </div>

            {/* Profile Menu Items */}
            <div className="space-y-3">
              {[
                { label: isHe ? "הגדרות" : "Settings", icon: "⚙️" },
                { label: isHe ? "הנתונים שלי" : "My Data", icon: "📊" },
                { label: isHe ? "התראות" : "Notifications", icon: "🔔" },
                { label: isHe ? "יציאה" : "Logout", icon: "🚪" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className="w-full py-3 px-4 rounded-lg text-start transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    border: `1px solid ${PALE_NAVY_BORDER}`,
                    color: NAVY,
                    backgroundColor: 'transparent',
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tool cards - Vertical List */}
      <div className="px-6 space-y-3">
        {tools.map((tool, i) => {
          const IconComp = tool.icon;
          const isPrimary = tool.isPrimary;

          return (
            <button
              key={tool.id}
              onClick={() => navigate(tool.route)}
              className="w-full flex items-start gap-4 p-4 rounded-lg transition-all duration-300 group animate-float-up"
              style={{
                backgroundColor: isPrimary ? GOLD_LIGHT : "transparent",
                border: `2px solid ${isPrimary ? GOLD : PALE_NAVY_BORDER}`,
                animationDelay: `${i * 55}ms`,
              }}
              onMouseEnter={(e) => {
                if (!isPrimary) {
                  e.currentTarget.style.backgroundColor = `${PALE_NAVY_BORDER}15`;
                  e.currentTarget.style.borderColor = GOLD;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isPrimary ? GOLD_LIGHT : "transparent";
                e.currentTarget.style.borderColor = isPrimary ? GOLD : PALE_NAVY_BORDER;
              }}
            >
              {/* Icon - Left Side */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: isPrimary ? GOLD : `${PALE_NAVY_BORDER}20` }}
              >
                <IconComp
                  size={24}
                  strokeWidth={1.2}
                  style={{ color: isPrimary ? GOLD : NAVY, opacity: 0.8 }}
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 text-start">
                <div className="text-lg font-semibold leading-snug" style={{ color: NAVY }}>
                  {t(tool.titleKey)}
                </div>
                <div className="text-sm leading-relaxed mt-1" style={{ color: GRAY_TEXT }}>
                  {t(tool.descKey)}
                </div>
              </div>

              {/* Arrow - Right Side */}
              <div className="flex items-center justify-center shrink-0 transition-all duration-300 group-hover:translate-x-1">
                <Arrow size={18} strokeWidth={2} style={{ color: isPrimary ? GOLD : NAVY, opacity: 0.6 }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Profile Overlay */}
      {showProfile && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default CreatePage;
