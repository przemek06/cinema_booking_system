package pwr.web.cinema_booking_api.utils;

import com.itextpdf.styledxmlparser.jsoup.Jsoup;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfName;
import com.itextpdf.text.pdf.PdfReader;
import org.xhtmlrenderer.pdf.ITextRenderer;
import pwr.web.cinema_booking_api.pdf.ProfileImageReplacedElementFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

public class PDFConverter {

    public static OutputStream convertHtmlToPdf(String html, InputStream image) throws IOException {
        OutputStream outputStream = new ByteArrayOutputStream();

        try {

            com.itextpdf.styledxmlparser.jsoup.nodes.Document document = Jsoup.parse(html);
            document.outputSettings().syntax(com.itextpdf.styledxmlparser.jsoup.nodes.Document.OutputSettings.Syntax.xml);
            String xhtml = document.html();

            ITextRenderer renderer = new ITextRenderer();
            renderer.getSharedContext().setReplacedElementFactory(new ProfileImageReplacedElementFactory(renderer.getSharedContext().getReplacedElementFactory(), image));
            renderer.setDocumentFromString(xhtml);
            renderer.layout();
            renderer.createPDF(outputStream);

        } catch (Exception e) {
           throw new IOException();

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
            document.addTitle("reservation");
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
