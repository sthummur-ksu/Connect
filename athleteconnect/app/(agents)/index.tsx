import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
import { fetchMatchedAthletes } from "@/services/matchingService";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useRouter } from "expo-router";
import { logoutUser } from "@/services/authService";
import GlobalLoader from "@/components/GlobalLoader";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import ProfileModal from "@/components/modals/ProfileModal";
import { Modal } from "react-native";

interface Athlete {
  id: string;
  username: string;
  sport: string;
  achievements?: Array<{ achievement: string }>;
  videoHighlights?: Array<{ video_url: string }>;
}

export default function AgentLandingScreen() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getMatchedAthletes = async () => {
      try {
        console.log("Loading matches");
        const data = await fetchMatchedAthletes();
        setAthletes(data.matches);
        console.log(data);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getMatchedAthletes();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logoutUser();
              router.replace("/login");
            } catch (error) {
              console.error("Error during logout:", error);
              Alert.alert("Error", "An error occurred while logging out.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // const menuOptions = [
  //   {
  //     text: "View Profile",
  //     onSelect: () => router.push("/profile"),
  //   },
  //   {
  //     text: "Logout",
  //     onSelect: handleLogout,
  //     color: "red",
  //   },
  // ];
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenLink = async (url?: string) => {
    if (!url) {
      Alert.alert("No Video Available", "This athlete has no video highlight.");
      return;
    }
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Error", "Unable to open the video link.");
    }
  };
  const renderAchievement = (
    achievement: { achievement: string },
    index: number
  ) => (
    <Text key={index} style={styles.modalText}>
      - {achievement.achievement}
    </Text>
  );

  const handleOptionSelect = (option: string) => {
    if (option === "View Highlight") {
      //@ts-ignore
      handleOpenLink(selectedAthlete?.videoHighlights);
    } else if (option === "View Profile") {
      Alert.alert("Profile", `Viewing profile of ${selectedAthlete?.username}`);
    } else if (option === "Send Message") {
      Alert.alert("Message", `Sending message to ${selectedAthlete?.username}`);
    }
    setModalVisible(false);
  };
  const renderVideoHighlight = (
    video: { video_url: string },
    index: number
  ) => (
    <TouchableOpacity
      key={index}
      style={styles.modalButton}
      onPress={() => handleOpenLink(video.video_url)}
    >
      <Text style={styles.modalButtonText}>Watch Highlight {index + 1}</Text>
    </TouchableOpacity>
  );

  const openOptionsModal = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setModalVisible(true);
  };
  // interface Athlete {
  //   id: string;
  //   username: string;
  //   sport: string;
  //   videoHighlights?: string;
  // }

  // const athletes: Athlete[] = [
  //   {
  //     id: "1",
  //     username: "John Doe",
  //     sport: "Soccer",
  //     achievements: [
  //       { achievement: "Achievement 1" },
  //       { achievement: "Achievement 2" },
  //     ],
  //     videoHighlights: [{ video_url: "https://example.com/highlight1" }],
  //   },
  //   {
  //     id: "2",
  //     username: "Jane Smith",
  //     sport: "Basketball",
  //     achievements: [
  //       { achievement: "Achievement 1" },
  //       { achievement: "Achievement 2" },
  //     ],
  //     videoHighlights: [
  //       { video_url: "https://example.com/highlight2" },
  //       { video_url: "https://example.com/highlight3" },
  //     ],
  //   },
  // ];

  return (
    <View style={styles.container}>
      <GlobalLoader visible={loading} loadingText="Loading data..." />
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
        <Text style={styles.navTitle}>Home</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity>
            <Icon name="notifications-none" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Menu>
              <MenuTrigger>
                <Icon name="more-vert" size={24} color="#333" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  // @ts-ignore
                  onSelect={() => router.push("/profile")}
                  text="View Profile"
                />
                <MenuOption onSelect={handleLogout}>
                  <Text style={{ color: "red" }}>Logout</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>Matched Athletes</Text>
      {athletes.length === 0 ? (
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>No matched athletes found.</Text>
        </View>
      ) : (
        <FlatList
          data={athletes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.athleteCard}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.athleteName}>{item.username}</Text>
                  <Text style={styles.athleteSport}>{item.sport}</Text>
                </View>
                <TouchableOpacity onPress={() => openOptionsModal(item)}>
                  <MaterialIcons name="more-vert" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      {modalVisible && selectedAthlete && (
        // <Modal
        //   transparent={true}
        //   visible={modalVisible}
        //   onRequestClose={() => setModalVisible(false)}
        // >
        //   <View style={styles.modalContainer}>
        //     <View style={styles.modalContent}>
        //       <Text style={styles.modalTitle}>{selectedAthlete.username}</Text>
        //       <TouchableOpacity
        //         style={styles.modalButton}
        //         onPress={() => handleOptionSelect("View Highlight")}
        //       >
        //         <Text style={styles.modalButtonText}>View Highlight</Text>
        //       </TouchableOpacity>
        //       <TouchableOpacity
        //         style={styles.modalButton}
        //         onPress={() => handleOptionSelect("View Profile")}
        //       >
        //         <Text style={styles.modalButtonText}>View Profile</Text>
        //       </TouchableOpacity>
        //       <TouchableOpacity
        //         style={styles.modalButton}
        //         onPress={() => handleOptionSelect("Send Message")}
        //       >
        //         <Text style={styles.modalButtonText}>Send Message</Text>
        //       </TouchableOpacity>
        //       <TouchableOpacity
        //         style={styles.modalButton}
        //         onPress={() => setModalVisible(false)}
        //       >
        //         <Text style={[styles.modalButtonText, { color: "red" }]}>
        //           Cancel
        //         </Text>
        //       </TouchableOpacity>
        //     </View>
        //   </View>
        // </Modal>
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedAthlete.username}</Text>
              {selectedAthlete.achievements?.length ? (
                <>
                  <Text style={styles.modalSubtitle}>Achievements:</Text>
                  {selectedAthlete.achievements.map(renderAchievement)}
                </>
              ) : (
                <Text style={styles.modalText}>No achievements available.</Text>
              )}
              {selectedAthlete.videoHighlights?.length ? (
                <>
                  <Text style={styles.modalSubtitle}>Video Highlights:</Text>
                  {selectedAthlete.videoHighlights.map(renderVideoHighlight)}
                </>
              ) : (
                <Text style={styles.modalText}>
                  No video highlights available.
                </Text>
              )}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: "red" }]}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  navIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginHorizontal: 19,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  athleteCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  athleteName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  athleteSport: {
    fontSize: 16,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  modalButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalButtonText: {
    fontSize: 16,
    color: "blue",
  },
});
