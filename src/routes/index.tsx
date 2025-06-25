import { createFileRoute } from "@tanstack/react-router";
// import { useAuth } from "@/store/auth";
import { LoginForm } from "@/components/login-form";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { NotificationBadge } from "@/components/notification-badge";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // const { isLogin, login, logout, userInfo, setUserInfo, cleanUserInfo } =
  //   useAuth();
  return (
    <>
      <meta
        name="keywords"
        content="React, JavaScript, semantic markup, html"
      />
      <title>Actuarial</title>
      <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Link to="/jobs">
          <NotificationBadge label={"2"}>
            <Button variant="link">Go to Jobs</Button>
          </NotificationBadge>
        </Link>
      </div>
    </>
  );
}
