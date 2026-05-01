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
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { lang } = useI18n();
  const isHe = lang === "he";
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const fullName = profile?.full_name || user?.user_metadata?.full_name || (isHe ? "אורח" : "Guest");
  const creditsUsed = profile?.credits_used ?? 0;
  const creditsTotal = profile?.credits_total ?? 5;
  const creditsPercentage = creditsTotal > 0 ? Math.min(100, Math.round((creditsUsed / creditsTotal) * 100)) : 0;

  const cards = [
    {
      title: isHe ? "אתחלו ליצור" : "Start Creating",
      description: isHe ? "צרו תוכן שיווקי, תמונות ופוסטים בלחיצה אחת" : "Create marketing content, images, and posts in one click",
      icon: Sparkles,
      href: "/create",
    },
    {
      title: isHe ? "אזור אישי" : "Personal Area",
      description: isHe ? "נהלו את הפרופיל, ההעדפות וההגדרות שלכם" : "Manage your profile, preferences and settings",
      icon: User,
      href: "/profile",
    },
    {
      title: isHe ? "מעקב פעילות" : "Activity Tracker",
      description: isHe ? "צפו בסטטיסטיקות וביצועים בזמן אמת" : "View your performance and activity in real time",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      title: isHe ? "ניהול מנוי" : "Subscription",
      description: isHe ? "בדקו את התוכנית שלכם ואת מצב התשלומים" : "Review your plan and payments",
      icon: CreditCard,
      href: "/pricing",
    },
    {
      title: isHe ? "תמיכה" : "Support",
      description: isHe ? "קבלו עזרה מהירה ותשובות מקצועיות" : "Get fast help and professional answers",
      icon: HelpCircle,
      href: "/support",
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827]" dir={isHe ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <section className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: "Assistant, sans-serif" }}>
            {isHe ? `שלום ${fullName}, מה תרצי לבנות היום?` : `Hello ${fullName}, what would you like to build today?`}
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-[#6B7280] leading-8" style={{ fontFamily: "Heebo, sans-serif" }}>
            {isHe
              ? "מרחב אישי מודרני לניהול העסק שלך הכולל סטטוס תכנית, שימוש בקרדיטים וכלים מתקדמים בעיצוב נקי ופרופסיונלי."
              : "A modern personal dashboard for managing your business with plan status, credit usage, and advanced tools in a clean professional layout."}
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr] mb-14">
          <article className="rounded-[20px] bg-white border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] mb-3" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "סטטוס תוכנית" : "Plan Status"}
                </p>
                <h2 className="text-3xl font-semibold text-[#111827]" style={{ fontFamily: "Assistant, sans-serif" }}>
                  {isHe ? "Free Plan" : "Free Plan"}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#6B7280] mb-1" style={{ fontFamily: "Heebo, sans-serif" }}>
                  {isHe ? "קרדיטים" : "Credits"}
                </p>
                <p className="text-2xl font-semibold text-[#111827]" style={{ fontFamily: "Assistant, sans-serif" }}>
                  {creditsUsed}/{creditsTotal}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-full bg-[#E5E7EB] h-2.5">
                <div
                  className="h-2.5 rounded-full bg-[#4338CA] transition-all duration-500"
                  style={{ width: `${creditsPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-[#6B7280] font-medium" style={{ fontFamily: "Heebo, sans-serif" }}>
                <span>{isHe ? "נוצל" : "Used"}</span>
                <span>{isHe ? "זמין" : "Available"}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-2" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                    {isHe ? "שימוש" : "Usage"}
                  </p>
                  <p className="text-lg font-semibold text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                    {creditsPercentage}%
                  </p>
                </div>
                <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-2" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                    {isHe ? "תוכנית" : "Plan"}
                  </p>
                  <p className="text-lg font-semibold text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                    {profile?.plan ?? (isHe ? "חינם" : "Free")}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[20px] bg-white border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                <Crown size={24} className="text-[#4338CA]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280] mb-2" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "שדרוג ל-PRO" : "Upgrade to PRO"}
                </p>
                <h3 className="text-2xl font-semibold text-[#111827]" style={{ fontFamily: "Assistant, sans-serif" }}>
                  {isHe ? "פתיחת אפשרויות מתקדמות" : "Unlock advanced capabilities"}
                </h3>
              </div>
            </div>

            <p className="text-sm leading-7 text-[#6B7280] mb-6" style={{ fontFamily: "Heebo, sans-serif" }}>
              {isHe
                ? "קבלו קרדיטים ללא הגבלה, ניתוחים חכמים ותמיכה מועדפת בצורה מקצועית ועדכנית."
                : "Get unlimited credits, smarter insights, and priority support in a polished, modern experience."}
            </p>

            <div className="grid gap-3 mb-6">
              <div className="flex items-center gap-3 rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-4">
                <Zap className="text-[#4338CA]" size={18} strokeWidth={2} />
                <span className="text-sm text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                  {isHe ? "קרדיטים ללא הגבלה" : "Unlimited credits"}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-4">
                <TrendingUp className="text-[#4338CA]" size={18} strokeWidth={2} />
                <span className="text-sm text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                  {isHe ? "כלים עסקיים מתקדמים" : "Advanced business tools"}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-4">
                <Shield className="text-[#4338CA]" size={18} strokeWidth={2} />
                <span className="text-sm text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                  {isHe ? "תמיכה מועדפת" : "Priority support"}
                </span>
              </div>
            </div>

            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-[16px] bg-[#4338CA] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3730A3] transition-colors duration-300"
              style={{ fontFamily: "Assistant, sans-serif" }}
            >
              {isHe ? "שדרג עכשיו" : "Upgrade now"}
            </Link>
          </article>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-14">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={card.title}
                to={card.href}
                className="group rounded-[20px] bg-white border border-[#E5E7EB] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_15px_-10px_rgba(0,0,0,0.12)]"
              >
                <div className="inline-flex items-center justify-center mx-auto mb-5 h-14 w-14 rounded-2xl bg-[#F3F4F6]">
                  <IconComponent size={24} className="text-[#4B5563]" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-2" style={{ fontFamily: "Assistant, sans-serif" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-7 text-[#6B7280] mx-auto max-w-[16rem]" style={{ fontFamily: "Heebo, sans-serif" }}>
                  {card.description}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[20px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-[#111827] mb-3" style={{ fontFamily: "Assistant, sans-serif" }}>
              {isHe ? "הפרופיל האישי שלך" : "Your Personal Profile"}
            </h2>
            <p className="mx-auto max-w-2xl text-sm md:text-base text-[#6B7280] leading-7" style={{ fontFamily: "Heebo, sans-serif" }}>
              {isHe ? "כל המידע וההגדרות שלך במקום אחד נקי ומדויק." : "All your information and settings in one clean and precise place."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB]">
                  <User size={20} className="text-[#4B5563]" strokeWidth={2} />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280]" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "שם מלא" : "Full Name"}
                </p>
              </div>
              <p className="text-lg text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                {fullName}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB]">
                  <Mail size={20} className="text-[#4B5563]" strokeWidth={2} />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280]" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "דואר אלקטרוני" : "Email"}
                </p>
              </div>
              <p className="text-lg text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                {profile?.email ?? user?.email ?? (isHe ? "לא זמין" : "Not available")}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB]">
                  <Briefcase size={20} className="text-[#4B5563]" strokeWidth={2} />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280]" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "סוג עסק" : "Business Type"}
                </p>
              </div>
              <p className="text-lg text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                {profile?.business_type ?? (isHe ? "לא צויין" : "Not specified")}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB]">
                  <Target size={20} className="text-[#4B5563]" strokeWidth={2} />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280]" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "קהל יעד" : "Target Audience"}
                </p>
              </div>
              <p className="text-lg text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                {profile?.target_audience ?? (isHe ? "לא צויין" : "Not specified")}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB]">
                  <CreditCard size={20} className="text-[#4B5563]" strokeWidth={2} />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280]" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "תוכנית" : "Plan"}
                </p>
              </div>
              <p className="text-lg text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                {profile?.plan ?? (isHe ? "חינם" : "Free")}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-[#E5E7EB]">
                  <Clock size={20} className="text-[#4B5563]" strokeWidth={2} />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7280]" style={{ fontFamily: "Assistant, sans-serif", fontWeight: 700 }}>
                  {isHe ? "קרדיטים" : "Credits"}
                </p>
              </div>
              <p className="text-lg text-[#111827]" style={{ fontFamily: "Heebo, sans-serif" }}>
                {creditsUsed}/{creditsTotal}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={handleSignOut}
              className="rounded-[16px] border border-[#E5E7EB] bg-white px-6 py-4 text-[#111827] font-semibold hover:shadow-sm transition-shadow duration-300"
              style={{ fontFamily: "Heebo, sans-serif" }}
            >
              {isHe ? "התנתק" : "Sign Out"}
            </button>
            <Link
              to="/onboarding"
              className="rounded-[16px] bg-[#4338CA] px-6 py-4 text-white font-semibold hover:bg-[#3730A3] transition-colors duration-300 flex items-center justify-center"
              style={{ fontFamily: "Assistant, sans-serif" }}
            >
              {isHe ? "ערוך פרופיל" : "Edit Profile"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
