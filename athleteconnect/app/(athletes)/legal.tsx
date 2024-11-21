// app/legal.tsx

import GlobalLoader from "@/components/GlobalLoader";
import ArticlesModal from "@/components/modals/ArticlesModal";
import BooksModal from "@/components/modals/BooksModal";
import CasesModal from "@/components/modals/CasesModal";
import DoDontsModal from "@/components/modals/DoDontsModal";
import ProfileModal from "@/components/modals/ProfileModal";
import {
  fetchArticles,
  fetchBooks,
  fetchCases,
  fetchDoDonts,
} from "@/services/resourcesServices";
import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
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

const DATA = [
  { id: "1", name: "Lawyer John", number: "0775575" },
  { id: "2", name: "Dwayne James", number: "098768" },
  { id: "3", name: "Serena Williams", number: "+566445434" },
  { id: "4", name: "Kawi Leonard", number: "+9123354" },
  { id: "5", name: "John Bee", number: "+6785644" },
];
//@ts-ignore
const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.details}>
      {/* <Text style={{}}>{item.index + 1}</Text> */}
      <Text style={{ color: "gray", fontSize: 18 }}>{item.name}</Text>
    </View>
    <TouchableOpacity>
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
              // height: 90,
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
            onSelect={() => router.push("/profile")}
            text="Contact"
          />
          <MenuOption //@ts-ignore
            onSelect={() => router.push("/profile")}
            text="Meet"
          />
          {/* 
          <MenuOption onSelect={() => console.log("Selected")}>
            <Text style={{ color: "red" }}>Cancel</Text>
          </MenuOption> */}
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  </View>
);

export default function LegalScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [books, setBooks] = useState([]);
  // Books modal start
  const openBooksModal = async () => {
    setLoading(true);
    try {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
      setModalVisible(true);
    } catch (error) {
      //@ts-ignore
      Alert.alert("Error", error.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const closeBooksModal = () => {
    setModalVisible(false);
    setBooks([]);
  };
  // Books modal end

  // Articles modal start
  const [articlesModalVisible, setArticlesModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const openArticlesModal = async () => {
    setLoading(true);
    try {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
      setArticlesModalVisible(true);
    } catch (error) {
      //@ts-ignore
      Alert.alert("Error", error.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };
  const closeArticlesModal = () => {
    setArticlesModalVisible(false);
    setArticles([]);
  };
  // Articles modal end

  // Start cases modal
  const [casesModalVisible, setCasesModalVisible] = useState(false);
  const [cases, setCases] = useState([]);

  const openCasesModal = async () => {
    setLoading(true);
    try {
      const fetchedCases = await fetchCases();
      setCases(fetchedCases);
      setCasesModalVisible(true);
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error", error.message || "Failed to fetch cases");
    } finally {
      setLoading(false);
    }
  };

  const closeCasesModal = () => {
    setCasesModalVisible(false);
    setCases([]);
  };
  // End Cases modal
  // Start Do Don'ts modal
  const [doDontsModalVisible, setDoDontsModalVisible] = useState(false);
  const [doDonts, setDoDonts] = useState([]);

  const openDoDontsModal = async () => {
    setLoading(true);
    try {
      const fetchedDoDonts = await fetchDoDonts();
      setDoDonts(fetchedDoDonts);
      setDoDontsModalVisible(true);
    } catch (error) {
      //@ts-ignore
      Alert.alert("Error", error.message || "Failed to fetch do's and don'ts");
    } finally {
      setLoading(false);
    }
  };

  const closeDoDontsModal = () => {
    setDoDontsModalVisible(false);
    setDoDonts([]);
  };

  // End Do Don'ts modal
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
        <Text style={styles.navTitle}>Legal</Text>
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

      <Text
        style={{
          color: "green",
          fontSize: 20,
          marginTop: 20,
          fontWeight: "700",
          marginHorizontal: windowWidth * 0.07,
        }}
      >
        Available Lawyers
      </Text>
      <View
        style={{
          marginTop: 20,
          borderWidth: 0.5,
          borderColor: "blue",
          padding: 3,
          paddingHorizontal: windowWidth * 0.05,
          backgroundColor: "#FFF",
          height: windowHeight * 0.3,
          borderRadius: 2,
        }}
      >
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* Legal advice resources */}
      <View
        style={{
          marginHorizontal: windowWidth * 0.05,
          display: "flex",
          marginTop: 7,
        }}
      >
        <Text style={{ color: "green", fontWeight: "600", fontSize: 19 }}>
          Legal Advice Resources
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: windowWidth * 0.1,
            paddingVertical: windowHeight * 0.04,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openBooksModal}
            style={{
              backgroundColor: "blue",
              borderRadius: 3,
              width: windowWidth * 0.3,
              justifyContent: "center",
              alignItems: "center",
              height: windowHeight * 0.04,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>Books</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openArticlesModal}
            style={{
              backgroundColor: "blue",
              borderRadius: 3,
              width: windowWidth * 0.3,
              justifyContent: "center",
              alignItems: "center",
              height: windowHeight * 0.04,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>Articles</Text>
          </TouchableOpacity>
        </View>
        {/* sect 2 */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: windowWidth * 0.1,
            paddingVertical: windowHeight * 0.04,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openCasesModal}
            style={{
              backgroundColor: "#B71344",
              borderRadius: 3,
              width: windowWidth * 0.3,
              justifyContent: "center",
              alignItems: "center",
              height: windowHeight * 0.04,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>Cases</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openDoDontsModal}
            style={{
              backgroundColor: "#B71344",
              borderRadius: 3,
              width: windowWidth * 0.3,
              justifyContent: "center",
              alignItems: "center",
              height: windowHeight * 0.04,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>Dos/Don'ts</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modals area */}
      <ArticlesModal
        visible={articlesModalVisible}
        onClose={closeArticlesModal}
        loading={loading}
        articles={articles}
      />
      <BooksModal
        visible={modalVisible}
        onClose={closeBooksModal}
        loading={loading}
        books={books}
      />
      <CasesModal
        visible={casesModalVisible}
        onClose={closeCasesModal}
        loading={loading}
        cases={cases}
      />
      <DoDontsModal
        visible={doDontsModalVisible}
        onClose={closeDoDontsModal}
        loading={loading}
        doDonts={doDonts}
      />
      {/* End modals area */}
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
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
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
});
