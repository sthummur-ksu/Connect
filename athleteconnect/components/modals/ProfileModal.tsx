import { fetchProfile, updateProfile } from "@/services/authService";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ visible, onClose }) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editableProfile, setEditableProfile] = useState<any>({
    username: "",
    email: "",
    phone_number: "",
    location: "",
    bio: "",
    sport: "",
    team: "",
  });

  useEffect(() => {
    if (visible) {
      loadProfile();
    }
  }, [visible]);

  const loadProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchProfile();
      setProfile(data);
      setEditableProfile({
        username: data.username,
        email: data.email,
        phone_number: data.phone_number || "",
        location: data.location || "",
        bio: data.bio || "",
        sport: data.sport || "",
        team: data.team || "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedProfile = await updateProfile(editableProfile);
      setProfile(updatedProfile);
      Alert.alert("Success", "Profile updated successfully");
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <View>
              <Text style={styles.title}>Profile</Text>
              <TextInput
                style={styles.input}
                value={editableProfile.username}
                onChangeText={(text) => setEditableProfile({ ...editableProfile, username: text })}
                placeholder="Username"
              />
              <TextInput
                style={styles.input}
                value={editableProfile.email}
                onChangeText={(text) => setEditableProfile({ ...editableProfile, email: text })}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                value={editableProfile.phone_number}
                onChangeText={(text) => setEditableProfile({ ...editableProfile, phone_number: text })}
                placeholder="Phone Number"
              />
              <TextInput
                style={styles.input}
                value={editableProfile.location}
                onChangeText={(text) => setEditableProfile({ ...editableProfile, location: text })}
                placeholder="Location"
              />
              <TextInput
                style={styles.input}
                value={editableProfile.bio}
                onChangeText={(text) => setEditableProfile({ ...editableProfile, bio: text })}
                placeholder="Bio"
              />
              <TextInput
                style={styles.input}
                value={editableProfile.sport}
                onChangeText={(text) => setEditableProfile({ ...editableProfile, sport: text })}
                placeholder="Sport"
              />
              <TextInput
                style={styles.input}
                value={editableProfile.team}
                onChangeText={(text) => setEditableProfile({ ...editableProfile, team: text })}
                placeholder="Team"
              />
            </View>
          )}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleProfileUpdate}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.saveText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: windowWidth * 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileModal;
