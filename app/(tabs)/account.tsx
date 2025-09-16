import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


export default function AccountScreen() {
  // TODO: Replace with actual user data from authentication context
  const mockUser = {
    id: "Admin",
    email: "admin@google.com",
    name: "Admin",
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile screen
    console.log("Edit profile pressed");
  };

  const handleSettings = () => {
    // TODO: Navigate to settings screen
    console.log("Settings pressed");
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout pressed");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {/* Letter that shows on profile icon */}
            <Text style={styles.avatarText}>
              {mockUser.name
                ? mockUser.name[0].toUpperCase()
                : mockUser.email[0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            {/* Displays user's name and email */}
            <Text style={styles.userName}>{mockUser.name || "Student"}</Text>
            <Text style={styles.userEmail}>{mockUser.email}</Text>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.actionsContainer}>
          {/* Button to edit profile */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.actionText}>Edit Profile</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
          {/* Button for settings */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSettings}
          >
            <Text style={styles.actionText}>Settings</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />
          {/* Button to logout */}
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Account Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Account Information</Text>
          {/* Account Info (User ID) */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>{mockUser.id}</Text>
          </View>
          {/* Account Info (Email) */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{mockUser.email}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
    padding: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4A5568",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#A0AEC0",
  },
  actionsContainer: {
    backgroundColor: "#2D3748",
    borderRadius: 12,
    marginBottom: 30,
    overflow: "hidden",
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#4A5568",
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
  },
  actionArrow: {
    fontSize: 20,
    color: "#A0AEC0",
  },
  logoutText: {
    color: "#E53E3E",
  },
  divider: {
    height: 8,
    backgroundColor: "#25292e",
  },
  infoContainer: {
    backgroundColor: "#2D3748",
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: "#A0AEC0",
  },
  infoValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});
