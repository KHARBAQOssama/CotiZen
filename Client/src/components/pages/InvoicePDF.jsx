import React, { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  PDFViewer,
} from "@react-pdf/renderer";

const InvoicePDF = ({ invoice }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
    },
    header: {
      fontWeight: "bold",
      fontSize: 32,
      marginBottom: 20,
      textAlign: "center",
    },
    section: {
      margin: 10,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: 1,
      borderBottomColor: "#ccc",
    },
    sectionTitle: {
      fontWeight: "bold",
    },
    sectionContent: {
      flex: 2,
    },
    totalAmount: {
      fontSize: 18,
      textAlign: "right",
      marginTop: 20,
      marginRight: 20,
      fontWeight: "bold",
    },
  });
  console.log(invoice);
  return (
    <PDFViewer width={"100%"} height={500}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>Invoice Details</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Invoice ID: </Text>
            <Text style={styles.sectionContent}>{invoice._id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Month: </Text>
            <Text style={styles.sectionContent}>{invoice.month}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total Amount: </Text>
            <Text style={styles.sectionContent}>${invoice.amount}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount Paid: </Text>
            <Text style={styles.sectionContent}>${invoice.amount_paid}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Status: </Text>
            <Text style={styles.sectionContent}>{invoice.status}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Apartment Number: </Text>
            <Text style={styles.sectionContent}>
              {invoice.apartment.number}
            </Text>
          </View>
          <View style={styles.totalAmount}>
            <Text>Total Paid: ${invoice.amount_paid}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoicePDF;
