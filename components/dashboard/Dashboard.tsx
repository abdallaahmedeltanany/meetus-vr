"use client";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./dashboard.module.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, fetchUser, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleLogout = () => {
    logout();
    toast.success("You have logged out successfully ");
    router.push("/login");
  };

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h1 className={styles.header}>Dashboard</h1>
        <p className={styles.formText}>
          <strong>User ID:</strong> {user.id}
        </p>
        <p className={styles.formText}>
          <strong>Email:</strong> {user.email}
        </p>

        <button onClick={handleLogout} className={styles.btn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
