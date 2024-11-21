// app/library.tsx

import GlobalLoader from "@/components/GlobalLoader";
import ArticlesModal from "@/components/modals/ArticlesModal";
import BooksModal from "@/components/modals/BooksModal";
import CasesModal from "@/components/modals/CasesModal";
import ContractPapersModal from "@/components/modals/ContractPapersModal";
import DoDontsModal from "@/components/modals/DoDontsModal";
import NegotiationFAQsModal from "@/components/modals/NegotiationFAQsModal";
import ProfileModal from "@/components/modals/ProfileModal";
import {
  fetchArticles,
  fetchBooks,
  fetchCases,
  fetchContractPapers,
  fetchDoDonts,
  fetchNegotiationFAQs,
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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PostSuggestionModal from "@/components/modals/PostSuggestionModal";
import { createSuggestion } from "@/services/suggestionService"; 

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function LibraryScreen() {
  const [isSuggestionModalVisible, setSuggestionModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [books, setBooks] = useState([]);

  const handleOpenSuggestionModal = () => setSuggestionModalVisible(true);
  const handleCloseSuggestionModal = () => setSuggestionModalVisible(false);

  const handleSubmitSuggestion = async (title: string, description: string) => {
    try {
      await createSuggestion(title, description);
      Alert.alert("Success", "Your suggestion has been submitted!");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to submit suggestion"
      );
    }
  };

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

  // Contract papers modal start
  const [contractPapersModalVisible, setContractPapersModalVisible] =
    useState(false);

  const [contractPapers, setContractPapers] = useState([]);
  const openContractPapersModal = async () => {
    setLoading(true);
    try {
      const fetchedContractPapers = await fetchContractPapers();
      setContractPapers(fetchedContractPapers);
      setContractPapersModalVisible(true);
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error", error.message || "Failed to fetch contract papers");
    } finally {
      setLoading(false);
    }
  };

  const closeContractPapersModal = () => {
    setContractPapersModalVisible(false);
    setContractPapers([]);
  };
  // End contract papers modal

  // FAQs Modal start
  const [faqsModalVisible, setFAQsModalVisible] = useState(false);
  const [faqs, setFAQs] = useState([]);

  const openFAQsModal = async () => {
    setLoading(true);
    try {
      const fetchedFAQs = await fetchNegotiationFAQs();
      setFAQs(fetchedFAQs);
      setFAQsModalVisible(true);
    } catch (error) {
      // @ts-ignore
      Alert.alert("Error", error.message || "Failed to fetch negotiation FAQs");
    } finally {
      setLoading(false);
    }
  };

  const closeFAQsModal = () => {
    setFAQsModalVisible(false);
    setFAQs([]);
  };
  //end FAQs modal

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
        <GlobalLoader visible={loading} loadingText="Fetching resources..." />
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
        <Text style={styles.navTitle}>Library</Text>
        <View style={styles.navIcons}>
          <TouchableOpacity>
            <Icon name="notifications-none" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="more-vert" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: windowWidth * 0.05,
          display: "flex",
          marginTop: 7,
        }}
      >
        {/* <Text style={{ color: "green", fontWeight: "600", fontSize: 19 }}>
        Legal Advice Resources
      </Text> */}
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
            onPress={openContractPapersModal}
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
            <Text style={{ color: "white" }}>Contract Papers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={openFAQsModal}
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
            <Text style={{ color: "white" }}>Negotiation Faqs</Text>
          </TouchableOpacity>
        </View>
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
            onPress={openBooksModal}
            activeOpacity={0.8}
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
        {/* <View
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
            style={{
              backgroundColor: "#8313B7",
              borderRadius: 3,
              width: windowWidth * 0.3,
              justifyContent: "center",
              alignItems: "center",
              height: windowHeight * 0.04,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>Video Highlights</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "#8313B7",
              borderRadius: 3,
              width: windowWidth * 0.3,
              justifyContent: "center",
              alignItems: "center",
              height: windowHeight * 0.04,
              marginHorizontal: 5,
            }}
          >
            <Text style={{ color: "white" }}>General Reviews</Text>
          </TouchableOpacity>
        </View> */}
        {/* sect 3 */}

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
      <ContractPapersModal
        visible={contractPapersModalVisible}
        onClose={closeContractPapersModal}
        loading={loading}
        contractPapers={contractPapers}
      />
      <NegotiationFAQsModal
        visible={faqsModalVisible}
        onClose={closeFAQsModal}
        loading={loading}
        faqs={faqs}
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

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOpenSuggestionModal}
        style={styles.suggestionButton}
      >
        <Text style={styles.suggestionButtonText}>Post Suggestion</Text>
      </TouchableOpacity>

      {/* Suggestion Modal */}
      <PostSuggestionModal
        visible={isSuggestionModalVisible}
        onClose={handleCloseSuggestionModal}
        onSubmit={handleSubmitSuggestion}
      />
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

  suggestionButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  suggestionButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
