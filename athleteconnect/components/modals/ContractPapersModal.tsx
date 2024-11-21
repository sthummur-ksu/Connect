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

interface ContractPaper {
  id: number;
  title: string;
  url: string;
}

interface ContractPapersModalProps {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  contractPapers: ContractPaper[];
}

const ContractPapersModal: React.FC<ContractPapersModalProps> = ({
  visible,
  onClose,
  loading,
  contractPapers,
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
          <Text style={styles.modalTitle}>Contract Papers</Text>

          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : contractPapers.length > 0 ? (
            <FlatList
              data={contractPapers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
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
            <Text style={styles.noDataText}>No contract papers available.</Text>
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
  item: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemTitle: {
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
  noDataText: {
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

export default ContractPapersModal;
