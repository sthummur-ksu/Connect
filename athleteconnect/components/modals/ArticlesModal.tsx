import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";

interface Article {
  id: string;
  title: string;
  url: string;
}

interface ArticlesModalProps {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  articles: Article[];
}

const ArticlesModal: React.FC<ArticlesModalProps> = ({
  visible,
  onClose,
  loading,
  articles,
}) => {
  const openUrl = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Unable to open URL");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Articles</Text>

          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : articles.length > 0 ? (
            <FlatList
              data={articles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.articleItem}>
                  <Text style={styles.articleTitle}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.urlButton}
                    onPress={() => openUrl(item.url)}
                  >
                    <Text style={styles.urlButtonText}>Open Link</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noArticlesText}>
              No articles available at the moment.
            </Text>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  articleItem: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  urlButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    alignItems: "center",
  },
  urlButtonText: {
    color: "white",
    fontSize: 14,
  },
  noArticlesText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ArticlesModal;
