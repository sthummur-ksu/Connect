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

interface Book {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface BooksModalProps {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  books: Book[];
}

const BooksModal: React.FC<BooksModalProps> = ({
  visible,
  onClose,
  loading,
  books,
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
          <Text style={styles.modalTitle}>Books</Text>

          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : books.length > 0 ? (
            <FlatList
              data={books}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.bookItem}>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.bookDescription}>{item.description}</Text>
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
            <Text style={styles.noBooksText}>
              No books available at the moment.
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
  bookItem: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookDescription: {
    fontSize: 14,
    color: "#555",
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
  noBooksText: {
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

export default BooksModal;
