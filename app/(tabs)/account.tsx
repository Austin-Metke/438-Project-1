import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { deleteToken, getToken } from "@/api/tokenStorage";
import { router } from "expo-router";
import { getProfile, UserProfile} from "@/api/auth";



export default function AccountScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = (await getToken()) ?? "";
        if (!token) {
          router.replace("/(auth)/login");
          return;
        }
        const p = await getProfile(token);
        console.log(p);
        if (!cancelled) setProfile(p);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load profile");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleEditProfile = () => {
    console.log("Edit profile pressed");
    // router.push("/account/edit");
  };

  const handleSettings = () => {
    console.log("Settings pressed");
    // router.push("/settings");
  };

  const handleLogout = async () => {
    try {
      await deleteToken();
    } finally {
      router.replace("/(auth)/login");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator />
        <Text style={{ color: "#fff", marginTop: 12 }}>Loading your account…</Text>
      </View>
    );
  }

  if (err) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
        <Text style={{ color: "#E53E3E", marginBottom: 12 }}>{err}</Text>
        <TouchableOpacity onPress={handleLogout} style={{ padding: 12, backgroundColor: "#2D3748", borderRadius: 8 }}>
          <Text style={{ color: "#fff" }}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!profile) return null; // should be covered by loading/err paths

  const initial = (profile.firstName?.[0] ?? profile.email?.[0] ?? "?").toUpperCase();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{`${profile.firstName} ${profile.lastName}` || "Default"}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
            <Text style={styles.actionText}>Edit Profile</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
            <Text style={styles.actionText}>Settings</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <View className="divider" style={styles.divider} />

          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Account Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>{(profile as any).userID ?? profile.id}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{profile.email}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e" },
  content: { padding: 20 },
  profileHeader: { flexDirection: "row", alignItems: "center", marginBottom: 30, paddingVertical: 20 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#4A5568", justifyContent: "center", alignItems: "center", marginRight: 20 },
  avatarText: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  userInfo: { flex: 1 },
  userName: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  userEmail: { fontSize: 16, color: "#A0AEC0" },
  actionsContainer: { backgroundColor: "#2D3748", borderRadius: 12, marginBottom: 30, overflow: "hidden" },
  actionButton: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#4A5568" },
  actionText: { fontSize: 16, color: "#fff" },
  actionArrow: { fontSize: 20, color: "#A0AEC0" },
  logoutText: { color: "#E53E3E" },
  divider: { height: 8, backgroundColor: "#25292e" },
  infoContainer: { backgroundColor: "#2D3748", borderRadius: 12, padding: 20 },
  infoTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 16 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
  infoLabel: { fontSize: 16, color: "#A0AEC0" },
  infoValue: { fontSize: 16, color: "#fff", fontWeight: "500" },
});
