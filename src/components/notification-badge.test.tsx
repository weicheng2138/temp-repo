import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NotificationBadge } from "./notification-badge";

describe("NotificationBadge", () => {
  it("should render children", () => {
    render(
      <NotificationBadge>
        <div>child</div>
      </NotificationBadge>,
    );
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("should not render badge when show is false", () => {
    render(
      <NotificationBadge show={false} label="1">
        <div>child</div>
      </NotificationBadge>,
    );
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("should not render badge when label is undefined", () => {
    render(
      <NotificationBadge>
        <div>child</div>
      </NotificationBadge>,
    );
    expect(screen.queryByTestId("notification-badge")).not.toBeInTheDocument();
  });

  it("should render badge with label", () => {
    render(
      <NotificationBadge label="5">
        <div>child</div>
      </NotificationBadge>,
    );
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render a dot when label is an empty string", () => {
    render(
      <NotificationBadge label="">
        <div>child</div>
      </NotificationBadge>,
    );
    const badge = screen.getByTestId("notification-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("px-1 py-1");
  });

  it("should apply custom className to the badge", () => {
    render(
      <NotificationBadge label="1" className="custom-class">
        <div>child</div>
      </NotificationBadge>,
    );
    const badge = screen.getByText("1");
    expect(badge).toHaveClass("custom-class");
  });
});
