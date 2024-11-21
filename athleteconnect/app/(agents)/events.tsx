import CreateEventModal from "@/components/CreateEventModal";
import { fetchMyEvents, joinEvent } from "@/services/eventsService";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/MaterialIcons";
import { logoutUser } from "@/services/authService";
import ProfileModal from "@/components/modals/ProfileModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//@ts-ignore
const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.details}>
      {/* <Text style={{}}>{item.index + 1}</Text> */}
      <Text style={{ color: "gray", fontSize: 18 }}>{item.name}</Text>
    </View>
    <TouchableOpacity
    // onPress={() => alert(`More options for ${item.name}`)}
    >
      {/* <Text style={styles.moreText}>⋮</Text> */}
      <Menu style={{ paddingVertical: 5 }}>
        <MenuTrigger>
          <Icon name="more-vert" size={24} color="#333" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsWrapper: {
              position: "absolute",
              // bottom: Platform.OS === 'ios' ? -60 : -68,
              left: 50,
              height: 90,
              // backgroundColor: colors.neutral.white.default,
              borderRadius: 3,
              padding: 3,
              width: 150,
              shadowRadius: 4,
              elevation: 5,
              backgroundColor: "#fff",
            },
          }}
        >
          <MenuOption //@ts-ignore
            onSelect={() => handleJoinEvent(item.id)}
            text="Attend"
          />
          <MenuOption //@ts-ignore
            onSelect={() => router.push("/profile")}
            text="Options"
          />

          <MenuOption onSelect={() => console.log("Selected")}>
            <Text style={{ color: "red" }}>Cancel</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  </View>
);

const data = [
  { id: "1", name: "Meet Athlete002" },
  { id: "2", name: "Meet Athlete008" },
  { id: "3", name: "Sign Athlete" },
  { id: "4", name: "Join meetup " },
  { id: "5", name: "Event preparation" },
];
const data2 = [
  { id: "1", name: "Done ,=meeting" },
  { id: "2", name: "Exceptional event" },
  { id: "3", name: "Signed Athletes" },
  { id: "4", name: "Secured funds" },
  { id: "5", name: "Finished event" },
];

export default function AgentEventsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

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

  const fetchEventsData = async () => {
    try {
      const events = await fetchMyEvents();
      console.log("My Events:", events);
      setEventsData(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEventsData();
  }, []);

  const handleJoinEvent = async (eventId: string) => {
    try {
      const result = await joinEvent(eventId);
      console.log("Event joined successfully:", result);
    } catch (error) {
      console.error("Error joining event:", error);
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
        <Text style={styles.navTitle}>Events</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity>
            <Icon name="notifications-none" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Menu>
              <MenuTrigger>
                <Icon name="more-vert" size={24} color="#333" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption //@ts-ignore
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

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            width: windowWidth * 0.759,
            borderRadius: 6,
            paddingHorizontal: 8,
            paddingVertical: 3,
          }}
        >
          <Ionicons name="search" size={18} color="gray" />
          <TextInput
            placeholder="Search..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 3,
            marginLeft: 8,
            backgroundColor: "white",
          }}
        >
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Switching tabs */}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "blue",
          marginHorizontal: 20,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setTab(1)}
          style={styles.tabItem}
        >
          <Text
            style={{
              color: `${tab == 1 ? "green" : "blue"}`,
              borderColor: `${tab == 1 ? "green" : "gray"}`,
              fontWeight: `${tab == 1 ? "700" : "300"}`,
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderWidth: 1,
              borderRadius: 3,
            }}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setTab(2)}
          style={styles.tabItem}
        >
          <Text
            style={{
              color: `${tab == 2 ? "green" : "blue"}`,
              borderColor: `${tab == 2 ? "green" : "gray"}`,
              fontWeight: `${tab == 2 ? "700" : "300"}`,
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderWidth: 1,
              borderRadius: 3,
            }}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: "green",
          fontSize: 18,
          marginTop: 20,
          fontWeight: "500",
          marginHorizontal: windowWidth * 0.06,
        }}
      >
        {tab == 1 ? "Pending" : "Past"}
      </Text>
      {tab == 1 ? (
        <View
          style={{
            marginTop: 10,
            borderWidth: 0.1,
            borderColor: "blue",
            padding: 3,
            marginHorizontal: windowWidth * 0.02,
            backgroundColor: "#fff",
            height: windowHeight * 0.57,
            borderRadius: 1,
          }}
        >
          <FlatList
            data={eventsData}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.details}>
                  {/* <Text style={{}}>{item.index + 1}</Text> */}
                  <Text style={{ color: "gray", fontSize: 18 }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>{item.location}</Text>
                  <Text style={{ fontSize: 12, color: "green" }}>{item.event_date}</Text>
                  <Text style={{ fontSize: 12, color: "blue" }}>{item.status}</Text>
                </View>
                <TouchableOpacity
                // onPress={() => alert(`More options for ${item.name}`)}
                >
                  {/* <Text style={styles.moreText}>⋮</Text> */}
                  <Menu style={{ paddingVertical: 5 }}>
                    <MenuTrigger>
                      <Icon name="more-vert" size={24} color="#333" />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsWrapper: {
                          position: "absolute",
                          // bottom: Platform.OS === 'ios' ? -60 : -68,
                          left: 50,
                          height: 90,
                          // backgroundColor: colors.neutral.white.default,
                          borderRadius: 3,
                          padding: 3,
                          width: 150,
                          shadowRadius: 4,
                          elevation: 5,
                          backgroundColor: "#fff",
                        },
                      }}
                    >
                      <MenuOption //@ts-ignore
                        onSelect={() => handleJoinEvent(item.id)}
                        text="Attend"
                      />
                      <MenuOption //@ts-ignore
                        onSelect={() => router.push("/profile")}
                        text="Options"
                      />

                      <MenuOption onSelect={() => console.log("Selected")}>
                        <Text style={{ color: "red" }}>Cancel</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View
          style={{
            marginTop: 10,
            borderWidth: 0.1,
            borderColor: "blue",
            padding: 3,
            marginHorizontal: windowWidth * 0.02,
            backgroundColor: "#fff",
            height: windowHeight * 0.57,
            borderRadius: 1,
          }}
        >
          <FlatList
            data={eventsData.length > 0 ? eventsData : []}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
          style={{
            marginHorizontal: "auto",
            width: windowWidth * 0.4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 3,
            borderColor: "blue",
            marginTop: 10,
            height: 40,
          }}
        >
          <Text style={{ color: "blue", fontSize: 17, fontWeight: "500" }}>
            Add Event
          </Text>
          <CreateEventModal
            visible={isModalVisible}
            onClose={() => setModalVisible(false)}
          />
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    borderBottomWidth: 0.6,
    borderBottomColor: "blue",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  moreButton: {
    padding: 10,
  },
  moreText: {
    fontSize: 18,
    color: "#000",
  },
  tabItem: {
    marginHorizontal: 10,
    padding: 4,
  },
});
