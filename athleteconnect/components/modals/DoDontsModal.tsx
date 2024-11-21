import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

interface DoDont {
  id: number;
  content_type: string;
  content: string;
}

interface DoDontsModalProps {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  doDonts: DoDont[];
}

const DoDontsModal: React.FC<DoDontsModalProps> = ({
  visible,
  onClose,
  loading,
  doDonts,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Do's and Don'ts</Text>

          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : doDonts.length > 0 ? (
            <FlatList
              data={doDonts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.item,
                    {
                      borderColor:
                        item.content_type === "Do" ? "green" : "orange",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.contentText,
                      {
                        color: item.content_type === "Do" ? "green" : "orange",
                      },
                    ]}
                  >
                    {item.content_type}: {item.content}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noDataText}>No do's or don'ts available.</Text>
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
  },
  contentText: {
    fontSize: 16,
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

export default DoDontsModal;
