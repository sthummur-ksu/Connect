// app/(athletes)calendar.tsx

import React, { useState } from "react";
import { fetchAllEvents } from "@/services/eventsService";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  FlatList,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Calendar } from "react-native-calendars";
import { Entypo } from "@expo/vector-icons";
import ProfileModal from "@/components/modals/ProfileModal";

type Event = {
  id: number;
  title: string;
  google_meet_url: string;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AthletesCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [noteText, setNoteText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [eventsModalVisible, setEventsModalVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setNoteText(notes[day.dateString] || "");
  };

  const saveNote = () => {
    if (selectedDate) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedDate]: noteText,
      }));
      setModalVisible(false);
    }
  };

  const loadEvents = async () => {
    try {
      setLoadingEvents(true);
      const fetchedEvents = await fetchAllEvents();
      setEvents(fetchedEvents);
      setEventsModalVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Failed to load events.");
      }
    } finally {
      setLoadingEvents(false);
    }
  };

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open this link.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowProfile(true)}
        >
          <Entypo name="user" size={24} color="black" />
          <ProfileModal
            visible={showProfile}
            onClose={() => setShowProfile(false)}
          />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Athletes Calendar</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity>
            <Icon name="notifications-none" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="more-vert" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <Calendar
        markedDates={Object.keys(notes).reduce(
          (
            acc: {
              [key: string]: {
                selected: boolean;
                marked: boolean;
                dotColor: string;
                activeOpacity: number;
              };
            },
            date: string
          ) => {
            acc[date] = {
              selected: true,
              marked: true,
              dotColor: "blue",
              activeOpacity: 0,
            };
            return acc;
          },
          {}
        )}
        onDayPress={onDayPress}
        markingType={"custom"}
        style={styles.calendar}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={loadEvents}
          disabled={loadingEvents}
        >
          {loadingEvents ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Icon name="videocam" size={24} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="more-horiz" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal for Notes */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Note for {selectedDate}</Text>
            <TextInput
              style={styles.textInput}
              value={noteText}
              onChangeText={setNoteText}
              placeholder="Add a note"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.saveText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Events */}
      <Modal
        visible={eventsModalVisible}
        animationType="slide"
        onRequestClose={() => setEventsModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Available Events</Text>
            {loadingEvents ? (
              <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
              <FlatList
                data={events}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.eventItem}
                    onPress={() => openLink(item.google_meet_url)}
                  >
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text style={styles.eventLink}>Join via Google Meet</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity
              style={[styles.saveButton, styles.cancelButton]}
              onPress={() => setEventsModalVisible(false)}
            >
              <Text style={styles.saveText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  navIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendar: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: windowWidth * 0.8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventLink: {
    color: "#4CAF50",
    marginTop: 5,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});