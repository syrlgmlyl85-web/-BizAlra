import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wand2, User, BarChart3, Crown, HelpCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import CookieConsentPopup from "@/components/CookieConsentPopup";
import { useI18n } from "@/lib/i18n";
import { safeGetItem } from "@/lib/safe-storage";
import { safeGetSessionItem, safeRemoveSessionItem } from "@/lib/safe-storage";

// Luxury Color Palette
const DEEP_MIDNIGHT_BLUE = "#001830";

const HomePage = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const isHe = lang === "he";
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  useEffect(() => {
    // Check if user just completed onboarding and hasn't seen cookie consent
    const onboardingJustCompleted = safeGetSessionItem("onboarding_just_completed");
    const cookieConsentShown = safeGetItem("bizaira_cookie_consent_shown");

    if (onboardingJustCompleted && !cookieConsentShown) {
      setShowCookiePopup(true);
      // Clear the flag so it doesn't show again
      safeRemoveSessionItem("onboarding_just_completed");
    }
  }, []);

  // Feature rows for premium executive navigation
  const features = [
    {
      id: 1,
      icon: Wand2,
      title: isHe ? "התחל ליצור" : "Start Creating",
      desc: isHe ? "צור ונהל תוכן מותאם אישית למותג שלך" : "Create and manage custom branded content",
      path: "/create",
    },
    {
      id: 2,
      icon: User,
      title: isHe ? "אזור אישי" : "Personal Area",
      desc: isHe ? "עדכון פרטים וניהול הגדרות המערכת" : "Update details and manage system settings",
      path: "/profile",
    },
    {
      id: 3,
      icon: BarChart3,
      title: isHe ? "מעקב פעילות" : "Activity Tracking",
      desc: isHe ? "צפה בדוחות שימוש, מגמות ונתוני ביצועים" : "View usage reports, trends and performance data",
      path: "/create/analytics",
    },
    {
      id: 4,
      icon: Crown,
      title: isHe ? "ניהול מנוי" : "Subscription Management",
      desc: isHe ? "שדרוג התוכנית וניהול אפשרויות תשלום" : "Upgrade your plan and manage payment options",
      path: "/pricing",
    },
    {
      id: 5,
      icon: HelpCircle,
      title: isHe ? "תמיכה" : "Support",
      desc: isHe ? "קבלת מענה מהיר וסיוע טכני" : "Receive fast response and technical assistance",
      path: "/support",
    },
  ];

  return (
    <div
      className="min-h-screen pb-24 px-4 sm:px-6 md:px-8"
      dir={isHe ? "rtl" : "ltr"}
      style={{ backgroundColor: "#F8F9FA" }}
    >
      {/* Clean Header with Login Button */}
      <div className="pt-12 pb-12 max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 ${isHe ? "text-right" : "text-left"}`}
            style={{ color: DEEP_MIDNIGHT_BLUE, fontFamily: "Inter, system-ui, sans-serif", fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            {isHe ? "ברוכים הבאים למרכז הניהול העסקי שלך" : "Welcome to your business management hub"}
          </h1>
        </div>
        <button
          onClick={() => navigate("/auth")}
          className="px-6 sm:px-8 py-3 rounded-2xl font-semibold text-white text-sm sm:text-base transition-all duration-300 active:scale-95 shrink-0"
          style={{ backgroundColor: DEEP_MIDNIGHT_BLUE, fontFamily: "Inter, system-ui, sans-serif" }}
        >
          {isHe ? "התחברות / הרשמה" : "Login / Sign Up"}
        </button>
      </div>

      {/* Executive feature rows */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => navigate(feature.path)}
                className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-[#DEE2E6] bg-transparent p-6 text-left transition-colors duration-300 ease-in-out hover:bg-[#001830]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#DEE2E6] bg-transparent text-[#001830] transition-colors duration-300 group-hover:border-transparent group-hover:bg-white/5 group-hover:text-white">
                    <IconComponent size={28} className="text-[#001830] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-[#001830] transition-colors duration-300 group-hover:text-white">
                      {feature.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-6 text-slate-600 transition-colors duration-300 group-hover:text-white/90">
                      {feature.desc}
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-sm font-semibold text-slate-500 transition-colors duration-300 group-hover:text-white/90">
                  {isHe ? "פתח" : "Open"}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <CookieConsentPopup 
        isVisible={showCookiePopup} 
        onConsent={() => setShowCookiePopup(false)} 
      />
      <BottomNav />
    </div>
  );
};

export default HomePage;
