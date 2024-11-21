// app/(athletes)/events.tsx

import ProfileModal from "@/components/modals/ProfileModal";
import { fetchMyEvents, joinEvent } from "@/services/eventsService";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/MaterialIcons";

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
              left: 50,
              height: 90,
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
            onSelect={() => console.log("Attend selected")}
            text="Attend"
          />
          <MenuOption //@ts-ignore
            onSelect={() => console.log("Options selected")}
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

export default function AthleteEventsScreen() {
  const router = useRouter();
  const [tab, setTab] = useState(1);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const fetchEventsData = async () => {
    try {
      const events = await fetchMyEvents();
    if (events && Array.isArray(events)) {
      setEventsData(events);
    } else {
      setEventsData([]);  
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    setEventsData([]);  
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
                <MenuOption onSelect={() => console.log("Selected")}>
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
          fontSize: 20,
          marginTop: 20,
          fontWeight: "700",
          marginHorizontal: windowWidth * 0.06,
        }}
      >
        {tab == 1 ? "Pending" : "Past"}
      </Text>
      {tab == 1 ? (
        <View
          style={{
            marginTop: 10,
            borderWidth: 0.5,
            borderColor: "blue",
            padding: 3,
            marginHorizontal: windowWidth * 0.02,
            backgroundColor: "#fff",
            height: windowHeight * 0.67,
            borderRadius: 1,
          }}
        >
          <FlatList
            data={eventsData}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={[styles.details, { display: "flex", gap: 5 }]}>
                  {/* <Text style={{}}>{item.index + 1}</Text> */}
                  <Text style={{ color: "gray", fontSize: 18 }}>
                    {/* @ts-ignore */}
                    {item.title}
                  </Text>
                  <Text style={{ color: "gray", fontSize: 18 }}>
                    {/* @ts-ignore */}
                    {item.location}
                  </Text>
                  <Text>-</Text>
                  {/* @ts-ignore */}
                  <Text>{item.event_date}</Text>
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
                        text="Join"
                      />
                      <MenuOption //@ts-ignore
                        onSelect={() => console.log("selected")}
                        text="Options"
                      />
                    </MenuOptions>
                  </Menu>
                </TouchableOpacity>
              </View>
            )}
            //  @ts-ignore
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
            height: windowHeight * 0.67,
            borderRadius: 1,
          }}
        >
          <FlatList
            data={eventsData}
            renderItem={renderItem} // @ts-ignore
            keyExtractor={(item) => item.idtoString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
