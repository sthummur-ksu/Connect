// app/(athletes)/index.tsx

import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { fetchMatchedAgents } from "@/services/matchingService";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { logoutUser } from "@/services/authService";
import { useRouter } from "expo-router";
import GlobalLoader from "@/components/GlobalLoader";
import { Entypo } from "@expo/vector-icons";
import ProfileModal from "@/components/modals/ProfileModal";
import AchievementVideoModal from "@/components/modals/AchievementVideoModal";

interface Agent {
  id: string;
  username: string;
  sport: string;
  location: string;
}

export default function AthleteLandingScreen() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>(""); 
  const [initialValue, setInitialValue] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getMatchedAgents = async () => {
      try {
        const data = await fetchMatchedAgents();
        if (data && data.matches && data.matches.length > 0) {
          setAgents(data.matches); 
          console.log(data.matches);
        } else {
          setAgents([]);
        }
      } catch (error) {
        console.error("Error fetching matched agents:", error);
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };

    getMatchedAgents();
  }, []);

  const handleCreateAchievement = () => {
    setModalType("achievement");
    setInitialValue(""); 
    setShowModal(true);
  };

  const handleCreateVideoHighlight = () => {
    setModalType("video");
    setInitialValue(""); 
    setShowModal(true);
  };

  const handleModalSubmit = (type: string, value: string) => {
    if (type === "achievement") {
      console.log("Achievement Created: ", value);
    } else {
      console.log("Video Highlight Created: ", value);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.replace("/login");
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <GlobalLoader visible={loading} loadingText="Loading data..." />
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
      <Text style={styles.title}>Matched Agents</Text>

      {agents.length === 0 ? (
        <Text style={styles.text}>No matched agents found.</Text>
      ) : (
        <FlatList
          data={agents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={[styles.details, { display: "flex", gap: 5 }]}>
                {/* <Text style={{}}>{item.index + 1}</Text> */}
                <Text style={{ color: "gray", fontSize: 18 }}>
                  {item.username}
                </Text>
                <Text>-</Text>
                <Text>{item.sport}</Text>
                <Text>{item.location}</Text> 
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
                      onSelect={() => router.push("/profile")}
                      text="View"
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
        />
      )}

      <TouchableOpacity style={styles.createButton} onPress={handleCreateAchievement}>
        <Text style={styles.buttonText}>Create Achievement</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateVideoHighlight}>
        <Text style={styles.buttonText}>Create Video Highlight</Text>
      </TouchableOpacity>

      <AchievementVideoModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        type={modalType}
        initialValue={initialValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff",
    justifyContent: "space-between",
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
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    marginBottom: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  agentCard: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  agentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  agentAgency: {
    fontSize: 16,
    color: "#666",
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
