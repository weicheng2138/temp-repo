import { createFileRoute } from "@tanstack/react-router";
// import { useAuth } from "@/store/auth";
import { LoginForm } from "@/components/login-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // const { isLogin, login, logout, userInfo, setUserInfo, cleanUserInfo } =
  //   useAuth();
  const { t, i18n } = useTranslation();
  return (
    <>
      <meta
        name="keywords"
        content="React, JavaScript, semantic markup, html"
      />
      <title>Actuarial</title>
      <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{t("monitoring.description")}</div>
        <Button onClick={() => i18n.changeLanguage("zh")}>change</Button>
      </div>
    </>
  );
}
