package pwr.web.cinema_booking_api.utils;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class PDFConverter {

    public static OutputStream convertHtmlToPdf(String html) throws IOException {
        OutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();

        try {
            // Create the document and PDFWriter
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);

            // Open the document
            document.open();

            // Read the HTML file and convert it to PDF
            InputStream inputStream = new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8));
            XMLWorkerHelper.getInstance().parseXHtml(writer, document, inputStream);

        } catch (Exception e) {
           throw new IOException();

        } finally {
            document.close();
        }

        return outputStream;
    }

    public static OutputStream mergePdfDocuments(List<OutputStream> pdfFiles) throws IOException {
        ByteArrayOutputStream mergedPdfOutputStream = new ByteArrayOutputStream();

        // Create a new document
        Document document = new Document();

        try {
            // Create a PdfCopy object to merge the PDFs
            PdfCopy copy = new PdfCopy(document, mergedPdfOutputStream);

            // Open the document
            document.open();

            // Iterate through each PDF OutputStream
            for (OutputStream pdfFile : pdfFiles) {
                // Create a PdfReader for the current PDF OutputStream
                PdfReader reader = new PdfReader(((ByteArrayOutputStream) pdfFile).toByteArray());

                // Merge the pages of the current PDF into the destination document
                for (int i = 1; i <= reader.getNumberOfPages(); i++) {
                    copy.addPage(copy.getImportedPage(reader, i));
                }

                // Close the PdfReader
                reader.close();
            }

            System.out.println("PDF documents merged successfully.");
        } catch (Exception e) {
            throw new IOException();
        } finally {
            // Close the document
            document.close();
        }

        return mergedPdfOutputStream;
    }
}
