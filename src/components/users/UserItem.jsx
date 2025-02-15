import React from "react";

export function UserItem({ user }) {
  return user === undefined ? (
    <li>User not found</li>
  ) : (
    <li>
      {user.id +
        " - " +
        user.username +
        " - " +
        user.first_name +
        " - " +
        user.last_name +
        " - " +
        user.email +
        " - " +
        (user.deleted_at != null ? "deleted" : "active")}
    </li>
  );
}
