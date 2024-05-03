import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderCollapse: "collapse",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    margin: "auto",
    marginVertical: 5,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    padding: 5,
  },
});

const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Number Order</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Item ID</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Item Name</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Type</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Quantity</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Unit Price (LKR)</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Description</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Alert Quantity</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Supplier</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Supplier Email</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>Date Purchased</Text>
            </View>
          </View>
          {/* Table Body */}
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{row.numberOrder}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.itemId}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.itemName}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.type}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.quantity}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.unitPrice}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.description}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.alertQuantity}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.supplier}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.supplierEmail}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{row.datePurchased}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
