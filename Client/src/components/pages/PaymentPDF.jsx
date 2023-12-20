import React from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  PDFViewer,
} from "@react-pdf/renderer";

const PaymentPDF = ({ payment }) => {
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
  });
  return (
    <PDFViewer width={"100%"} height={500}>
      <Document>
      <Page size="A4" style={styles.page}>
          <Text style={styles.header}>Payment Details</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment ID:</Text>
            <Text style={styles.sectionContent}>{payment._id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amount Paid:</Text>
            <Text style={styles.sectionContent}>${payment.amount}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Date:</Text>
            <Text style={styles.sectionContent}>{new Date(payment.date).toDateString()}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Invoice ID:</Text>
            <Text style={styles.sectionContent}>{payment.invoice._id}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Invoice Month:</Text>
            <Text style={styles.sectionContent}>{payment.invoice.month}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Apartment Number:</Text>
            <Text style={styles.sectionContent}>{payment.invoice.apartment.number}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PaymentPDF;
