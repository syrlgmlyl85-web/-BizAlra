import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Wand2,
  CreditCard,
  HeadphonesIcon,
  TrendingUp,
  Sparkles,
  Download,
  Copy,
  Check,
  User,
  MessageSquare,
  BarChart3,
  DollarSign,
  Clock,
  Camera,
  RefreshCw,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import {
  loadCreations,
  trackDownload,
  type Creation,
  type CreationType,
} from "@/lib/creations-store";

const TYPE_ICON: Record<CreationType, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
  message: MessageSquare,
  analytics: BarChart3,
  pricing: DollarSign,
  time: Clock,
  image: Camera,
  photo: Camera,
};

const DashboardPage = () => {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const isHe = lang === "he";
  const userName = user?.user_metadata?.full_name || (isHe ? "אורח" : "Guest");

  const [creations, setCreations] = useState<Creation[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const refreshData = useCallback(() => {
    setCreations(loadCreations());
  }, []);

  useEffect(() => {
    refreshData();
    window.addEventListener("storage", refreshData);
    return () => window.removeEventListener("storage", refreshData);
  }, [refreshData]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(isHe ? "he-IL" : "en-US", { day: "numeric", month: "short" });

  const handleCopyCreation = (creation: Creation) => {
    navigator.clipboard.writeText(creation.content);
    setCopiedId(creation.id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadCreation = (creation: Creation) => {
    const blob = new Blob([creation.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bizaira-${creation.type}-${creation.id.slice(0, 6)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    trackDownload();
    refreshData();
  };

  const typeLabel = (type: CreationType) => {
    const labels: Record<CreationType, { he: string; en: string }> = {
      message: { he: "הודעה", en: "Message" },
      analytics: { he: "ניתוח עסקי", en: "Analytics" },
      pricing: { he: "תמחור", en: "Pricing" },
      time: { he: "ניהול זמן", en: "Time" },
      image: { he: "תמונה", en: "Image" },
      photo: { he: "סטודיו", en: "Photo" },
    };
    return isHe ? labels[type].he : labels[type].en;
  };

  const dashboardCards = [
    {
      title: isHe ? "התחל ליצור" : "Start Creating",
      description: isHe ? "צור תוכן עסקי מתקדם עם AI" : "Create advanced business content with AI",
      icon: Wand2,
      href: "/create",
      primary: true,
      color: "#D4AF37",
    },
    {
      title: isHe ? "אזור אישי" : "Personal Area",
      description: isHe ? "נהל את הפרופיל וההעדפות שלך" : "Manage your profile and preferences",
      icon: User,
      href: "/profile",
      primary: false,
      color: "#D4AF37",
    },
    {
      title: isHe ? "מעקב פעילות" : "Activity Tracker",
      description: isHe ? "צפה בסטטיסטיקות השימוש שלך" : "View your usage statistics",
      icon: TrendingUp,
      href: "/dashboard",
      primary: false,
      color: "#D4AF37",
    },
    {
      title: isHe ? "ניהול מנוי" : "Subscription",
      description: isHe ? "נהל את התוכנית והתשלומים שלך" : "Manage your plan and payments",
      icon: CreditCard,
      href: "/pricing",
      primary: false,
      color: "#D4AF37",
    },
    {
      title: isHe ? "תמיכה" : "Support",
      description: isHe ? "קבל עזרה ותמיכה מקצועית" : "Get help and professional support",
      icon: HeadphonesIcon,
      href: "/support",
      primary: false,
      color: "#D4AF37",
    },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden pb-16"
      style={{
        backgroundColor: "#000080", // Deep Navy Blue
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)
        `,
      }}
    >
      {/* Background blur effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Premium Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h1
              className="text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: "Assistant, sans-serif",
                fontWeight: 700,
                color: "#D4AF37", // Gold
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              {isHe ? `שלום ${userName}, מה תרצה לבנות היום?` : `Hello ${userName}, what would you like to build today?`}
            </h1>
            <p
              className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
              style={{
                fontFamily: "Heebo, sans-serif",
                fontWeight: 300,
                color: "#FFFDD0", // Cream/Off-White
                opacity: 0.9,
              }}
            >
              {isHe
                ? "הכלי המתקדמים שלך ליצירת תוכן עסקי מקצועי ברמה הגבוהה ביותר"
                : "Your advanced tools for creating professional business content at the highest level"}
            </p>
          </div>
        </div>

        {/* 5-Card Premium Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-16">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.title}
                to={card.href}
                className={`
                  group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-3
                  ${card.primary
                    ? 'bg-gradient-to-br from-[#D4AF37] via-[#C4A037] to-[#B49437]'
                    : 'bg-gradient-to-br from-[#001040]/95 via-[#000080]/90 to-[#001040]/95 border-2'
                  }
                  backdrop-blur-xl shadow-2xl hover:shadow-[0_32px_64px_-12px_rgba(212,175,55,0.4)]
                `}
                style={{
                  borderColor: card.primary ? '#D4AF37' : 'rgba(212, 175, 55, 0.3)',
                  boxShadow: card.primary
                    ? '0 20px 40px -12px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 16px 32px -8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated background particles */}
                <div className="absolute inset-0">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-[#D4AF37]/30 rounded-full animate-pulse delay-100" />
                  <div className="absolute top-1/2 left-8 w-1.5 h-1.5 bg-white/10 rounded-full animate-pulse delay-200" />
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon with premium styling */}
                  <div className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110
                    ${card.primary
                      ? 'bg-black/20 shadow-lg shadow-black/20'
                      : 'bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20'
                    }
                  `}>
                    <IconComponent
                      size={32}
                      className={card.primary ? 'text-black' : 'text-[#D4AF37]'}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-bold mb-4 leading-tight"
                    style={{
                      fontFamily: "Assistant, sans-serif",
                      fontWeight: 700,
                      color: card.primary ? "#000000" : "#D4AF37",
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-base leading-relaxed flex-1 ${card.primary ? 'text-black/80' : 'text-[#FFFDD0]/80'}`}
                    style={{
                      fontFamily: "Heebo, sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Premium accent line */}
                  <div className={`
                    mt-6 h-1 rounded-full transition-all duration-300
                    ${card.primary ? 'bg-black/20' : 'bg-[#D4AF37]/30 group-hover:bg-[#D4AF37]/50'}
                  `} />
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{
                       background: `linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
                       filter: 'blur(20px)',
                     }} />
              </Link>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <div className="mb-16">
          <div
            className="rounded-3xl p-10 backdrop-blur-xl border-2"
            style={{
              background: "linear-gradient(135deg, rgba(0, 16, 64, 0.95) 0%, rgba(0, 0, 128, 0.9) 100%)",
              borderColor: "rgba(212, 175, 55, 0.3)",
              boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2
                  className="text-4xl font-bold mb-4"
                  style={{
                    fontFamily: "Assistant, sans-serif",
                    fontWeight: 700,
                    color: "#D4AF37",
                  }}
                >
                  {isHe ? "פעילות אחרונה" : "Recent Activity"}
                </h2>
                <p
                  className="text-lg max-w-2xl"
                  style={{
                    fontFamily: "Heebo, sans-serif",
                    fontWeight: 300,
                    color: "#FFFDD0",
                    opacity: 0.8,
                  }}
                >
                  {isHe ? "צפה ביצירות האחרונות שלך ובפעילות המערכת" : "View your recent creations and system activity"}
                </p>
              </div>
              <button
                onClick={refreshData}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: "rgba(212, 175, 55, 0.1)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  color: "#D4AF37",
                  fontFamily: "Heebo, sans-serif",
                  fontWeight: 300,
                  boxShadow: "0 8px 24px -8px rgba(212, 175, 55, 0.2)",
                }}
              >
                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                {isHe ? "רענן" : "Refresh"}
              </button>
            </div>

            {creations.length > 0 ? (
              <div className="space-y-6">
                {creations.slice(0, 5).map((creation) => (
                  <div
                    key={creation.id}
                    className="group rounded-2xl p-6 transition-all duration-300 hover:scale-102 hover:-translate-y-1"
                    style={{
                      background: "linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                          {React.createElement(TYPE_ICON[creation.type], { size: 24, style: { color: "#D4AF37" } })}
                        </div>
                        <div>
                          <h4
                            className="text-lg font-semibold mb-1"
                            style={{
                              fontFamily: "Assistant, sans-serif",
                              fontWeight: 600,
                              color: "#FFFDD0",
                            }}
                          >
                            {typeLabel(creation.type)}
                          </h4>
                          <p
                            className="text-sm"
                            style={{
                              fontFamily: "Heebo, sans-serif",
                              fontWeight: 300,
                              color: "#FFFDD0",
                              opacity: 0.7,
                            }}
                          >
                            {formatDate(creation.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleCopyCreation(creation)}
                          className="group/btn p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                          style={{
                            background: "rgba(212, 175, 55, 0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.2)",
                            color: copiedId === creation.id ? "#4CAF50" : "#D4AF37",
                          }}
                        >
                          {copiedId === creation.id ? (
                            <Check size={18} />
                          ) : (
                            <Copy size={18} className="group-hover/btn:text-[#D4AF37]" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDownloadCreation(creation)}
                          className="group/btn p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                          style={{
                            background: "rgba(212, 175, 55, 0.1)",
                            border: "1px solid rgba(212, 175, 55, 0.2)",
                            color: "#D4AF37",
                          }}
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6"
                     style={{
                       background: "rgba(212, 175, 55, 0.1)",
                       border: "2px solid rgba(212, 175, 55, 0.2)",
                     }}>
                  <Sparkles size={40} style={{ color: "#D4AF37", opacity: 0.6 }} />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "Assistant, sans-serif",
                    fontWeight: 700,
                    color: "#D4AF37",
                  }}
                >
                  {isHe ? "אין פעילות עדיין" : "No Activity Yet"}
                </h3>
                <p
                  className="text-lg max-w-md mx-auto mb-8"
                  style={{
                    fontFamily: "Heebo, sans-serif",
                    fontWeight: 300,
                    color: "#FFFDD0",
                    opacity: 0.8,
                  }}
                >
                  {isHe ? "התחל ליצור תוכן עסקי מתקדם עם הכלים שלנו" : "Start creating advanced business content with our tools"}
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #C4A037 100%)",
                    color: "#000000",
                    fontFamily: "Assistant, sans-serif",
                    fontWeight: 700,
                    boxShadow: "0 12px 32px -8px rgba(212, 175, 55, 0.4)",
                  }}
                >
                  <Sparkles size={20} />
                  {isHe ? "התחל עכשיו" : "Start Now"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
