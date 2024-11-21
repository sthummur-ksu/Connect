import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createEvent } from "@/services/eventsService";

const CreateEventModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [location, setLocation] = useState("");
  const [googleMeetUrl, setGoogleMeetUrl] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleCreateEvent = async () => {
    if (!title || !description || !eventDate || !location) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const formattedDate = `${eventDate.getFullYear()}-${String(
        eventDate.getMonth() + 1
      ).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;

      const eventData = {
        title,
        description,
        event_date: formattedDate,
        location,
        google_meet_url: googleMeetUrl,
      };

      console.log("Sending event data:", eventData);

      await createEvent(eventData);

      Alert.alert("Success", "Event created successfully!");
      onClose();
      setTitle("");
      setDescription("");
      setEventDate(null);
      setLocation("");
      setGoogleMeetUrl("");
    } catch (error) {
      Alert.alert("Error", "Failed to create event.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create New Event</Text>

          <TextInput
            style={styles.input}
            placeholder="Google Meet URL"
            value={googleMeetUrl}
            onChangeText={setGoogleMeetUrl}
          />

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <Text
            style={styles.datePickerText}
            onPress={() => setShowDatePicker(true)}
          >
            {eventDate ? formatDate(eventDate) : "Select Event Date"}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={eventDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={handleDateChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

          <View style={styles.buttonContainer}>
            <Button title="Create Event" onPress={handleCreateEvent} />
            <Button title="Cancel" color="red" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateEventModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  datePickerText: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
