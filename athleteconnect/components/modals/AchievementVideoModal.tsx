import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { addAchievement, addVideoHighlight } from "@/services/achievementsService"; // Import services for adding achievements and video highlights

interface AchievementVideoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (type: string, value: string) => void; 
  type: string; 
  initialValue?: string;
}

const AchievementVideoModal: React.FC<AchievementVideoModalProps> = ({ visible, onClose, onSubmit, type, initialValue }) => {
  const [inputValue, setInputValue] = useState<string>(initialValue || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputValue) {
      setError("This field cannot be empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (type === "achievement") {
        await addAchievement(inputValue); 
      } else {
        await addVideoHighlight(inputValue); 
      }
      onSubmit(type, inputValue); 
      onClose(); 
    } catch (error) {
      setError("An error occurred, please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setInputValue(initialValue || ""); 
    }
  }, [visible, initialValue]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              <Text style={styles.title}>{type === "achievement" ? "Add Achievement" : "Add Video Highlight"}</Text>
              <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder={type === "achievement" ? "Enter Achievement" : "Enter Video URL"}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
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
    width: "80%",
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
  cancelText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AchievementVideoModal;
